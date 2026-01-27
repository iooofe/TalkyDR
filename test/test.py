import os
import django
import requests

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
django.setup()

from accounts.models import User

user = User.objects.get(username="ivan")

data = {
    "author": user.id,
    "title": "Название поста",
    "text": "Текст внутри поста",
    "is_publish": True
}

response = requests.post(
    "http://127.0.0.1:8000/api/post/create/",
    json=data
)

print(response.status_code)
print(response.text)
