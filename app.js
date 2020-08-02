var createError = require('http-errors');
var express = require('express'); // app
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const { ApolloServer } = require('apollo-server-express'); // server
const morgan = require('morgan');
const mongoose = require('mongoose');
// matter with apollo's typeDefs, 需要額外建立
const GQLSchema = require('./gql/schema/index');
// matter with apollo's resolver, 需要額外建立
const GQLResolver = require('/gql/resolver/Resolver');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express(); // apps instance
const server = new ApolloServer({
  typeDefs: GQLSchema, 
  resolvers: GQLResolver,
  engine: true,
  context: async () => ({
   mongo: await connectMongo()
  }) // context 第二參數可加上 req 如 user: req.user

});

// 使用中介軟體將 server 安裝在 app 同一路徑上
// 引數為 app 輸出則為 server註冊者
server.applyMiddleware({app});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// morgan 
app.use(morgan('dev'));

// url path config
// process.env
let Mongo_PW = 'root';
let DATABASE_NAME = 'katesdb'
let url = 'mongodb://root'+ Mongo_PW + '@localhost:27017/' + DATABASE_NAME + '?authSource=admin';
console.log('DB name ' + DATABASE_NAME);

// mongoose
mongoose.connect(url, {
  useUnifiedTopology: true,
  useNewUrlParser: true
}).then(()=>{
  console.log('DB connect')
}).catch( err =>{
  console.log(err);
});

// 監聽器
app.listen({port: 4000},()=>

  console.log('GQL server running on, location is at http://localhost:4000$(server.graphqlPath)')

)

module.exports = app;
