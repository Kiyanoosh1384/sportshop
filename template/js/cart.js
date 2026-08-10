// ============================================
// CART.JS - SHOPPING CART FUNCTIONALITY
// ============================================

class ShoppingCart {
    constructor() {
        this.cart = JSON.parse(localStorage.getItem('cart') || '[]');
        this.init();
    }
    
    init() {
        this.updateCartDisplay();
        this.bindEvents();
    }
    
    addItem(product) {
        const existingItem = this.cart.find(item => item.id === product.id);
        if (existingItem) {
            existingItem.quantity += product.quantity || 1;
        } else {
            this.cart.push({
                ...product,
                quantity: product.quantity || 1
            });
        }
        this.saveCart();
        this.updateCartDisplay();
    }
    
    removeItem(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.saveCart();
        this.updateCartDisplay();
    }
    
    updateQuantity(productId, quantity) {
        const item = this.cart.find(item => item.id === productId);
        if (item) {
            item.quantity = Math.max(1, quantity);
            this.saveCart();
            this.updateCartDisplay();
        }
    }
    
    getTotal() {
        return this.cart.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);
    }
    
    getTotalItems() {
        return this.cart.reduce((total, item) => total + item.quantity, 0);
    }
    
    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.cart));
        this.updateCartCountDisplay();
    }
    
    updateCartCountDisplay() {
        const totalItems = this.getTotalItems();
        const cartCountElements = document.querySelectorAll('.cart-count');
        cartCountElements.forEach(el => {
            el.textContent = totalItems;
        });
    }
    
    updateCartDisplay() {
        const cartContainer = document.getElementById('cart-items-container');
        const cartTotal = document.getElementById('cart-total');
        
        if (cartContainer) {
            if (this.cart.length === 0) {
                cartContainer.innerHTML = `
                    <div class="empty-cart">
                        <i class="fas fa-shopping-bag fa-3x"></i>
                        <p>Your cart is empty</p>
                        <a href="shop.html" class="btn-primary">Continue Shopping</a>
                    </div>
                `;
                if (cartTotal) cartTotal.textContent = '$0';
                return;
            }
            
            let html = '<table class="cart-table"><thead><tr><th>Product</th><th>Price</th><th>Quantity</th><th>Total</th><th></th></tr></thead><tbody>';
            let total = 0;
            
            this.cart.forEach(item => {
                const itemTotal = item.price * item.quantity;
                total += itemTotal;
                html += `
                    <tr data-id="${item.id}">
                        <td>
                            <div class="cart-product-info">
                                <h4>${item.name}</h4>
                            </div>
                        </td>
                        <td>$${item.price.toFixed(2)}</td>
                        <td>
                            <input type="number" value="${item.quantity}" min="1" class="cart-quantity" data-id="${item.id}">
                        </td>
                        <td>$${itemTotal.toFixed(2)}</td>
                        <td><button class="remove-item" data-id="${item.id}"><i class="fas fa-trash"></i></button></td>
                    </tr>
                `;
            });
            
            html += '</tbody></table>';
            cartContainer.innerHTML = html;
            if (cartTotal) cartTotal.textContent = `$${total.toFixed(2)}`;
            
            // بایند ایونت‌ها برای آیتم‌های جدید
            document.querySelectorAll('.cart-quantity').forEach(input => {
                input.addEventListener('change', (e) => {
                    this.updateQuantity(e.target.dataset.id, parseInt(e.target.value));
                });
            });
            
            document.querySelectorAll('.remove-item').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    this.removeItem(e.currentTarget.dataset.id);
                });
            });
        }
        
        this.updateCartCountDisplay();
    }
    
    bindEvents() {
        this.updateCartCountDisplay();
    }
}

// مقداردهی اولیه سبد خرید
const cart = new ShoppingCart();
window.cart = cart; // برای دسترسی در کنسول