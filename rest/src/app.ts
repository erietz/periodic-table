import express from 'express';

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
    res.send({ some: "JSON" });
});

app.listen(PORT, () => {
  console.log(`Timezones by location application is running on port ${PORT}.`);
});
