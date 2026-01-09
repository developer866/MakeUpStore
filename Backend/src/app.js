import express from 'express';
// import { Product } from './model/products.model';
import productRoutes from './Routes/products.routes.js';

const app = express();
app.use(express.json());

// Define your routes here
app.get('/', (req, res) => {
    res.send('Welcome to the Makeup Store API');
});
app.use('/products', productRoutes)

export default app;