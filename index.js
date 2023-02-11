const express = require('express');
const cors = require('cors');
const jwt=require('jsonwebtoken');
const middleware=require('./middleware');
const app = express()

app.use(express.json())
app.use(cors())
const PORT = 7000
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}...`)
})

const mongoose = require('mongoose')

mongoose.set('strictQuery', true);
const DB = 'mongodb://0.0.0.0:27017/backened'
mongoose.connect(DB, {
    useNewUrlParser: true,
     useUnifiedTopology: true,
}).then(() =>{
    console.log('Database connected..')
})

app.use(express.json())
app.use(cors({origin:'*'}))


app.get("/", (req, res) => {
  return res.send("<h6>COORDINATOR DASHBOARD BACKENED</h6>"); 
});

app.get('/announcements', (req, res) => {
    res.send('This is the announcements page.');
  }); 

//referencenote post,get


const referencenoteSchema=require('./model/referencenote')

app.post('/add-referencenotetopic', async(req,res) => {
    const tech = new referencenoteSchema(req.body)
    try{
        await tech.save()
        res.status(201).json({
            status: 'Success',
            data : {
                tech
            }
        })
    }catch(err){
        res.status(500).json({
            status: 'Failed',
            message : err
        })
    }
})


app.get('/get-referencenotetopic', async (req,res) => {
    const tech = await referencenoteSchema.find({})
    try{
        res.status(200).json({
         
            data : {
                tech
            }
        })
    }catch(err){
        res.status(500).json({
            status: 'Failed',
            message : err
        })
    }
})

//user details
const userdata = require('./model/userdata')

app.post('/add-user', async(req,res) => {
    const userinfo = new userdata(req.body)
    try{
        await userinfo.save()
        res.status(201).json({
            status: 'Success',
            data : {
                userinfo
            }
        })
    }catch(err){
        res.status(500).json({
            status: 'Failed',
            message : err
        })
   }
})

app.get('/get-userdata', async (req,res) => {
    const userinfo = await userSchema.find({})
    try{
        res.status(200).json({
         
            data : {
                userinfo
            }
        })
    }catch(err){
        res.status(500).json({
            status: 'Failed',
            message : err
        })
    }
})
//add group post,get


const addgroupSchema=require('./model/addgroup')

app.post('/add-addgrouptopic', async(req,res) => {
    const group = new addgroupSchema(req.body)
    try{
        await group.save()
        res.status(201).json({
            status: 'Success',
            data : {
                group 
            }
        })
    }catch(err){
        res.status(500).json({
            status: 'Failed',
            message : err
        })
    }
})


app.get('/get-addgrouptopic', async (req,res) => {
    const group = await addgroupSchema.find({})
    try{
        res.status(200).json({
         
            data : {
                group
            }
        })
    }catch(err){
        res.status(500).json({
            status: 'Failed',
            message : err
        })
    }
})
//addschedule post,get


const addscheduleSchema=require('./model/addschedule')

app.post('/add-addscheduletopic', async(req,res) => {
    const schedule = new addscheduleSchema(req.body)
    try{
        await schedule.save()
        res.status(201).json({
            status: 'Success',
            data : {
                schedule 
            }
        })
    }catch(err){
        res.status(500).json({
            status: 'Failed',
            message : err
        })
    }
})


app.get('/get-addscheduletopic', async (req,res) => {
    const schedule = await addscheduleSchema.find({})
    try{
        res.status(200).json({
         
            data : {
                schedule
            }
        })
    }catch(err){
        res.status(500).json({
            status: 'Failed',
            message : err
        })
    }
})


//coordsignuplogin post,get

const coordsignupSchema=require('./model/coordsignup')
app.post('/register',async(req,res)=>{
    try{

        const {fullname,email,mobile,dateofbirth,password,confirmpassword}=req.body;
        const exist = await coordsignup.find({email,phone});
        if(exist){
            return res.status(400).send("user already Registered");
        }
        if(password!=confirmpassword){
            return res.status(403).send("Password Not Matched");
        }
        let newUser=new coordsignup({
            fullname,email,mobile,dateofbirth,password,confirmpassword
        })
        newUser.save();
        return res.status(200).send('User Registered Succesfully')

    }catch{
        console.log(err);
        return res.status(500).send("Server Error");
    }
})
app.post('/login',async(req,res)=>{
    try{
        const {email,password}=req.body;
        const exist= await coordsignup.findOne({email})
        if(!exist){
            return res.status(400).send("User not exist")
        }
        if(exist.password !=password){
            return res.status(400).send('Password Invalid' )
        }
        let payload={
            user:{
                id:exist.id
            }
        }
        jwt.sign(payload,'jwtPassword',{expiresIn:3600000000},
        (err,token)=>{
            if(err) throw err
            return res.json({token})
        })

    }
    catch(err){
        console.log(err);
        return res.status(500).send("Server Error")
    }
})
app.get('/allprofiles',middleware,async(req,res)=>{
    try{
        let allprofiles=await coordsignup.find();
        return res.json(allprofiles);
    }
    catch(err){
        console.log(err);
        return res.status(500).send('server error')
    }
})
app.get('/myprofile',middleware,async(req,res)=>{
    try{
        let user=await coordsignup.findById(req.user.id);
        return res.json(user)
    }
    catch(err){
        console.log(err);
        return res.status(500).send('server error')
    }
})

//Announcements
const newAnnouncement = require('./model/announcement');

//const newAnnouncement = new Announcement({
  //title: 'Important Announcement',
  //body: 'This is an important announcement!'
//});

//newAnnouncement.save((error) => {
  //if (error) {
    //console.log(error);
  //} else {
    //console.log('Announcement saved successfully!');
  //}
//});
app.post('/announcement', (req, res) => {
    const newannouncement = new announcement({
      title: req.body.title,
      body: req.body.body
    });
  
    newannouncementt.save((error) => {
      if (error) {
        res.status(400).send({ error: 'announcement creation failed' });
      } else {
        res.send({ message: 'announcement created successfully' });
      }
    });
  });
  app.get('/announcement', (req, res) => {
    announcement.find({}, (error, announcement) => {
      if (error) {
        res.status(400).send({ error: 'announcement retrieval failed' });
      } else {
        res.send(announcement);
      }
    });
  });