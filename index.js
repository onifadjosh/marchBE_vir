const express = require("express")
const app = express()
app.set('view engine', 'ejs')
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const UserModel = require("./models/user.model")
dotenv.config()
app.use(express.urlencoded({extended:true}))//to help translate the body ejs is sending to node
app.use(express.json())
const UserRoute = require("./routes/user.routes")



mongoose.connect(process.env.MONGODB_URI)
.then(()=>{
    console.log("database connected successfully");
    
})
.catch((err)=>{
    console.log("error connecting to db", err);
})

app.use("/api/v1", UserRoute)










console.log("sade adu");


// app.get(path, callback)
let user = {
    firstname:"ogbono",
    lastname:"Eba",
    email:"ogbonseba@gmail.com",
    course:"software engineering"
}

let users = [
    {
        firstname:"ogbono",
        lastname:"Eba",
        email:"ogbonseba@gmail.com",
        course:"software engineering"
    },

    {
        firstname:"ogbono",
        lastname:"Eba",
        email:"ogbonseba@gmail.com",
        course:"software engineering"
    },

    {
        firstname:"ogbono",
        lastname:"Eba",
        email:"ogbonseba@gmail.com",
        course:"software engineering"
    }
]


let gender = 'female'

app.get("/", (req, res)=>{
    // res.send("This application is working fine")
    // res.send(10+20)
    // res.send(users)


    console.log(__dirname);

    
    // res.sendFile(__dirname+"/scroll2.png")
    res.sendFile(__dirname+"/index.html")
})


app.get("/home", (req, res)=>{
    res.redirect('/')
})

app.get("/temp", (req, res)=>{
    res.render("index")
})


app.get("/users", (req, res)=>{
    res.render("allUsers", {gender, users})
})

app.get("/addUser", (req, res)=>{
  res.render("addUser")  
})

app.post('/addUser', (req, res)=>{
    console.log(req.body)

    const {firstname, lastname, email, course}= req.body

    users.push(req.body)

    res.render('allUsers', {gender, users})
    
})

app.post('/deleteUser/:id', (req, res)=>{
    console.log(req.params);
    const {id}= req.params

    users.splice(id, 1)

    res.render('allUsers', {gender, users})
    
})

app.get("/editUser/:id", (req, res)=>{
    console.log(req.params);
    const {id}= req.params
    // res.send(id)

    res.render("editUser")
})

app.post("/editUser/:id", (req, res)=>{
    const {firstname, lastname, email, course}= req.body
    const {id}= req. params
    console.log(id);
    

    users.splice(id, 1, req.body)

    res.redirect("/users")
})

//CRUD














//create server
// app.listen(port, callback)


app.listen(process.env.PORT, (err)=>{
    if(err){
        console.log('cannot start server');
        
    }else{
        console.log("server started successfully");
        
    }
})





