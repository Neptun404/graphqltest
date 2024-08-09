import { buildSchema, GraphQLObjectType } from 'graphql';

export default buildSchema(`
    type Query {
        user: String
    }
`);
