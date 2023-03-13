import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import dotenv from 'dotenv'

import UserRoutes from './Routes/Users.js'
import questionRoutes from './Routes/Questions.js'
import answerRoutes from './Routes/Answers.js'
import postRoutes from './Routes/Post.js'
import friendRoutes from './Routes/friend.js'

const app = express();
dotenv.config();
app.use(express.json({limit: "30mb", extended: true}))
app.use(express.urlencoded({limit: "30mb", extended: true}))
app.use(cors());

app.use('/uploads', express.static('uploads'))

app.get('/',(req,res) => {
   res.send("This is stack overflow clone API")
});

app.use('/user', UserRoutes)
app.use('/questions', questionRoutes)
app.use('/answer', answerRoutes)
app.use('/Post', postRoutes)
app.use('/friend', friendRoutes)

const PORT = process.env.PORT || 5000

const DATABASE_URL = process.env.CONNECTION_URL

mongoose.connect(DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((resp) => console.log("resp ==", "success"))
    .catch((error) => console.log(error.message))

app.listen(PORT,() => {console.log(`server running on port ${PORT}`)})



