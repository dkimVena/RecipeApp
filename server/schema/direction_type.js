const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLString } = graphql;
const Direction = mongoose.model('direction');

const DirectionType = new GraphQLObjectType({
  name: 'DirectionType',
  fields: () => ({
    id: { type: GraphQLID },
    content: { type: GraphQLString },
    recipe: {
      type: require('./recipe_type'),
      resolve(parentValue) {
        return Direction.findById(parentValue)
          .populate('recipe')
          .then(direction => {
            console.log(direction);
            return direction.recipe;
          });
      }
    }
  })
});

module.exports = DirectionType;
