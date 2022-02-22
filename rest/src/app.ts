import express from 'express';
import { getTables, saveTable, Table } from "./model";

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
    res.send({ some: "JSON" });
});

app.get("/api/tables", (req, res) => {
    getTables({}, "", 0)
        .then( (tables: Table[]) => res.json(tables))
        .catch( err => console.error(err));
});

app.post("/api/savetable", async (req, res) => {
    saveTable(req.body)
        .then(json => res.send(json))
        .catch(err => {
            console.error(err)
            res.send(err)
        });
});

app.listen(PORT, () => {
  console.log(`PeriodicTable REST API is running on port ${PORT}.`);
});
