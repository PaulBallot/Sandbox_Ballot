import requests

# get protein content of banana from fruityvice API
response = requests.get("https://www.fruityvice.com/api/fruit/banana")
response.status_code
response.json()["nutritions"]["protein"]


url = "https://www.fruityvice.com/api/fruit/"
parameters = {"min": 1}
response = requests.get(
    url + "fat",
    params=parameters,
)
response.status_code
response.content
data = response.json()  # [0]["nutritions"]["protein"]

x = 0
protein_list = []
while x < (len(data) - 1):
    protein_list.append(data[x]["nutritions"]["protein"])
    x = x + 1

protein_list
