const express = require("express");
const app = express();

app.use(express.json());

let trainers = [
    { id: 1, name: "Alice",email: "alice@example.com",level: 5, region: "Kanto" },
    { id: 2, name: "Bob", email: "bob@example.com", level: 3, region: "Johto" },
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
app.delete("/trainers/:id", (req, res) => {
    const trainerIndex = trainers.findIndex(t => t.id === parseInt(req.params.id));
    if (trainerIndex === -1) {
        return res.status(404).json({ error: "Trainer not found" });
    }
    trainers.splice(trainerIndex, 1);
    res.status(200).json({ status: "Trainer deleted" });
})
app.post("/register-trainer", (req, res) => {
    const { name,email, level, region} = req.body;
    if (!name || !region || !email || !level) {
        return res.status(400).json({
            error: "All fields are required"
        });
    } else if (name.length <= 3) {
        return res.status(400).json({
            error: "Name must be more than 3 characters"
        });
    } else if (!email.includes("@")) {
        return res.status(400).json({
            error: "Email must be valid"
        });
    } else if (!Number.isInteger(level)) {
        return res.status(400).json({
            error: "Level must be a whole number"
        });
    } else if (level < 0 || level > 100) {
        return res.status(400).json({
            error: "Level must be between 1 and 100"
        });
    }
    trainers.push({ id: nextId++, name, region, email, level });
    res.status(201).json({ status: "Trainer registered", trainer: req.body });
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
