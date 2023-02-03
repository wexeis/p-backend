import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import aboutRoutes from "./routes/about.js";
import skillsRoutes from './routes/skills.js';
import projectsRoutes from './routes/projects.js';
import certificatesRoutes from './routes/certificates.js'
const app = express()

const PORT =  5000

app.use(bodyParser.json({extended: true}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

const CONNECTION_URL = "mongodb+srv://mhd:1234@cluster0.52mbhlz.mongodb.net/?retryWrites=true&w=majority"
mongoose.set('strictQuery', true);
mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true } ).then(()=>{
    app.listen(PORT, () =>{
        console.log(`Running on port: ${PORT}`)
    })
}).catch((error) => console.log(error.message));

app.use('/about', aboutRoutes)

app.use('/skills', skillsRoutes)

app.use('/projects', projectsRoutes)
app.use('/certificates', certificatesRoutes)