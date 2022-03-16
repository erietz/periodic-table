import express from 'express';
import { deleteTable, getTables, saveTable, Table } from "./model";

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (_, res) => {
    res.send({ some: "JSON" });
});

app.get("/api/tables", (_, res) => {
    getTables({}, "", 0)
        .then( (tables: Table[]) => res.json(tables))
        .catch( err => console.error(err));
});

app.get("/api/tables/:name", (req, res) => {
    getTables({name: req.params.name}, "", 1)
        .then( (tables: Table[]) => res.json(tables))
        .catch( err => console.error(err));
});

app.get("/api/tablenames", (_, res) => {
    getTables({}, "", 0)
        .then( (tables: Table[]) => {
            const names: string[] = [];
            for (let table of tables) {
                names.push(table["name"]);
            }
            res.json(names);
        })
        .catch( err => console.error(err));
});

app.post("/api/savetable", async (req, res) => {
    saveTable(req.body)
        .then(json => res.status(200).send(json))
        .catch(err => {
            console.error(err)
            res.status(400).send(err)
        });
});

app.delete("/api/delete/:name", (req, res) => {
    if (req.params.name === "Elements") {
        res.json({ Error: "Cannot delete the periodic table of the Elements"});
        return;
    }

    deleteTable(req.params.name)
        .then( x => res.json(x))
        .catch( err => console.error(err));
});

app.listen(PORT, () => {
  console.log(`PeriodicTable REST API is running on port ${PORT}.`);
});
