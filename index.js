const express=require('express');
const path=require('path');
const app=express();
const port=80;

app.use(express.urlencoded())

var env = require('dotenv').config({ path: 'D:\\webD\\nodeLearning\\danceWebSite\\.gitignore\\.env' })
//EXPRESS SPECEFIC STUFF
app.use('/static', express.static(path.join(__dirname, 'static')));


//PUG SPECEFIC STUFF
app.set('view engine','pug');
app.set('views',path.join(__dirname,'views'));

//START THE SERVER
app.listen(port,()=>{
    console.log(`The Application is running on port : ${port}`);
});

//ENDPOINTS
app.get('/',(req,res)=>{
    res.status(200).render('index.pug');
});

//MONGODB setup

const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/danceWebsite');
}

const memberSchema = new mongoose.Schema({
    name: String,
    danceForm: String,
    mobile: String,
    mail: String,
    description: String
});

const Member = mongoose.model('Member', memberSchema);

const bodyparser=require('body-parser');


var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'theksg2k@gmail.com',
    pass:String(process.env.PWRD)
  }
});

app.post('/submit',(req,res)=>{
    let member_mail_id=req.body.mail;
    var mailOptions = {
        from: 'theksg2k@gmail.com',
        to: member_mail_id,
        subject: 'One Dance Academy Registration',
        text: 'Thanks for registering with One Dance Academy!!!\nSoon our associate will come in contact with you'
      };
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
    let cur_member_data=new Member(req.body);
    console.log(cur_member_data);
    cur_member_data.save().then(()=> res.send("Data Saved")).catch(()=> res.status(400).send("Problem in Saving Data"));
    res.status(200).render('index.pug');
});

