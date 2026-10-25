const trainerService = require("../services/trainerService");

function handleError(res, error) {
    const status = error.status || 500;
    res.status(status).json({ error: error.message });
}

function getAll(req, res) {
    res.status(200).json(trainerService.getAllTrainers());
}

function getById(req, res) {
    try {
        const trainer = trainerService.getTrainerById(req.params.id);
        res.status(200).json(trainer);
    } catch (error) {
        handleError(res, error);
    }
}

function create(req, res) {
    try {
        const trainer = trainerService.createTrainer(req.body);
        res.status(201).json({ status: "Trainer registered", trainer });
    } catch (error) {
        handleError(res, error);
    }
}

function update(req, res) {
    try {
        const trainer = trainerService.updateTrainer(req.params.id, req.body);
        res.status(200).json({ status: "Trainer updated", trainer });
    } catch (error) {
        handleError(res, error);
    }
}

function remove(req, res) {
    try {
        trainerService.deleteTrainer(req.params.id);
        res.status(200).json({ status: "Trainer deleted" });
    } catch (error) {
        handleError(res, error);
    }
}

module.exports = { getAll, getById, create, update, remove };