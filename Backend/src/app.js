import express from 'express';
// import { Product } from './model/products.model';
import productRoutes from './Routes/products.routes.js';
import cors from 'cors';

const app = express();
app.use(cors());

app.use(express.json());

// Define your routes here
app.get('/', (req, res) => {
    res.send('Welcome to the Makeup Store API');
});
app.use('/', productRoutes)


export default app;