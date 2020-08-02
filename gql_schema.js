// 2020, 8/02, pm 9:30
// GQL Schema

const {gql} = require('apollo-server-express');

const gql_schema = gql `

//--------------------------

//此型別呼叫非同步函數 getUser，並回傳數字型別資料。
type Query{
    getUser: Int!
    allUsers: [User]!
}
`