// js/popup.js
const WA_NUMBER = '919666664446';

let selectedProducts = [];
let products = [];

// Load products from localStorage or use defaults
function loadProducts() {
  const saved = localStorage.getItem('ashritha_products');
  if (saved) {
    products = JSON.parse(saved);
  } else {
    products = [
      ...PRODUCTS_DATA.faucets.map(p => ({ ...p, type: 'faucet', visible: true })),
      ...PRODUCTS_DATA.sanitary.map(p => ({ ...p, type: 'sanitary', visible: true, price: p.mrp }))
    ];
    saveProducts();
  }
}

function saveProducts() {
  localStorage.setItem('ashritha_products', JSON.stringify(products));
}

function getVisibleProducts() {
  return products.filter(p => p.visible !== false);
}

// Create popup HTML - NO PRICES SHOWN TO CUSTOMERS
function createPopupHTML() {
  return `
    <div class="popup-overlay" id="popupOverlay">
      <div class="popup-container">
        <div class="popup-header">
          <h3>📋 Product Enquiry - Ashritha Sai</h3>
          <button class="close-popup" id="closePopupBtn">&times;</button>
        </div>
        <div class="popup-body">
          <!-- Customer Details -->
          <div class="row-2cols">
            <div class="form-group">
              <label>Full Name *</label>
              <input type="text" id="custName" placeholder="Enter your name">
            </div>
            <div class="form-group">
              <label>Phone Number *</label>
              <input type="tel" id="custPhone" placeholder="Enter phone number">
            </div>
          </div>
          <div class="row-2cols">
            <div class="form-group">
              <label>Email</label>
              <input type="email" id="custEmail" placeholder="Enter email (optional)">
            </div>
            <div class="form-group">
              <label>City</label>
              <input type="text" id="custCity" placeholder="Enter city">
            </div>
          </div>
          
          <!-- Product Search & Selection - NO PRICES -->
          <div class="product-search-section">
            <h4>🔍 Select Products</h4>
            <div class="search-bar">
              <input type="text" id="searchInput" placeholder="Search by code or name...">
            </div>
            <div class="filter-group">
              <select id="categoryFilter">
                <option value="all">All Categories</option>
                <option value="faucet">Faucets</option>
                <option value="sanitary">Sanitary Ware</option>
              </select>
              <select id="seriesFilter">
                <option value="all">All Series</option>
              </select>
            </div>
            <div class="product-list" id="productList"></div>
          </div>
          
          <!-- Selected Products - NO PRICES -->
          <div class="selected-products-section">
            <h4>📦 Selected Items (<span id="selectedCount">0</span>)</h4>
            <div class="selected-list" id="selectedList"></div>
          </div>
          
          <!-- Message -->
          <div class="form-group">
            <label>Additional Message (Optional)</label>
            <textarea id="additionalMsg" rows="3" placeholder="Any special requirements..."></textarea>
          </div>
          
          <!-- Submit Button -->
          <button class="whatsapp-btn-submit" id="sendEnquiryBtn">
            📱 Send Enquiry on WhatsApp
          </button>
          <div class="admin-login-link">
            <a href="#" id="adminLink">Admin Login</a>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Render product list - NO PRICES
function renderProductList() {
  const searchTerm = document.getElementById('searchInput')?.value.toLowerCase() || '';
  const category = document.getElementById('categoryFilter')?.value || 'all';
  const series = document.getElementById('seriesFilter')?.value || 'all';
  
  let filtered = getVisibleProducts();
  
  if (searchTerm) {
    filtered = filtered.filter(p => 
      p.code.toLowerCase().includes(searchTerm) || 
      p.name.toLowerCase().includes(searchTerm)
    );
  }
  
  if (category !== 'all') {
    filtered = filtered.filter(p => p.type === category);
  }
  
  if (series !== 'all') {
    filtered = filtered.filter(p => p.series === series);
  }
  
  const container = document.getElementById('productList');
  if (!container) return;
  
  if (filtered.length === 0) {
    container.innerHTML = '<div style="padding:20px;text-align:center">No products found</div>';
    return;
  }
  
  container.innerHTML = filtered.map(p => `
    <div class="product-item" data-code="${p.code}">
      <div class="product-info">
        <div class="product-code">${p.code}</div>
        <div class="product-name">${p.name}</div>
      </div>
      <button class="add-btn" onclick="addToCart('${p.code}')">+ Add</button>
    </div>
  `).join('');
}

// Update series filter options
function updateSeriesFilter() {
  const seriesSet = new Set();
  getVisibleProducts().forEach(p => {
    if (p.series) seriesSet.add(p.series);
  });
  const select = document.getElementById('seriesFilter');
  if (select) {
    select.innerHTML = '<option value="all">All Series</option>' + 
      Array.from(seriesSet).map(s => `<option value="${s}">${s}</option>`).join('');
  }
}

// Add to cart
function addToCart(code) {
  const product = products.find(p => p.code === code);
  if (!product) return;
  
  const existing = selectedProducts.find(p => p.code === code);
  if (existing) {
    existing.quantity = (existing.quantity || 1) + 1;
  } else {
    selectedProducts.push({ ...product, quantity: 1 });
  }
  
  updateSelectedList();
}

// Update selected products display - NO PRICES
function updateSelectedList() {
  const container = document.getElementById('selectedList');
  const countSpan = document.getElementById('selectedCount');
  
  if (!container) return;
  
  if (selectedProducts.length === 0) {
    container.innerHTML = '<div style="padding:10px;text-align:center;color:#999">No items selected</div>';
    countSpan.textContent = '0';
    return;
  }
  
  container.innerHTML = selectedProducts.map(p => `
    <div class="selected-item">
      <div class="selected-item-info">
        <div class="selected-item-code">${p.code}</div>
        <div class="selected-item-name">${p.name}</div>
        <div style="font-size:11px;color:#666">Quantity: ${p.quantity || 1}</div>
      </div>
      <div>
        <button class="remove-btn" onclick="updateQuantity('${p.code}', -1)">-</button>
        <span style="margin:0 8px;min-width:30px;display:inline-block;text-align:center">${p.quantity || 1}</span>
        <button class="remove-btn" onclick="updateQuantity('${p.code}', 1)">+</button>
        <button class="remove-btn" style="background:#dc3545;margin-left:8px" onclick="removeFromCart('${p.code}')">×</button>
      </div>
    </div>
  `).join('');
  
  countSpan.textContent = selectedProducts.reduce((sum, p) => sum + (p.quantity || 1), 0);
}

// Update quantity
function updateQuantity(code, delta) {
  const product = selectedProducts.find(p => p.code === code);
  if (product) {
    const newQty = (product.quantity || 1) + delta;
    if (newQty <= 0) {
      removeFromCart(code);
    } else {
      product.quantity = newQty;
      updateSelectedList();
    }
  }
}

// Remove from cart
function removeFromCart(code) {
  selectedProducts = selectedProducts.filter(p => p.code !== code);
  updateSelectedList();
}

// Send WhatsApp message - NO PRICES, only product list
function sendWhatsAppEnquiry() {
  const name = document.getElementById('custName')?.value.trim();
  const phone = document.getElementById('custPhone')?.value.trim();
  const email = document.getElementById('custEmail')?.value.trim();
  const city = document.getElementById('custCity')?.value.trim();
  const additionalMsg = document.getElementById('additionalMsg')?.value.trim();
  
  if (!name) {
    alert('Please enter your name');
    return;
  }
  if (!phone) {
    alert('Please enter your phone number');
    return;
  }
  if (selectedProducts.length === 0) {
    alert('Please select at least one product');
    return;
  }
  
  let message = `🏢 *ASHRITHA SAI SERVICES & TRADING PVT. LTD.*\n`;
  message += `📋 *NEW ENQUIRY*\n\n`;
  message += `👤 *Customer Details:*\n`;
  message += `Name: ${name}\n`;
  message += `Phone: ${phone}\n`;
  if (email) message += `Email: ${email}\n`;
  if (city) message += `City: ${city}\n`;
  message += `\n🛒 *Products Required:*\n`;
  
  selectedProducts.forEach((p, i) => {
    const qty = p.quantity || 1;
    message += `${i+1}. ${p.code} - ${p.name.substring(0, 60)}\n`;
    message += `   Quantity: ${qty}\n`;
  });
  
  if (additionalMsg) {
    message += `\n📝 *Message:*\n${additionalMsg}\n`;
  }
  
  message += `\n📅 Date: ${new Date().toLocaleString()}\n`;
  message += `\n_Please send quotation for above products_`;
  
  const encodedMsg = encodeURIComponent(message);
  window.open(`https://wa.me/${WA_NUMBER}?text=${encodedMsg}`, '_blank');
  
  // Save enquiry to localStorage (without prices)
  const enquiries = JSON.parse(localStorage.getItem('ashritha_enquiries') || '[]');
  enquiries.unshift({
    id: Date.now(),
    date: new Date().toISOString(),
    name, phone, email, city,
    products: selectedProducts.map(p => ({ code: p.code, name: p.name, qty: p.quantity || 1 })),
    message: additionalMsg
  });
  localStorage.setItem('ashritha_enquiries', JSON.stringify(enquiries.slice(0, 100)));
  
  // Close popup
  document.getElementById('popupOverlay')?.remove();
}

// Initialize popup
function initPopup() {
  loadProducts();
  
  const popupHTML = createPopupHTML();
  document.body.insertAdjacentHTML('beforeend', popupHTML);
  
  renderProductList();
  updateSeriesFilter();
  updateSelectedList();
  
  // Event listeners
  document.getElementById('closePopupBtn')?.addEventListener('click', () => {
    document.getElementById('popupOverlay')?.remove();
  });
  
  document.getElementById('searchInput')?.addEventListener('input', renderProductList);
  document.getElementById('categoryFilter')?.addEventListener('change', renderProductList);
  document.getElementById('seriesFilter')?.addEventListener('change', renderProductList);
  document.getElementById('sendEnquiryBtn')?.addEventListener('click', sendWhatsAppEnquiry);
  document.getElementById('adminLink')?.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = '/admin-login.html';
  });
  
  // Close on overlay click
  document.getElementById('popupOverlay')?.addEventListener('click', (e) => {
    if (e.target.id === 'popupOverlay') {
      document.getElementById('popupOverlay')?.remove();
    }
  });
}

// Show popup on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPopup);
} else {
  initPopup();
}