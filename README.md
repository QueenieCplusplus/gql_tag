# gql_tag

mutation.js 

搭配 https://github.com/QueenieCplusplus/GQL_api1 (apollo-express app with gql tag)


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

https://github.com/QueenieCplusplus/Backend_Script/blob/master/-Nodejs/Upload-master/photo.js

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
    
    
 # Query Sampo Code 2
 
 https://github.com/QueenieCplusplus/Backend_Script/blob/master/Auth/Users.js
 
 
 1.App.js
 
    import React from 'react';
    import {gql} from 'apollo-boost';
    import {BrowserRouter} from 'react-router-dom';
    //import { userInfo } from 'os';
    import Users from './Users'


    export const ROOT_QUERY = gqlˋ
    
            query allUsers {

             }

            //fragement userInfo on User{

            //}
    ˋ
    const App = ()=>
        <BrowserRouter>
            <div>
                <Users />
            </div>
        </BrowserRouter>

    export default App;
 
 
 2. Uses.js
 
         import React from 'react';
         import {Query} from 'react-apollo';
         import {gql} from 'apollo-boost';
         import {ROOT_QUERY} from './App'

         const Users = () => {

           <Query query={ROOT_QUERY}>

               {result =>
                  <p> Users are loading now: {result.loading ? "yes": "no"}</p>
               }

           </Query>

         }
         
          // refetch to reload
         const Users = () =>
        <Query query={ROOT_QUERY}>
         {({data, loading, refetch}) => loading? 
            <p> loading users...</p>:
            <userList count={data.totalUsers}
                users={data.allUsers}
                refetchUsers={referch}
            />
         }
         </Query>
         
         
         const UserList = ({count, users}) => {
         <div>
          <p>{count} Users</p>

          <ul>
            {users.map( user =>
                <userListItem key={}
                    name={user.name}
                    avatar={user.avatar}
                />
            )}
          </ul>
         </div>
        }
        
        const UserListItem = ({name, avatar}) => {
        <li>
            <image/>
            {name}
        </li>
        }
        
        export default Users

# Mutation Syntax & Sampo Code

https://github.com/QueenieCplusplus/Backend_Script/blob/master/Auth/Users.js

    import React from 'react';
    import {Mutation} from 'react-apollo';
    import {gql} from 'apollo-boost';
    
    import {ROOT_QUERY} from './App'

 
      // refetch to reload
     const Users = () =>
    <Query query={ROOT_QUERY}>
    
     {({data, loading, refetch}) => loading? 
        <p> loading users...</p>:
        <userList count={data.totalUsers}
            users={data.allUsers}
            refetchUsers={referch}
        />
     }
     
     </Query>


    const ADD_USERS_MUTATION = gqlˋ
        mutation addUser($count:Int!){
            addUser(count:$count){
                githubLogin
                name
                avatar
            }
        }
    ˋ

    const UserList = ({count, users, refetchUsers}) => {
        <div>
            <p> {count} Users </p>

            <Mutation mutation={ADD_USERS_MUTATION} varibales={{count:1}}>

                { addUser => 
                    <button onClick={addUser}> Add Users</button>

                }

            </Mutation>

            <ul>
                {users.map(user=>
                    <UserListItem
                        key={user.githubLogin}
                        name={user.name}
                        avatar={user.avatar}
                    />
                )}
            </ul>
        </div>
    }
    
   
    const UserListItem = ({name, avatar}) => {
        <li>
            <image/>
            {name}
        </li>
        }

    export default Users

# Mutation Sampo Code 2

https://github.com/QueenieCplusplus/Backend_Script/blob/master/-Nodejs/Upload-master/postPhoto.js
