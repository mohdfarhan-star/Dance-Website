const express= require("express")
const path= require('path')
const app = express()
const port= 8000
const bodyparser= require("body-parser")
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true, useUnifiedTopology: true});

//Define mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
  });

const Contact = mongoose.model('Contact', contactSchema);


//EXPRESS SPECIFIC STUFF

app.use('/static', express.static('static'))
app.use(express.urlencoded())

//PUG SPECIFIC STUFF

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

//END POINTS

app.get('/', (req, res)=>{
    const con= "This is the best content on internet so far so use it wisely"
    const params= {'title': 'pubg is the best game', 'content': con}
    res.status(200).render('home.pug', params)
})

app.get('/contact', (req, res)=>{
    const con= "This is the best content on internet so far so use it wisely"
    const params= {'title': 'pubg is the best game', 'content': con}
    res.status(200).render('contact.pug', params)
})

app.post('/contact', (req, res)=>{
    const myData= new Contact(req.body)
    myData.save().then(()=>{
        res.send("This has been saved to the database")
    }).catch(()=>{
        res.status(404).send("Your data has not been saved to the database")
    })
    // res.status(200).render('contact.pug')
})

//START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`)
})