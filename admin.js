/**
 * LUXE.M Admin Page
 * Menyediakan daftar produk lokal, pencarian, dan penambahan produk baru.
 */

var ADMIN_STORAGE_KEY = 'adminProducts';
var ORDER_HISTORY_KEY = 'orderHistory';

var DEFAULT_ADMIN_PRODUCTS = {
    pria: [
        { id: 'p1', name: 'Premium White Linen Shirt',         brand: 'MANGO MAN',           price: 699000,  img: 'https://placehold.co/520x680/ffffff/000000?text=White+Linen+Shirt',    cat: 'apparel' },
        { id: 'p2', name: 'Essential Black Bomber Jacket',     brand: 'H&M',                 price: 799000,  img: 'https://placehold.co/520x680/000000/ffffff?text=Bomber+Jacket',    cat: 'apparel' },
        { id: 'p3', name: 'Tailored Navy Chino Pants',         brand: 'UNIQLO',              price: 549000,  img: 'https://placehold.co/520x680/1f3b4d/ffffff?text=Chino+Pants',       cat: 'apparel' },
        { id: 'p4', name: 'Soft Cotton Polo Shirt',            brand: 'ZARA MAN',            price: 399000,  img: 'https://placehold.co/520x680/2c3e50/ffffff?text=Polo+Shirt',       cat: 'apparel' },
        { id: 'p5', name: 'Vintage Indigo Denim Overshirt',     brand: 'LEVI’S',              price: 999000,  img: 'https://placehold.co/520x680/3a6ea5/ffffff?text=Denim+Overshirt',  cat: 'apparel' },
        { id: 'p6', name: 'Stretch Performance Jogger Pants',   brand: 'NIKE',                price: 649000,  img: 'https://placehold.co/520x680/16a085/ffffff?text=Jogger+Pants',      cat: 'apparel' },
        { id: 'p7', name: 'Structured Grey Wool Blazer',       brand: 'ZARA MAN',            price: 1200000, img: 'https://placehold.co/520x680/4b4b4b/ffffff?text=Grey+Blazer',     cat: 'apparel' },
        { id: 'p8', name: 'Relaxed Fit Denim Shirt',           brand: 'LEVI’S',              price: 850000,  img: 'https://placehold.co/520x680/4a6fa5/ffffff?text=Denim+Shirt',      cat: 'apparel' },
        { id: 'p9', name: 'Classic White Oxford Shirt',        brand: 'BROOKS BROTHERS',      price: 760000,  img: 'https://placehold.co/520x680/f7f7f7/000000?text=Oxford+Shirt',    cat: 'apparel' }
    ],
    wanita: [
        { id: 'w1', name: 'Floral Midi Dress',            brand: 'ZARA',   price: 899000, img: 'https://placehold.co/520x680/ffb6c1/000000?text=Floral+Midi+Dress',    cat: 'apparel' },
        { id: 'w2', name: 'Silk Wrap Blouse',             brand: 'MANGO',  price: 650000, img: 'https://placehold.co/520x680/f4cccc/000000?text=Silk+Wrap+Blouse',       cat: 'apparel' },
        { id: 'w3', name: 'Satin Slip Dress',             brand: 'H&M',    price: 750000, img: 'https://placehold.co/520x680/ff7f7f/ffffff?text=Satin+Slip+Dress',      cat: 'apparel' }
    ],
    anak: [
        { id: 'a1', name: 'Kaos Bergambar Fun',          brand: 'GAP KIDS',   price: 299000, img: 'https://placehold.co/520x680/ffd966/000000?text=Kids+Graphic+Tee',  cat: 'apparel' },
        { id: 'a2', name: 'Set Piyama Warna Ceria',      brand: 'CARTER’S',   price: 350000, img: 'https://placehold.co/520x680/ffdbac/000000?text=Kids+Pajama+Set', cat: 'apparel' }
    ],
    luxury: [
        { id: 'l1', name: 'Cashmere Rollneck Sweater',    brand: 'BURBERRY',         price: 12500000, img: 'https://placehold.co/520x680/776f68/ffffff?text=Cashmere+Sweater', cat: 'apparel' },
        { id: 'l2', name: 'Tailored Wool Overcoat',      brand: 'TOM FORD',        price: 21500000, img: 'https://placehold.co/520x680/4f4a45/ffffff?text=Wool+Overcoat',  cat: 'apparel' },
        { id: 'l3', name: 'Silk Weave Formal Shirt',     brand: 'ERMENEGILDO ZEGNA', price: 8500000,  img: 'https://placehold.co/520x680/ece5dd/000000?text=Formal+Silk+Shirt',    cat: 'apparel' }
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

function loadOrderHistory() {
    var raw = localStorage.getItem(ORDER_HISTORY_KEY);
    if (!raw) return [];
    try {
        return JSON.parse(raw);
    } catch (e) {
        return [];
    }
}

function saveOrderHistory(history) {
    localStorage.setItem(ORDER_HISTORY_KEY, JSON.stringify(history));
}

function getOrderStatus(order) {
    return order.statusTimeline[order.statusIndex] ? order.statusTimeline[order.statusIndex].status : 'Selesai';
}

function updateOrderProgress() {
    var orders = loadOrderHistory();
    var now = Date.now();
    var changed = false;

    orders.forEach(function(order) {
        if (order.statusIndex >= order.statusTimeline.length - 1) return;
        var lastUpdated = new Date(order.lastUpdated).getTime();
        if (now - lastUpdated >= 20000) {
            order.statusIndex += 1;
            var nextStage = order.statusTimeline[order.statusIndex];
            order.history.push({ status: nextStage.status, location: nextStage.location, time: new Date().toISOString() });
            order.lastUpdated = new Date().toISOString();
            changed = true;
        }
    });

    if (changed) saveOrderHistory(orders);
    return orders;
}

function renderAdminStats() {
    var products = getFlattenedProducts();
    var orders = loadOrderHistory();
    el('admin-total-products').textContent = products.length;
    el('admin-total-categories').textContent = Object.keys(adminProducts).length;
    el('admin-total-orders').textContent = orders.length;
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
            + '<td><img src="' + product.img + '" alt="' + product.name + '" onerror="this.onerror=null;this.src=\'https://placehold.co/120x90/cccccc/000000?text=No+Image\';"></td>'
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

function renderAdminOrderTable() {
    var query = el('admin-order-search').value.trim().toLowerCase();
    var orders = updateOrderProgress();
    var rows = '';

    if (orders.length === 0) {
        el('admin-order-table').innerHTML = '<tr><td colspan="7" style="text-align:center;padding:2rem;color:#888;">Belum ada pesanan.</td></tr>';
        return;
    }

    orders.forEach(function(order) {
        var customerName = (order.customer.firstName + ' ' + order.customer.lastName).toLowerCase();
        if (query && order.id.toLowerCase().indexOf(query) === -1 && customerName.indexOf(query) === -1) return;

        rows += '<tr>'
            + '<td>' + order.id + '</td>'
            + '<td>' + order.customer.firstName + ' ' + order.customer.lastName + '</td>'
            + '<td>' + getOrderStatus(order) + '</td>'
            + '<td>' + order.items.length + '</td>'
            + '<td>Rp ' + order.total.toLocaleString('id-ID') + '</td>'
            + '<td>' + new Date(order.lastUpdated).toLocaleString('id-ID') + '</td>'
            + '<td><a href="status.html?id=' + order.id + '" class="btn" style="padding:0.5rem 1rem;font-size:0.85rem;">Lacak</a></td>'
            + '</tr>';
    });

    if (rows === '') {
        rows = '<tr><td colspan="7" style="text-align:center;padding:2rem;color:#888;">Tidak ada pesanan yang cocok.</td></tr>';
    }

    el('admin-order-table').innerHTML = rows;
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
    el('admin-order-search').addEventListener('input', renderAdminOrderTable);
    el('admin-refresh-orders').addEventListener('click', function() {
        renderAdminOrderTable();
        renderAdminStats();
        showToast('Status pesanan diperbarui.', 'success');
    });
}

function addAdminProduct() {
    var name = el('admin-new-name').value.trim();
    var brand = el('admin-new-brand').value.trim();
    var price = parseInt(el('admin-new-price').value, 10);
    var category = el('admin-new-category').value;
    var image = el('admin-new-image').value.trim() || 'https://placehold.co/120x90?text=Produk';
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
    renderAdminOrderTable();
    renderAdminTable();
    bindAdminEvents();
});
