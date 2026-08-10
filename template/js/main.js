// ============================================
// MAIN.JS - CORE JAVASCRIPT FUNCTIONALITY
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== سایدبار =====
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    const openSidebar = document.getElementById('openSidebar');
    const closeSidebar = document.getElementById('closeSidebar');
    
    if (openSidebar && sidebar && overlay) {
        openSidebar.addEventListener('click', () => {
            sidebar.classList.add('active');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        
        const closeSidebarFunc = () => {
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        };
        
        if (closeSidebar) closeSidebar.addEventListener('click', closeSidebarFunc);
        overlay.addEventListener('click', closeSidebarFunc);
    }
    
    // ===== لیست کامل ورزش‌ها برای جستجو =====
    const allSportsList = [
        "Football", "Basketball", "Tennis", "Volleyball", "Table Tennis", "Badminton", "Baseball", "American Football",
        "Field Hockey", "Lacrosse", "Handball", "Billiards", "Bowling", "Golf", "Disc Golf", "Padel", "Squash",
        "Racquetball", "Karate", "Boxing", "Taekwondo", "Wrestling", "Judo", "Jiu-Jitsu", "Fencing", "Kung Fu",
        "Muay Thai", "Swimming", "Water Polo", "Surfing", "Bodyboarding", "Kayaking", "Rowing", "Scuba Diving",
        "Synchronized Swimming", "Jet Ski", "Fishing", "Snorkeling", "Running", "Cycling", "Mountain Biking",
        "Yoga", "Gym & Fitness", "Gymnastics", "Pilates", "Weightlifting", "Calisthenics", "CrossFit", "Hiking",
        "Rock Climbing", "Camping", "Skiing", "Snowboarding", "Ice Skating", "Ice Hockey", "Curling", "Sledding",
        "Cricket", "Rugby", "Softball", "Beach Volleyball", "Motocross", "Motorsport", "Paragliding", "Skydiving",
        "Archery", "Darts", "Chess", "Board Games", "Esports", "Wheelchair Sports", "Kite Flying", "Juggling",
        "Skateboarding", "Roller Skating", "Scooter", "Track & Field"
    ];
    
    // ===== سرچ مودال با جستجوی قوی =====
    const searchBtn = document.getElementById('searchBtn');
    const searchModal = document.getElementById('searchModal');
    const closeSearch = document.getElementById('closeSearch');
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    
    if (searchBtn && searchModal) {
        searchBtn.addEventListener('click', () => {
            searchModal.classList.add('active');
            document.body.style.overflow = 'hidden';
            if (searchInput) {
                searchInput.focus();
                searchInput.value = '';
                searchResults.innerHTML = '';
            }
        });
        
        const closeSearchFunc = () => {
            searchModal.classList.remove('active');
            document.body.style.overflow = '';
            if (searchResults) searchResults.innerHTML = '';
        };
        
        if (closeSearch) closeSearch.addEventListener('click', closeSearchFunc);
        searchModal.addEventListener('click', (e) => {
            if (e.target === searchModal) closeSearchFunc();
        });
        
        // جستجوی زنده
        if (searchInput && searchResults) {
            searchInput.addEventListener('input', function(e) {
                const query = e.target.value.toLowerCase().trim();
                
                if (query.length === 0) {
                    searchResults.innerHTML = '';
                    return;
                }
                
                // فیلتر کردن ورزش‌ها بر اساس query
                const filtered = allSportsList.filter(sport => 
                    sport.toLowerCase().includes(query)
                );
                
                if (filtered.length === 0) {
                    searchResults.innerHTML = `
                        <div style="text-align: center; padding: 40px; color: var(--text-gray);">
                            <i class="fas fa-search" style="font-size: 2rem; margin-bottom: 10px; opacity: 0.5;"></i>
                            <p>No sports found for "<strong>${query}</strong>"</p>
                            <small>Try searching with different keywords</small>
                        </div>
                    `;
                    return;
                }
                
                // نمایش نتایج با قابلیت اسکرول
                searchResults.innerHTML = `
                    <div style="padding: 10px 0; border-bottom: 1px solid rgba(100,255,218,0.1); position: sticky; top: 0; background: var(--primary-light); z-index: 5;">
                        <small style="color: var(--secondary);">Found ${filtered.length} result(s)</small>
                    </div>
                    <div style="max-height: 300px; overflow-y: auto;">
                        ${filtered.map(sport => {
                            const regex = new RegExp(`(${query})`, 'gi');
                            const highlightedName = sport.replace(regex, '<mark style="background: var(--secondary); color: var(--primary-dark); padding: 0 4px; border-radius: 4px;">$1</mark>');
                            const slug = sport.toLowerCase().replace(/[^a-z]/g, '-');
                            return `
                                <a href="sport-products.html?sport=${slug}" class="search-result-item" style="display: block; padding: 12px 15px; color: var(--text-light); text-decoration: none; transition: all 0.3s ease; border-bottom: 1px solid rgba(100,255,218,0.05);">
                                    <i class="fas fa-search" style="margin-right: 12px; color: var(--secondary); width: 16px;"></i>
                                    <span>${highlightedName}</span>
                                    <i class="fas fa-arrow-right" style="float: right; opacity: 0.5;"></i>
                                </a>
                            `;
                        }).join('')}
                    </div>
                `;
                
                // اضافه کردن استایل هاور به نتایج
                document.querySelectorAll('.search-result-item').forEach(item => {
                    item.addEventListener('mouseenter', () => {
                        item.style.backgroundColor = 'rgba(100, 255, 218, 0.1)';
                    });
                    item.addEventListener('mouseleave', () => {
                        item.style.backgroundColor = 'transparent';
                    });
                    item.addEventListener('click', closeSearchFunc);
                });
            });
        }
    }
    
    // ===== اسلایدر هیرو =====
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    const dotsContainer = document.querySelector('.slider-dots');
    
    let currentSlide = 0;
    let slideInterval;
    
    if (slides.length > 0) {
        if (dotsContainer) {
            slides.forEach((_, index) => {
                const dot = document.createElement('div');
                dot.classList.add('dot');
                if (index === 0) dot.classList.add('active');
                dot.addEventListener('click', () => goToSlide(index));
                dotsContainer.appendChild(dot);
            });
        }
        
        function goToSlide(index) {
            slides.forEach(slide => slide.classList.remove('active'));
            slides[index].classList.add('active');
            currentSlide = index;
            updateDots();
        }
        
        function updateDots() {
            const dots = document.querySelectorAll('.dot');
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentSlide);
            });
        }
        
        function nextSlide() {
            let newIndex = currentSlide + 1;
            if (newIndex >= slides.length) newIndex = 0;
            goToSlide(newIndex);
        }
        
        function prevSlide() {
            let newIndex = currentSlide - 1;
            if (newIndex < 0) newIndex = slides.length - 1;
            goToSlide(newIndex);
        }
        
        if (prevBtn) prevBtn.addEventListener('click', () => {
            prevSlide();
            resetInterval();
        });
        
        if (nextBtn) nextBtn.addEventListener('click', () => {
            nextSlide();
            resetInterval();
        });
        
        function startInterval() {
            slideInterval = setInterval(nextSlide, 5000);
        }
        
        function resetInterval() {
            clearInterval(slideInterval);
            startInterval();
        }
        
        startInterval();
    }
    
    // ===== اسکرول انیمیشن =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.feature-card, .category-card, .product-card, .blog-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
    
    // ===== هدر شفاف در اسکرول =====
    const header = document.querySelector('.main-header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.style.background = 'rgba(10, 25, 47, 0.98)';
                header.style.backdropFilter = 'blur(10px)';
            } else {
                header.style.background = 'rgba(10, 25, 47, 0.95)';
            }
        });
    }
    
    // ===== نیوزلتر فرم =====
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = newsletterForm.querySelector('input[type="email"]').value;
            if (email) {
                alert(`Thank you for subscribing! ${email}`);
                newsletterForm.reset();
            }
        });
    }
    
    // ===== بروزرسانی تعداد سبد خرید از localStorage =====
    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('sportpro_cart')) || [];
        const total = cart.reduce((sum, item) => sum + item.quantity, 0);
        document.querySelectorAll('.cart-count').forEach(el => {
            if (el) el.textContent = total;
        });
    }
    
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.innerHTML = `<i class="fas fa-check-circle"></i> <span>${message}</span>`;
        notification.style.cssText = `position:fixed;bottom:20px;right:20px;background:#10B981;color:white;padding:12px 24px;border-radius:8px;z-index:10000;animation:slideInRight 0.3s ease;`;
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 3000);
    }
    
    // ===== محصولات: اضافه به سبد خرید =====
    const addToCartBtns = document.querySelectorAll('.add-to-cart');
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const productId = btn.dataset.id;
            const productCard = btn.closest('.product-card');
            const productName = productCard.querySelector('h3 a')?.innerText || 'Product';
            const productPrice = parseFloat(productCard.querySelector('.current-price')?.innerText.replace('$', '') || 0);
            
            let cart = JSON.parse(localStorage.getItem('sportpro_cart')) || [];
            const existing = cart.find(item => item.id == productId);
            
            if (existing) {
                existing.quantity += 1;
            } else {
                cart.push({ id: productId, name: productName, price: productPrice, quantity: 1 });
            }
            
            localStorage.setItem('sportpro_cart', JSON.stringify(cart));
            updateCartCount();
            showNotification(`${productName} added to cart!`);
        });
    });
    
    // ===== محصولات: علاقه‌مندی =====
    const wishlistBtns = document.querySelectorAll('.add-wishlist');
    wishlistBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const heartIcon = btn.querySelector('i');
            heartIcon.classList.toggle('fas');
            heartIcon.classList.toggle('far');
            
            if (heartIcon.classList.contains('fas')) {
                showNotification('Added to wishlist!');
            } else {
                showNotification('Removed from wishlist!');
            }
        });
    });

    // ===== سیستم علاقه‌مندی (Wishlist) =====
const CART_KEY = 'sportpro_cart';
const WISHLIST_KEY = 'sportpro_wishlist';

// بارگذاری علاقه‌مندی‌ها
function loadWishlist() {
    const saved = localStorage.getItem(WISHLIST_KEY);
    return saved ? JSON.parse(saved) : [];
}

// ذخیره علاقه‌مندی‌ها
function saveWishlist(wishlist) {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
    updateWishlistCount();
}

// بروزرسانی تعداد علاقه‌مندی‌ها
function updateWishlistCount() {
    const wishlist = loadWishlist();
    const total = wishlist.length;
    document.querySelectorAll('.wishlist-count').forEach(el => {
        if (el) el.textContent = total;
    });
}

// اضافه/حذف به علاقه‌مندی‌ها
function toggleWishlist(productId, productName, productPrice) {
    let wishlist = loadWishlist();
    const existing = wishlist.find(item => item.id == productId);
    
    if (existing) {
        wishlist = wishlist.filter(item => item.id != productId);
        showNotification('Removed from wishlist!');
    } else {
        wishlist.push({ 
            id: productId, 
            name: productName, 
            price: productPrice,
            addedDate: new Date().toISOString()
        });
        showNotification('Added to wishlist! ❤️');
    }
    
    saveWishlist(wishlist);
    return wishlist;
}

// بررسی اینکه محصول در علاقه‌مندی‌ها هست یا نه
function isInWishlist(productId) {
    const wishlist = loadWishlist();
    return wishlist.some(item => item.id == productId);
}

// دکمه‌های علاقه‌مندی در صفحات
document.querySelectorAll('.add-wishlist').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const productId = btn.dataset.id;
        const productCard = btn.closest('.product-card');
        const productName = productCard?.querySelector('h3 a')?.innerText || 'Product';
        const productPrice = parseFloat(productCard?.querySelector('.current-price')?.innerText.replace('$', '') || 0);
        
        toggleWishlist(productId, productName, productPrice);
        
        // تغییر شکل قلب
        const heartIcon = btn.querySelector('i');
        heartIcon.classList.toggle('fas');
        heartIcon.classList.toggle('far');
    });
});

// بروزرسانی اولیه
updateWishlistCount();
    
    // ===== محصولات: نمایش سریع =====
    const quickViewBtns = document.querySelectorAll('.quick-view');
    quickViewBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            showNotification('Quick view - Product details will be shown');
        });
    });
    
    updateCartCount();
});

window.addEventListener('load', function() {
    console.log('SportPro Template Loaded Successfully!');
});