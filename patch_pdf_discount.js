const fs = require('fs');

let content = fs.readFileSync('c:/Users/Rishikumarvadada/Downloads/asrithasaiproject/quotation.html', 'utf-8');
content = content.replace(/\r\n/g, '\n');

// 8. PDF HTML Table - Make Discount column conditional
const targetPDFTable = `              <th>#</th>
              <th>Product Code</th>
              <th>Description</th>
              <th>Quantity</th>
              <th>Unit Price (₹)</th>
              <th>Discount</th>
              <th>Total (₹)</th>
            </tr>
          </thead>
          <tbody>
            \${productsWithTotal.map((p, i) => \`
              <tr>
                <td>\${i + 1}</td>
                <td>\${escapeHtml(p.code)}</td>
                <td>\${escapeHtml(p.name)}</td>
                <td>\${p.qty || 1}</td>
                <td>₹\${(p.price || 0).toLocaleString()}</td>
                <td>\${p.discount ? p.discount + '%' : '-'}</td>
                <td>₹\${p.total.toLocaleString(undefined, {maximumFractionDigits: 2})}</td>
              </tr>
            \`).join('')}
          </tbody>
          <tfoot>
            <tr style="background: #e8f0fe;">
              <td colspan="6" style="text-align:right"><strong>Grand Total</strong></td>
              <td><strong>₹\${grandTotal.toLocaleString(undefined, {maximumFractionDigits: 2})}</strong></td>
            </tr>
          </tfoot>`;

const replacementPDFTable = `              <th>#</th>
              <th>Product Code</th>
              <th>Description</th>
              <th>Quantity</th>
              <th>Unit Price (₹)</th>
              \${hasDiscount ? '<th>Discount (%)</th>' : ''}
              <th>Total (₹)</th>
            </tr>
          </thead>
          <tbody>
            \${productsWithTotal.map((p, i) => \`
              <tr>
                <td>\${i + 1}</td>
                <td>\${escapeHtml(p.code)}</td>
                <td>\${escapeHtml(p.name)}</td>
                <td>\${p.qty || 1}</td>
                <td>₹\${(p.price || 0).toLocaleString()}</td>
                \${hasDiscount ? \`<td>\${p.discount ? p.discount + '%' : '-'}</td>\` : ''}
                <td>₹\${p.total.toLocaleString(undefined, {maximumFractionDigits: 2})}</td>
              </tr>
            \`).join('')}
          </tbody>
          <tfoot>
            <tr style="background: #e8f0fe;">
              <td colspan="\${hasDiscount ? '6' : '5'}" style="text-align:right"><strong>Grand Total</strong></td>
              <td><strong>₹\${grandTotal.toLocaleString(undefined, {maximumFractionDigits: 2})}</strong></td>
            </tr>
          </tfoot>`;

// Update downloadPDF function to calculate hasDiscount
const targetPDFCalc = `      // Calculate totals
      let grandTotal = 0;
      const productsWithTotal = selectedProducts.map(p => {
        const qty = parseInt(p.qty) || 1;
        const price = parseFloat(p.price) || 0;
        const discount = parseFloat(p.discount) || 0;
        const discountAmt = price * (discount / 100);
        const total = qty * (price - discountAmt);
        grandTotal += total;
        return { ...p, total, discount };
      });`;

const replacementPDFCalc = `      // Calculate totals
      let grandTotal = 0;
      let hasDiscount = false;
      const productsWithTotal = selectedProducts.map(p => {
        const qty = parseInt(p.qty) || 1;
        const price = parseFloat(p.price) || 0;
        const discount = parseFloat(p.discount) || 0;
        if (discount > 0) hasDiscount = true;
        const discountAmt = price * (discount / 100);
        const total = qty * (price - discountAmt);
        grandTotal += total;
        return { ...p, total, discount };
      });`;

content = content.replace(targetPDFTable, replacementPDFTable);
content = content.replace(targetPDFCalc, replacementPDFCalc);

fs.writeFileSync('c:/Users/Rishikumarvadada/Downloads/asrithasaiproject/quotation.html', content, 'utf-8');
console.log('PDF Conditional Discount Update successful');
