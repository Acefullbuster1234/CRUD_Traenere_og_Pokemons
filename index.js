const express = require("express");
const app = express();

app.use(express.json());

let trainers = [
    { id: 1, name: "Alice", region: "Kanto" },
    { id: 2, name: "Bob", region: "Johto" },
];
let nextId = 3;

app.get("/trainers", (req, res) => {
    res.status(200).json(trainers);
});
app.get("/trainers/:id", (req, res) => {
    const trainer = trainers.find(t => t.id === parseInt(req.params.id));
    if (!trainer) {
        return res.status(404).json({ error: "Trainer not found" });
    }
    res.status(200).json(trainer);
})
app.put("/trainers/:id", (req, res) => {
    const trainer = trainers.find(t => t.id === parseInt(req.params.id));
    if (!trainer) {
        return res.status(404).json({ error: "Trainer not found" });
    }
    const { name, region } = req.body;
    if (!name || !region) {
        return res.status(400).json({
            error: "All fields are required"
        });
    }
    trainer.name = name;
    trainer.region = region;
    res.status(200).json({ status: "Trainer updated", trainer });
})
app.delete("/delete/trainers/:id", (req, res) => {
    const trainerIndex = trainers.findIndex(t => t.id === parseInt(req.params.id));
    if (trainerIndex === -1) {
        return res.status(404).json({ error: "Trainer not found" });
    }
    trainers.splice(trainerIndex, 1);
    res.status(200).json({ status: "Trainer deleted" });
})
app.post("/register-trainer", (req, res) => {
    const { name, region} = req.body;
    if (!name || !region) {
        return res.status(400).json({
            error: "All fields are required"
        });
    }
    trainers.push({ id: nextId++, name, region });
    res.status(201).json({ status: "Trainer registered", trainer: req.body });
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
