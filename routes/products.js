const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const { NotFoundError } = require('../errors/errors');

// In-memory storage (replace with database in production)
let products = [
  {
    id: '1',
    name: 'Laptop',
    description: 'High-performance laptop with 16GB RAM',
    price: 1200,
    category: 'electronics',
    inStock: true
  },
  {
    id: '2',
    name: 'Smartphone',
    description: 'Latest model with 128GB storage',
    price: 800,
    category: 'electronics',
    inStock: true
  }
];

// GET /api/products - List all products with filtering and pagination
router.get('/', (req, res) => {
  let filteredProducts = [...products];
  const { category, page = 1, limit = 10, search } = req.query;
  
  // Filter by category
  if (category) {
    filteredProducts = filteredProducts.filter(p => p.category === category);
  }
  
  // Search by name
  if (search) {
    filteredProducts = filteredProducts.filter(p => 
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }
  
  // Pagination
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
  
  res.json({
    products: paginatedProducts,
    total: filteredProducts.length,
    page: parseInt(page),
    totalPages: Math.ceil(filteredProducts.length / limit)
  });
});

// GET /api/products/stats - Get product statistics
router.get('/stats', (req, res) => {
  const stats = {
    totalProducts: products.length,
    categories: {},
    inStock: products.filter(p => p.inStock).length,
    outOfStock: products.filter(p => !p.inStock).length
  };
  
  products.forEach(product => {
    stats.categories[product.category] = (stats.categories[product.category] || 0) + 1;
  });
  
  res.json(stats);
});

// GET /api/products/:id - Get a specific product
router.get('/:id', (req, res, next) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) {
    return next(new NotFoundError('Product not found'));
  }
  res.json(product);
});

// POST /api/products - Create a new product
router.post('/', (req, res) => {
  const newProduct = {
    id: uuidv4(),
    ...req.body
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// PUT /api/products/:id - Update a product
router.put('/:id', (req, res, next) => {
  const productIndex = products.findIndex(p => p.id === req.params.id);
  if (productIndex === -1) {
    return next(new NotFoundError('Product not found'));
  }
  
  products[productIndex] = {
    ...products[productIndex],
    ...req.body,
    id: req.params.id
  };
  
  res.json(products[productIndex]);
});

// DELETE /api/products/:id - Delete a product
router.delete('/:id', (req, res, next) => {
  const productIndex = products.findIndex(p => p.id === req.params.id);
  if (productIndex === -1) {
    return next(new NotFoundError('Product not found'));
  }
  
  products = products.filter(p => p.id !== req.params.id);
  res.status(204).send();
});

module.exports = router; 