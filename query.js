// 2020, 8/02, pm 9:30
// GQLs Query

const {gql} = require('apollo-server-express');

const mongoose = require('mongoose');

const Query = {

    // backend app 有宣告 db = Mongo DB Client 確認地端找到主機位置後建立的資料庫實例
    // client = await MogoClient.connect(db_path, {useNewUrlParser: true})
    // const db = client.db()
    // const context = {db}

    // {db} 宣告方式請詳 app.js in GQL_api1
    getUser: async (parent, args, {db}) => 

        db.collection('users').estimateDocumentCount(),

        
    allUsers: async (parent, args, {db}) => 

        db.collection('users').find().toArray()   

}

module.exports = Query;