(function () {
  'use strict';

  // TechZone is a static front-end demonstration. All records below are fixtures.
  // No backend, database or browser-side data persistence is used.
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const page = location.pathname.split('/').pop() || 'index.html';
  const isAdmin = /\/admin\//.test(location.pathname);
  const params = new URLSearchParams(location.search);
  const money = value => new Intl.NumberFormat('vi-VN').format(Number(value || 0)) + 'đ';
  const clean = value => String(value == null ? '' : value).trim();
  const esc = value => String(value == null ? '' : value).replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
  const asset = path => (isAdmin ? '../' : '') + String(path || '').replace(/^\.\//, '');

  const PRODUCTS = [
    { id: 'SP001', name: 'Laptop ASUS Vivobook 15', category: 'Laptop', price: 15490000, importPrice: 13000000, stock: 24, sold: 12, image: 'picture/1.png', description: 'Intel Core i5 · RAM 16GB · SSD 512GB · Màn hình 15.6 inch Full HD', warranty: '24 tháng', active: true },
    { id: 'SP002', name: 'PC Gaming TechZone G5', category: 'Máy tính bộ', price: 22990000, importPrice: 19900000, stock: 8, sold: 4, image: 'picture/3.jpg', description: 'Intel Core i5 · RTX 4060 · RAM 16GB · SSD 1TB', warranty: '24 tháng', active: true },
    { id: 'SP003', name: 'Bàn phím cơ KeyPro K87', category: 'Phụ kiện', price: 890000, importPrice: 620000, stock: 42, sold: 2, image: 'picture/5.jpg', description: '87 phím · LED RGB · Kết nối USB', warranty: '12 tháng', active: true },
    { id: 'SP004', name: 'RAM Kingston Fury 16GB', category: 'Linh kiện', price: 950000, importPrice: 720000, stock: 3, sold: 0, image: 'picture/4.jfif', description: 'DDR4 · 3200MHz · Tản nhiệt nhôm', warranty: '36 tháng', active: true },
    { id: 'SP005', name: 'Chuột không dây M310', category: 'Phụ kiện', price: 390000, importPrice: 250000, stock: 35, sold: 10, image: 'picture/6.jpg', description: 'Kết nối 2.4GHz · 1600 DPI', warranty: '12 tháng', active: true },
    { id: 'SP006', name: 'Tai nghe HyperSound H7', category: 'Phụ kiện', price: 1290000, importPrice: 850000, stock: 16, sold: 5, image: 'picture/7.jfif', description: 'Âm thanh vòm · Micro rời', warranty: '12 tháng', active: true },
    { id: 'SP007', name: 'Màn hình ViewMax 24 inch', category: 'Màn hình', price: 2690000, importPrice: 2250000, stock: 11, sold: 7, image: 'picture/8.jfif', description: 'Full HD · 100Hz · Tấm nền IPS', warranty: '24 tháng', active: true },
    { id: 'SP008', name: 'Laptop Lenovo IdeaPad Slim 5', category: 'Laptop', price: 19990000, importPrice: 17500000, stock: 6, sold: 8, image: 'picture/2.jpg', description: 'AMD Ryzen 7 · RAM 16GB · SSD 1TB', warranty: '24 tháng', active: true }
  ];
  const PRODUCT_CATEGORIES = ['Laptop', 'Máy tính bộ', 'Linh kiện', 'Phụ kiện', 'Màn hình'];

  const CUSTOMERS = [
    { id: 'KH001', name: 'Nguyễn Minh Anh', email: 'minhanh@example.com', phone: '0901 234 567', status: 'Hoạt động', addresses: ['25 Nguyễn Trãi, Phường Bến Thành, Quận 1, TP. Hồ Chí Minh', '120 Cộng Hòa, Phường 4, Quận Tân Bình, TP. Hồ Chí Minh'] },
    { id: 'KH002', name: 'Trần Quốc Bảo', email: 'quocbao@example.com', phone: '0902 345 678', status: 'Hoạt động', addresses: ['120 Cộng Hòa, Quận Tân Bình, TP. Hồ Chí Minh'] },
    { id: 'KH003', name: 'Lê Hoàng Phúc', email: 'hoangphuc@example.com', phone: '0903 456 789', status: 'Hoạt động', addresses: ['55 Nguyễn Văn Linh, Hải Châu, Đà Nẵng'] },
    { id: 'KH004', name: 'Phạm Thu Hà', email: 'thuha@example.com', phone: '0904 567 890', status: 'Khóa', addresses: ['18 Lê Lợi, Quận Hoàn Kiếm, Hà Nội'] },
    { id: 'KH005', name: 'Đỗ Hoàng Nam', email: 'hoangnam@example.com', phone: '0905 678 901', status: 'Hoạt động', addresses: ['88 Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh'] }
  ];

  const ORDERS = [
    { id: 'DH20261127', date: '2026-11-27', customerId: 'KH001', customerName: 'Nguyễn Minh Anh', phone: '0901 234 567', receiver: 'Nguyễn Minh Anh', address: '25 Nguyễn Trãi, Phường Bến Thành, Quận 1, TP. Hồ Chí Minh', city: 'TP. Hồ Chí Minh', district: 'Quận 1', payment: 'Tiền mặt khi nhận hàng', status: 'Chưa xác nhận', items: [{ productId: 'SP001', name: 'Laptop ASUS Vivobook 15', price: 15490000, qty: 1 }, { productId: 'SP003', name: 'Bàn phím cơ KeyPro K87', price: 890000, qty: 1 }], total: 16380000 },
    { id: 'DH20261122', date: '2026-11-22', customerId: 'KH002', customerName: 'Trần Quốc Bảo', phone: '0902 345 678', receiver: 'Trần Quốc Bảo', address: '120 Cộng Hòa, Quận Tân Bình, TP. Hồ Chí Minh', city: 'TP. Hồ Chí Minh', district: 'Quận Tân Bình', payment: 'Trực tuyến', status: 'Đã xác nhận', items: [{ productId: 'SP002', name: 'PC Gaming TechZone G5', price: 22990000, qty: 1 }], total: 22990000 },
    { id: 'DH20261118', date: '2026-11-18', customerId: 'KH003', customerName: 'Lê Hoàng Phúc', phone: '0903 456 789', receiver: 'Lê Hoàng Phúc', address: '55 Nguyễn Văn Linh, Hải Châu, Đà Nẵng', city: 'Đà Nẵng', district: 'Hải Châu', payment: 'Tiền mặt khi nhận hàng', status: 'Đã giao thành công', items: [{ productId: 'SP007', name: 'Màn hình ViewMax 24 inch', price: 2690000, qty: 1 }, { productId: 'SP005', name: 'Chuột không dây M310', price: 390000, qty: 1 }], total: 3080000 },
    { id: 'DH20261115', date: '2026-11-15', customerId: 'KH004', customerName: 'Phạm Thu Hà', phone: '0904 567 890', receiver: 'Phạm Thu Hà', address: '18 Lê Lợi, Quận Hoàn Kiếm, Hà Nội', city: 'Hà Nội', district: 'Quận Hoàn Kiếm', payment: 'Trực tuyến', status: 'Đã hủy', items: [{ productId: 'SP003', name: 'Bàn phím cơ KeyPro K87', price: 890000, qty: 1 }], total: 890000 },
    { id: 'DH20261112', date: '2026-11-12', customerId: 'KH004', customerName: 'Phạm Thu Hà', phone: '0904 567 890', receiver: 'Phạm Thu Hà', address: '18 Lê Lợi, Quận Hoàn Kiếm, Hà Nội', city: 'Hà Nội', district: 'Quận Hoàn Kiếm', payment: 'Trực tuyến', status: 'Đã giao thành công', items: [{ productId: 'SP006', name: 'Tai nghe HyperSound H7', price: 1290000, qty: 1 }, { productId: 'SP005', name: 'Chuột không dây M310', price: 390000, qty: 1 }], total: 1680000 },
    { id: 'DH20261110', date: '2026-11-10', customerId: 'KH001', customerName: 'Nguyễn Minh Anh', phone: '0901 234 567', receiver: 'Nguyễn Minh Anh', address: '120 Cộng Hòa, Quận Tân Bình, TP. Hồ Chí Minh', city: 'TP. Hồ Chí Minh', district: 'Quận Tân Bình', payment: 'Trực tuyến', status: 'Đã giao thành công', items: [{ productId: 'SP007', name: 'Màn hình ViewMax 24 inch', price: 2690000, qty: 1 }, { productId: 'SP005', name: 'Chuột không dây M310', price: 390000, qty: 1 }], total: 3080000 },
    { id: 'DH20261105', date: '2026-11-05', customerId: 'KH005', customerName: 'Đỗ Hoàng Nam', phone: '0905 678 901', receiver: 'Đỗ Hoàng Nam', address: '88 Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh', city: 'TP. Hồ Chí Minh', district: 'Quận 1', payment: 'Tiền mặt khi nhận hàng', status: 'Đã giao thành công', items: [{ productId: 'SP008', name: 'Laptop Lenovo IdeaPad Slim 5', price: 19990000, qty: 1 }], total: 19990000 }
  ];

  const SUPPLIERS = [
    { id: 'NCC001', name: 'Công ty Phân phối ABC', phone: '028 1234 5678', email: 'sales@abc.example', address: 'TP. Hồ Chí Minh', status: 'Đang hợp tác' },
    { id: 'NCC002', name: 'Thiết bị số Minh Long', phone: '028 2345 6789', email: 'contact@minhlong.example', address: 'Bình Dương', status: 'Đang hợp tác' },
    { id: 'NCC003', name: 'Công nghệ Sao Việt', phone: '024 3456 7890', email: 'info@saoviet.example', address: 'Hà Nội', status: 'Ngừng hợp tác' }
  ];
  const IMPORTS = [
    { id: 'PN20261020', date: '2026-10-20', supplierId: 'NCC001', employee: 'NV003 - Phạm Đức Long', status: 'Đã nhập kho', items: [
      { productId: 'SP001', name: 'Laptop ASUS Vivobook 15', quantity: 10, importPrice: 12000000, salePrice: 15490000 },
      { productId: 'SP004', name: 'RAM Kingston Fury 16GB', quantity: 20, importPrice: 650000, salePrice: 950000 }
    ] },
    { id: 'PN20261018', date: '2026-10-18', supplierId: 'NCC002', employee: 'NV003 - Phạm Đức Long', status: 'Đang kiểm', items: [
      { productId: 'SP002', name: 'PC Gaming TechZone G5', quantity: 2, importPrice: 19000000, salePrice: 22990000 },
      { productId: 'SP005', name: 'Chuột không dây M310', quantity: 10, importPrice: 250000, salePrice: 390000 },
      { productId: 'SP006', name: 'Tai nghe HyperSound H7', quantity: 5, importPrice: 850000, salePrice: 1290000 }
    ] }
  ];
  IMPORTS.forEach(item => {
    item.total = item.items.reduce((sum, row) => sum + row.quantity * row.importPrice, 0);
    item.supplier = SUPPLIERS.find(supplier => supplier.id === item.supplierId) || SUPPLIERS[0];
  });

  const SAMPLE_CART = [
    { productId: 'SP001', qty: 1 },
    { productId: 'SP003', qty: 1 }
  ];
  const DEMO_USER = CUSTOMERS[0];
  const EMPLOYEES = [
    { id: 'NV001', name: 'Lê Thanh Tùng', position: 'Quản lý', phone: '0908 111 222', email: 'tung.lt@techzone.vn', username: 'tung.lt', hireDate: '2024-03-15', status: 'Hoạt động' },
    { id: 'NV002', name: 'Nguyễn Thảo Vy', position: 'Nhân viên bán hàng', phone: '0908 333 444', email: 'vy.nt@techzone.vn', username: 'vy.nt', hireDate: '2024-06-01', status: 'Hoạt động' },
    { id: 'NV003', name: 'Phạm Đức Long', position: 'Thủ kho', phone: '0908 555 666', email: 'long.pd@techzone.vn', username: 'long.pd', hireDate: '2025-01-10', status: 'Hoạt động' }
  ];
  const CURRENT_EMPLOYEE = EMPLOYEES.find(item => item.id === 'NV003');

  let adminProducts = PRODUCTS.map(item => ({ ...item }));
  let adminCustomers = CUSTOMERS.map(item => ({ ...item }));
  let adminOrders = ORDERS.map(item => ({ ...item, items: item.items.map(row => ({ ...row })) }));
  let adminEmployees = EMPLOYEES.map(item => ({ ...item }));

  function toast(message, type = 'success') {
    let node = $('.site-toast');
    if (!node) {
      node = document.createElement('div');
      node.className = 'site-toast';
      node.setAttribute('role', 'status');
      node.setAttribute('aria-live', 'polite');
      document.body.appendChild(node);
    }
    node.textContent = message;
    node.dataset.type = ['success', 'warning', 'info', 'error'].includes(type) ? type : 'success';
    node.classList.add('show');
    clearTimeout(toast.timer);
    toast.timer = setTimeout(() => node.classList.remove('show'), 3600);
  }

  function formatVndInput(value) {
    const digits = String(value || '').replace(/\D/g, '');
    return digits.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  function parseVndInput(value) {
    const digits = String(value || '').replace(/\D/g, '');
    return digits ? Number(digits) : 0;
  }

  function setupStaticPrototypeBehaviors() {
    // Forms are presentation-only. Admin actions use ordinary links/forms and CSS :target to show toast messages.
    $$('form').forEach(form => { form.noValidate = true; });
    if (!isAdmin) return;

    // Display-only VND formatting for fields in the admin forms; this does not submit or save data.
    $$('input').forEach(input => {
      const id = (input.id || '').toLowerCase();
      const name = (input.name || '').toLowerCase();
      const placeholder = (input.placeholder || '').toLowerCase();
      const label = input.id ? document.querySelector(`label[for="${CSS.escape(input.id)}"]`) : null;
      const labelText = (label?.textContent || '').toLowerCase();
      const context = [id, name, placeholder, labelText].join(' ');
      if (!/(giá|gia|price|amount|money|thành tiền|thanh tien|đơn giá|don gia)/i.test(context)) return;
      input.type = 'text';
      input.inputMode = 'numeric';
      input.autocomplete = 'off';
      input.dataset.moneyFormat = 'vnd';
      input.placeholder = input.placeholder || 'Nhập số tiền';
      input.value = formatVndInput(input.value);
      input.addEventListener('input', () => {
        const formatted = formatVndInput(input.value);
        input.value = formatted;
        try { input.setSelectionRange(formatted.length, formatted.length); } catch (_) { /* Ignore unsupported input types. */ }
      });
      input.addEventListener('blur', () => { input.value = formatVndInput(input.value); });
    });
  }

  function go(url) { location.href = url; }
  function productById(id) { return PRODUCTS.find(item => item.id === id) || PRODUCTS[0]; }
  function dateVi(value) { return new Date(value + 'T00:00:00').toLocaleDateString('vi-VN'); }

  function parseCartString(value) {
    if (!value) return [];
    return String(value).split(',').map(part => {
      const match = /^(SP\d{3}):(\d{1,2})$/.exec(part.trim());
      if (!match || !PRODUCTS.some(product => product.id === match[1])) return null;
      const product = productById(match[1]);
      const qty = Math.max(1, Math.min(product.stock || 1, Number(match[2]) || 1));
      return { productId: product.id, qty };
    }).filter(Boolean);
  }

  function serializeCart(items) {
    return items.filter(item => productById(item.productId)).map(item => `${item.productId}:${Math.max(1, Math.min(99, Number(item.qty) || 1))}`).join(',');
  }

  function cartItemsFromCurrentPage() {
    return $$('[data-cart-row]').map(row => ({
      productId: row.dataset.productId,
      qty: Math.max(1, Number($('[data-cart-quantity]', row)?.value || 1))
    })).filter(item => PRODUCTS.some(product => product.id === item.productId));
  }

  function cartDetails(items) {
    const rows = items.map(item => {
      const product = productById(item.productId);
      return { productId: product.id, name: product.name, image: product.image, price: product.price, qty: item.qty };
    });
    return { items: rows, total: rows.reduce((sum, item) => sum + item.price * item.qty, 0) };
  }

  function cartFromUrl() {
    // Bộ giỏ hàng mẫu cố định, không nhận dữ liệu lưu từ trang khác.
    return SAMPLE_CART.map(item => ({ ...item }));
  }

  function orderUrlParams(order) {
    const query = new URLSearchParams({
      id: order.id, payment: order.payment, address: order.address,
      receiver: order.receiver, phone: order.phone,
      cart: serializeCart(order.items.map(item => ({ productId: item.productId, qty: item.qty })))
    });
    return query.toString();
  }

  function setupCustomerHeader() {
    if (isAdmin) return;
    const slot = $('#customer-auth-slot');
    const guestPage = ['index.html', 'login.html', 'register.html', 'admin-login.html'].includes(page);
    if (slot && !guestPage) {
      slot.innerHTML = 'Xin chào, <a href="customer-profile.html"><strong>Nguyễn Minh Anh</strong></a> · <a href="index.html" data-logout>Đăng xuất</a>';
      const brand = $('.site-header .brand');
      if (brand && !isAdmin) brand.href = 'home-logged-in.html';
      const nav = $('.site-header .nav');
      if (nav && !isAdmin) {
        const active = page === 'products.html' || page === 'product-filter.html' || page === 'product-detail.html' ? 'products' : page === 'order-history.html' || page === 'order-detail.html' || page === 'order-confirmation.html' ? 'orders' : page === 'customer-profile.html' || page === 'edit-profile.html' ? 'profile' : page === 'cart.html' || page === 'checkout.html' ? 'cart' : 'home';
        nav.innerHTML = `<a class="${active === 'home' ? 'active' : ''}" href="home-logged-in.html">Trang chủ</a><a class="${active === 'products' ? 'active' : ''}" href="products.html">Sản phẩm</a><a class="${active === 'orders' ? 'active' : ''}" href="order-history.html">Lịch sử mua hàng</a><a class="${active === 'profile' ? 'active' : ''}" href="customer-profile.html">Tài khoản</a><a class="${active === 'cart' ? 'active' : ''}" href="cart.html">Giỏ hàng</a>`;
      }
    }
    $$('[data-logout]').forEach(link => link.addEventListener('click', event => {
      event.preventDefault();
      toast('Đã đăng xuất thành công.', 'success');
      setTimeout(() => go(isAdmin ? '../admin-login.html' : 'index.html'), 650);
    }));
  }

  function renderProductCard(product) {
    const stockText = product.stock <= 0 ? 'Hết hàng' : product.stock <= 5 ? 'Sắp hết' : 'Còn hàng';
    return `<article class="card product">
      <a class="product-visual" href="product-detail.html?id=${encodeURIComponent(product.id)}"><img src="${esc(product.image)}" alt="${esc(product.name)}"></a>
      <span class="tag ${product.stock <= 5 ? 'orange' : ''}">${stockText}</span>
      <h3>${esc(product.name)}</h3><p class="muted">${esc(product.description)}</p>
      <div class="price">${money(product.price)}</div>
      <div class="product-actions"><a class="btn" href="product-detail.html?id=${encodeURIComponent(product.id)}">Chi tiết</a>
      <button class="btn light" type="button" data-add-cart="${product.id}" ${product.stock <= 0 ? 'disabled' : ''}>Thêm giỏ</button></div>
    </article>`;
  }

  function renderStaticPagination(anchor, pageCount = 5) {
    if (!anchor) return;
    const host = anchor.matches('.grid') ? anchor : (anchor.closest('.table-wrap') || anchor);
    let pagination = host.nextElementSibling;
    if (!pagination || !pagination.classList.contains('pagination')) {
      pagination = document.createElement('nav');
      pagination.className = 'pagination static-pagination';
      pagination.setAttribute('aria-label', 'Minh họa phân trang');
      host.insertAdjacentElement('afterend', pagination);
    }
    const count = Math.max(3, Math.min(7, Number(pageCount) || 5));
    const numbers = Array.from({ length: count }, (_, index) => {
      const number = index + 1;
      return `<span class="page-number inert-page ${number === 1 ? 'active' : ''}" ${number === 1 ? 'aria-current="page"' : ''}>${number}</span>`;
    }).join('');
    pagination.innerHTML = `<span class="page-number inert-page disabled" aria-hidden="true">‹</span>${numbers}<span class="page-number inert-page disabled" aria-hidden="true">›</span>`;
  }

  function renderProductListing() {
    if (!['products.html', 'product-filter.html'].includes(page)) return;
    const grid = $('.grid');
    if (!grid) return;
    const requestedCategory = page === 'product-filter.html' ? params.get('category') : '';
    const category = PRODUCT_CATEGORIES.includes(requestedCategory) ? requestedCategory : '';
    const rows = PRODUCTS.filter(item => item.active && (!category || item.category === category));

    const categoryNav = document.createElement('nav');
    categoryNav.className = 'product-category-nav';
    categoryNav.setAttribute('aria-label', 'Danh mục sản phẩm');
    categoryNav.innerHTML = PRODUCT_CATEGORIES.map(item => {
      const selected = item === category;
      return `<a href="products.html"${selected ? ' aria-current="page"' : ''}>${esc(item)}</a>`;
    }).join('');
    const pageTitle = $('.page-title');
    if (pageTitle) pageTitle.insertAdjacentElement('afterend', categoryNav);

    grid.innerHTML = rows.map(renderProductCard).join('') ||
      '<div class="panel empty-state"><h2>Không có sản phẩm để hiển thị</h2><p>Danh sách sản phẩm mẫu hiện đang trống.</p><a class="btn" href="products.html">Xem tất cả sản phẩm</a></div>';

    if (page === 'product-filter.html') {
      const title = $('.page-title h1');
      if (title) title.textContent = category ? `Sản phẩm: ${category}` : 'Sản phẩm theo bộ lọc';
      const subtitle = $('.page-title p');
      if (subtitle) subtitle.textContent = category
        ? `Danh sách sản phẩm thuộc danh mục ${category}.`
        : 'Đây là trang giao diện minh họa bộ lọc nâng cao; chưa thực hiện tìm kiếm.';
      const summary = $('.filter-summary .muted');
      if (summary) summary.textContent = `Danh mục: ${category || 'Tất cả'} · Sắp xếp: Nổi bật`;
    }

    renderStaticPagination(grid, 5);
  }

  function renderProductDetail() {
    if (page !== 'product-detail.html') return;
    const product = productById('SP001');
    const detail = $('.detail-info');
    if (!detail) return;
    const title = $('#detail-product-name') || $('h1', detail);
    if (title) title.textContent = product.name;
    const art = $('.detail-art');
    if (art) art.innerHTML = `<img src="${esc(product.image)}" alt="${esc(product.name)}" style="width:100%;height:100%;max-height:420px;object-fit:contain">`;
    const price = $('.price', detail); if (price) price.innerHTML = `${money(product.price)} <span class="old-price"></span>`;
    const code = $('.muted', detail); if (code) code.textContent = `Mã sản phẩm: ${product.id} · Phân loại: ${product.category}`;
    const description = $('p:not(.muted):not(.help)', detail); if (description) description.textContent = product.description;
    const list = $('ul', detail); if (list) list.innerHTML = `<li>Phân loại: ${esc(product.category)}</li><li>Bảo hành: ${esc(product.warranty)}</li><li>Tồn kho mẫu: ${product.stock}</li>`;
    const qtyLine = $('p strong', detail)?.parentElement;
    if (qtyLine) qtyLine.innerHTML = '<strong>Số lượng:</strong> <input type="number" id="detail-qty" min="1" max="' + product.stock + '" value="1" style="width:78px">';
    const buy = Array.from(detail.querySelectorAll('a.btn,button.btn')).find(el => /Thêm vào giỏ/i.test(el.textContent));
    if (buy) { const button = document.createElement('button'); button.type = 'button'; button.className = buy.className; button.textContent = 'Thêm vào giỏ hàng'; button.dataset.addCart = product.id; buy.replaceWith(button); }
    const tag = $('.tag', detail); if (tag) { tag.textContent = product.stock > 0 ? 'Còn hàng' : 'Hết hàng'; tag.classList.toggle('orange', product.stock <= 5); }
    const help = $('.help', detail); if (help) help.textContent = 'Đây là thao tác minh họa. Giỏ hàng dùng dữ liệu mẫu cố định và không lưu thay đổi.';
    const crumb = $('.breadcrumbs'); if (crumb) crumb.lastChild.textContent = ' ' + product.name;
  }

  function handleAddToCart(button) {
    const product = productById(button.dataset.addCart);
    const qtyInput = $('#detail-qty');
    const quantity = Math.max(1, Math.min(product.stock || 1, Number(qtyInput?.value || 1)));

    // Giống mẫu LTWeb: thao tác thêm giỏ chỉ hiển thị thông báo.
    // Trang giỏ hàng có bộ dữ liệu mẫu cố định, không ghi nhớ thay đổi giữa các trang.
    if (page === 'index.html') {
      toast('Vui lòng đăng nhập để tiếp tục mua sắm.');
      go(`login.html?next=${encodeURIComponent('products.html')}`);
      return;
    }

    toast(`Đã thêm “${product.name}” (số lượng ${quantity}) vào giỏ hàng mẫu.`, 'success');
  }

  function renderCart() {
    if (page !== 'cart.html') return;
    const tbody = $('.cart-table tbody');
    if (!tbody) return;
    const items = cartFromUrl();
    tbody.innerHTML = items.map(row => {
      const product = productById(row.productId);
      return `<tr data-cart-row data-product-id="${product.id}" data-price="${product.price}" data-product-name="${esc(product.name)}">
        <td class="cart-product"><img src="${esc(product.image)}" alt="${esc(product.name)}">${esc(product.name)}</td>
        <td>${money(product.price)}</td>
        <td><div class="quantity-control"><button type="button" data-cart-minus aria-label="Giảm">−</button><input type="number" min="1" max="${product.stock}" value="${row.qty}" data-cart-quantity aria-label="Số lượng"><button type="button" data-cart-plus aria-label="Tăng">+</button></div></td>
        <td><strong data-line-total>${money(product.price * row.qty)}</strong></td>
        <td class="cart-actions"><a href="product-detail.html?id=${product.id}" title="Xem sản phẩm">👁</a> <button type="button" data-cart-remove title="Xóa sản phẩm">🗑</button></td>
      </tr>`;
    }).join('') || '<tr><td colspan="5" class="empty-state">Giỏ hàng mẫu đang trống. <a href="products.html">Tiếp tục mua sắm</a>.</td></tr>';
    const checkout = $('a[href="checkout.html"], a[href^="login.html?next=checkout"], a[data-checkout]');
    if (checkout) checkout.dataset.checkout = '1';
    updateCartTotals();
  }

  function updateCartTotals() {
    const rows = $$('[data-cart-row]');
    let total = 0;
    rows.forEach(row => {
      const price = Number(row.dataset.price || 0);
      const input = $('[data-cart-quantity]', row);
      const max = Number(input?.max || 99);
      const qty = Math.max(1, Math.min(max, Number(input?.value || 1)));
      if (input) input.value = String(qty);
      const line = price * qty; total += line;
      const lineTotal = $('[data-line-total]', row); if (lineTotal) lineTotal.textContent = money(line);
    });
    const summary = $$('.summary-row', $('.panel') || document);
    if (summary[0]) summary[0].innerHTML = `<span>Tạm tính</span><strong>${money(total)}</strong>`;
    if (summary[1]) summary[1].innerHTML = '<span>Phí giao hàng</span><span>Miễn phí</span>';
    if (summary[2]) summary[2].innerHTML = `<span>Tổng cộng</span><span>${money(total)}</span>`;
    const checkout = $('a[data-checkout], a[href="checkout.html"], a[href^="login.html?next=checkout"]');
    if (checkout) {
      // Theo mẫu LTWeb: trang checkout có bộ đơn hàng minh họa cố định.
      checkout.href = 'checkout.html';
      checkout.classList.toggle('disabled', rows.length === 0);
      checkout.setAttribute('aria-disabled', String(rows.length === 0));
      checkout.onclick = event => {
        if (!$$('[data-cart-row]').length) {
          event.preventDefault();
          toast('Giỏ hàng mẫu đang trống. Vui lòng tiếp tục mua sắm.');
        }
      };
    }
    if (!rows.length && $('tbody', $('.cart-table'))) $('tbody', $('.cart-table')).innerHTML = '<tr><td colspan="5" class="empty-state">Giỏ hàng mẫu đang trống. <a href="products.html">Tiếp tục mua sắm</a>.</td></tr>';
  }

  function initAddressSelector() {
    const select = $('[data-address-choice]');
    if (!select) return;
    const update = () => {
      const isNew = select.value === 'new';
      const fields = $('[data-new-address]');
      const preview = $('[data-saved-address-preview]');
      if (fields) fields.hidden = !isNew;
      if (preview) {
        preview.hidden = isNew;
        if (!isNew) {
          const option = select.options[select.selectedIndex];
          const p = $('p', preview);
          if (p) p.textContent = option ? option.textContent.replace(/^.*?—\s*/, '') : '';
        }
      }
    };
    select.addEventListener('change', update);
    update();
  }

  function placeDemoOrder() {
    const addressSelect = $('[data-address-choice]');
    let address = '';
    if (addressSelect && addressSelect.value === 'new') {
      const province = clean($('#new-province')?.value);
      const district = clean($('#new-district')?.value);
      const detail = clean($('#new-address-detail')?.value);
      address = [detail, district, province].filter(Boolean).join(', ') || DEMO_USER.addresses[0];
    } else if (addressSelect) {
      address = addressSelect.options[addressSelect.selectedIndex]?.textContent.replace(/^.*?—\s*/, '') || DEMO_USER.addresses[0];
    } else address = DEMO_USER.addresses[0];

    const items = SAMPLE_CART.map(item => ({ ...item }));
    // Không ràng buộc dữ liệu trong bản mô phỏng; luôn dùng giỏ mẫu cố định.
    const payment = $('input[name="payment"]:checked')?.value === 'online' ? 'Thanh toán trực tuyến' : 'Tiền mặt khi nhận hàng';
    const details = cartDetails(items);
    const query = new URLSearchParams({ id: 'DH20261127', payment, address, receiver: DEMO_USER.name, phone: DEMO_USER.phone, cart: serializeCart(items), total: String(details.total) });
    toast('Đặt hàng thành công! Đây là giao dịch minh họa.', 'success');
    setTimeout(() => go('order-confirmation.html?' + query.toString()), 650);
  }

  function renderOrderConfirmation() {
    if (page !== 'order-confirmation.html') return;
    const panel = $('.confirmation-panel'); if (!panel) return;
    const id = params.get('id') || 'DH20261127';
    const payment = params.get('payment') || 'Tiền mặt khi nhận hàng';
    const address = params.get('address') || DEMO_USER.addresses[0];
    const receiver = params.get('receiver') || DEMO_USER.name;
    const phone = params.get('phone') || DEMO_USER.phone;
    const items = parseCartString(params.get('cart') || serializeCart(SAMPLE_CART));
    const details = cartDetails(items);
    const order = { id, payment, address, receiver, phone, items: details.items, total: Number(params.get('total')) || details.total };
    const detailQuery = orderUrlParams(order);
    const historyQuery = new URLSearchParams({ demoOrder: '1', ...Object.fromEntries(new URLSearchParams(detailQuery)) }).toString();
    panel.innerHTML = `<div class="confirmation-icon">✓</div><span class="badge">Mã đơn hàng · ${esc(id)}</span>
      <h1>Đặt hàng thành công!</h1>
      <p class="muted">Đơn hàng minh họa đã được xác nhận trên giao diện. Đây là website tĩnh nên không có đơn hàng thật được tạo, lưu hoặc thanh toán.</p>
      <div class="summary-row"><span>Người nhận</span><strong>${esc(receiver)} · ${esc(phone)}</strong></div>
      <div class="summary-row"><span>Địa chỉ giao hàng</span><strong>${esc(address)}</strong></div>
      <div class="summary-row"><span>Phương thức thanh toán</span><strong>${esc(payment)}</strong></div>
      <div class="summary-row"><span>Trạng thái mẫu</span><strong>Chưa xác nhận</strong></div>
      <div class="summary-row total"><span>Tổng tiền</span><span>${money(order.total)}</span></div>
      <h2>Sản phẩm trong đơn demo</h2><div class="table-wrap"><table><thead><tr><th>Sản phẩm</th><th>Đơn giá</th><th>Số lượng</th><th>Thành tiền</th></tr></thead><tbody>${order.items.map(item => `<tr><td>${esc(item.name)}</td><td>${money(item.price)}</td><td>${item.qty}</td><td>${money(item.price * item.qty)}</td></tr>`).join('')}</tbody></table></div>
      <div class="form-actions" style="justify-content:center"><a class="btn" href="order-detail.html?${detailQuery}">Xem chi tiết đơn hàng</a><a class="btn secondary" href="order-history.html?${historyQuery}">Lịch sử mua hàng</a><a class="btn secondary" href="products.html">Tiếp tục mua sắm</a></div>`;
  }

  function renderOrderHistory() {
    if (page !== 'order-history.html') return;
    const main = $('main.container'); if (!main) return;
    const host = $('[data-order-history-list]', main) || document.createElement('div');
    host.setAttribute('data-order-history-list', '');
    const customerOrders = ORDERS.filter(order => order.customerId === DEMO_USER.id).map(order => ({ ...order, items: order.items.map(item => ({ ...item })) }));
    if (params.get('demoOrder') === '1') {
      const items = cartDetails(parseCartString(params.get('cart') || serializeCart(SAMPLE_CART)));
      customerOrders.unshift({
        id: params.get('id') || 'DH20261127', date: '2026-11-27', customerId: DEMO_USER.id,
        customerName: DEMO_USER.name, phone: params.get('phone') || DEMO_USER.phone,
        receiver: params.get('receiver') || DEMO_USER.name, address: params.get('address') || DEMO_USER.addresses[0],
        city: 'TP. Hồ Chí Minh', district: 'Quận 1', payment: params.get('payment') || 'Tiền mặt khi nhận hàng',
        status: 'Chưa xác nhận', items: items.items, total: Number(params.get('total')) || items.total, isTransient: true
      });
    }
    customerOrders.sort((a, b) => b.date.localeCompare(a.date));
    host.innerHTML = customerOrders.map(order => {
      const detail = order.isTransient ? `order-detail.html?${orderUrlParams(order)}` : `order-detail.html?id=${encodeURIComponent(order.id)}`;
      return `<section class="order-history-card panel">
        <div class="order-history-head"><div><h2>Đơn hàng #${esc(order.id)}</h2><p class="muted">Ngày đặt: ${dateVi(order.date)} · Thanh toán: ${esc(order.payment)}</p></div>
        <span class="tag ${order.status === 'Chưa xác nhận' || order.status === 'Đã xác nhận' ? 'orange' : order.status === 'Đã hủy' ? 'red' : ''}">${esc(order.status)}</span></div>
        <div class="delivery-meta"><span><strong>Người nhận:</strong> ${esc(order.receiver)} · ${esc(order.phone)}</span><span><strong>Địa chỉ:</strong> ${esc(order.address)}</span></div>
        <div class="table-wrap"><table><thead><tr><th>Sản phẩm</th><th>Đơn giá</th><th>Số lượng</th><th>Thành tiền</th></tr></thead><tbody>${order.items.map(item => `<tr><td>${esc(item.name)}</td><td>${money(item.price)}</td><td>${item.qty}</td><td>${money(item.price * item.qty)}</td></tr>`).join('')}</tbody></table></div>
        <div class="order-history-total"><span>Tổng đơn hàng</span><strong>${money(order.total)}</strong></div>
        <div class="form-actions"><a class="btn secondary" href="${detail}">Xem chi tiết đơn</a></div>
      </section>`;
    }).join('');
    const notices = $$('.notice-blue', main);
    if (notices[0]) notices[0].innerHTML = `Đang hiển thị ${customerOrders.length} đơn hàng mẫu của <strong>${esc(DEMO_USER.name)}</strong>. Đơn vừa thao tác chỉ được truyền theo đường dẫn để minh họa, không được lưu.`;
    const oldCards = $$('.order-history-card', main).filter(card => card !== host && !host.contains(card));
    oldCards.forEach(card => card.remove());
    if (!host.isConnected) (notices[0] || $('.page-title', main) || main).after(host);
  }

  function renderOrderDetail() {
    if (page !== 'order-detail.html') return;
    let baseOrder = ORDERS.find(item => item.id === params.get('id')) || ORDERS[0];
    if (params.get('id') === 'DH20261127' && params.has('cart')) {
      const details = cartDetails(parseCartString(params.get('cart')));
      baseOrder = { ...baseOrder, id: 'DH20261127', date: '2026-11-27', items: details.items, total: Number(params.get('total')) || details.total, status: 'Chưa xác nhận' };
    }
    const order = { ...baseOrder, address: params.get('address') || baseOrder.address, payment: params.get('payment') || baseOrder.payment, receiver: params.get('receiver') || baseOrder.receiver, phone: params.get('phone') || baseOrder.phone };
    const target = $('[data-order-detail]');
    if (!target) return;
    const orderStatuses = ['Chưa xác nhận', 'Đã xác nhận', 'Đã giao thành công', 'Đã hủy'];
    target.innerHTML = `<div class="order-history-head"><div><span class="badge">Mã đơn ${esc(order.id)}</span><h1>Chi tiết đơn hàng</h1><p class="muted">Ngày đặt: ${dateVi(order.date)}</p></div>
      <div class="field order-status-field"><label for="order-detail-status">Trạng thái đơn hàng</label><select id="order-detail-status" name="status">${orderStatuses.map(status => `<option${status === order.status ? ' selected' : ''}>${esc(status)}</option>`).join('')}</select></div></div>
      <h2>Thông tin giao hàng</h2><div class="delivery-meta"><span><strong>Người nhận:</strong> ${esc(order.receiver)} · ${esc(order.phone)}</span><span><strong>Địa chỉ:</strong> ${esc(order.address)}</span></div>
      <h2>Sản phẩm trong đơn</h2><div class="table-wrap"><table><thead><tr><th>Sản phẩm</th><th>Đơn giá</th><th>Số lượng</th><th>Thành tiền</th></tr></thead><tbody>${order.items.map(item => `<tr><td>${esc(item.name)}</td><td>${money(item.price)}</td><td>${item.qty}</td><td>${money(item.price * item.qty)}</td></tr>`).join('')}</tbody></table></div>
      <div class="summary-row"><span>Phương thức thanh toán</span><strong>${esc(order.payment)}</strong></div><div class="summary-row total"><span>Tổng đơn hàng</span><strong>${money(order.total)}</strong></div>
      <div class="form-actions"><a class="btn" href="order-history.html${params.has('cart') ? `?demoOrder=1&${orderUrlParams(order)}` : ''}">Quay lại lịch sử mua hàng</a><a class="btn secondary" href="products.html">Tiếp tục mua sắm</a></div>
      <p class="help">Đây là chi tiết đơn hàng mẫu truyền qua URL, không phải dữ liệu được lưu trên hệ thống.</p>`;
  }

  function renderProfile() {
    if (page !== 'customer-profile.html') return;
    const layout = $('.customer-account-layout');
    if (layout) {
      const addressPanel = layout.nextElementSibling;
      const customer = DEMO_USER;
      layout.innerHTML = `<div class="account-avatar">👤</div><div><h2>${esc(customer.name)}</h2><span class="tag">Tài khoản demo</span><dl class="account-details"><div><dt>Mã khách hàng</dt><dd>${customer.id}</dd></div><div><dt>Email</dt><dd>${esc(customer.email)}</dd></div><div><dt>Số điện thoại</dt><dd>${esc(customer.phone)}</dd></div><div><dt>Trạng thái</dt><dd>Hoạt động (mẫu)</dd></div></dl><div class="form-actions"><a class="btn" href="order-history.html">Xem lịch sử mua hàng</a><a class="btn secondary" href="edit-profile.html">Chỉnh sửa thông tin</a></div></div>`;
      if (addressPanel) addressPanel.innerHTML = `<h2>Địa chỉ giao hàng mẫu</h2><div class="saved-address-grid">${customer.addresses.map((address, index) => `<article class="saved-address"><strong>${index === 0 ? 'Nhà riêng · Mặc định' : 'Địa chỉ ' + (index + 1)}</strong><p>${esc(address)}</p></article>`).join('')}</div><a class="btn secondary" href="edit-profile.html">＋ Thêm / chỉnh sửa địa chỉ</a>`;
    }
    if (params.get('updated') === '1') toast('Cập nhật thông tin thành công!', 'success');
  }

  function setupProfileForm() {
    const form = $('[data-profile-form]');
    if (!form) return;
    form.dataset.staticHandler = '1';

    const addressList = $('[data-profile-addresses]', form);
    const addAddress = $('[data-add-profile-address]', form);
    if (addressList && addAddress) {
      let nextAddressId = addressList.querySelectorAll('[data-profile-address]').length + 1;
      addAddress.addEventListener('click', () => {
        const addressId = `profile-address-${nextAddressId}`;
        const addressNumber = nextAddressId++;
        const field = document.createElement('div');
        field.className = 'field full';
        field.dataset.profileAddress = '';
        field.innerHTML = `<label for="${addressId}">Địa chỉ mới ${addressNumber - 1}</label><input id="${addressId}" name="addresses[]" type="text" autocomplete="street-address" placeholder="Nhập số nhà, tên đường, phường / xã" required><button class="btn secondary" type="button" data-remove-profile-address>Gỡ địa chỉ</button>`;
        addressList.appendChild(field);
        $(`#${addressId}`, field).focus();
      });
      addressList.addEventListener('click', event => {
        const removeAddress = event.target.closest('[data-remove-profile-address]');
        if (removeAddress) removeAddress.closest('[data-profile-address]')?.remove();
      });
    }

    form.addEventListener('submit', event => {
      event.preventDefault();
      go('customer-profile.html?updated=1');
    });
  }

  function safePublicReturn(defaultPage) {
    const next = params.get('next');
    if (!next) return defaultPage;
    const allowedPages = ['index.html', 'home-logged-in.html', 'products.html', 'product-filter.html', 'product-detail.html', 'cart.html', 'checkout.html', 'edit-profile.html', 'order-confirmation.html', 'order-history.html', 'order-detail.html', 'customer-profile.html'];
    try {
      const target = new URL(next, location.href);
      const routeName = target.pathname.split('/').pop();
      if (target.origin === location.origin && allowedPages.includes(routeName)) {
        return routeName + target.search + target.hash;
      }
    } catch (_) { /* fall back to the normal page */ }
    return defaultPage;
  }

  function setupAuthForms() {
    const login = $('#customer-login');
    if (login) login.addEventListener('submit', event => {
      event.preventDefault();
      go(safePublicReturn('home-logged-in.html'));
    });

    const register = $('form[data-demo-register]') || $$('form').find(form => $('#fullname', form) && $('#confirm-password', form));
    if (register) register.addEventListener('submit', event => {
      event.preventDefault();
      go(safePublicReturn('index.html'));
    });

    const registerLink = $('a[href="register.html"]');
    if (registerLink && params.has('next')) registerLink.href = `register.html?next=${encodeURIComponent(params.get('next'))}`;

    const adminLogin = $('#admin-login');
    if (adminLogin) adminLogin.addEventListener('submit', event => {
      event.preventDefault();
      go('admin/index.html');
    });
  }

  function initCheckout() {
    if (page !== 'checkout.html') return;
    // Checkout trong website demo dùng dữ liệu mẫu cố định giống trang cart.
    const items = SAMPLE_CART.map(item => ({ ...item }));
    const details = cartDetails(items);
    const summary = $('.order-summary-panel');
    if (summary) {
      summary.innerHTML = `<h2>Đơn hàng của bạn</h2>
        ${details.items.map(item => `<div class="summary-product"><img src="${esc(item.image)}" alt="${esc(item.name)}"><div><strong>${esc(item.name)}</strong><small>Số lượng: ${item.qty}</small></div><b>${money(item.price * item.qty)}</b></div>`).join('')}
        <div class="summary-row"><span>Tạm tính</span><strong>${money(details.total)}</strong></div><div class="summary-row"><span>Phí giao hàng</span><strong>Miễn phí</strong></div><div class="summary-row total"><span>Tổng cộng</span><strong>${money(details.total)}</strong></div>
        <div class="notice" style="margin-top:16px;margin-bottom:0">Đơn hàng hiển thị bằng dữ liệu mẫu cố định, không được lưu.</div>`;
    }
    const userInputs = $$('.checkout-grid input[readonly]');
    if (userInputs.length >= 3) { userInputs[0].value = DEMO_USER.name; userInputs[1].value = DEMO_USER.phone; userInputs[2].value = DEMO_USER.email; }
    const button = $$('button').find(item => /Xác nhận đặt hàng|Đặt hàng/i.test(item.textContent));
    if (button) button.addEventListener('click', placeDemoOrder);
    initAddressSelector();
  }

  function renderAdminProducts() {
    if (!isAdmin || page !== 'products.html') return;
    const table = $$('table').find(item => item.querySelector('thead')?.textContent.includes('Mã SP'));
    if (!table) return;
    const filterForm = $('.admin-filter-bar');
    const keyword = clean($('input[type="search"]', filterForm || document)?.value).toLocaleLowerCase('vi');
    const category = clean($('select[name="category"]', filterForm || document)?.value);
    const status = clean($('select[name="status"]', filterForm || document)?.value);
    const rows = adminProducts.filter(item => {
      const matchText = !keyword || `${item.id} ${item.name} ${item.category}`.toLocaleLowerCase('vi').includes(keyword);
      const matchCategory = !category || item.category === category;
      const matchStatus = !status || (status === 'Sắp hết' ? item.stock <= 5 : ['Đang bán', 'Đang kinh doanh'].includes(status) ? item.active : ['Ngừng kinh doanh', 'Đã ẩn'].includes(status) ? !item.active : true);
      return matchText && matchCategory && matchStatus;
    });
    $('tbody', table).innerHTML = rows.map(item => `<tr>
      <td>${item.id}</td><td>${esc(item.name)}</td><td>${esc(item.category)}</td><td>${money(item.price)}</td><td>${item.stock}</td><td>${item.sold}</td>
      <td><span class="tag ${!item.active ? 'red' : item.stock <= 5 ? 'orange' : ''}">${!item.active ? 'Đã ẩn' : item.stock <= 5 ? 'Sắp hết' : 'Đang kinh doanh'}</span></td>
      <td><a href="edit-product.html">Sửa</a> · <a class="table-action" href="../product-detail.html?id=${item.id}">Xem chi tiết</a> · ${item.sold > 0 ? `<a class="table-action" href="products.html?action=status&amp;id=${encodeURIComponent(item.id)}#toast-status">${item.active ? 'Ẩn khỏi website' : 'Hiện lại'}</a>` : `<a class="table-action danger" href="products.html?action=delete&amp;id=${encodeURIComponent(item.id)}#toast-deleted">Xóa</a>`}</td>
    </tr>`).join('') || '<tr><td colspan="8">Không có sản phẩm phù hợp.</td></tr>';
    const count = $('[data-filter-count]'); if (count) count.textContent = `${rows.length} sản phẩm`;
    renderStaticPagination(table, 5);
  }

  function renderAdminCustomers() {
    if (!isAdmin || page !== 'customers.html') return;
    const table = $$('table').find(item => item.querySelector('thead')?.textContent.includes('Mã KH'));
    if (!table) return;
    const form = $('.admin-filter-bar');
    const keyword = clean($('input[type="search"]', form || document)?.value).toLocaleLowerCase('vi');
    const status = clean($('select', form || document)?.value);
    const rows = adminCustomers.filter(customer => {
      const match = !keyword || `${customer.id} ${customer.name} ${customer.email} ${customer.phone}`.toLocaleLowerCase('vi').includes(keyword);
      const matchStatus = !status || status === 'Tất cả trạng thái' || (['Hoạt động', 'Đang hoạt động'].includes(status) ? customer.status === 'Hoạt động' : ['Ngừng hoạt động', 'Khóa'].includes(status) ? customer.status === 'Khóa' : true);
      return match && matchStatus;
    });
    $('tbody', table).innerHTML = rows.map(customer => {
      const own = ORDERS.filter(order => order.customerId === customer.id);
      const spent = own.filter(order => order.status !== 'Đã hủy').reduce((sum, order) => sum + order.total, 0);
      return `<tr><td>${customer.id}</td><td>${esc(customer.name)}</td><td>${esc(customer.phone)}</td><td>${esc(customer.email)}</td><td>${own.length}</td><td>${money(spent)}</td>
        <td><span class="tag ${customer.status === 'Khóa' ? 'red' : ''}">${customer.status}</span></td>
        <td><a class="table-action" href="customer-view.html?id=${customer.id}">Xem</a> · <a class="table-action" href="customer-form.html?id=${customer.id}">Sửa</a> · <a class="table-action ${customer.status === 'Hoạt động' ? 'danger' : ''}" href="customers.html?action=status&amp;id=${encodeURIComponent(customer.id)}#toast-status">${customer.status === 'Hoạt động' ? 'Khóa tài khoản' : 'Mở khóa'}</a> · <a class="table-action danger" href="customers.html?action=delete&amp;id=${encodeURIComponent(customer.id)}#toast-deleted">Xóa</a></td></tr>`;
    }).join('') || '<tr><td colspan="8">Không tìm thấy khách hàng.</td></tr>';
    const count = $('[data-filter-count]'); if (count) count.textContent = `${rows.length} khách hàng`;
    renderStaticPagination(table, 5);
  }

  function renderAdminOrders() {
    if (!isAdmin || page !== 'orders.html') return;
    const table = $('.orders-admin-table'); if (!table) return;
    const keyword = clean($('#order-keyword')?.value).toLocaleLowerCase('vi');
    const status = clean($('#order-status-filter')?.value);
    const from = clean($('#order-from')?.value); const to = clean($('#order-to')?.value);
    const city = clean($('#order-city')?.value); const district = clean($('#order-district')?.value).toLocaleLowerCase('vi');
    const rows = adminOrders.filter(order => {
      return (!keyword || `${order.id} ${order.customerName}`.toLocaleLowerCase('vi').includes(keyword)) &&
        (!status || status === 'Tất cả tình trạng' || order.status === status) && (!from || order.date >= from) && (!to || order.date <= to) &&
        (!city || city === 'Tất cả địa điểm' || order.city === city) && (!district || order.district.toLocaleLowerCase('vi').includes(district));
    });
    $('tbody', table).innerHTML = rows.map(order => {
      const tag = order.status === 'Đã hủy' ? 'red' : order.status === 'Đã giao thành công' ? '' : 'orange';
      return `<tr><td><strong>${order.id}</strong></td><td>${dateVi(order.date)}</td><td>${esc(order.customerName)}<br><small>${order.customerId} · ${esc(order.phone)}</small></td>
        <td><strong>Người nhận:</strong> ${esc(order.receiver)}<br><small>${esc(order.address)}</small></td><td>${esc(order.payment)}</td><td>${money(order.total)}</td>
        <td><span class="tag ${tag}">${esc(order.status)}</span></td>
        <td><a href="form-invoice.html?id=${encodeURIComponent(order.id)}">Chi tiết</a></td></tr>`;
    }).join('') || '<tr><td colspan="8">Không tìm thấy đơn hàng phù hợp.</td></tr>';
    renderStaticPagination(table, 5);
  }

  function renderAdminStats() {
    if (!isAdmin || page !== 'index.html') return;
    const from = $('#stats-from')?.value || '1900-01-01';
    const to = $('#stats-to')?.value || '2999-12-31';
    const periodOrders = ORDERS.filter(order => order.date >= from && order.date <= to);
    const validOrders = periodOrders.filter(order => order.status !== 'Đã hủy');
    const deliveredOrders = validOrders.filter(order => order.status === 'Đã giao thành công');
    const customerCount = new Set(validOrders.map(order => order.customerId)).size;
    const sum = list => list.reduce((total, order) => total + order.total, 0);

    const values = {
      revenue: money(sum(deliveredOrders)),
      orders: String(periodOrders.length),
      customers: String(customerCount),
      pending: String(periodOrders.filter(order => order.status === 'Chưa xác nhận').length),
      valid: money(sum(validOrders)),
      delivered: String(deliveredOrders.length),
      cancelled: String(periodOrders.filter(order => order.status === 'Đã hủy').length)
    };
    Object.entries(values).forEach(([key, value]) => {
      const node = $(`#kpi-${key}`);
      if (node) node.textContent = value;
    });

    const grouped = new Map();
    validOrders.forEach(order => {
      const customer = grouped.get(order.customerId) || { id: order.customerId, name: order.customerName, orders: [], total: 0 };
      customer.orders.push(order);
      customer.total += order.total;
      grouped.set(order.customerId, customer);
    });
    const top = Array.from(grouped.values()).sort((a, b) => b.total - a.total).slice(0, 5);
    const ranking = $('#top-customers-body');
    if (ranking) {
      ranking.innerHTML = top.map((customer, index) => {
        const orders = customer.orders.slice().sort((a, b) => b.date.localeCompare(a.date));
        const orderLinks = orders.map(order => `<li><a href="form-invoice.html?id=${encodeURIComponent(order.id)}">${esc(order.id)}</a> · ${dateVi(order.date)} · ${money(order.total)}</li>`).join('');
        return `<tr><td><strong>${index + 1}</strong></td><td>${customer.id}</td><td>${esc(customer.name)}</td><td>${orders.length}</td><td><strong>${money(customer.total)}</strong></td><td><details><summary>Xem ${orders.length} đơn hàng</summary><ul>${orderLinks}</ul></details></td></tr>`;
      }).join('') || '<tr><td colspan="6">Không có dữ liệu trong khoảng thời gian đã chọn.</td></tr>';
    }

    const recent = $('#recent-orders-body');
    if (recent) {
      recent.innerHTML = periodOrders.slice().sort((a, b) => b.date.localeCompare(a.date)).slice(0, 5).map(order => {
        const statusClass = order.status === 'Đã hủy' ? 'red' : order.status === 'Chưa xác nhận' || order.status === 'Đã xác nhận' ? 'orange' : '';
        return `<tr><td><strong>${esc(order.id)}</strong></td><td>${esc(order.customerName)}</td><td>${dateVi(order.date)}</td><td>${money(order.total)}</td><td><span class="tag ${statusClass}">${esc(order.status)}</span></td><td><a href="form-invoice.html?id=${encodeURIComponent(order.id)}">Xem chi tiết</a></td></tr>`;
      }).join('') || '<tr><td colspan="6">Không có đơn hàng trong khoảng thời gian này.</td></tr>';
    }

    const chart = $('#revenue-chart');
    if (chart) {
      const months = new Map();
      deliveredOrders.forEach(order => {
        const key = order.date.slice(0, 7);
        months.set(key, (months.get(key) || 0) + order.total);
      });
      const orderedMonths = Array.from(months.entries()).sort((a, b) => a[0].localeCompare(b[0]));
      const maximum = Math.max(1, ...orderedMonths.map(([, amount]) => amount));
      chart.innerHTML = orderedMonths.length ? orderedMonths.map(([month, amount]) => {
        const percent = Math.max(4, Math.round(amount / maximum * 100));
        const [year, monthNumber] = month.split('-');
        return `<div class="revenue-row"><strong>${monthNumber}/${year}</strong><div class="revenue-track"><div class="revenue-fill" style="width:${percent}%"></div></div><span class="revenue-value">${money(amount)}</span></div>`;
      }).join('') : '<p class="muted">Không có doanh thu đã giao trong khoảng thời gian này.</p>';
    }
    const rangeLabel = $('#chart-range-label');
    if (rangeLabel) rangeLabel.textContent = `Từ ${from ? dateVi(from) : 'đầu kỳ'} đến ${to ? dateVi(to) : 'hiện tại'}`;
  }

  function renderAdminEmployees() {
    if (!isAdmin || page !== 'employees.html') return;
    const keyword = clean($('#employee-keyword')?.value).toLocaleLowerCase('vi');
    const status = clean($('#employee-status-filter')?.value);
    const rows = adminEmployees.filter(employee => {
      const searchable = `${employee.id} ${employee.name} ${employee.email} ${employee.username} ${employee.position}`.toLocaleLowerCase('vi');
      return (!keyword || searchable.includes(keyword)) && (!status || employee.status === status);
    });
    const body = $('#employee-table-body');
    if (body) {
      body.innerHTML = rows.map(employee => {
        const detailQuery = new URLSearchParams({ id: employee.id, name: employee.name, position: employee.position, phone: employee.phone, email: employee.email, username: employee.username, hireDate: employee.hireDate || '', status: employee.status }).toString();
        return `<tr>
          <td><strong>${esc(employee.id)}</strong></td><td>${esc(employee.name)}</td><td>${esc(employee.position)}</td><td>${esc(employee.phone)}</td>
          <td>${esc(employee.email)}<br><small class="muted">${esc(employee.username)}</small></td><td>${employee.hireDate ? dateVi(employee.hireDate) : '—'}</td>
          <td><span class="tag ${employee.status === 'Đã khóa' ? 'red' : ''}">${employee.status}</span></td>
          <td><div class="employee-actions"><a href="employee-view.html?${detailQuery}">Xem</a><a href="employee-form.html?id=${encodeURIComponent(employee.id)}">Sửa</a><a class="${employee.status === 'Hoạt động' ? 'danger' : ''}" href="employees.html?action=status&amp;id=${encodeURIComponent(employee.id)}#toast-status">${employee.status === 'Hoạt động' ? 'Khóa' : 'Mở khóa'}</a><a class="danger" href="employees.html?action=delete&amp;id=${encodeURIComponent(employee.id)}#toast-deleted">Xóa</a></div></td>
        </tr>`;
      }).join('') || '<tr><td colspan="8">Không tìm thấy nhân viên phù hợp.</td></tr>';
    }
    const total = $('#employee-total'); if (total) total.textContent = String(adminEmployees.length);
    const active = $('#employee-active'); if (active) active.textContent = String(adminEmployees.filter(item => item.status === 'Hoạt động').length);
    const locked = $('#employee-locked'); if (locked) locked.textContent = String(adminEmployees.filter(item => item.status === 'Đã khóa').length);
    const count = $('#employee-filter-count'); if (count) count.textContent = `${rows.length} nhân viên`;
    const employeeTable = $('#employee-table-body')?.closest('table');
    if (employeeTable) renderStaticPagination(employeeTable, 5);

  }

  function renderAdminEmployeeForm() {
    if (!isAdmin || page !== 'employee-form.html') return;
    const employee = EMPLOYEES.find(item => item.id === params.get('id'));
    if (!employee) return;
    const fields = {
      id: $('#employee-id'), name: $('#employee-name'), position: $('#employee-position'), phone: $('#employee-phone'),
      email: $('#employee-email'), username: $('#employee-username'), hireDate: $('#employee-hire-date'), status: $('#employee-account-status')
    };
    if (fields.id) { fields.id.value = employee.id; fields.id.readOnly = true; }
    if (fields.name) fields.name.value = employee.name;
    if (fields.position) fields.position.value = employee.position;
    if (fields.phone) fields.phone.value = employee.phone;
    if (fields.email) fields.email.value = employee.email;
    if (fields.username) fields.username.value = employee.username;
    if (fields.hireDate) fields.hireDate.value = employee.hireDate || '';
    if (fields.status) fields.status.value = employee.status;
    const title = $('#employee-form-title'); if (title) title.textContent = `Sửa nhân viên ${employee.id}`;
    const save = $('#employee-save-button');
    if (save) { save.textContent = 'Lưu thay đổi'; save.href = 'employees.html?action=update#toast-updated'; }
    const form = $('#employee-form'); if (form) form.action = 'employees.html?action=update#toast-updated';
  }

  function initAdminProductForm() {
    if (!isAdmin || page !== 'form-product.html') return;
    const form = $('#product-form') || $$('form').find(item => $('#product-id', item) && $('#product-name', item) && $('#product-image', item));
    if (!form) return;
    const product = PRODUCTS.find(item => item.id === params.get('id'));
    const fields = {
      id: $('#product-id', form), name: $('#product-name', form), category: $('#category', form),
      warranty: $('#warranty', form), description: $('#description', form), status: $('#status', form)
    };
    if (product) {
      if (fields.id) fields.id.value = product.id;
      if (fields.name) fields.name.value = product.name;
      if (fields.category) fields.category.value = product.category;
      if (fields.warranty) fields.warranty.value = product.warranty;
      if (fields.description) fields.description.value = product.description;
      if (fields.status) fields.status.value = product.active ? 'Đang kinh doanh' : 'Ngừng kinh doanh';
      const preview = $('[data-image-preview]');
      if (preview) { preview.src = asset(product.image); preview.hidden = false; }
      const label = $('.upload-preview-wrap strong');
      if (label) label.textContent = 'Ảnh hiện tại: ' + product.name;
      const title = $('main h1');
      if (title) title.textContent = 'Chỉnh sửa sản phẩm ' + product.id;
    } else {
      if (fields.id) { fields.id.value = ''; fields.id.placeholder = 'Ví dụ: SP009'; }
      if (fields.name) fields.name.value = '';
      if (fields.category) fields.category.value = '';
      if (fields.warranty) fields.warranty.value = '';
      if (fields.description) fields.description.value = '';
      if (fields.status) fields.status.value = 'Đang kinh doanh';
      const preview = $('[data-image-preview]');
      if (preview) { preview.removeAttribute('src'); preview.hidden = true; }
      const empty = $('[data-image-empty]');
      if (empty) empty.hidden = false;
      const label = $('.upload-preview-wrap strong');
      if (label) label.textContent = 'Chưa chọn ảnh sản phẩm';
      const title = $('main h1');
      if (title) title.textContent = 'Thêm sản phẩm mới';
    }
    const file = $('#product-image', form);
    if (file) file.addEventListener('change', () => {
      const chosen = file.files && file.files[0];
      if (!chosen) return;
      if (!chosen.type.startsWith('image/')) { file.value = ''; return; }
      const reader = new FileReader();
      reader.onload = () => {
        const preview = $('[data-image-preview]');
        if (preview) { preview.src = reader.result; preview.hidden = false; }
        const empty = $('[data-image-empty]');
        if (empty) empty.hidden = true;
      };
      reader.readAsDataURL(chosen);
    });

  }

  function renderAdminProductView() {
    if (!isAdmin || page !== 'product-view.html') return;
    const product = PRODUCTS.find(item => item.id === params.get('id')) || PRODUCTS[0];
    const image = $('#view-image'); if (image) { image.src = asset(product.image); image.alt = product.name; }
    const name = $('#view-name'); if (name) name.textContent = product.name;
    const code = $('#view-code'); if (code) code.textContent = `Mã sản phẩm: ${product.id}`;
    const price = $('#view-price'); if (price) price.textContent = money(product.price);
    const category = $('#view-category'); if (category) category.textContent = product.category;
    const stock = $('#view-stock'); if (stock) stock.textContent = product.stock;
    const desc = $('#view-desc'); if (desc) desc.textContent = product.description;
    const spec = $('#view-spec'); if (spec) spec.textContent = `${product.description} · Bảo hành ${product.warranty}`;
    const tag = $('.admin-product-info .tag'); if (tag) { tag.textContent = product.active ? 'Đang kinh doanh' : 'Đã ẩn'; tag.classList.toggle('red', !product.active); }
    const back = $('.admin-product-info a.btn.secondary');
    if (back) { back.href = 'products.html'; back.textContent = 'Quay lại danh sách'; }
    const storefrontLink = $('#view-storefront-link');
    if (storefrontLink) { storefrontLink.href = `../product-detail.html?id=${encodeURIComponent(product.id)}`; storefrontLink.textContent = `Xem chi tiết ${product.name} trên cửa hàng`; }
    let edit = $('#view-edit-link');
    if (!edit && back) { edit = document.createElement('a'); edit.id = 'view-edit-link'; edit.className = 'btn'; back.insertAdjacentElement('beforebegin', edit); }
    if (edit) { edit.href = `form-product.html?id=${product.id}`; edit.textContent = 'Chỉnh sửa sản phẩm'; }
    const title = $('main h1'); if (title) title.textContent = `Thông tin sản phẩm ${product.id}`;
  }

  function renderAdminCustomerView() {
    if (!isAdmin || page !== 'customer-view.html') return;
    const customer = CUSTOMERS.find(item => item.id === params.get('id')) || CUSTOMERS[0];
    const ownOrders = ORDERS.filter(order => order.customerId === customer.id);
    const total = ownOrders.filter(order => order.status !== 'Đã hủy').reduce((sum, order) => sum + order.total, 0);
    const view = $('.record-view');
    if (!view) return;
    const badge = $('.badge', view); if (badge) badge.textContent = `Mã: ${customer.id}`;
    const title = $('h2', view); if (title) title.textContent = customer.name;
    const values = [customer.phone, customer.email, String(ownOrders.length), money(total), customer.addresses[0] || 'Chưa có địa chỉ'];
    $$('.detail-list dd', view).forEach((field, index) => { if (values[index] !== undefined) field.textContent = values[index]; });
  }

  function renderAdminCustomerForm() {
    if (!isAdmin || page !== 'customer-form.html') return;
    const customer = CUSTOMERS.find(item => item.id === params.get('id'));
    if (!customer) return;
    const fields = {
      id: $('#customer-id'), name: $('#customer-name'), phone: $('#customer-phone'),
      email: $('#customer-email'), address: $('#customer-address'), status: $('#customer-status')
    };
    if (fields.id) { fields.id.value = customer.id; fields.id.readOnly = true; }
    if (fields.name) fields.name.value = customer.name;
    if (fields.phone) fields.phone.value = customer.phone;
    if (fields.email) fields.email.value = customer.email;
    if (fields.address) fields.address.value = customer.addresses[0] || '';
    if (fields.status) fields.status.value = customer.status === 'Khóa' ? 'Khóa' : 'Hoạt động';
    const title = $('#customer-form-title'); if (title) title.textContent = `Sửa khách hàng ${customer.id}`;
    const save = $('#customer-save-button');
    if (save) { save.textContent = 'Lưu thay đổi'; save.href = 'customers.html?action=update#toast-updated'; }
    const form = $('#customer-form'); if (form) form.action = 'customers.html?action=update#toast-updated';
  }

  function initAdminCustomerForm() {
    if (!isAdmin || page !== 'customer-form.html') return;
    const form = $$('form').find(item => $('#customer-id', item) && $('#customer-name', item) && $('#customer-status', item));
    if (!form) return;
    form.addEventListener('submit', event => {
      event.preventDefault();
      if (!clean($('#customer-id', form).value) || !clean($('#customer-name', form).value) || !clean($('#customer-phone', form).value) || !clean($('#customer-email', form).value)) {
        toast('Vui lòng nhập mã khách hàng, họ tên, số điện thoại và email.'); return;
      }
      toast('Thông tin khách hàng hợp lệ. Đây là bản demo tĩnh nên dữ liệu không được lưu.');
      form.reset();
    });
  }

  function renderAdminInvoice() {
    if (!isAdmin || page !== 'form-invoice.html') return;
    const order = adminOrders.find(item => item.id === params.get('id')) || adminOrders[0];
    const title = $('main h1'); if (title) title.textContent = 'Chi tiết đơn hàng ' + order.id;
    const id = $('#invoice-id'); if (id) { id.value = order.id; id.readOnly = true; }
    const date = $('#invoice-date'); if (date) { date.value = order.date; date.readOnly = true; }
    const customer = $('#customer'); if (customer) { customer.value = `${order.customerId} - ${order.customerName}`; customer.readOnly = true; }
    const employee = $('#employee'); if (employee) { employee.value = 'NV001 - Lê Thanh Tùng'; employee.readOnly = true; }
    const payment = $('#payment-method'); if (payment) { payment.value = order.payment; payment.readOnly = true; }
    const statusOrderId = $('#order-status-id'); if (statusOrderId) statusOrderId.value = order.id;
    const receiver = $('#receiver-name'); if (receiver) { receiver.value = order.receiver; receiver.readOnly = true; }
    const phone = $('#receiver-phone'); if (phone) { phone.value = order.phone; phone.readOnly = true; }
    const address = $('#receiver-address'); if (address) { address.value = order.address; address.readOnly = true; }
    const status = $('#status'); if (status) status.value = order.status;
    const itemTable = $$('table').find(table => table.querySelector('thead')?.textContent.includes('Sản phẩm'));
    if (itemTable) $('tbody', itemTable).innerHTML = order.items.map(item => `<tr><td>${esc(item.name)}</td><td>${item.qty}</td><td>${money(item.price)}</td><td>${money(item.price * item.qty)}</td></tr>`).join('');
    const total = $('.summary-row.total');
    if (total) total.innerHTML = `<span>Tổng thanh toán</span><strong>${money(order.total)}</strong>`;
  }

  function renderAdminSupplierView() {
    if (!isAdmin || page !== 'supplier-view.html') return;
    const id = params.get('id') || 'NCC001';
    const supplier = SUPPLIERS.find(item => item.id === id) || SUPPLIERS[0];
    const fields = {
      name: $('#supplier-view-name'), id: $('#supplier-view-id'), phone: $('#supplier-view-phone'),
      email: $('#supplier-view-email'), address: $('#supplier-view-address'), status: $('#supplier-view-status')
    };
    if (fields.name) fields.name.textContent = supplier.name;
    if (fields.id) fields.id.textContent = `Mã nhà cung cấp: ${supplier.id}`;
    if (fields.phone) fields.phone.textContent = supplier.phone;
    if (fields.email) fields.email.textContent = supplier.email;
    if (fields.address) fields.address.textContent = supplier.address;
    if (fields.status) fields.status.textContent = supplier.status;
    const body = $('#supplier-import-history');
    if (body) {
      const records = IMPORTS.filter(item => item.supplierId === supplier.id);
      body.innerHTML = records.map(item => `<tr><td>${esc(item.id)}</td><td>${dateVi(item.date)}</td><td>${esc(item.employee)}</td><td>${item.items.length}</td><td>${money(item.total)}</td><td><a href="import-view.html?id=${encodeURIComponent(item.id)}">Xem phiếu</a></td></tr>`).join('') || '<tr><td colspan="6">Nhà cung cấp chưa có phiếu nhập mẫu.</td></tr>';
    }
  }

  function renderAdminImportView() {
    if (!isAdmin || page !== 'import-view.html') return;
    const record = IMPORTS.find(item => item.id === params.get('id')) || IMPORTS[0];
    const supplier = record.supplier;
    const put = (selector, value) => { const node = $(selector); if (node) node.textContent = value; };
    put('#import-view-id', record.id);
    put('#import-view-status', record.status);
    put('#import-view-date', dateVi(record.date));
    put('#import-view-supplier', `${supplier.id} - ${supplier.name}`);
    put('#import-view-employee', record.employee);
    const body = $('#import-view-items');
    if (body) body.innerHTML = record.items.map(item => `<tr><td>${esc(item.productId)}</td><td>${esc(item.name)}</td><td>${item.quantity}</td><td>${money(item.importPrice)}</td><td>${money(item.salePrice)}</td><td><strong>${money(item.quantity * item.importPrice)}</strong></td></tr>`).join('');
    put('#import-view-total', money(record.total));
  }

  function setupImportEntry() {
    if (!isAdmin || page !== 'import-detail.html') return;
    const employeeField = $('#import-employee');
    if (employeeField && CURRENT_EMPLOYEE) {
      employeeField.value = `${CURRENT_EMPLOYEE.id} - ${CURRENT_EMPLOYEE.name}`;
      employeeField.readOnly = true;
    }
    const addButton = $('#add-import-item');
    if (addButton) addButton.addEventListener('click', () => toast('Đã thêm sản phẩm vào phiếu nhập.'));
    const form = $('#import-form');
    if (form) {
      form.dataset.staticHandler = '1';
      form.addEventListener('submit', event => {
        event.preventDefault();
        go('imports.html#toast-added');
      });
    }
  }

  function setupSupplierManagement() {
    if (!isAdmin || page !== 'supplier-form.html') return;
    const suppliers = [
      { id: 'NCC001', name: 'Công ty Phân phối ABC', phone: '028 1234 5678', email: 'sales@abc.example', address: 'TP. Hồ Chí Minh', status: 'Đang hợp tác' },
      { id: 'NCC002', name: 'Thiết bị số Minh Long', phone: '028 2345 6789', email: 'contact@minhlong.example', address: 'Bình Dương', status: 'Đang hợp tác' },
      { id: 'NCC003', name: 'Công nghệ Sao Việt', phone: '024 3456 7890', email: 'info@saoviet.example', address: 'Hà Nội', status: 'Ngừng hợp tác' }
    ];
    const selected = suppliers.find(item => item.id === params.get('id'));
    if (!selected) return;
    const put = (id, value) => { const field = $('#' + id); if (field) field.value = value; };
    put('supplier-id', selected.id);
    put('supplier-name', selected.name);
    put('supplier-phone', selected.phone);
    put('supplier-email', selected.email);
    put('supplier-address', selected.address);
    put('supplier-status', selected.status);
    const id = $('#supplier-id'); if (id) id.readOnly = true;
    const title = $('#supplier-form-title'); if (title) title.textContent = `Chỉnh sửa nhà cung cấp ${selected.id}`;
    const save = $('#supplier-save-button');
    if (save) { save.textContent = 'Cập nhật nhà cung cấp'; save.href = 'suppliers.html?action=update#toast-updated'; }
    const form = $('#supplier-form'); if (form) form.action = 'suppliers.html?action=update#toast-updated';
  }


  function setupAdminCategories() {
    if (!isAdmin || page !== 'category-form.html') return;
    const categories = [
      { id: 'DM01', name: 'Laptop', description: 'Máy tính xách tay', status: 'Đang sử dụng' },
      { id: 'DM02', name: 'Máy tính bộ', description: 'PC văn phòng và máy tính gaming', status: 'Đang sử dụng' },
      { id: 'DM03', name: 'Linh kiện', description: 'CPU, RAM, SSD, VGA và linh kiện khác', status: 'Đang sử dụng' },
      { id: 'DM04', name: 'Phụ kiện', description: 'Chuột, bàn phím, tai nghe và phụ kiện', status: 'Đang sử dụng' },
      { id: 'DM05', name: 'Màn hình', description: 'Màn hình máy tính và thiết bị hiển thị', status: 'Đang sử dụng' }
    ];
    const selected = categories.find(item => item.id === params.get('id'));
    if (!selected) return;
    const id = $('#category-id'); if (id) id.value = selected.id;
    if (id) id.readOnly = true;
    const name = $('#category-name'); if (name) name.value = selected.name;
    const description = $('#category-description'); if (description) description.value = selected.description;
    const status = $('#category-status'); if (status) status.value = selected.status;
    const title = $('#category-form-title'); if (title) title.textContent = `Chỉnh sửa danh mục ${selected.id}`;
    const save = $('#category-save-button'); if (save) { save.textContent = 'Cập nhật danh mục'; save.href = 'categories.html?action=update#toast-updated'; }
    const form = $('#category-form'); if (form) form.action = 'categories.html?action=update#toast-updated';
  }

  function setupAdminInteractions() {
    if (!isAdmin) return;
    const productFilter = $('.admin-filter-bar');
    if (productFilter && page === 'products.html') productFilter.addEventListener('submit', event => { event.preventDefault(); renderAdminProducts(); });
    const customerFilter = $('.admin-filter-bar');
    if (customerFilter && page === 'customers.html') customerFilter.addEventListener('submit', event => { event.preventDefault(); renderAdminCustomers(); });
    const supplierFilter = $('[data-supplier-filter]');
    if (supplierFilter) supplierFilter.addEventListener('submit', event => {
      event.preventDefault();
      const keyword = clean($('input[type=search]', supplierFilter)?.value).toLocaleLowerCase('vi');
      const status = clean($('select[name=status]', supplierFilter)?.value);
      const rows = $$('.suppliers-admin-table tbody tr');
      let visible = 0;
      rows.forEach(row => {
        const match = (!keyword || row.textContent.toLocaleLowerCase('vi').includes(keyword)) && (!status || row.textContent.includes(status));
        row.hidden = !match; if (match) visible++;
      });
      const count = $('[data-filter-count]', supplierFilter); if (count) count.textContent = `${visible} nhà cung cấp`;
    });
    if (supplierFilter) supplierFilter.addEventListener('reset', () => setTimeout(() => {
      $$('.suppliers-admin-table tbody tr').forEach(row => { row.hidden = false; });
      const count = $('[data-filter-count]', supplierFilter); if (count) count.textContent = '3 nhà cung cấp';
    }, 0));
    const importFilter = $('[data-import-filter]');
    if (importFilter) importFilter.addEventListener('submit', event => {
      event.preventDefault();
      const keyword = clean($('input[type=search]', importFilter)?.value).toLocaleLowerCase('vi');
      const status = clean($('select[name=status]', importFilter)?.value);
      const rows = $$('.imports-admin-table tbody tr');
      let visible = 0;
      rows.forEach(row => {
        const match = (!keyword || row.textContent.toLocaleLowerCase('vi').includes(keyword)) && (!status || row.textContent.includes(status));
        row.hidden = !match; if (match) visible++;
      });
      const count = $('[data-filter-count]', importFilter); if (count) count.textContent = `${visible} phiếu nhập`;
    });
    if (importFilter) importFilter.addEventListener('reset', () => setTimeout(() => {
      $$('.imports-admin-table tbody tr').forEach(row => { row.hidden = false; });
      const count = $('[data-filter-count]', importFilter); if (count) count.textContent = '2 phiếu nhập';
    }, 0));
    const orderFilter = $('.order-filter-grid');
    if (orderFilter) orderFilter.addEventListener('submit', event => { event.preventDefault(); const from = $('#order-from')?.value; const to = $('#order-to')?.value; if (from && to && from > to) { toast('Ngày bắt đầu không được lớn hơn ngày kết thúc.'); return; } renderAdminOrders(); });
    const statsFilter = $('.stats-filter');
    if (statsFilter) {
      statsFilter.addEventListener('submit', event => { event.preventDefault(); if ($('#stats-from')?.value > $('#stats-to')?.value) { toast('Ngày bắt đầu không được lớn hơn ngày kết thúc.'); return; } renderAdminStats(); });
      statsFilter.addEventListener('reset', () => setTimeout(renderAdminStats, 0));
    }

    document.addEventListener('click', event => {
      const visibility = event.target.closest('[data-product-visibility]');
      if (visibility) {
        const row = visibility.closest('tr');
        const tag = row?.querySelector('.tag');
        const isHiding = /Ẩn khỏi website/i.test(visibility.textContent);
        if (tag) {
          tag.textContent = isHiding ? 'Đã ẩn' : 'Đang kinh doanh';
          tag.classList.toggle('red', isHiding);
          tag.classList.toggle('orange', false);
        }
        visibility.textContent = isHiding ? 'Hiện lại' : 'Ẩn khỏi website';
        toast(isHiding ? 'Đã ẩn sản phẩm khỏi website.' : 'Đã hiển thị sản phẩm trên website.', isHiding ? 'warning' : 'success');
        return;
      }
      const removeProduct = event.target.closest('[data-product-delete]');
      if (removeProduct) {
        toast('Đã ghi nhận thao tác xóa sản phẩm (minh họa).', 'info');
        return;
      }
      const toggle = event.target.closest('[data-toggle-customer], [data-toggle-lock]');
      if (toggle) {
        const row = toggle.closest('tr');
        if (row) {
          const tag = row.querySelector('.tag');
          const isLocked = !/Mở khóa/i.test(toggle.textContent) && /Khóa/i.test(toggle.textContent);
          const nextStatus = isLocked ? 'Đã khóa' : 'Hoạt động';
          if (tag) {
            tag.textContent = nextStatus;
            tag.classList.toggle('red', isLocked);
            tag.classList.toggle('orange', false);
          }
          toggle.textContent = isLocked ? 'Mở khóa' : 'Khóa tài khoản';
          toggle.classList.toggle('danger', !isLocked);
          const id = toggle.dataset.toggleCustomer || row.cells?.[0]?.textContent.trim() || '';
          toast(isLocked ? `Đã khóa tài khoản ${id}.` : `Đã mở khóa tài khoản ${id}.`, isLocked ? 'warning' : 'success');
        }
        return;
      }
      const editCustomer = event.target.closest('[data-edit-customer]');
      if (editCustomer) {
        const item = adminCustomers.find(customer => customer.id === editCustomer.dataset.editCustomer);
        const form = $$('form').find(current => $('#customer-id', current));
        if (item && form) {
          $('#customer-id', form).value = item.id; $('#customer-name', form).value = item.name; $('#customer-phone', form).value = item.phone;
          $('#customer-email', form).value = item.email; $('#customer-status', form).value = item.status; $('#customer-address', form).value = item.addresses[0] || '';
          $('#them-kh')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        return;
      }
      const rowView = event.target.closest('[data-row-view]');
      if (rowView && rowView.dataset.detailPage) {
        const row = rowView.closest('tr');
        const id = row?.querySelector('td')?.textContent.trim();
        if (id) { go(`${rowView.dataset.detailPage}?id=${encodeURIComponent(id)}`); return; }
      }
      const generic = event.target.closest('[data-ui-note], [data-row-delete]');
      if (generic && !generic.matches('[data-product-visibility], [data-product-delete]')) {
        toast(generic.dataset.message || 'Thao tác thành công! (Mô phỏng giao diện, không lưu dữ liệu).', 'success');
      }
    });

  }


  function setupGuestLandingLinks() {
    // Admin cũng có file index.html riêng; không áp dụng chặn đăng nhập khách vào trang quản trị.
    if (page !== 'index.html' || isAdmin) return;
    const protectedLinks = $$('a[href="products.html"], a[href^="products.html?"], a[href="cart.html"], a[href^="product-detail.html"]');
    protectedLinks.forEach(link => {
      link.dataset.loginRequired = '1';
      link.addEventListener('click', event => {
        event.preventDefault();
        const target = link.getAttribute('href') || 'home-logged-in.html';
        toast('Vui lòng đăng nhập để tiếp tục mua sắm.');
        go(`login.html?next=${encodeURIComponent(target)}`);
      });
    });
  }

  function setupPublicInteractions() {
    $$('.site-search').forEach(form => form.addEventListener('submit', event => event.preventDefault()));

    document.addEventListener('click', event => {
      const add = event.target.closest('[data-add-cart]');
      if (add) { event.preventDefault(); handleAddToCart(add); return; }
      const plus = event.target.closest('[data-cart-plus]');
      const minus = event.target.closest('[data-cart-minus]');
      if (plus || minus) {
        const row = (plus || minus).closest('[data-cart-row]');
        const input = $('[data-cart-quantity]', row);
        if (input) {
          const current = Number(input.value || 1);
          const max = Number(input.max || 99);
          input.value = String(plus ? Math.min(max, current + 1) : Math.max(1, current - 1));
          updateCartTotals();
        }
        return;
      }
      const remove = event.target.closest('[data-cart-remove]');
      if (remove) {
        const row = remove.closest('[data-cart-row]');
        const name = row?.dataset.productName || 'sản phẩm';
        if (row) { row.remove(); updateCartTotals(); toast(`Đã xóa ${name} khỏi giỏ hàng mẫu.`); }
        return;
      }
      const messageButton = event.target.closest('[data-demo-message], [data-ui-note]');
      if (messageButton && !isAdmin) {
        toast(messageButton.dataset.demoMessage || 'Đây là thao tác minh họa trên giao diện tĩnh. Dữ liệu không được lưu.');
      }
    });

    document.addEventListener('change', event => {
      const quantity = event.target.closest('[data-cart-quantity]');
      if (quantity) {
        const max = Number(quantity.max || 99);
        quantity.value = String(Math.max(1, Math.min(max, Number(quantity.value) || 1)));
        updateCartTotals();
      }
    });
  }

  function setupGenericDemoForms() {
    if (isAdmin) return;
    $$('form').forEach(form => {
      if (form.dataset.staticHandler || form.matches('.site-search, .advanced-search-grid, .order-filter-grid, .stats-filter, .admin-filter-bar') || ['customer-login', 'admin-login', 'employee-form'].includes(form.id) || form.hasAttribute('data-demo-register')) return;
      if (isAdmin && page === 'form-product.html' && $('#product-id', form)) return;
      if (isAdmin && page === 'customers.html' && $('#customer-id', form)) return;
      form.dataset.staticHandler = '1';
      form.addEventListener('submit', event => {
        event.preventDefault();
        toast('Đã lưu thông tin thành công! (Mô phỏng giao diện, không lưu dữ liệu).', 'success');
      });
    });
  }

  function boot() {
    setupStaticPrototypeBehaviors();

    if (isAdmin) {
      // Render the fixture content only. Admin buttons/forms are ordinary HTML links,
      // and success toasts are rendered by CSS :target after navigation (not by JavaScript).
      renderAdminProducts();
      renderAdminCustomers();
      renderAdminOrders();
      renderAdminStats();
      renderAdminEmployees();
      renderAdminEmployeeForm();
      initAdminProductForm();
      renderAdminProductView();
      renderAdminCustomerView();
      renderAdminCustomerForm();
      initAdminCustomerForm();
      renderAdminInvoice();
      renderAdminSupplierView();
      renderAdminImportView();
      setupImportEntry();
      setupAdminCategories();
      setupSupplierManagement();
      return;
    }

    setupCustomerHeader();
    setupGuestLandingLinks();
    setupPublicInteractions();
    setupAuthForms();
    renderProductListing();
    renderProductDetail();
    renderCart();
    initCheckout();
    renderOrderConfirmation();
    renderOrderHistory();
    renderOrderDetail();
    renderProfile();
    setupProfileForm();
    setupGenericDemoForms();
  }

  document.addEventListener('DOMContentLoaded', boot);
})();
