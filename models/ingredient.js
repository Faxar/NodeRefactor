const mongoose = require('mongoose');

var IngredientSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    unique: true
  }
});

var Ingredient = mongoose.model('Ingredient', IngredientSchema);

module.exports = { Ingredient };
