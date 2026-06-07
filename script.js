/**
 * LUXE.M — Main Script (Fixed)
 */

// ═══════════════════════════════════
// 1. DATA PRODUK
// ═══════════════════════════════════
var PRODUCTS = {
    pria: [
        { id: 'p1', name: 'Premium White Linen Shirt',         brand: 'MANGO MAN',           price: 699000,  img: 'https://placehold.co/520x680/ffffff/000000?text=White+Linen+Shirt',    cat: 'apparel' },
        { id: 'p2', name: 'Essential Black Bomber Jacket',     brand: 'H&M',                 price: 799000,  img: 'https://via.placeholder.com/520x680/000000/ffffff?text=Bomber+Jacket',    cat: 'apparel' },
        { id: 'p3', name: 'Tailored Navy Chino Pants',         brand: 'UNIQLO',              price: 549000,  img: 'https://via.placeholder.com/520x680/1f3b4d/ffffff?text=Chino+Pants',       cat: 'apparel' },
        { id: 'p4', name: 'Soft Cotton Polo Shirt',            brand: 'ZARA MAN',            price: 399000,  img: 'https://via.placeholder.com/520x680/2c3e50/ffffff?text=Polo+Shirt',       cat: 'apparel' },
        { id: 'p5', name: 'Vintage Indigo Denim Overshirt',     brand: 'LEVI’S',              price: 999000,  img: 'https://via.placeholder.com/520x680/3a6ea5/ffffff?text=Denim+Overshirt',  cat: 'apparel' },
        { id: 'p6', name: 'Stretch Performance Jogger Pants',   brand: 'NIKE',                price: 649000,  img: 'https://via.placeholder.com/520x680/16a085/ffffff?text=Jogger+Pants',      cat: 'apparel' },
        { id: 'p7', name: 'Structured Grey Wool Blazer',       brand: 'ZARA MAN',            price: 1200000, img: 'https://via.placeholder.com/520x680/4b4b4b/ffffff?text=Grey+Blazer',     cat: 'apparel' },
        { id: 'p8', name: 'Relaxed Fit Denim Shirt',           brand: 'LEVI’S',              price: 850000,  img: 'https://via.placeholder.com/520x680/4a6fa5/ffffff?text=Denim+Shirt',      cat: 'apparel' },
        { id: 'p9', name: 'Classic White Oxford Shirt',        brand: 'BROOKS BROTHERS',      price: 760000,  img: 'https://via.placeholder.com/520x680/f7f7f7/000000?text=Oxford+Shirt',    cat: 'apparel' }
    ],
    wanita: [
        { id: 'w1', name: 'Floral Midi Dress',           brand: 'ZARA',   price: 899000, img: 'https://via.placeholder.com/520x680/ffb6c1/000000?text=Floral+Midi+Dress',    cat: 'apparel' },
        { id: 'w2', name: 'Silk Wrap Blouse',            brand: 'MANGO',  price: 650000, img: 'https://via.placeholder.com/520x680/f4cccc/000000?text=Silk+Wrap+Blouse',       cat: 'apparel' },
        { id: 'w3', name: 'Satin Slip Dress',            brand: 'H&M',    price: 750000, img: 'https://via.placeholder.com/520x680/ff7f7f/ffffff?text=Satin+Slip+Dress',      cat: 'apparel' }
    ],
    anak: [
        { id: 'a1', name: 'Kaos Bergambar Fun',         brand: 'GAP KIDS',   price: 299000, img: 'https://via.placeholder.com/520x680/ffd966/000000?text=Kids+Graphic+Tee',  cat: 'apparel' },
        { id: 'a2', name: 'Set Piyama Warna Ceria',     brand: 'CARTER’S',   price: 350000, img: 'https://via.placeholder.com/520x680/ffdbac/000000?text=Kids+Pajama+Set', cat: 'apparel' }
    ],
    luxury: [
        { id: 'l1', name: 'Cashmere Rollneck Sweater', brand: 'BURBERRY',         price: 12500000, img: 'https://via.placeholder.com/520x680/776f68/ffffff?text=Cashmere+Sweater', cat: 'apparel' },
        { id: 'l2', name: 'Tailored Wool Overcoat',   brand: 'TOM FORD',        price: 21500000, img: 'https://via.placeholder.com/520x680/4f4a45/ffffff?text=Wool+Overcoat',  cat: 'apparel' },
        { id: 'l3', name: 'Silk Weave Formal Shirt',  brand: 'ERMENEGILDO ZEGNA', price: 8500000, img: 'https://placehold.co/520x680/ece5dd/000000?text=Formal+Silk+Shirt',    cat: 'apparel' }
    ]
};

var HERO_DATA = {
    pria:   { tag: 'Koleksi Pria',   title: 'ESSENTIALS<br>FOR HIM',   sub: 'Elevate your daily rotation with our curated premium menswear.' },
    wanita: { tag: 'Koleksi Wanita', title: 'GRACE &amp;<br>ELEGANCE', sub: 'Temukan koleksi wanita terkurasi untuk setiap kesempatan.' },
    anak:   { tag: 'Koleksi Anak',   title: 'FUN &amp;<br>PLAYFUL',    sub: 'Pakaian anak berkualitas tinggi, nyaman dan penuh warna.' },
    luxury: { tag: 'Luxury Edition', title: 'RARE &amp;<br>REFINED',   sub: 'Koleksi eksklusif dari brand fashion paling bergengsi di dunia.' }
};

// ═══════════════════════════════════
// 2. STATE
// ═══════════════════════════════════
var cart        = JSON.parse(localStorage.getItem('cart'))     || [];
var wishlist    = JSON.parse(localStorage.getItem('wishlist')) || [];
var currentCat  = 'pria';
var currentFilter = 'all';

// ═══════════════════════════════════
// 3. HELPERS
// ═══════════════════════════════════
function el(id)  { return document.getElementById(id); }
function all(sel){ return document.querySelectorAll(sel); }

// ═══════════════════════════════════
// 4. INIT
// ═══════════════════════════════════
document.addEventListener('DOMContentLoaded', function() {
    renderProducts('pria', 'all');
    updateCartUI();
    bindNav();
    bindFilters();
    bindOverlays();
    bindCart();
    bindForms();
    bindSearch();
    bindScrollHeader();
});

// ═══════════════════════════════════
// 5. NAVIGASI KATEGORI
// ═══════════════════════════════════
function bindNav() {
    all('.nav-cat').forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            switchCategory(link.getAttribute('data-cat'));
        });
    });
}

function switchCategory(cat) {
    if (!PRODUCTS[cat]) return;
    currentCat    = cat;
    currentFilter = 'all';

    // Aktifkan link
    all('.nav-cat').forEach(function(l) { l.classList.remove('active-nav'); });
    var active = document.querySelector('.nav-cat[data-cat="' + cat + '"]');
    if (active) active.classList.add('active-nav');

    // Update hero
    var h = HERO_DATA[cat];
    el('hero-tag').textContent  = h.tag;
    el('hero-title').innerHTML  = h.title;
    el('hero-sub').textContent  = h.sub;
    el('section-heading').textContent = 'PRODUK TERBARU — ' + cat.toUpperCase();

    // Reset filter tab
    all('.filter-tab').forEach(function(t) { t.classList.remove('active'); });
    document.querySelector('.filter-tab[data-filter="all"]').classList.add('active');

    renderProducts(cat, 'all');
    el('shop').scrollIntoView({ behavior: 'smooth', block: 'start' });
    showToast('Menampilkan ' + h.tag);
}

// ═══════════════════════════════════
// 6. FILTER TAB
// ═══════════════════════════════════
function bindFilters() {
    all('.filter-tab').forEach(function(btn) {
        btn.addEventListener('click', function() {
            all('.filter-tab').forEach(function(b) { b.classList.remove('active'); });
            btn.classList.add('active');
            currentFilter = btn.getAttribute('data-filter');
            renderProducts(currentCat, currentFilter);
        });
    });
}

// ═══════════════════════════════════
// 7. RENDER PRODUK
// ═══════════════════════════════════
function renderProducts(cat, filter) {
    var source = PRODUCTS[cat] || [];
    var items  = filter === 'all' ? source : source.filter(function(p) { return p.cat === filter; });

    var grid  = el('product-grid');
    var noRes = el('no-results');

    if (items.length === 0) {
        grid.innerHTML = '';
        noRes.style.display = 'block';
        return;
    }
    noRes.style.display = 'none';

    var html = '';
    items.forEach(function(p) {
        var isWish = wishlist.indexOf(p.id) >= 0;
        var heartClass = isWish ? 'fa-solid active' : 'fa-regular';
        html += '<div class="product-card" data-id="' + p.id + '" data-name="' + p.name + '" data-price="' + p.price + '" data-brand="' + p.brand + '" data-img="' + p.img + '">'
            + '<div class="product-img-wrapper">'
            + '<img src="' + p.img + '" alt="' + p.name + '" loading="lazy">'
            + '<div class="product-actions"><button class="add-to-cart"><i class="fa-solid fa-bag-shopping"></i> Tambah ke Keranjang</button></div>'
            + '</div>'
            + '<div class="product-info">'
            + '<p class="brand">' + p.brand + '</p>'
            + '<p class="product-name">' + p.name + '</p>'
            + '<p class="price">Rp ' + p.price.toLocaleString('id-ID') + '</p>'
            + '</div>'
            + '<i class="fa-heart wishlist-toggle ' + heartClass + '"></i>'
            + '</div>';
    });
    grid.innerHTML = html;

    // Bind add-to-cart
    all('.add-to-cart').forEach(function(btn) {
        btn.addEventListener('click', function() {
            var card = btn.closest('.product-card');
            addToCart({
                id:    card.getAttribute('data-id'),
                name:  card.getAttribute('data-name'),
                price: parseInt(card.getAttribute('data-price')),
                brand: card.getAttribute('data-brand'),
                img:   card.getAttribute('data-img')
            });
        });
    });

    // Bind wishlist
    all('.wishlist-toggle').forEach(function(hb) {
        hb.addEventListener('click', function() {
            var id = hb.closest('.product-card').getAttribute('data-id');
            hb.classList.toggle('active');
            hb.classList.toggle('fa-regular');
            hb.classList.toggle('fa-solid');
            if (hb.classList.contains('active')) {
                if (wishlist.indexOf(id) < 0) wishlist.push(id);
                showToast('Ditambahkan ke wishlist \u2764\ufe0f');
            } else {
                wishlist = wishlist.filter(function(i) { return i !== id; });
                showToast('Dihapus dari wishlist');
            }
            localStorage.setItem('wishlist', JSON.stringify(wishlist));
        });
    });
}

// ═══════════════════════════════════
// 8. CART
// ═══════════════════════════════════
function addToCart(product) {
    var found = null;
    cart.forEach(function(i) { if (i.id === product.id) found = i; });
    if (found) { found.quantity += 1; }
    else { cart.push({ id: product.id, name: product.name, price: product.price, brand: product.brand, img: product.img, quantity: 1 }); }
    saveCart();
    updateCartUI();
    openCartDrawer();
    showToast('"' + product.name.substring(0, 28) + '..." ditambahkan!');
}

function removeFromCart(id) {
    cart = cart.filter(function(i) { return i.id !== id; });
    saveCart();
    updateCartUI();
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartUI() {
    var total = 0, count = 0;
    cart.forEach(function(i) { total += i.price * i.quantity; count += i.quantity; });

    all('.cart-count').forEach(function(b) { b.textContent = count; });
    el('cart-drawer-count').textContent = count;
    el('cart-total').textContent = 'Rp ' + total.toLocaleString('id-ID');

    var cartBody = el('cart-items');
    if (cart.length === 0) {
        cartBody.innerHTML = '<div style="text-align:center;padding:3rem;color:#aaa;"><i class="fa-solid fa-cart-shopping" style="font-size:3rem;margin-bottom:1rem;display:block;"></i><p>Keranjang Anda kosong.</p></div>';
        return;
    }
    var chtml = '';
    cart.forEach(function(item) {
        chtml += '<div class="cart-item">'
            + '<img src="' + item.img + '" alt="' + item.name + '">'
            + '<div class="cart-item-info">'
            + '<h5>' + item.brand + '</h5>'
            + '<p>' + item.name + '</p>'
            + '<p><strong>Qty: ' + item.quantity + ' &times; Rp ' + item.price.toLocaleString('id-ID') + '</strong></p>'
            + '<span class="remove-item" onclick="removeFromCart(\'' + item.id + '\')">Hapus</span>'
            + '</div></div>';
    });
    cartBody.innerHTML = chtml;
}

function openCartDrawer() {
    el('cart-drawer').classList.add('active');
    el('drawer-backdrop').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCartDrawer() {
    el('cart-drawer').classList.remove('active');
    el('drawer-backdrop').classList.remove('active');
    document.body.style.overflow = '';
}

function bindCart() {
    el('cart-trigger').addEventListener('click', function() {
        el('cart-drawer').classList.contains('active') ? closeCartDrawer() : openCartDrawer();
    });
    document.querySelector('.close-drawer').addEventListener('click', closeCartDrawer);
    el('drawer-backdrop').addEventListener('click', closeCartDrawer);

    document.querySelector('.checkout-btn').addEventListener('click', function() {
        if (cart.length === 0) { showToast('Keranjang masih kosong!', 'error'); return; }
        window.location.href = 'checkout.html';
    });
}

// ═══════════════════════════════════
// 9. SEARCH & LOGIN OVERLAY
// ═══════════════════════════════════
function bindOverlays() {
    // Search
    el('search-trigger').addEventListener('click', function() {
        el('search-overlay').classList.add('active');
        document.body.style.overflow = 'hidden';
        setTimeout(function() { el('search-input').focus(); }, 150);
    });
    document.querySelector('.close-overlay').addEventListener('click', closeSearch);
    el('search-overlay').addEventListener('click', function(e) {
        if (e.target === el('search-overlay')) closeSearch();
    });

    // Login
    el('user-trigger').addEventListener('click', function() { el('login-modal').classList.add('active'); });
    document.querySelector('.close-modal').addEventListener('click', function() { el('login-modal').classList.remove('active'); });
    el('login-modal').addEventListener('click', function(e) {
        if (e.target === el('login-modal')) el('login-modal').classList.remove('active');
    });

    // Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeSearch();
            el('login-modal').classList.remove('active');
            closeCartDrawer();
        }
    });
}

function closeSearch() {
    el('search-overlay').classList.remove('active');
    el('search-results').innerHTML = '';
    document.body.style.overflow = '';
}

// ═══════════════════════════════════
// 10. LIVE SEARCH
// ═══════════════════════════════════
function bindSearch() {
    var input = el('search-input');
    input.addEventListener('input', searchProducts);
    input.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            var results = el('search-results').querySelectorAll('.search-result-item');
            if (results.length > 0) {
                results[0].click();
            } else {
                var q = input.value.trim();
                if (q.length > 0) showToast('Tidak ada produk ditemukan untuk "' + q + '".', 'error');
            }
        }
    });
}

function searchProducts() {
    var q = el('search-input').value.trim().toLowerCase();
    var resultsBox = el('search-results');
    if (q.length === 0) {
        resultsBox.innerHTML = '<p class="search-no-result">Ketik nama produk atau brand untuk mencari.</p>';
        return;
    }

    var flat = [];
    var keys = Object.keys(PRODUCTS);
    for (var k = 0; k < keys.length; k++) {
        var catKey = keys[k];
        var list   = PRODUCTS[catKey];
        for (var j = 0; j < list.length; j++) {
            flat.push({ catKey: catKey, p: list[j] });
        }
    }

    var hits = flat.filter(function(item) {
        return item.p.name.toLowerCase().indexOf(q) >= 0
            || item.p.brand.toLowerCase().indexOf(q) >= 0
            || item.catKey.toLowerCase().indexOf(q) >= 0;
    });

    if (hits.length === 0) {
        resultsBox.innerHTML = '<p class="search-no-result">Tidak ada produk ditemukan.</p>';
        return;
    }

    var rhtml = '';
    hits.slice(0, 8).forEach(function(item) {
        var p = item.p;
        rhtml += '<div class="search-result-item" onclick="handleSearchClick(\'' + p.id + '\',\'' + item.catKey + '\')">'
            + '<img src="' + p.img + '" alt="' + p.name + '">'
            + '<div>'
            + '<p class="sr-brand">' + p.brand + '</p>'
            + '<p class="sr-name">' + p.name + '</p>'
            + '<p class="sr-price">Rp ' + p.price.toLocaleString('id-ID') + ' • ' + item.catKey.toUpperCase() + '</p>'
            + '</div></div>';
    });
    resultsBox.innerHTML = rhtml;
}

function handleSearchClick(productId, cat) {
    closeSearch();
    el('search-input').value = '';
    switchCategory(cat);
    setTimeout(function() {
        var card = document.querySelector('[data-id="' + productId + '"]');
        if (card) card.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 500);
}

// ═══════════════════════════════════
// 11. FORMS
// ═══════════════════════════════════
function bindForms() {
    el('login-form').addEventListener('submit', function(e) {
        e.preventDefault();
        var email = el('login-email').value;
        if (!email) return;
        showToast('Selamat datang, ' + email.split('@')[0] + '! \uD83D\uDC4B');
        el('login-modal').classList.remove('active');
        el('login-form').reset();
    });

    el('switch-to-register').addEventListener('click', function(e) {
        e.preventDefault();
        showToast('Halaman registrasi segera hadir!');
    });

    document.querySelector('.newsletter-btn').addEventListener('click', function() {
        var email = el('newsletter-input').value.trim();
        if (!email || email.indexOf('@') < 0) { showToast('Masukkan email yang valid!', 'error'); return; }
        showToast(email + ' berhasil didaftarkan! \uD83C\uDF89');
        el('newsletter-input').value = '';
    });
}

// ═══════════════════════════════════
// 12. SCROLL HEADER
// ═══════════════════════════════════
function bindScrollHeader() {
    window.addEventListener('scroll', function() {
        var header = document.querySelector('header');
        header.style.boxShadow = window.scrollY > 60 ? '0 4px 20px rgba(0,0,0,0.08)' : 'none';
    });
}

// ═══════════════════════════════════
// 13. TOAST
// ═══════════════════════════════════
function showToast(message, type) {
    var prev = el('toast');
    if (prev) prev.remove();
    var bg = (type === 'error') ? '#e74c3c' : '#111';
    var toast = document.createElement('div');
    toast.id = 'toast';
    toast.textContent = message;
    toast.style.cssText = 'position:fixed;bottom:2rem;left:50%;transform:translateX(-50%);background:' + bg + ';color:white;padding:0.9rem 2rem;font-family:Outfit,sans-serif;font-weight:600;font-size:0.88rem;z-index:99999;box-shadow:0 8px 24px rgba(0,0,0,0.2);white-space:nowrap;border-radius:2px;animation:slideUp 0.3s ease;';
    document.body.appendChild(toast);
    setTimeout(function() { toast.style.opacity = '0'; setTimeout(function() { toast.remove(); }, 400); }, 3000);
}

// ═══════════════════════════════════
// GLOBAL EXPOSE
// ═══════════════════════════════════
window.removeFromCart    = removeFromCart;
window.switchCategory    = switchCategory;
window.showToast         = showToast;
window.handleSearchClick = handleSearchClick;
