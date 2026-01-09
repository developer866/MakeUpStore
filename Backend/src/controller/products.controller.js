import {Product} from "../model/products.model.js";

// Create a new product
const createProduct = async (req, res) => {
    try{
        const {productName, productDescription, productPrice, productCategory, productAvailability} = req.body;
        const newProduct = new Product({
            productName,
            productDescription,
            productPrice,
            productCategory,
            productAvailability
        });
        if(!productName || !productDescription || !productPrice || !productCategory){
            return res.status(400).json({message: 'All required fields must be provided'});
        }
        const existingProduct = await Product.findOne({productName});
        if(existingProduct){
            return res.status(409).json({message: 'Product with this name already exists'});
        }
        const product = await Product.create(newProduct);
        res.status(201).json({message: 'Product created successfully', product});
    
    }catch (error) {
        res.status(500).json({message: 'Server Error', error: error.message});
    }
}
const getAllProducts = async (req, res) => {
    try{
        // const products = await Product.find();
        // res.status(200).json({products});
        res.status(200).json("getting all product")
    }catch (error) {
        res.status(500).json({message: 'Server Error', error: error.message});
    }
}
const updateProduct = async (req, res) => {
    try{
        const {id} = req.params;
        const updates = req.body;
        const updatedProduct = await Product.findByIdAndUpdate(id, updates, {new: true});
        if(!updatedProduct){
            return res.status(404).json({message: 'Product not found'});
        }
        res.status(200).json({message: 'Product updated successfully', updatedProduct});
    }catch (error) {
        res.status(500).json({message: 'Server Error', error: error.message});
    }
}
const deleteProduct = async (req, res) => {
    try{
        const {id} = req.params;
        const deletedProduct = await Product.findByIdAndDelete(id);
        if(!deletedProduct){
            return res.status(404).json({message: 'Product not found'});
        }
        res.status(200).json({message: 'Product deleted successfully'});
    }catch (error) {
        res.status(500).json({message: 'Server Error', error: error.message});
    }
}
export {createProduct, getAllProducts , updateProduct, deleteProduct};