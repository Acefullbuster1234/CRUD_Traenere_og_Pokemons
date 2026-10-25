const trainers = [
    { id: 1, name: "Alice", email: "alice@example.com", level: 5, region: "Kanto" },
    { id: 2, name: "Bob", email: "bob@example.com", level: 3, region: "Johto" },
];

let nextId = 3;

function getNextId() {
    return nextId++;
}

module.exports = { trainers, getNextId };