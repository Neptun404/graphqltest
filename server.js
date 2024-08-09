import express from 'express';
import { createHandler } from 'graphql-http/lib/use/express';
import { buildSchema } from 'graphql';
import gql from 'graphql-tag';

import utils from './util/graphql-util.js';

import fs from 'fs/promises';
import resolverUser from './resolvers/resolver.user.js';
import resolverItem from './resolvers/resolver.item.js';

// Read the graphql schema from file and convert it to string
const userSchemaData = (await fs.readFile('./DATA/schema.user.gql')).toString();
const itemSchemaData = (await fs.readFile('./DATA/schema.item.gql')).toString();

// Combine both schema into a single string and build
const mergedSchema = utils.mergeSchema(userSchemaData, itemSchemaData);
const builtSchema = buildSchema(mergedSchema);

const app = express();
app.all(
  '/graphql',
  createHandler({
    schema: builtSchema,
    rootValue: {
      ...resolverUser,
      ...resolverItem,
    },
  })
);

import { ruruHTML } from 'ruru/server';

// Serve the GraphiQL IDE.
app.get('/', (_req, res) => {
  res.type('html');
  res.end(ruruHTML({ endpoint: '/graphql' }));
});

app.listen(4000, () => {
  console.log('GraphQL Server started at port 4000');
});
