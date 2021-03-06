const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine', 'hbs');


app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method}, ${req.url}`;
  fs.appendFile('server.log', log+'\n', (err) => {
    if(err){
      console.log(err);
    }
  });
  next();
});

// app.use((req, res, next) => {
//   res.render("maintenance.hbs");
// });

app.use(express.static(__dirname+'/public'));

hbs.registerHelper('getCurrentYear', () => new Date().getFullYear())

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
})

app.get('/', (req, res) =>{
  res.render("home.hbs", {
    pageTitle: 'Home Page',
    currentYear: new Date().getFullYear(),
    wellcomeMessage: "Wellcome to this retarded website."
  });
});

app.get('/about', (req, res) => {
  res.render("about.hbs", {
    pageTitle: 'About Page',
  });
});

app.listen(3000, () => {
  console.log("The server is up and running on port 3000");
});