function mergeSchema(...schemas) {
  let schema = `
type Query {
    _empty: String
}

type Mutation {
    _empty: String
}

`;

  schemas.forEach((s) => (schema += `${s}\n`));
  return schema;
}

export default {
  mergeSchema,
};
