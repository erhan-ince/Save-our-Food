const express = require('express');
const mongoose = require('mongoose');
const Image = require('./models/images');
const formidable = require('formidable');
const app = express();
const dbUri =
     'mongodb+srv://erhan:test@safefood.bqpjc.mongodb.net/Waste?retryWrites=true&w=majority';

mongoose
     .connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
     .then((result) => {
          console.log('db connected');
          app.listen(3000, () => {
               console.log('listening at 3000');
          });
     })
     .catch((err) => console.log(err));

app.use(express.static('public'));
//view engine
app.set('view engine', 'ejs');

//Middleware

//Same as Body-parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//EndPoint or Route

app.get('/', (req, res) => {
     Image.find()
          .then((result) => {
               res.render('index', { images: result });
          })
          .catch((err) => console.log(err));
});

app.get('/form', (req, res) => {
     res.render('form');
});
app.get('/tipps', (req, res) => {
     res.render('tipps');
});

app.get('/tip', (req, res) => {
     Image.find()
          .then((result) => {
               res.render('tip', { images: result });
          })
          .catch((err) => console.log(err));
});

app.post('/waste', (req, res) => {
     console.log(req.body);
     const newImage = new Image({
          url: req.body.imageUrl,
          urlWaste: req.body.imgWaste,
          description: req.body.description,
          ort: req.body.ort,
          date: req.body.date,
          phone: req.body.phone,
          email: req.body.email,
          name: req.body.name,
     });
     console.log(newImage);

     newImage
          .save()
          .then((result) => {
               console.log('new image saved');
               res.redirect('/');
          })
          .catch((err) => console.log(err));
});
app.post('/tip', (req, res) => {
     console.log(req.body);
     const newImage = new Image({
          url: req.body.imageUrl,
          urlWaste: req.body.imgWaste,
          description: req.body.description,
          ort: req.body.ort,
          date: req.body.date,
          phone: req.body.phone,
          email: req.body.email,
          name: req.body.name,
     });
     console.log(newImage);

     newImage
          .save()
          .then((result) => {
               console.log('new image saved');
               res.redirect('/tip');
          })
          .catch((err) => console.log(err));
});

app.get('/single/:id', (req, res) => {
     console.log(req.params.id);

     Image.findById(req.params.id)
          .then((result) => {
               res.render('single', { images: result });
          })
          .catch((err) => console.log(err));
});

app.get('/single/:id/delete', (req, res) => {
     Image.findByIdAndDelete(req.params.id)
          .then((result) => {
               res.redirect('/');
          })
          .catch((err) => console.log(err));
});

app.post('/single/:id/edit', (req, res) => {
     const updatedImage = {
          name: req.body.name,
          email: req.body.email,
          phone: req.body.phone,
          url: req.body.url,
     };
     Image.findByIdAndUpdate(req.params.id, updatedContact)
          .then((result) => {
               res.redirect(`/single/${req.params.id}`);
          })
          .catch((err) => console.log(err));
});
