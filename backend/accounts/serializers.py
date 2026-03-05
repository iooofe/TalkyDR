from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate
from django.contrib.auth.password_validation import validate_password

User = get_user_model()

class RegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ("username", "password", "password2")

    def validate(self, attrs):
        if attrs["password"] != attrs["password2"]:
            raise serializers.ValidationError({"password": "Пароли не совпадают"})
        return attrs

    def create(self, validated_data):
        validated_data.pop("password2", None)
        user = User.objects.create_user(
            username=validated_data["username"],
            password=validated_data["password"],
        )
        return user

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        username = attrs.get('username')
        password = attrs.get('password')

        if username and password:   
            user = authenticate(username=username, password=password)
            if not user:
                raise serializers.ValidationError("Неверное имя пользователя или пароль")
        else:
            raise serializers.ValidationError("Необходимо указать username и password")

        attrs['user'] = user
        return attrs

class MeSerializer(serializers.ModelSerializer):
    avatar = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = (
            "id",
            "username",
            "name",
            "birth_date",
            "age",
            "discription",
            "avatar",
        )

    def get_avatar(self, obj):
        request = self.context.get("request")
        if obj.avatar and hasattr(obj.avatar, "url"):
            url = obj.avatar.url
            return request.build_absolute_uri(url) if request else url
        return None

class EditProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            "name",
            "discription",
            "age",
            'avatar',
        )

    def update(self, instance, validated_data):
        instance.name = validated_data.get("name", instance.name)
        instance.discription = validated_data.get("discription", instance.discription)
        instance.age = validated_data.get("age", instance.age)
        instance.avatar = validated_data.get("avatar", instance.avatar)
        instance.save()
        return instance
