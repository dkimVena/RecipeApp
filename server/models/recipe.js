const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
  title: { type: String },
  description: { type: String },
  likes: { type: Number, default: 0 },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  directions: [
    {
      type: Schema.Types.ObjectId,
      ref: 'direction'
    }
  ]
});

RecipeSchema.statics.addDirection = function(id, content) {
  const Direction = mongoose.model('direction');

  return this.findById(id).then(recipe => {
    const direction = new Direction({ content, recipe });
    recipe.directions.push(direction);
    return Promise.all([direction.save(), recipe.save()]).then(
      ([direction, recipe]) => recipe
    );
  });
};

RecipeSchema.statics.findDirections = function(id) {
  return this.findById(id)
    .populate('directions')
    .then(recipe => recipe.directions);
};

RecipeSchema.statics.like = function(id) {
  const Recipe = mongoose.model('recipe');

  return Recipe.findById(id).then(recipe => {
    ++recipe.likes;
    return recipe.save();
  });
};

mongoose.model('recipe', RecipeSchema);
