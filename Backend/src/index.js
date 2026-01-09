import express from 'express';
import dotenv from 'dotenv';
import app from './app.js';
// import cors from 'cors';

dotenv.config({path:'./.env'});

const startServer =()=>{
    try {
        app.listen(process.env.port, () => {
            console.log(`Server is running on port ${process.env.port}`);
        })
    }
    catch (error) {
        console.error('Error starting server:', error);
    }
}
startServer();
