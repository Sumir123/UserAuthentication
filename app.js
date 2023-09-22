const express = require("express");
const app = express();
const port = 4000;
const User = require("./usersSchema");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/" + "login.html");
});

app.get("/signup", (req, res) => {
  res.sendFile(__dirname + "/" + "signup.html");
});

app.post("/signup", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const isValid = Validator(email, password);

  if (isValid) {
    await User.insertMany({ email, password })
      .then(() => {
        res.sendFile(__dirname + "/" + "login.html");
        // const response = {
        //   message: "Signup Successfull",
        // };
        // res.status(200).send(response);
      })
      .catch(console.log("User insert failed"));
  } else {
    const response = {
      error: "Invalid Email or password",
    };
    res.status(400).end(JSON.stringify(response));
  }
});

app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/" + "login.html");
});
app.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const logedUser = await User.findOne({ email: email });

  if (password === logedUser?.password) {
    res.sendFile(__dirname + "/" + "index.html");
    // const response = {
    //   message: "Login Successfull",
    // };
    // res.status(200).send(response);
  } else {
    const response = {
      error: "Invalid Credentials",
    };
    res.end(JSON.stringify(response));
  }
});

app.listen(port, () => {
  console.log(`App is listenting on port ${port}`);
});

function Validator(email, password) {
  const emailRegx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const passwordRegx = /^(?=.*[A-Z])(?=.*\d).+/;

  const isValidEmail = emailRegx.test(email);
  const isValidPassword = passwordRegx.test(password);

  if (email == "" || password == "") {
    return false;
  } else if (!isValidEmail) {
    return false;
  } else if (!isValidPassword) {
    return false;
  } else {
    return true;
  }
}
