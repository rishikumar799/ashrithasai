import re

with open('c:/Users/Rishikumarvadada/Downloads/asrithasaiproject/quotation.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Table Header and Footer
content = content.replace('''            <thead>
              <tr>
                <th>Code</th>
                <th>Product Name</th>
                <th>Qty</th>
                <th>Price (₹)</th>
                <th>Total</th>
                <th></th>
              </tr>
            </thead>
            <tbody id="selectedTableBody">
              <tr>
                <td colspan="6" style="text-align:center;padding:30px">No products selected</td>
              </tr>
            </tbody>
            <tfoot>
              <tr class="total-row">
                <td colspan="4" style="text-align:right"><strong>Grand Total:</strong></td>
                <td colspan="2"><strong id="grandTotal">₹0</strong></td>
              </tr>
            </tfoot>''', '''            <thead>
              <tr>
                <th>Code</th>
                <th>Product Name</th>
                <th>Qty</th>
                <th>Price (₹)</th>
                <th>Discount (%)</th>
                <th>Total</th>
                <th></th>
              </tr>
            </thead>
            <tbody id="selectedTableBody">
              <tr>
                <td colspan="7" style="text-align:center;padding:30px">No products selected</td>
              </tr>
            </tbody>
            <tfoot>
              <tr class="total-row">
                <td colspan="5" style="text-align:right"><strong>Grand Total:</strong></td>
                <td colspan="2"><strong id="grandTotal">₹0</strong></td>
              </tr>
            </tfoot>''')

# 2. Additional Notes Form
content = content.replace('''        <div class="form-group">
          <label>Additional Notes (Terms, Delivery, Warranty, etc.)</label>
          <textarea id="notes" rows="3"
            placeholder="• Delivery within 7-10 working days&#10;• 2 years warranty on products&#10;• GST extra as applicable"></textarea>
        </div>''', '''        <div class="form-group">
          <label style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 8px;">
            Additional Notes (Terms, Delivery, Warranty, etc.)
            <label style="font-weight:normal; display:flex; align-items:center; gap:5px; cursor:pointer;">
              <input type="checkbox" id="useDefaultNotes" checked onchange="toggleDefaultNotes()"> Use default message
            </label>
          </label>
          <textarea id="notes" rows="4" placeholder="Type your own message here..."></textarea>
        </div>''')

# 3. renderSelectedTable body
content = content.replace('''    function renderSelectedTable() {
      const tbody = document.getElementById('selectedTableBody');
      let grandTotal = 0;

      if (selectedProducts.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;padding:30px">No products selected</td></tr>';
        document.getElementById('grandTotal').innerHTML = '₹0';
        return;
      }

      tbody.innerHTML = selectedProducts.map(p => {
        const total = (p.qty || 1) * (p.price || 0);
        grandTotal += total;
        return `
        <tr>
          <td style="font-size:12px">${escapeHtml(p.code)}</td>
          <td style="font-size:12px">${escapeHtml(p.name.substring(0, 40))}</td>
          <td><input type="number" class="qty-input" value="${p.qty || 1}" min="1" onchange="updateProductQty('${escapeHtml(p.code)}', this.value)"></td>
          <td><input type="number" class="price-input" value="${p.price || 0}" min="0" step="1" onchange="updateProductPrice('${escapeHtml(p.code)}', this.value)"></td>
          <td style="font-weight:600">₹${total.toLocaleString()}</td>
          <td><span class="remove-row" onclick="removeProduct('${escapeHtml(p.code)}')">🗑️</span></td>
        </tr>
      `;
      }).join('');

      document.getElementById('grandTotal').innerHTML = `₹${grandTotal.toLocaleString()}`;
    }''', '''    function renderSelectedTable() {
      const tbody = document.getElementById('selectedTableBody');
      let grandTotal = 0;

      if (selectedProducts.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" style="text-align:center;padding:30px">No products selected</td></tr>';
        document.getElementById('grandTotal').innerHTML = '₹0';
        return;
      }

      tbody.innerHTML = selectedProducts.map(p => {
        const qty = parseInt(p.qty) || 1;
        const price = parseFloat(p.price) || 0;
        const discount = parseFloat(p.discount) || 0;
        const discountAmt = price * (discount / 100);
        const total = qty * (price - discountAmt);
        grandTotal += total;
        return `
        <tr>
          <td style="font-size:12px">${escapeHtml(p.code)}</td>
          <td style="font-size:12px">${escapeHtml(p.name.substring(0, 40))}</td>
          <td><input type="number" class="qty-input" value="${p.qty || 1}" min="1" onchange="updateProductQty('${escapeHtml(p.code)}', this.value)"></td>
          <td><input type="number" class="price-input" value="${p.price || 0}" min="0" step="1" onchange="updateProductPrice('${escapeHtml(p.code)}', this.value)"></td>
          <td><input type="number" class="price-input" style="width:60px" value="${p.discount || 0}" min="0" max="100" step="1" onchange="updateProductDiscount('${escapeHtml(p.code)}', this.value)"></td>
          <td style="font-weight:600">₹${total.toLocaleString(undefined, {maximumFractionDigits: 2})}</td>
          <td><span class="remove-row" onclick="removeProduct('${escapeHtml(p.code)}')">🗑️</span></td>
        </tr>
      `;
      }).join('');

      document.getElementById('grandTotal').innerHTML = `₹${grandTotal.toLocaleString(undefined, {maximumFractionDigits: 2})}`;
    }''')

# 4. updateProductDiscount Function
content = content.replace('''    function removeProduct(code) {''', '''    function updateProductDiscount(code, newDiscount) {
      const product = selectedProducts.find(p => p.code === code);
      if (product) {
        product.discount = parseFloat(newDiscount) || 0;
        renderSelectedTable();
      }
    }

    function removeProduct(code) {''')

# 5. getQuotationData
content = content.replace('''      let grandTotal = 0;
      selectedProducts.forEach(p => {
        grandTotal += (p.qty || 1) * (p.price || 0);
      });''', '''      let grandTotal = 0;
      selectedProducts.forEach(p => {
        const qty = parseInt(p.qty) || 1;
        const price = parseFloat(p.price) || 0;
        const discount = parseFloat(p.discount) || 0;
        const discountAmt = price * (discount / 100);
        grandTotal += qty * (price - discountAmt);
      });''')

# 6. generateQuotationMessage
content = content.replace('''      selectedProducts.forEach((p, i) => {
        const total = (p.qty || 1) * (p.price || 0);
        message += `${i + 1}. *${p.code}*\\n`;
        message += `   ${p.name.substring(0, 50)}\\n`;
        message += `   Qty: ${p.qty || 1} x ₹${(p.price || 0).toLocaleString()} = *₹${total.toLocaleString()}*\\n\\n`;
      });

      message += `--------------------------------\\n`;
      message += `💰 *GRAND TOTAL: ₹${data.grandTotal.toLocaleString()}*\\n`;''', '''      selectedProducts.forEach((p, i) => {
        const qty = parseInt(p.qty) || 1;
        const price = parseFloat(p.price) || 0;
        const discount = parseFloat(p.discount) || 0;
        const discountAmt = price * (discount / 100);
        const total = qty * (price - discountAmt);
        
        message += `${i + 1}. *${p.code}*\\n`;
        message += `   ${p.name.substring(0, 50)}\\n`;
        message += `   Qty: ${qty} x ₹${price.toLocaleString()}`;
        if (discount > 0) message += ` (-${discount}%)`;
        message += ` = *₹${total.toLocaleString(undefined, {maximumFractionDigits: 2})}*\\n\\n`;
      });

      message += `--------------------------------\\n`;
      message += `💰 *GRAND TOTAL: ₹${data.grandTotal.toLocaleString(undefined, {maximumFractionDigits: 2})}*\\n`;''')

# 7. downloadPDF totals calc
content = content.replace('''      // Calculate totals
      let grandTotal = 0;
      const productsWithTotal = selectedProducts.map(p => {
        const total = (p.qty || 1) * (p.price || 0);
        grandTotal += total;
        return { ...p, total };
      });''', '''      // Calculate totals
      let grandTotal = 0;
      const productsWithTotal = selectedProducts.map(p => {
        const qty = parseInt(p.qty) || 1;
        const price = parseFloat(p.price) || 0;
        const discount = parseFloat(p.discount) || 0;
        const discountAmt = price * (discount / 100);
        const total = qty * (price - discountAmt);
        grandTotal += total;
        return { ...p, total, discount };
      });''')

# 8. PDF HTML Table
content = content.replace('''              <th>#</th>
              <th>Product Code</th>
              <th>Description</th>
              <th>Quantity</th>
              <th>Unit Price (₹)</th>
              <th>Total (₹)</th>
            </tr>
          </thead>
          <tbody>
            ${productsWithTotal.map((p, i) => `
              <tr>
                <td>${i + 1}</td>
                <td>${escapeHtml(p.code)}</td>
                <td>${escapeHtml(p.name)}</td>
                <td>${p.qty || 1}</td>
                <td>₹${(p.price || 0).toLocaleString()}</td>
                <td>₹${p.total.toLocaleString()}</td>
              </tr>
            `).join('')}
          </tbody>
          <tfoot>
            <tr style="background: #e8f0fe;">
              <td colspan="5" style="text-align:right"><strong>Grand Total</strong></td>
              <td><strong>₹${grandTotal.toLocaleString()}</strong></td>
            </tr>
          </tfoot>''', '''              <th>#</th>
              <th>Product Code</th>
              <th>Description</th>
              <th>Quantity</th>
              <th>Unit Price (₹)</th>
              <th>Discount</th>
              <th>Total (₹)</th>
            </tr>
          </thead>
          <tbody>
            ${productsWithTotal.map((p, i) => `
              <tr>
                <td>${i + 1}</td>
                <td>${escapeHtml(p.code)}</td>
                <td>${escapeHtml(p.name)}</td>
                <td>${p.qty || 1}</td>
                <td>₹${(p.price || 0).toLocaleString()}</td>
                <td>${p.discount ? p.discount + '%' : '-'}</td>
                <td>₹${p.total.toLocaleString(undefined, {maximumFractionDigits: 2})}</td>
              </tr>
            `).join('')}
          </tbody>
          <tfoot>
            <tr style="background: #e8f0fe;">
              <td colspan="6" style="text-align:right"><strong>Grand Total</strong></td>
              <td><strong>₹${grandTotal.toLocaleString(undefined, {maximumFractionDigits: 2})}</strong></td>
            </tr>
          </tfoot>''')

# 9. live-server bug fix
content = content.replace('''      </body>
      </html>
    `);''', '''      </` + `body>
      </` + `html>
    `);''')

# 10. setDefaultValues and toggleDefaultNotes
content = content.replace('''    // Set default values
    function setDefaultValues() {
      const today = new Date();
      const defaultValidUntil = new Date();
      defaultValidUntil.setDate(defaultValidUntil.getDate() + 30);
      document.getElementById('validUntil').value = defaultValidUntil.toISOString().split('T')[0];

      const quoteNum = `Q-${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}${String(today.getDate()).padStart(2, '0')}-001`;
      document.getElementById('quoteNo').value = quoteNum;
    }''', '''    const defaultNotesText = "• Delivery within 7-10 working days\\n• 2 years warranty on products\\n• GST extra as applicable";

    function toggleDefaultNotes() {
      const checkbox = document.getElementById('useDefaultNotes');
      const textarea = document.getElementById('notes');
      if (checkbox.checked) {
        if (!textarea.value.trim()) {
           textarea.value = defaultNotesText;
        }
      } else {
        if (textarea.value.trim() === defaultNotesText) {
           textarea.value = '';
        }
      }
    }

    // Set default values
    function setDefaultValues() {
      const today = new Date();
      const defaultValidUntil = new Date();
      defaultValidUntil.setDate(defaultValidUntil.getDate() + 30);
      document.getElementById('validUntil').value = defaultValidUntil.toISOString().split('T')[0];

      const quoteNum = `Q-${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}${String(today.getDate()).padStart(2, '0')}-001`;
      document.getElementById('quoteNo').value = quoteNum;
      
      toggleDefaultNotes();
    }''')

with open('c:/Users/Rishikumarvadada/Downloads/asrithasaiproject/quotation.html', 'w', encoding='utf-8') as f:
    f.write(content)

print('Update successful')
