const express = require("express");
const app = express();
const port = 3000;

const users = require("./routes/users");
const posts = require("./routes/posts");
const comments = require("./routes/comments");
const error = require("./utilities/error");

app.use("/users", users);
app.use("/posts", posts);
app.use("/comments", comments);

app.set("view engine", "ejs");

// Parsing Middleware
app.use(express.json());

// Logging Middleware
app.use((req, res, next) => {
  const time = new Date();

  console.log(
    `-----
${time.toLocaleTimeString()}: Received a ${req.method} request to ${req.url}.`
  );
  if (Object.keys(req.body).length > 0) {
    console.log("Containing the data:");
    console.log(`${JSON.stringify(req.body)}`);
  }
  next();
});


//index.ejs template
app.get("/about", (req, res) => {
  const user = { firstName: "Tyler", age: 29 };
  res.render("pages/about", { user: user });
  console.log(user);
});
// //about.ejs template
app.get("/", (req, res) => {
  const menu = [
    { title: "Home", href: "http://localhost:3000/" },
    { title: "Login", href: "http://localhost:3000/login" },
    { title: "About", href: "http://localhost:3000/about" },
  ];
  res.render("pages/index", { links: menu });
});




app.get("/login", (req, res) => {
  res.render("pages/login");
});

app.post("/login", (req, res) => {
  console.log('success');
});

app.get("/image", (req, res) => {
  res.render("./image", "dog.jpg");
});


// Error-handling middleware.
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ error: err.message });
});

// 404 Middleware
app.use((req, res) => {
  res.status(404);
  res.json({ error: "Resource Not Found" });
});

app.listen(port, () => {
  console.log(`Server listening on port: ${port}.`);
});
