from locust import HttpUser, task, between
import random
from dotenv import dotenv_values

# Load API key from .env file
config = dotenv_values("../../.env")
key = config["VITE_API_KEY"]

# User data
users = [
    {"name": "Ricardo Tapia", "dpi": "3833 86608 0102", "postText": "¿Alguien conoce un buen plomero para una reparación urgente?"},
    {"name": "Jose Prince", "dpi": "3810 35859 0101", "postText": "Necesito contratar a un electricista para un proyecto residencial."},
    {"name": "Alameda Slim", "dpi": "3833 86608 0104", "postText": "Busco carpintero para muebles personalizados, ¡recomendaciones bienvenidas!"},
    {"name": "Josue Marroquin", "dpi": "3000 56346 0101", "postText": "Estoy buscando un jardinero con experiencia para mantenimiento mensual."}
]

class ThreadTesting(HttpUser):
    wait_time = between(1, 3)

    @task(1)
    def create_post_ricardo(self):
        self.create_post_for_user(users[0]["dpi"], users[0]["postText"], None)

    @task(3)
    def create_post_jose(self):
        self.create_post_for_user(users[1]["dpi"], users[1]["postText"], None)

    @task(2)
    def create_post_alameda(self):
        self.create_post_for_user(users[2]["dpi"], users[2]["postText"], None)

    @task(4)
    def create_post_josue(self):
        self.create_post_for_user(users[3]["dpi"], users[3]["postText"], None)

    def create_post_for_user(self, dpiUser, postText, postImage=None):
        """Helper function to create a post for a given user."""
        data = {
            "dpiUser": dpiUser,
            "postText": postText,
            "postImage": postImage
        }
        self.client.post("/api/threads/createPost", json=data, headers={"api-key": key})
