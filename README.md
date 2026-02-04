# TechHub - Premium Tech Store

A modern, interactive e-commerce web application for browsing and purchasing premium tech products. Built with Node.js/Express backend and a beautiful, responsive frontend with smooth animations.

## 🚀 Features

- **Modern UI/UX**: Gradient backgrounds, smooth animations, and interactive components
- **Product Browsing**: View a curated selection of premium tech products with emoji icons
- **Shopping Cart**: Add/remove items with real-time cart updates
- **Tax Calculation**: Automatic 10% tax calculation on orders
- **Cart Counter**: Live badge showing number of items in cart
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Smooth Animations**: Scale, fade, and slide animations throughout the app
- **Real-time Updates**: Cart syncs every 5 seconds
- **Professional Checkout**: Animated checkout process with success feedback
- **Empty State Handling**: Displays helpful message when cart is empty

## 📋 Tech Stack

**Backend:**
- Node.js
- Express.js (web framework)

**Frontend:**
- HTML5
- CSS3 (with animations and gradients)
- Vanilla JavaScript (ES6+)
- Font Awesome Icons

## 🛠️ How to Run

### Prerequisites
- Node.js (v14 or higher)
- npm (Node Package Manager)

### Installation & Start

1. Navigate to the project directory:
```bash
cd d:\Ecommerce_java
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```

4. Open your browser and navigate to:
```
http://localhost:3000
```

## 📁 Project Structure

```
.
├── package.json              # Node.js project configuration
├── README.md                 # This file
├── server.js                 # Express server & API endpoints
└── public/
    ├── index.html           # Main HTML page with modern structure
    ├── style.css            # Modern styling with gradients & animations
    ├── script.js            # Interactive JavaScript functionality
```

### Key Files

- **server.js**: Express server with REST API endpoints
  - GET `/api/products` - Fetch all products
  - GET `/api/cart` - Fetch current cart
  - POST `/api/cart` - Add item to cart
  - DELETE `/api/cart/:productId` - Remove item from cart
  - POST `/api/checkout` - Process checkout

- **public/index.html**: Modern HTML structure with navbar, product grid, and cart sidebar

- **public/style.css**: Comprehensive styling featuring:
  - Gradient backgrounds (purple/blue theme)
  - Responsive grid layout
  - Smooth transitions and animations
  - Mobile-friendly media queries

- **public/script.js**: Interactive features including:
  - Product fetching and rendering
  - Cart management
  - Real-time updates
  - Error handling
  - User feedback animations

## 🛍️ Available Products

- Laptop - $1200.00
- Mouse - $25.00
- Keyboard - $75.00
- Monitor - $300.00
- Webcam - $50.00
- Headphones - $150.00

## 🎨 UI Highlights

- **Sticky Navigation**: Always accessible cart icon with item counter
- **Product Cards**: Hover animations with emoji product icons
- **Cart Sidebar**: Sticky position with tax calculation and order summary
- **Smooth Transitions**: All interactions have polished animations
- **Color Scheme**: Modern gradient theme (purple/blue)
- **Responsive Grid**: Auto-adjusting product grid based on screen size

## 📱 Browser Compatibility

- Chrome/Chromium (recommended)
- Firefox
- Safari
- Edge

## 🔧 Development

To modify the application:

1. Edit `public/index.html` for structure changes
2. Edit `public/style.css` for styling and animations
3. Edit `public/script.js` for functionality changes
4. Edit `server.js` to modify API endpoints or add features

The server automatically serves static files from the `public/` directory.

## 📝 Notes

- Products and cart are stored in server memory (resets on server restart)
- The application includes in-memory data storage for demonstration
- Add `.gitignore` if version control is needed
- For production, consider adding a database instead of in-memory storage

## 🚀 Future Enhancements

- User authentication and profiles
- Database integration (MongoDB/PostgreSQL)
- Payment processing integration
- Order history
- Product search and filtering
- Product reviews and ratings
- Admin dashboard
- Email notifications

