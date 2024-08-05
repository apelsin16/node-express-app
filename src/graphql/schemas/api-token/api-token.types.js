const ApiToken = `
  type Query {
    getTokens: [ApiToken] @isAuthorized(type: "ADMIN")
  }
  
  type Mutation {
    createToken(body: CreateTokenBody!): ApiToken @isAuthorized(type: "ADMIN")
    updateToken(id: String!, scopes: [ApiScope]!): ApiToken @isAuthorized(type: "ADMIN")
    removeToken(id: String!): String @isAuthorized(type: "ADMIN")
  }

  input CreateTokenBody {
    userId: String!
    userType: String!
    scopes: [ApiScope]!
  }
`;

export default ApiToken;