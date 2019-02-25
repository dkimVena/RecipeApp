const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull } = graphql;
const RecipeType = require('./recipe_type');
const DirectionType = require('./direction_type');
const UserType = require('./user_type');
const Direction = mongoose.model('direction');
const Recipe = mongoose.model('recipe');

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    recipes: {
      type: new GraphQLList(RecipeType),
      resolve() {
        return Recipe.find({});
      }
    },
    recipe: {
      type: RecipeType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return Recipe.findById(id);
      }
    },
    direction: {
      type: DirectionType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parnetValue, { id }) {
        return Direction.findById(id);
      }
    },
    user: {
      type: UserType,
      resolve(parentValue, args, req) {
        return req.user;
      }
    }
  })
});

module.exports = RootQuery;
