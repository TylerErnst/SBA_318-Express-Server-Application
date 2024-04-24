const express = require("express");
// const bodyParser = require("body-parser");

// These are now route imports, not database imports!
const users = require("./routes/users");
const posts = require("./routes/posts");
const comments = require("./routes/comments");

const error = require("./utilities/error");

const app = express();
const port = 3000;

// Parsing Middleware
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json({ extended: true }));
app.use(express.json());

// Logging Middlewaare
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



// Use our Routes
app.use("/api/users", users);
app.use("/api/posts", posts);
app.use("/comments", comments);

// app.get("/", (req, res) => {
//   res.send("Work in progress!");
// });

// Adding some HATEOAS links.
app.get("/", (req, res) => {
  res.json({
    links: [
      {
        href: "/api",
        rel: "api",
        type: "GET",
      },
    ],
  });
});

// Adding some HATEOAS links.
app.get("/api", (req, res) => {
  res.json({
    links: [
      {
        href: "api/users",
        rel: "users",
        type: "GET",
      },
      {
        href: "api/users",
        rel: "users",
        type: "POST",
      },
      {
        href: "api/posts",
        rel: "posts",
        type: "GET",
      },
      {
        href: "api/posts",
        rel: "posts",
        type: "POST",
      },
    ],
  });
});

// 404 Middleware
app.use((req, res) => {
  res.status(404);
  res.json({ error: "Resource Not Found" });
});

// Error-handling middleware.
// Any call to next() that includes an
// Error() will skip regular middleware and
// only be processed by error-handling middleware.
// This changes our error handling throughout the application,
// but allows us to change the processing of ALL errors
// at once in a single location, which is important for
// scalability and maintainability.
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ error: err.message });
});

app.listen(port, () => {
  console.log(`Server listening on port: ${port}.`);
});
