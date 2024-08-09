import {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      hello: {
        type: GraphQLString,
        resolve() {
          return 'Hello';
        },
      },

      world: {
        type: GraphQLString,
        resolve: () => {
          return 'World';
        },
      },
    },
  }),
});

console.log(schema);

const hello = await graphql({ schema, source: '{ hello }' });
const world = await graphql({ schema, source: '{ world }' });

console.log(hello.data.hello + ' ' + world.data.world);
