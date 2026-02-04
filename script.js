// Replace this with your actual Render URL
const API_BASE_URL = 'https://ecommerce-6pzl.onrender.com';

// Product icon mapping
const productIcons = {
    'p1': '💻', // Laptop
    'p2': '🖱️',  // Mouse
    'p3': '⌨️',  // Keyboard
    'p4': '🖥️',  // Monitor
    'p5': '📷', // Webcam
    'p6': '🎧'  // Headphones
};

document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('product-list');
    const cartList = document.getElementById('cart-list');
    const cartTotal = document.getElementById('cart-total');
    const cartSubtotal = document.getElementById('cart-subtotal');
    const cartTax = document.getElementById('cart-tax');
    const checkoutBtn = document.getElementById('checkout-btn');
    const cartCount = document.getElementById('cart-count');
    const emptyCartMsg = document.getElementById('empty-cart-msg');

    async function fetchProducts() {
        try {
            // Updated to use the full Render URL
            const response = await fetch(`${API_BASE_URL}/api/products`);
            if (!response.ok) throw new Error('Network response was not ok');
            const products = await response.json();
            renderProducts(products);
        } catch (error) {
            console.error('Error fetching products:', error);
            productList.innerHTML = '<p class="error">Unable to load products. The server might be starting up...</p>';
        }
    }

    async function fetchCart() {
        try {
            // Updated to use the full Render URL
            const response = await fetch(`${API_BASE_URL}/api/cart`);
            if (!response.ok) throw new Error('Network response was not ok');
            const cartItems = await response.json();
            renderCart(cartItems);
            updateCartCount(cartItems);
        } catch (error) {
            console.error('Error fetching cart:', error);
        }
    }

    function renderProducts(products) {
        productList.innerHTML = '';
        products.forEach((product, index) => {
            const tile = document.createElement('div');
            tile.className = 'product-tile';
            tile.style.animationDelay = `${index * 0.1}s`;
            
            const icon = productIcons[product.id] || '📦';
            
            tile.innerHTML = `
                <div class="product-image">${icon}</div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <div class="product-price">$${product.price.toFixed(2)}</div>
                    <button data-id="${product.id}" class="add-to-cart-btn">
                        <i class="fas fa-plus"></i> Add to Cart
                    </button>
                </div>
            `;
            productList.appendChild(tile);
        });
    }

    function renderCart(cartItems) {
        cartList.innerHTML = '';
        
        if (cartItems.length === 0) {
            emptyCartMsg.style.display = 'block';
            checkoutBtn.disabled = true;
            cartTotal.textContent = '0.00';
            cartSubtotal.textContent = '0.00';
            cartTax.textContent = '0.00';
            return;
        }

        emptyCartMsg.style.display = 'none';
        checkoutBtn.disabled = false;

        let subtotal = 0;

        cartItems.forEach(item => {
            const itemTotal = item.price * item.quantity;
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <span class="cart-item-name">${item.name}</span>
                <span class="cart-item-qty">x${item.quantity}</span>
                <span class="cart-item-price">$${itemTotal.toFixed(2)}</span>
                <button class="cart-item-remove" data-id="${item.id}">
                    <i class="fas fa-trash"></i> Remove
                </button>
            `;
            cartList.appendChild(cartItem);
            subtotal += itemTotal;
        });

        const tax = subtotal * 0.1;
        const total = subtotal + tax;

        cartSubtotal.textContent = subtotal.toFixed(2);
        cartTax.textContent = tax.toFixed(2);
        cartTotal.textContent = total.toFixed(2);
    }

    function updateCartCount(cartItems) {
        const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }

    productList.addEventListener('click', async (e) => {
        const button = e.target.closest('.add-to-cart-btn');
        if (button) {
            const productId = button.dataset.id;
            button.disabled = true;
            button.innerHTML = '<i class="fas fa-check"></i> Added';
            
            try {
                // Updated to use the full Render URL
                await fetch(`${API_BASE_URL}/api/cart`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ productId })
                });
                
                setTimeout(() => {
                    fetchCart();
                    button.disabled = false;
                    button.innerHTML = '<i class="fas fa-plus"></i> Add to Cart';
                }, 500);
            } catch (error) {
                console.error('Error adding to cart:', error);
                button.disabled = false;
                button.innerHTML = '<i class="fas fa-plus"></i> Add to Cart';
            }
        }
    });

    cartList.addEventListener('click', async (e) => {
        const removeBtn = e.target.closest('.cart-item-remove');
        if (removeBtn) {
            const productId = removeBtn.dataset.id;
            removeBtn.disabled = true;
            
            try {
                // Updated to use the full Render URL
                await fetch(`${API_BASE_URL}/api/cart/${productId}`, {
                    method: 'DELETE'
                });
                fetchCart();
            } catch (error) {
                console.error('Error removing from cart:', error);
                removeBtn.disabled = false;
            }
        }
    });

    checkoutBtn.addEventListener('click', async () => {
        checkoutBtn.disabled = true;
        checkoutBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        
        try {
            // Updated to use the full Render URL
            await fetch(`${API_BASE_URL}/api/checkout`, { method: 'POST' });
            
            checkoutBtn.innerHTML = '<i class="fas fa-check-circle"></i> Order Placed!';
            checkoutBtn.style.background = '#4caf50';
            
            setTimeout(() => {
                fetchCart();
                checkoutBtn.disabled = false;
                checkoutBtn.innerHTML = '<i class="fas fa-credit-card"></i> Checkout';
                checkoutBtn.style.background = '';
                alert('🎉 Thank you for your purchase! Your order has been placed successfully.');
            }, 1500);
        } catch (error) {
            console.error('Error during checkout:', error);
            checkoutBtn.disabled = false;
            checkoutBtn.innerHTML = '<i class="fas fa-credit-card"></i> Checkout';
            alert('Error processing checkout. Please try again.');
        }
    });

    // Initial load
    fetchProducts();
    fetchCart();

    // Refresh cart every 10 seconds to keep in sync
    setInterval(fetchCart, 10000);
});
