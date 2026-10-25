const { trainers, getNextId } = require('../data/trainers');

function createError(status, message) {
    const error = new Error(message);
    error.status = status;
    return error;
}
function getAllTrainers() {
    return trainers;
}

function getTrainerById(id) {
    const trainer = trainers.find(t => t.id === parseInt(id));
    if (!trainer) {
        throw createError(404, 'Trainer not found');
    }
    return trainer;
}
function createTrainer({ name, email, level, region }) {
    if (!name || !region || !email || !level) {
        throw createError(400, "All fields are required");
    }
    if (name.length <= 3) {
        throw createError(400, "Name must be more than 3 characters");
    }
    if (!email.includes("@")) {
        throw createError(400, "Email must be valid");
    }
    if (!Number.isInteger(level)) {
        throw createError(400, "Level must be a whole number");
    }
    if (level < 0 || level > 100) {
        throw createError(400, "Level must be between 1 and 100");
    }

    const trainer = { id: getNextId(), name, email, level, region };
    trainers.push(trainer);
    return trainer;
}
function updateTrainer(id, { name, email, level, region }) {
    const trainer = getTrainerById(id); // kaster 404 hvis den ikke findes

    if (!name || !email || !level || !region) {
        throw createError(400, "All fields are required");
    }

    trainer.name = name;
    trainer.email = email;
    trainer.level = level;
    trainer.region = region;

    return trainer;
}

function deleteTrainer(id) {
    const index = trainers.findIndex(t => t.id === parseInt(id));
    if (index === -1) {
        throw createError(404, "Trainer not found");
    }
    trainers.splice(index, 1);
}

module.exports = {
    getAllTrainers,
    getTrainerById,
    createTrainer,
    updateTrainer,
    deleteTrainer,
};
