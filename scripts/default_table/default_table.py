import requests
import json

with open("./default_table.json", "r") as f:
    body = json.load(f)

response = requests.post(
        url="http://localhost:3000/api/savetable",
        json = body
        )

print("status code", response.status_code)
print(response.content)
