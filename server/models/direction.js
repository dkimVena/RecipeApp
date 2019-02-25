const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DirectionSchema = new Schema({
  recipe: {
    type: Schema.Types.ObjectId,
    ref: 'recipe'
  },
  content: { type: String }
});

mongoose.model('direction', DirectionSchema);
