const { userModel } = require("../models");
const climaModel = require("../models/climaModel");

function getAll(req, res, next) {
  climaModel
    .find()
    .populate("owner")
    .then((climas) => res.json(climas))
    .catch(next);
}

function getClima(req, res, next) {
  const { modelId } = req.params;
  climaModel
    .findById(modelId)
    .populate({
      path: "owner",
    })
    .then((clima) => res.json(clima))
    .catch(next);
}

function createClima(req, res, next) {
  const {
    brand,
    model,
    coolingCapacity,
    heatingCapacity,
    energyEfficiencyRating,
    price,
    description,
    imageUrl,
  } = req.body;

  climaModel
    .create({
      brand,
      model,
      coolingCapacity,
      heatingCapacity,
      energyEfficiencyRating,
      price,
      description,
      imageUrl,
      owner: req.user._id,
    })
    .then((clima) => {
      return climaModel.populate(clima, { path: "owner" });
    })
    .then((populatedClima) => {
      return userModel
        .findByIdAndUpdate(req.user._id, {
          $push: { climates: populatedClima._id },
        })
        .then(() => res.status(201).json(populatedClima));
    })
    .catch(next);
}

function updateClima(req, res, next) {
  const { modelId } = req.params;

  const updateData = {
    brand: req.body.brand,
    model: req.body.model,
    coolingCapacity: req.body.coolingCapacity,
    heatingCapacity: req.body.heatingCapacity,
    energyEfficiencyRating: req.body.energyEfficiencyRating,
    price: req.body.price,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
  };
  console.log(updateData);

  climaModel
    .findByIdAndUpdate(modelId, updateData, { new: true })
    .then((updatedClima) => {
      if (!updatedClima) {
        return res
          .status(404)
          .json({ message: "Clima not found with id " + modelId });
      }
      res.json(updatedClima);
    })
    .catch(next);
}

function deleteClima(req, res, next) {
  const { modelId } = req.params;
  climaModel
    .findByIdAndDelete(modelId)
    .then((clima) => {
      if (!clima) {
        return res
          .status(404)
          .json({ message: "Clima not found with id " + modelId });
      }
      res.json({ message: "Clima deleted successfully" });
    })
    .catch(next);
}

module.exports = {
  getAll,
  getClima,
  createClima,
  updateClima,
  deleteClima,
};
