# gql_tag

mutation.js 

搭配 https://github.com/QueenieCplusplus/GQL_api1 (apollo-express app with gql tag)

example code:

https://github.com/QueenieCplusplus/Backend_Script/blob/master/Security/dataLimit.js

# Query Syntax

    import {Query} from 'react-apollo';

    const {createServer} = require('http')
    var express = require('express');

    const app = express();
    const httpServer = createServer(app);

    // 倘若有終端使用者請求的資料量非常的大，如下
    /*Query allData {
        allData(first=9999){
            name
            url
            postedBy{
                name
                avatar
            }
        }
    }*/

    // 設定資料處理上限如下
    allData: (root, data, context) {
        if (data.first > 100){
            throw new Error('<alert Message here>')
        }
    }
    
    // 預設的正常使用量
    Query allData {
        allData(first=15){
            name
            url
            postedBy{
                name
                avatar
            }
        }
    }

# Query Sampo Code

    import React from 'react'
    import {Query} from 'react-apollo'

    const photo = () => 
    <Query query = {ALL_PHOTOS_QUERY}> 
        {() => loadings? <p></p> : data.allPhotos.map(
                photo => <image
                    key={photo.id}
                    src={photo.url}
                    alt={photo.name}
                    width={350}
                />
        )}
    </Query>

    export default photo;

# Mutation Syntax
