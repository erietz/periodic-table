import pandas as pd
import json

with open("./raw_atomic_data.json", "r") as f:
  data = json.load(f)

columns = data["Table"]["Columns"]["Column"]
rows = [ row["Cell"] for row in data["Table"]["Row"] ]

df = pd.DataFrame(data=rows, columns=columns)

print(df.head())

df.to_json("peridic_table.json", orient="records", indent=2)
