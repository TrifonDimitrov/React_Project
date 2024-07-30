const { log } = require("console");
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
      // След като получите резултата, извикайте .populate() за да популирате връзките
      return climaModel.populate(clima, { path: "climates" });
    })
    .then((populatedClima) => {
      res.status(201).json(populatedClima);
    })
    .catch(next);
}

function updateClima(req, res, next) {
  const { modelId } = req.params; // Идентификаторът на климатика за актуализация
  // Обектът с данните за актуализация
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

  climaModel.findByIdAndUpdate(
    modelId, 
    updateData, 
    { new: true } // Опции - връщане на актуализирания документ
  )
  .then(updatedClima => {
    if (!updatedClima) {
      return res.status(404).json({ message: 'Clima not found with id ' + modelId });
    }
    res.json(updatedClima);
  })
  .catch(next); // Подаване на грешките към обработчика на грешки, ако такива възникнат
}

function deleteClima(req, res, next) {
  const { modelId } = req.params; // Идентификаторът на климатика за изтриване
  climaModel
    .findByIdAndDelete(modelId) // Изтриване на климатика по идентификатор
    .then((clima) => {
      if (!clima) {
        return res.status(404).json({ message: 'Clima not found with id ' + modelId });
      }
      console.log(modelId);
      res.json({ message: 'Clima deleted successfully' });
    })
    .catch(next); // Подаване на грешките към обработчика на грешки, ако такива възникнат
}

module.exports = {
  getAll,
  getClima,
  createClima,
  updateClima,
  deleteClima,
};
