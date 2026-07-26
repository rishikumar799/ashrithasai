const fs = require('fs');
let content = fs.readFileSync('c:/Users/Rishikumarvadada/Downloads/asrithasaiproject/quotation.html', 'utf-8');

const badSnippet = `  <script>
    const WA_NUMBER = '919666664446';
    function getVisibleProducts() {`;

if(content.includes(badSnippet)) {
  content = content.replace(badSnippet, `  <script>
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

    function getVisibleProducts() {`);
  
  fs.writeFileSync('c:/Users/Rishikumarvadada/Downloads/asrithasaiproject/quotation.html', content, 'utf-8');
  console.log('Fixed quotation.html');
} else {
  console.log('Snippet not found in quotation.html');
}
