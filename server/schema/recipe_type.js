const mongoose = require('mongoose');
const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLList
} = graphql;
const DirectionType = require('./direction_type');
const Recipe = mongoose.model('recipe');

const RecipeType = new GraphQLObjectType({
  name: 'RecipeType',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    likes: { type: GraphQLInt },
    directions: {
      type: new GraphQLList(DirectionType),
      resolve(parentValue) {
        return Recipe.findDirections(parentValue.id);
      }
    }
  })
});

module.exports = RecipeType;
