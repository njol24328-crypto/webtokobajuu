/**
 * LUXE.M Admin Page
 * Menyediakan daftar produk lokal, pencarian, dan penambahan produk baru.
 */

var ADMIN_STORAGE_KEY = 'adminProducts';

var DEFAULT_ADMIN_PRODUCTS = {
    pria: [
        { id: 'p1', name: 'Minimalist Grey Leather Sneakers', brand: 'ADIDAS ORIGINALS', price: 1499000, img: 'men_sneakers_product_1780400547442.png', cat: 'sneakers' },
        { id: 'p2', name: 'Classic Silver Series Watch', brand: 'DANIEL WELLINGTON', price: 2850000, img: 'men_watch_product_1780400562688.png', cat: 'aksesoris' },
        { id: 'p3', name: 'Premium White Linen Shirt', brand: 'MANGO MAN', price: 699000, img: 'men_shirt_product_1780400575906.png', cat: 'apparel' },
        { id: 'p4', name: 'Court Classic Sneakers', brand: 'ADIDAS ORIGINALS', price: 1299000, img: 'men_sneakers_product_1780400547442.png', cat: 'sneakers' },
        { id: 'p5', name: 'Essential Black Bomber Jacket', brand: 'H&M', price: 799000, img: 'men_shirt_product_1780400575906.png', cat: 'apparel' },
        { id: 'p6', name: 'Tailored Navy Chino Pants', brand: 'UNIQLO', price: 549000, img: 'men_shirt_product_1780400575906.png', cat: 'apparel' },
        { id: 'p7', name: 'Soft Cotton Polo Shirt', brand: 'ZARA MAN', price: 399000, img: 'men_shirt_product_1780400575906.png', cat: 'apparel' },
        { id: 'p8', name: 'Vintage Indigo Denim Overshirt', brand: 'LEVI’S', price: 999000, img: 'men_shirt_product_1780400575906.png', cat: 'apparel' },
        { id: 'p9', name: 'Stretch Performance Jogger', brand: 'NIKE', price: 649000, img: 'men_shirt_product_1780400575906.png', cat: 'apparel' }
    ],
    wanita: [
        { id: 'w1', name: 'Floral Midi Dress', brand: 'ZARA', price: 899000, img: 'men_shirt_product_1780400575906.png', cat: 'apparel' },
        { id: 'w2', name: 'Gold Bangle Bracelet', brand: 'FOSSIL', price: 650000, img: 'men_watch_product_1780400562688.png', cat: 'aksesoris' },
        { id: 'w3', name: 'White Slip-On Sneakers', brand: 'VANS', price: 750000, img: 'men_sneakers_product_1780400547442.png', cat: 'sneakers' }
    ],
    anak: [
        { id: 'a1', name: 'Kaos Bergambar Fun', brand: 'GAP KIDS', price: 299000, img: 'men_shirt_product_1780400575906.png', cat: 'apparel' },
        { id: 'a2', name: 'Mini Sneakers Colorful', brand: 'NIKE KIDS', price: 450000, img: 'men_sneakers_product_1780400547442.png', cat: 'sneakers' }
    ],
    luxury: [
        { id: 'l1', name: 'Automatic Tourbillon Watch', brand: 'AURORA', price: 45000000, img: 'men_watch_product_1780400562688.png', cat: 'aksesoris' },
        { id: 'l2', name: 'Italian Leather Oxford', brand: 'BRIONI', price: 12000000, img: 'men_sneakers_product_1780400547442.png', cat: 'sneakers' },
        { id: 'l3', name: 'Silk Weave Formal Shirt', brand: 'ERMENEGILDO ZEGNA', price: 8500000, img: 'men_shirt_product_1780400575906.png', cat: 'apparel' }
    ]
};

var adminProducts = loadAdminProducts();

function el(id) { return document.getElementById(id); }

function loadAdminProducts() {
    var raw = localStorage.getItem(ADMIN_STORAGE_KEY);
    if (!raw) return JSON.parse(JSON.stringify(DEFAULT_ADMIN_PRODUCTS));
    try {
        return JSON.parse(raw);
    } catch (e) {
        return JSON.parse(JSON.stringify(DEFAULT_ADMIN_PRODUCTS));
    }
}

function saveAdminProducts() {
    localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(adminProducts));
}

function getFlattenedProducts() {
    var items = [];
    Object.keys(adminProducts).forEach(function(cat) {
        adminProducts[cat].forEach(function(product) {
            items.push(Object.assign({ category: cat }, product));
        });
    });
    return items;
}

function renderAdminStats() {
    var products = getFlattenedProducts();
    el('admin-total-products').textContent = products.length;
    el('admin-total-categories').textContent = Object.keys(adminProducts).length;
}

function renderAdminTable() {
    var query = el('admin-search').value.trim().toLowerCase();
    var category = el('admin-category-filter').value;
    var rows = '';

    getFlattenedProducts().forEach(function(product) {
        var matchesQuery = query === '' || product.name.toLowerCase().includes(query) || product.brand.toLowerCase().includes(query) || product.category.toLowerCase().includes(query);
        var matchesCategory = category === 'all' || product.category === category;

        if (!matchesQuery || !matchesCategory) return;

        rows += '<tr>'
            + '<td>' + product.id + '</td>'
            + '<td><img src="' + product.img + '" alt="' + product.name + '"></td>'
            + '<td>' + product.name + '</td>'
            + '<td>' + product.brand + '</td>'
            + '<td>' + product.category + '</td>'
            + '<td>Rp ' + product.price.toLocaleString('id-ID') + '</td>'
            + '<td class="admin-action">'
            + '<button class="btn-delete" onclick="deleteAdminProduct(\'' + product.id + '\', \'' + product.category + '\')">Hapus</button>'
            + '</td>'
            + '</tr>';
    });

    if (rows === '') {
        rows = '<tr><td colspan="7" style="text-align:center;padding:2rem;color:#888;">Tidak ada produk yang cocok dengan filter.</td></tr>';
    }

    el('admin-product-table').innerHTML = rows;
}

function deleteAdminProduct(id, category) {
    adminProducts[category] = adminProducts[category].filter(function(item) {
        return item.id !== id;
    });
    saveAdminProducts();
    renderAdminTable();
    renderAdminStats();
    showToast('Produk dengan ID ' + id + ' telah dihapus.', 'success');
}

function bindAdminEvents() {
    el('admin-search').addEventListener('input', renderAdminTable);
    el('admin-category-filter').addEventListener('change', renderAdminTable);
    el('admin-reset').addEventListener('click', function() {
        el('admin-search').value = '';
        el('admin-category-filter').value = 'all';
        renderAdminTable();
    });
    el('admin-add-product').addEventListener('click', addAdminProduct);
}

function addAdminProduct() {
    var name = el('admin-new-name').value.trim();
    var brand = el('admin-new-brand').value.trim();
    var price = parseInt(el('admin-new-price').value, 10);
    var category = el('admin-new-category').value;
    var image = el('admin-new-image').value.trim() || 'https://via.placeholder.com/120x90?text=Produk';
    var providedId = el('admin-new-id').value.trim();

    if (!name || !brand || !price || price <= 0) {
        showToast('Lengkapi nama, brand, dan harga produk.', 'error');
        return;
    }

    var id = providedId || category.charAt(0) + Date.now().toString().slice(-5);
    var exists = getFlattenedProducts().some(function(item) { return item.id === id; });
    if (exists) {
        showToast('ID produk sudah digunakan. Gunakan ID lain atau kosongkan field.', 'error');
        return;
    }

    var nextProduct = {
        id: id,
        name: name,
        brand: brand,
        price: price,
        img: image,
        cat: 'apparel'
    };

    adminProducts[category].push(nextProduct);
    saveAdminProducts();
    renderAdminStats();
    renderAdminTable();
    clearAdminForm();
    showToast('Produk baru berhasil ditambahkan.', 'success');
}

function clearAdminForm() {
    el('admin-new-name').value = '';
    el('admin-new-brand').value = '';
    el('admin-new-price').value = '';
    el('admin-new-image').value = '';
    el('admin-new-id').value = '';
    el('admin-new-category').value = 'pria';
}

function showToast(message, type) {
    var existing = document.getElementById('admin-toast');
    if (existing) existing.remove();

    var toast = document.createElement('div');
    toast.id = 'admin-toast';
    toast.textContent = message;
    toast.style.cssText = 'position:fixed;bottom:2rem;left:50%;transform:translateX(-50%);background:' + (type === 'error' ? '#e74c3c' : '#222') + ';color:white;padding:1rem 1.8rem;border-radius:0.8rem;box-shadow:0 12px 28px rgba(0,0,0,0.15);font-family:Outfit,sans-serif;font-weight:700;z-index:9999;';
    document.body.appendChild(toast);
    setTimeout(function() { toast.style.opacity = '0'; setTimeout(function() { toast.remove(); }, 400); }, 3000);
}

window.deleteAdminProduct = deleteAdminProduct;

document.addEventListener('DOMContentLoaded', function() {
    renderAdminStats();
    renderAdminTable();
    bindAdminEvents();
});
