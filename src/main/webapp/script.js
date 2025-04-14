// Product Data
const products = {
    mobiles: [
        {
            id: 1,
            name: "iPhone 15 Pro",
            description: "Latest Apple iPhone with A17 Pro chip",
            price: 134900,
            image: "https://images.unsplash.com/photo-1695048132580-1a1f0b34b61d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
        },
        {
            id: 2,
            name: "Samsung Galaxy S23 Ultra",
            description: "Premium Android phone with S Pen",
            price: 124999,
            image: "https://images.unsplash.com/photo-1676046187538-68269e7b9a12?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
        },
        {
            id: 3,
            name: "OnePlus 11 5G",
            description: "Flagship killer with Hasselblad camera",
            price: 56999,
            image: "https://images.unsplash.com/photo-1676823093064-35a6a3d3f8f2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
        },
        {
            id: 4,
            name: "Google Pixel 7 Pro",
            description: "Best camera phone with pure Android",
            price: 66999,
            image: "https://images.unsplash.com/photo-1664478546384-d57ffe74a78f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
        }
    ],
    clothes: [
        {
            id: 5,
            name: "Men's Formal Shirt",
            description: "Premium cotton formal shirt",
            price: 1299,
            image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
        },
        {
            id: 6,
            name: "Women's Summer Dress",
            description: "Lightweight floral summer dress",
            price: 1799,
            image: "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
        },
        {
            id: 7,
            name: "Men's Jeans",
            description: "Slim fit stretchable jeans",
            price: 1999,
            image: "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
        },
        {
            id: 8,
            name: "Women's Kurti",
            description: "Cotton printed kurti with embroidery",
            price: 899,
            image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
        }
    ],
    laptops: [
        {
            id: 9,
            name: "MacBook Pro 14-inch",
            description: "Apple M2 Pro chip, 16GB RAM, 512GB SSD",
            price: 159900,
            image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
        },
        {
            id: 10,
            name: "Dell XPS 15",
            description: "Intel i7, 16GB RAM, 1TB SSD, 4K Display",
            price: 149990,
            image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
        },
        {
            id: 11,
            name: "HP Spectre x360",
            description: "2-in-1 laptop with OLED display",
            price: 124990,
            image: "https://images.unsplash.com/photo-1618410320929-5c1884a9362f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
        },
        {
            id: 12,
            name: "Asus ROG Zephyrus G14",
            description: "Gaming laptop with Ryzen 9 and RTX 3060",
            price: 129990,
            image: "https://images.unsplash.com/photo-1593642702909-dec73df255d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
        }
    ]
};

// Cart functionality
let cart = [];

// DOM Elements
const mobileProductsContainer = document.getElementById('mobile-products');
const clothesProductsContainer = document.getElementById('clothes-products');
const laptopProductsContainer = document.getElementById('laptop-products');
const cartCount = document.getElementById('cart-count');
const cartModal = document.getElementById('cart-modal');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');
const closeModal = document.querySelector('.close');

// Display products
function displayProducts() {
    // Display mobile products
    products.mobiles.forEach(product => {
        const productCard = createProductCard(product);
        mobileProductsContainer.appendChild(productCard);
    });

    // Display clothes products
    products.clothes.forEach(product => {
        const productCard = createProductCard(product);
        clothesProductsContainer.appendChild(productCard);
    });

    // Display laptop products
    products.laptops.forEach(product => {
        const productCard = createProductCard(product);
        laptopProductsContainer.appendChild(productCard);
    });
}

// Create product card HTML
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <div class="product-image">
            <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="product-info">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <span class="product-price">₹${product.price.toLocaleString('en-IN')}</span>
            <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
        </div>
    `;
    return card;
}

// Add to cart functionality
function addToCart(productId) {
    // Find the product in any category
    let product = null;
    
    for (const category in products) {
        const foundProduct = products[category].find(p => p.id === productId);
        if (foundProduct) {
            product = foundProduct;
            break;
        }
    }

    if (!product) return;

    // Check if product already in cart
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    updateCart();
}

// Remove from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

// Update cart UI
function updateCart() {
    // Update cart count
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;

    // Update cart modal
    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty</p>';
        cartTotal.textContent = '0';
    } else {
        let total = 0;
        
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>₹${item.price.toLocaleString('en-IN')} x ${item.quantity}</p>
                </div>
                <span class="cart-item-price">₹${itemTotal.toLocaleString('en-IN')}</span>
                <button class="remove-item" data-id="${item.id}"><i class="fas fa-trash"></i></button>
            `;
            cartItemsContainer.appendChild(cartItem);
        });

        cartTotal.textContent = total.toLocaleString('en-IN');
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    displayProducts();

    // Add to cart button click
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart')) {
            const productId = parseInt(e.target.getAttribute('data-id'));
            addToCart(productId);
        }

        // Remove item button click
        if (e.target.classList.contains('remove-item') || e.target.closest('.remove-item')) {
            const button = e.target.classList.contains('remove-item') ? e.target : e.target.closest('.remove-item');
            const productId = parseInt(button.getAttribute('data-id'));
            removeFromCart(productId);
        }

        // Cart icon click
        if (e.target.closest('#cart') || e.target.closest('#cart *')) {
            cartModal.style.display = 'block';
        }

        // Shop now button click
        if (e.target.classList.contains('shop-now')) {
            window.location.href = '#mobiles';
        }
    });

    // Close modal
    closeModal.addEventListener('click', () => {
        cartModal.style.display = 'none';
    });

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === cartModal) {
            cartModal.style.display = 'none';
        }
    });

    // Checkout button
    checkoutBtn.addEventListener('click', () => {
        alert('Thank you for your purchase!');
        cart = [];
        updateCart();
        cartModal.style.display = 'none';
    });
});
