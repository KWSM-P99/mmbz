//SERVER
const express = require("express");
const app = express();
const port = 8080;
const db = require("./database/index.js");
const fs = require("fs").promises;
const path = require("path");
const bodyParser = require("body-parser");
// const { exec } = require("pkg");

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json());

app.post("/readlog", (req, res) => {
  console.log("reading log...");
  db.readLog()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.log(err));
});

app.use(express.static("build"));

app.get("/", (req, resp) => {
  // HANDLE THE REQUEST HERE
  resp.sendFile(
    "index.html",
    /*respHttpOptions,*/ (err) => {
      // SEND INDEX.HTML INSIDE PUBLIC DIRECTORY
      if (!err) console.log(sucL(`Served index.html`));
      else console.log(errL(`Failed to serve index.html ${err}`));
    }
  );
});

app.listen(port, () => {
  console.log(`MMBTracker listening at http://localhost:${port}`);
});

// await exec(["npm run start"]);
