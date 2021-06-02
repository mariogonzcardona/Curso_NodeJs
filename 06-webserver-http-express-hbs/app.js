const express = require('express');
const hbs=require('hbs');
require('dotenv').config();
const app = express();
const port=process.env.PORT;

// Handlebars
app.set('view engine','hbs');
hbs.registerPartials(__dirname+'/views/partials');

// Middleware
app.use(express.static('public'));


app.get('/', (req, res)=> {
    res.render('home',{
        nombre:'Mario Gonzalez',
        titulo:'Curso de Node'
    });
});

app.get('/generic', (req, res)=> {
    // res.sendFile(__dirname+'/public/generic.html');
    res.render('generic',{
        nombre:'Mario Gonzalez',
        titulo:'Curso de Node'
    });
});

app.get('/elements', (req, res)=> {
    // res.sendFile(__dirname+'/public/elements.html');
    res.render('elements',{
        nombre:'Mario Gonzalez',
        titulo:'Curso de Node'
    });
});

app.get('*', (req, res)=> {
    res.sendFile(__dirname+'/public/404.html');
});
 
app.listen(port,()=>{
    console.log(`Example app listening at http://localhost:${port}`);
});