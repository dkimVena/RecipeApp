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
const UserType = require('./user_type');
const Recipe = mongoose.model('recipe');
const User = mongoose.model('user');

const RecipeType = new GraphQLObjectType({
  name: 'RecipeType',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    user: {
      type: UserType,
      resolve(parentValue) {
        return User.findById(parentValue.user);
      }
    },
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
