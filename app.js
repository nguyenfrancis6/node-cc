const express = require("express");

// express app
const app = express();

// register view engine, ejs templates are processed through the EJS view engine on the server
app.set('view engine', 'ejs');


// listen for requests, automatically infers localhost
app.listen(3000);

app.get("/", (req, res) => {
  const blogs = [
    {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
  ];
 // res.send("<p>home page</p>"); // express figures out header and status code for us
  // res.sendFile('./views/index.html', { root: __dirname }); //express uses absolute path, can set root to current directory using __dirname
  res.render('index', { title: 'Home', blogs: blogs});
});

app.get("/about", (req, res) => {
 // res.send("<p>about page</p>");
//  res.sendFile('./views/about.html', { root: __dirname });
  res.render('about', { title: 'About'});
});

// // redirects
// app.get('/about-us', (req, res) => {
//   res.redirect('/about');
// })

app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create a new Blog'});
})

// 404 page, matter orders for app.use, if all the .get methods fail, .use will be used for every request after
// in this .use case, express doesnt know status code so we set ourselves
app.use((req, res) => {
  // res.status(404).sendFile('./views/404.html', { root: __dirname });
  res.status(404).render('404', { title: '404'});
})

