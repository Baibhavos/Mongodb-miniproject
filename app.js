const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const Content = require('./content');

const app = express();

const dbURI = 'mongodb+srv://mongodbminiproject:stigeweek5@tasks.owm4z.mongodb.net/Tasks?retryWrites=true&w=majority'
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => console.log('Connected to DB'))
    .catch((err) => console.log(err));

app.set('view engine', 'ejs');
app.listen(3000);


app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

app.get('/', (req, res) => {
  res.redirect('/contents');
});

app.get('/contents', (req, res) => {
  Content.find().sort({ createdAt: -1 })
    .then(result => {
      res.render('index', { content: result, title: 'All contents' });
    })
    .catch(err => {
      console.log(err);
    });
});

//Create
app.post('/contents', (req, res) =>{
    //console.log(req.body);
    const content = new Content(req.body);

    content.save()
    .then((result) =>{
        res.redirect('/contents');
    })
    .catch(err =>{
        console.log(err);
    })
})

app.get('/contents/create', (req, res) => {
  res.render('create', { title: 'Create a new' });
});

//Delete
app.get('/contents', (req, res) =>{
    Content.findByIdAndDelete('625914d8dadebb62bfdec953')
    .then(result => {
        console.log('DELETED');
    })
    .catch(err => {
        console.log(err);
    });
});

//Update
const filter = { description: 'world' };
const update = { complete: true };
let doc = Content.findOneAndUpdate(filter, update, {
  returnOriginal: false
});
doc.description;
doc.complete;

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});