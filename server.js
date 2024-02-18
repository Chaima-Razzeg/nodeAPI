require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');

const productRoute = require('./routes/productRoute');
const errorMiddleware = require('./middleware/errorMiddleware');
const cors = require('cors')

const app = express();

const PORT = process.env.PORT || 3000
const MONGO_URL = process.env.MONGO_URL
const FRONTEND = process.env.FRONTEND 

var corsOptions = {
    origin: FRONTEND,
    optionsSuccessStztus : 200 
}

app.use(cors(corsOptions))
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//routes

app.use('/api/products', productRoute);

//app.use('/api/users', userRoute);


app.get('/', (req, res) => {
   res.send('Hello NODE API')
})

app.get('/blog', (req, res) => {
    res.send('Hello blog my name is chaima')
})

app.use(errorMiddleware);

mongoose.set("strictPopulate", false)
mongoose.connect(MONGO_URL)
.then(() =>{
    console.log('connectedto MongoDB')
    app.listen(PORT, ()=> {
        console.log('Node API app is running on port ${PORT} ')
    });   
}).catch((error) =>{
    console.log(error)
})
