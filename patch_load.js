const fs = require('fs');

const mergeLogicAdmin = `      const saved = localStorage.getItem('ashritha_products');
      
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
      saveProducts();`;

const mergeLogicQuotation = `      const saved = localStorage.getItem('ashritha_products');
      
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
      }`;

function patchFile(filepath, targetStr, replacement) {
  let content = fs.readFileSync(filepath, 'utf-8');
  if(content.includes(targetStr)) {
      content = content.replace(targetStr, replacement);
      fs.writeFileSync(filepath, content, 'utf-8');
      console.log('Patched ' + filepath);
  } else {
      console.log('Target string not found in ' + filepath);
  }
}

// 1. admin-panel.html
patchFile('c:/Users/Rishikumarvadada/Downloads/asrithasaiproject/admin-panel.html', 
`      const saved = localStorage.getItem('ashritha_products');
      if (saved) {
        products = JSON.parse(saved);
      } else {
        // Initialize with default data
        products = [
          ...PRODUCTS_DATA.faucets.map(p => ({ ...p, type: 'faucet', visible: true })),
          ...PRODUCTS_DATA.sanitary.map(p => ({ ...p, type: 'sanitary', visible: true, price: p.mrp, series: p.category }))
        ];
        saveProducts();
      }`, mergeLogicAdmin);

// 2. quotation.html
patchFile('c:/Users/Rishikumarvadada/Downloads/asrithasaiproject/quotation.html',
`      const saved = localStorage.getItem('ashritha_products');
      if (saved) {
        products = JSON.parse(saved);
      } else {
        products = [
          ...PRODUCTS_DATA.faucets.map(p => ({ ...p, type: 'faucet', visible: true })),
          ...PRODUCTS_DATA.sanitary.map(p => ({ ...p, type: 'sanitary', visible: true, price: p.mrp, series: p.category }))
        ];
      }`, mergeLogicQuotation);

console.log("Update complete");
