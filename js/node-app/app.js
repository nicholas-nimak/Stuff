const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')
const mongojs = require('mongojs')

const app = express()
const db = mongojs('customerapp', ['users'])

// body-parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

// Static Path
app.use(express.static(path.join(__dirname, 'public')))

// Locals
app.use((req, res, next) => {
  res.locals.errors = null;
  res.locals.first_name = null;
  res.locals.last_name = null;
  next()
})

// Express Validation
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
    var namespace = param.split('.')
    ,   root    = namespace.shift()
    ,   formParam = root;
    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

// View engine
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

// GET request
app.get('/', function(req, res) {
  res.render('index', {
    first_name: res.locals.first_name,
    last_name: res.locals.last_name
  })
})
app.get('/users', function(req, res) {
  db.users.find(function(err, docs) {
    if(err) {console.log(err)}
    res.render('users', {
      users: docs
    })
  })

})

// POST request
app.post('/add_user', (req, res) => {

  req.checkBody('first_name', 'User name should be specified').notEmpty();
  req.checkBody('last_name', 'User age should be specified').notEmpty();

  let errors = req.validationErrors()

  if(errors){
    res.render('index', {
      errors: errors,
      first_name: req.body.first_name,
      last_name: req.body.last_name
    })
  }else{
    let newUser = {
      first_name:req.body.first_name,
      last_name:req.body.last_name
    }
    db.users.insert(newUser)
    res.redirect('/users')
  }
})

// DELETE request
app.delete('/delete_user/:id', function(req, res) {
  db.users.remove({_id: mongojs.ObjectId(req.params.id)})
})

// Server initialisation
app.listen(3000, () => {
  console.log(`Server started on port 3000`)
})
