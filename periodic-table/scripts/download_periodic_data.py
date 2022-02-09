import requests
import json

url = "https://pubchem.ncbi.nlm.nih.gov/rest/pug/periodictable/JSON"

payload={}
headers = {
  'Content-Type': 'application/json; charset=utf-8',
}

response = requests.request("GET", url, headers=headers, data=payload)

with open("./peridicTable.json", "w") as f:
  json.dump(response.json(), f, indent=2)

