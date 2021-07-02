var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const fs = require('fs');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const { fstat } = require('fs');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.get('/usersobjects',(req,res)=>{
  const file = fs.readFileSync('./users_Object.txt','utf-8')
  let newfile = file.split('\n')
   // = file.split('-')
  console.log(newfile)
  let arr = []
  newfile.forEach(item =>{let newarr = item.split('-')
      let obj = {
        id:newarr[0],
        firstname:newarr[1],
        lastname:newarr[2]}
        arr.push(obj)
      })
      //console.log(arr)
  res.json(arr)
})


app.post('/usersobjects',(req,res)=>{
  const file = fs.readFileSync('./users_Object.txt','utf-8')
  let newfile = file.split('\n')
   // = file.split('-')
  //console.log(newfile)
  let arr = []
  newfile.forEach(item =>{let newarr = item.split('-')
      let obj = {
        id:newarr[0],
        firstname:newarr[1],
        lastname:newarr[2]}
        arr.push(obj)
      })
      console.log(arr)
      for (let i = 0 ;i<arr.length;i++){
        let writestream = fs.createWriteStream('./users_Object.txt',{'flags':'a'})
        if(req.body.id === arr[i].id ){
          res.send('file already exists')
           }
         // writestream.write(writestream.write(req.body))
          console.log(req.body.id+"-"+req.body.firstname+"-"+req.body.lastname)
          writestream.write('\n')
          writestream.write(req.body.id +"-"+ req.body.firstname +"-"+ req.body.lastname)
          writestream.end()
          res.json(arr)
         }
 // res.end()
})
app.delete('/usersobjects/:id',(req,res)=>{
  const file = fs.readFileSync('./object.json')
  newjson = JSON.parse(file)
  console.log(newjson)
  console.log(req.params.id)
  let filterid = req.params.id
  arr2 = newjson.filter (item=>{return item.id !== filterid})
  //console.log(arr2)
  res.json(arr2)
})

app.put('/usersobjects/:id',(req,res)=>{
  const file = fs.readFileSync('./object.json')
  newjson = JSON.parse(file)
  newjson.forEach(item=>{
    if(req.params.id == item.id){
      item.firstname = "Amanuel"
    }
  })
  res.json(newjson)
})

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

app.listen(3000);
