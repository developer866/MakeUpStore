const express = require("express");
const app = express();

// Middleware to parse JSON data
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
  res.send("Welcome to my Node.js API with Express!");
});

// Sample API Route - GET
app.get("/api/users", (req, res) => {
  res.json([
    { id: 1, name: "Ayeni" },
    { id: 2, name: "Opeyemi" }
  ]);
});

// Sample API Route - POST
app.post("/api/users", (req, res) => {
  const newUser = req.body;
  res.json({
    message: "User added successfully!",
    user: newUser
  });
});

app.get('/products',(req,res)=>{
    res.json([
    {
      id: 1,
      name: 'Luxury Foundation Set',
      category: 'makeup',
      price: 15000,
      priceDisplay: '₦15,000',
      originalPrice: '₦18,000',
      image: 'Images/products/foundation_set.jpeg',
      rating: 5,
      inStock: true,
      badge: 'Best Seller'
    },
    {
      id: 2,
      name: 'Professional Makeup Brush Set',
      category: 'tools',
      price: 12000,
      priceDisplay: '₦12,000',
      originalPrice: null,
      image: 'Images/products/Brush_set.jpeg',
      rating: 5,
      inStock: true,
      badge: null
    },
    {
      id: 3,
      name: 'Hydrating Face Serum',
      category: 'skincare',
      price: 8500,
      priceDisplay: '₦8,500',
      originalPrice: '₦10,000',
      image: 'Images/products/face_secrum.jpeg',
      rating: 5,
      inStock: true,
      badge: 'Sale'
    },
    {
      id: 4,
      name: 'Matte Lipstick Collection',
      category: 'makeup',
      price: 6000,
      priceDisplay: '₦6,000',
      originalPrice: null,
      image: 'Images/products/lipstick.jpeg',
      rating: 4,
      inStock: true,
      badge: 'New'
    },
    {
      id: 5,
      name: 'Vitamin C Face Cream',
      category: 'skincare',
      price: 9500,
      priceDisplay: '₦9,500',
      originalPrice: null,
      image: 'Images/products/face_cream.jpeg',
      rating: 5,
      inStock: true,
      badge: null
    },
    {
      id: 6,
      name: 'Eye Shadow Palette',
      category: 'makeup',
      price: 11000,
      priceDisplay: '₦11,000',
      originalPrice: '₦13,500',
      image: 'Images/products/eye_shadow.jpeg',
      rating: 5,
      inStock: true,
      badge: 'Sale'
    },
    {
      id: 7,
      name: 'Hair Growth Oil',
      category: 'haircare',
      price: 7000,
      priceDisplay: '₦7,000',
      originalPrice: null,
      image: 'Images/products/hair_growth_oil.jpeg',
      rating: 5,
      inStock: true,
      badge: 'Best Seller'
    },
    {
      id: 8,
      name: 'Nail Polish Set (12 Colors)',
      category: 'nails',
      price: 10000,
      priceDisplay: '₦10,000',
      originalPrice: null,
      image: 'Images/products/nail_polish.jpeg',
      rating: 4,
      inStock: true,
      badge: null
    },
    {
      id: 9,
      name: 'Cleansing Face Wash',
      category: 'skincare',
      price: 5500,
      priceDisplay: '₦5,500',
      originalPrice: null,
      image: 'Images/products/fash_wash.png',
      rating: 5,
      inStock: true,
      badge: null
    },
    {
      id: 10,
      name: 'Contouring Kit Pro',
      category: 'makeup',
      price: 14000,
      priceDisplay: '₦14,000',
      originalPrice: '₦16,000',
      image: 'Images/products/Contouring_kit.jpeg',
      rating: 5,
      inStock: false,
      badge: 'Out of Stock'
    },
    {
      id: 11,
      name: 'Beauty Blender Set',
      category: 'tools',
      price: 4500,
      priceDisplay: '₦4,500',
      originalPrice: null,
      image: 'Images/products/Blender.jpeg',
      rating: 5,
      inStock: true,
      badge: null
    },
    {
      id: 12,
      name: 'Hair Treatment Mask',
      category: 'haircare',
      price: 8000,
      priceDisplay: '₦8,000',
      originalPrice: null,
      image: 'Images/products/hair_treatment.jpeg',
      rating: 4,
      inStock: true,
      badge: 'New'
    }
  ])
})


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
