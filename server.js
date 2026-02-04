const express = require('express');
const app = express();
const port = 3000;

// In-memory data
const products = [
    { id: 'p1', name: 'Laptop', price: 1200.00 },
    { id: 'p2', name: 'Mouse', price: 25.00 },
    { id: 'p3', name: 'Keyboard', price: 75.00 },
    { id: 'p4', name: 'Monitor', price: 300.00 },
    { id: 'p5', name: 'Webcam', price: 50.00 },
    { id: 'p6', name: 'Headphones', price: 150.00 },
];

let cart = {}; // { productId: quantity }

// Middleware
app.use(express.static('public'));
app.use(express.json());

// API Routes
app.get('/api/products', (req, res) => {
    res.json(products);
});

app.get('/api/cart', (req, res) => {
    const cartItems = Object.keys(cart).map(productId => {
        const product = products.find(p => p.id === productId);
        return { ...product, quantity: cart[productId] };
    });
    res.json(cartItems);
});

app.post('/api/cart', (req, res) => {
    const { productId } = req.body;
    if (!productId) {
        return res.status(400).send('Product ID is required.');
    }
    cart[productId] = (cart[productId] || 0) + 1;
    res.status(200).send('Product added to cart.');
});

app.delete('/api/cart/:productId', (req, res) => {
    const { productId } = req.params;
    if (cart[productId]) {
        cart[productId]--;
        if (cart[productId] <= 0) {
            delete cart[productId];
        }
    }
    res.status(200).send('Product removed from cart.');
});

app.post('/api/checkout', (req, res) => {
    cart = {};
    res.status(200).send('Checkout successful.');
});

// Start server
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
