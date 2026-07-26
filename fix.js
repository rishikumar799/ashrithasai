const fs = require('fs');
let content = fs.readFileSync('c:/Users/Rishikumarvadada/Downloads/asrithasaiproject/quotation.html', 'utf-8');

const regex = /    <\/div>\r?\n      const category = document\.getElementById\('categoryFilter'\)\?\.value \|\| 'all';/;

const replacement = `    </div>
  </div>

  <div id="toast" class="toast">✓ Quotation sent!</div>

  <script src="js/products-data.js"></script>
  <script>
    const WA_NUMBER = '919666664446';
    let products = [];
    let selectedProducts = [];

    // Load products
    function loadProducts() {
      const saved = localStorage.getItem('ashritha_products');
      
      let baseProducts = [
        ...PRODUCTS_DATA.faucets.map(p => ({ ...p, type: 'faucet', visible: true, price: p.mrp })),
        ...PRODUCTS_DATA.sanitary.map(p => ({ ...p, type: 'sanitary', visible: true, price: p.mrp, series: p.category }))
      ];

      if (saved) {
        let savedProducts = JSON.parse(saved);
        let savedMap = {};
        savedProducts.forEach(p => { savedMap[p.code] = p; });

        products = baseProducts.map(p => {
          if (savedMap[p.code]) {
            return { ...p, ...savedMap[p.code] };
          }
          return p;
        });

        let baseMap = {};
        baseProducts.forEach(p => { baseMap[p.code] = p; });

        savedProducts.forEach(p => {
          if (!baseMap[p.code]) {
            products.push(p);
          }
        });
      } else {
        products = baseProducts;
      }
      renderProductList();
      updateSeriesFilter();
    }

    function getVisibleProducts() {
      return products.filter(p => p.visible !== false);
    }

    function renderProductList() {
      const searchTerm = document.getElementById('searchInput')?.value.toLowerCase() || '';
      const category = document.getElementById('categoryFilter')?.value || 'all';`;

if(regex.test(content)) {
    content = content.replace(regex, replacement);
    fs.writeFileSync('c:/Users/Rishikumarvadada/Downloads/asrithasaiproject/quotation.html', content, 'utf-8');
    console.log('Fixed quotation.html');
} else {
    console.log('Target regex not found!');
}
