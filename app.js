require('dotenv').config()
const express = require("express");
const morgan = require('morgan')
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes')


// express app
const app = express();

const dbURI = process.env.DATABASE_CONNECTION;
mongoose.connect(dbURI)
  .then((result) => app.listen(3000)) // only start listening to requests once database is connected
  .catch((err) => console.log(err))

// register view engine, ejs templates are processed through the EJS view engine on the server
app.set('view engine', 'ejs');


// listen for requests, automatically infers localhost
// app.listen(3000)


// middleware & static files
app.use(express.static('public')); // now styles.css is able to be used in public folder
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// // mongoose and mongo sandbox routes
// app.get('/add-blog', (req, res) => {
//   const blog = new Blog({
//     title: 'new blog 2', 
//     snippet: 'about my new blog',
//     body: "More about my new blog"
//   })

//   blog.save()
//   .then((result) => {
//     res.send(result);
//   })
//   .catch((err) => {
//     console.log(err);
//   })
// })

// app.get('/all-blogs', (req, res) => {
//   Blog.find()
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((err) => {
//       console.log(err)
//     })
// })

// app.get('/single-blog', (req, res) => {
//   Blog.findById('66d694a73f9ac5a73da7f8a2')
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((err) => {
//       console.log(err)
//     })
// })

// next allows node to continue running the code after .use
app.use((req, res, next) => {
  console.log(req.hostname, req.path, req.method);
  next();
})

// app.use((req, res, next) => {
//   console.log('in the next middleware');
//   next();
// })

// routes

app.get("/", (req, res) => {
  res.redirect('/blogs')
  //   {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
  //   {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
  //   {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
  // ];
  // // res.send("<p>home page</p>"); // express figures out header and status code for us
  // // res.sendFile('./views/index.html', { root: __dirname }); //express uses absolute path, can set root to current directory using __dirname
  // res.render('index', { title: 'Home', blogs: blogs});
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

// blog routes
app.use('/blogs', blogRoutes); 
// express has built-in router, allow to split up routes in 
// separate files

// 404 page, matter orders for app.use, if all the .get methods fail, .use will be used for every request after
// in this .use case, express doesnt know status code so we set ourselves
app.use((req, res) => {
  // res.status(404).sendFile('./views/404.html', { root: __dirname });
  res.status(404).render('404', { title: '404'});
})

