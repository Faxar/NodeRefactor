const mongoose = require('mongoose');

var IngredientSchema = new mongoose.Schema({
  id: {
    type: Number,
    require: true,
    unique: true
  },
  name: {
    type: String,
    require: true,
    unique: true
  }
});

var Ingredient = mongoose.model('Ingredient', IngredientSchema);

module.exports = { Ingredient };
