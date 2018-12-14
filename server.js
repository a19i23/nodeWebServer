const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

////////////////////Middleware///////////////////////////
// log the request
app.use((request, response, next) => {
    var now = new Date().toString();
    var log = `${now}: ${request.method} ${request.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to log')
        }
    });
    next();
});

// maintenance page that is not going to prevent
// any other thing because doesn't have next()
// app.use((request, response) => {
//     response.render('maintenance.hbs');
// });

// sets a static directory
app.use(express.static(__dirname + '/public'));
////////////////////Middleware///////////////////////////


hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (request, response) => {
    // response.send('Hello Express!');
    response.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to my page',
    });
});

app.get('/About', (request, response) => {
    response.render('about.hbs', {
        pageTitle: 'About Page',
    });
});

app.get('/bad', (request, response) => {
    response.send({
        errorMessage: 'Error message'
    })
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});