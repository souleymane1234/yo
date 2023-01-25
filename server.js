const express = require('express');
const app = express();
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const PORT = 5000;
const cors = require('cors')

require('./models/User')
// const requireToken = require('./middleware/requireToken')
const AuthRoutes = require('./routes/AuthRoutes')
app.use(
  cors({
    origin: "http://localhost:3000"
}));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
 
// Set EJS as templating engine
app.set("view engine", "ejs");
app.use(AuthRoutes)
app.use(cors());

const uri = "mongodb+srv://TicketAgenceImage:1234567890@cluster0.q2n00oo.mongodb.net/?retryWrites=true&w=majority";


// mongoose.connect(mogoUrl)
mongoose.connect(uri,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
)
// .then(values=>console.log('connected to mongo yeah', values)).catch((error=>console.log('this isss error', error)));

mongoose.connection.on('connected', () => {
    console.log('connected to mongo yeah')
})

mongoose.connection.on('error', (err) => {
    console.log('this id error', err)
})

app.post('/', (req,res) => {
    console.log(req.body)
    res.send('hello')
})

app.listen(PORT, () => {
     console.log("server running" + PORT)
})