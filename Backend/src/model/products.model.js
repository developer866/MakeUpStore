import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
  productName: {
    type: String,
    required: true,
    trim: true,
  },
  productDescription: {
    type: String,
    required: true,
  },
  productPrice: {
    type: Number,
    required: true,
  },
  productCategory: {
    type: String,
    required: true,
  },
  productAvailability: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Product = mongoose.model("Product", productSchema);