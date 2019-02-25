const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql;
const mongoose = require('mongoose');
const Recipe = mongoose.model('recipe');
const Direction = mongoose.model('direction');
const RecipeType = require('./recipe_type');
const DirectionType = require('./direction_type');
const UserType = require('./user_type');
const AuthService = require('../services/auth');

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addRecipe: {
      type: RecipeType,
      args: {
        title: { type: GraphQLString },
        description: { type: GraphQLString }
      },
      resolve(parentValue, { title, description }) {
        return new Recipe({ title, description }).save();
      }
    },
    addDirectionToRecipe: {
      type: RecipeType,
      args: {
        content: { type: GraphQLString },
        recipeId: { type: GraphQLID }
      },
      resolve(parentValue, { content, recipeId }) {
        return Recipe.addDirection(recipeId, content);
      }
    },
    likeRecipe: {
      type: RecipeType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, { id }) {
        return Recipe.like(id);
      }
    },
    deleteRecipe: {
      type: RecipeType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, { id }) {
        return Recipe.remove({ _id: id });
      }
    },
    signup: {
      type: UserType,
      args: {
        name: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(parentValue, { name, password }, req) {
        return AuthService.signup({ name, password, req });
      }
    },
    login: {
      type: UserType,
      args: {
        name: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(parentValue, { name, password }, req) {
        return AuthService.login({ name, password, req });
      }
    },
    logout: {
      type: UserType,
      resolve(parentValue, args, req) {
        const { user } = req;
        req.logout();
        return user;
      }
    }
  }
});

module.exports = mutation;
