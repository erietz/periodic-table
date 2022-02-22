import express from 'express';
import { getTables, saveTable, Table } from "./model";

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
    res.send({ some: "JSON" });
});

app.get("/tables", (req, res) => {
    getTables({}, "")
        .then( (tables: Table[]) => res.json(tables))
        .catch( err => console.error(err));
});

app.get("/savetest", async (req, res) => {
    await saveTable();
    res.send("Table saved maybe???");
});

app.listen(PORT, () => {
  console.log(`Timezones by location application is running on port ${PORT}.`);
});
