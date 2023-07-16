import express from 'express';
import dotenv from'dotenv';
import cors from'cors';
import bodyParser from'body-parser';

 import Router from './routes/route.js';
import connection from './database/db.js';
dotenv.config();
const app=express();
app.use(cors());
app.use(bodyParser.json({extended:true}))
app.use(bodyParser.urlencoded({extended:true}));
app.use('/',Router);
const PORT= process.env.PORT||8000;
app.listen(PORT,()=>console.log(`hello server  is running successfully on PORt ${PORT}`));

const USERNAME=process.env.DB_USERNAME;
const PASSWORD=process.env.DB_PASSWORD;

connection(USERNAME,PASSWORD);