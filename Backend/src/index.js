import express from 'express';
import dotenv from 'dotenv';
import app from './app.js';
import connectDB from './config/database.js';



dotenv.config({path:'./.env'});

const startServer = async ()=>{
    try {
        await connectDB(process.env.MONGODB_URI);
        app.listen(process.env.port, () => {
            console.log(`Server is running on port ${process.env.port}`);
        })
    }
    catch (error) {
        console.error('Error starting server:', error);
    }
}
startServer();
