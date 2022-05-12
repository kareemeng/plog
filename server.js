const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');
const dotenv = require('dotenv');
dotenv.config();
//express app
const app = express();

const dbURI = process.env.DB_connection;

mongoose.connect(dbURI).then((result) => { console.log('connected to DB') }).catch((err) => { console.log(err) });

const server = app.listen(3000);


//regester new view engine
app.set('view engine', 'ejs');

//middleware and static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));



app.get('/', (req, res) => {
    res.redirect('/blogs');
});
app.get('/about', (req, res) => {
    //res.sendFile('./views/about.html', { root: __dirname });
    res.render('about', { title: 'About' });
});


//plogs routes
app.use('/blogs', blogRoutes)

//404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' })
});