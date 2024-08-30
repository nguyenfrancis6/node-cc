const express = require("express");

// express app
const app = express();

//listen for requests, automatically infers localhost
app.listen(3000);

app.get("/", (req, res) => {
 // res.send("<p>home page</p>"); // express figures out header and status code for us
  res.sendFile('./views/index.html', { root: __dirname }); //express uses absolute path, can set root to current directory using __dirname
});

app.get("/about", (req, res) => {
 // res.send("<p>about page</p>");
 res.sendFile('./views/about.html', { root: __dirname });
});

// redirects
app.get('/about-us', (req, res) => {
  res.redirect('/about');
})

// 404 page, matter orders for app.use, if all the .get methods fail, .use will be used for every request after
// in this .use case, express doesnt know status code so we set ourselves
app.use((req, res) => {
  res.status(404).sendFile('./views/404.html', { root: __dirname });
})

