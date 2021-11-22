const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const mongoose = require("mongoose");
const urlform = 'mongodb://localhost/FormDB';
mongoose.connect(urlform, {useNewUrlParser:true})
const con1 = mongoose.connection
const formModel = require("./formmodel");
var PORT = 5000;

const app = express();
app.use(cors());


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.route("/login").post(async function (req, res) {
    const emailget = req.body.email;
    const email='abc@gmail.com';
    const pwdget=req.body.pwd;
    const pwd='abc';
    if(emailget.normalize() === email.normalize()) {
      if (pwdget.normalize() === pwd.normalize()) {
          res.send("Correct email");
      }
      } else res.send("Incorrect email/password");

  });
  app.listen(PORT, function(err){
    if (err) console.log(err);
    else console.log("Server listening on PORT", PORT);
  })
  
app.route("/form").post(async function (req, res) {
    try {
      const form = new formModel({
        title: req.body.title,
        content: req.body.content,
        description:req.body.description,
        author: req.body.author,
      });
      await form.save();
      console.log(req.body);
      console.log("Form added succesfully");
      res.send("Form added succesfully");
    } catch (error) {
        if (error.code === 11000) {console.log("Title taken") ;
        res.send('Title taken')}
        else console.log(error);
    }
});
app.route("/form").get(async function (req, res) {
    try {
        const forms = await formModel.find()
        res.json(forms)
    } catch (error) {
      console.log(error);
    }
});
app.route("/deleteform").delete(async function (req, res) {
    query={title:req.body.title}
    formModel.deleteOne(query,function(err,obj){
        if(err){res.send(err)}
        res.send('Deleted')
    })
});