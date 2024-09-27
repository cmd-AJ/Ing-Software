from locust import HttpUser, task
from dotenv import dotenv_values

#Hi, if you are testing this. Be sure to be on the address Scrum\Working\cucumber\Load_Stress_Tests
#This turns the .env into a dictioarny with the available values

config = dotenv_values("../../.env")
key = config["VITE_API_KEY"]


class ThreadTesting(HttpUser):
    @task(1)
    def getThreadCommentsWithID(self):
        self.client.get(f"/threads/6", headers={"api-key": key})

    @task(3)
    def searchForSpecificJob(self):
        self.client.get(f"/workers/Carpintero", headers={"api-key": key})
    
    @task(2)
    def getThreadsPosts(self):
        self.client.get(f"/threads/getPosts", headers={"api-key": key})