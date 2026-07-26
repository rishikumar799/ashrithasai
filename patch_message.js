const fs = require('fs');

let content = fs.readFileSync('c:/Users/Rishikumarvadada/Downloads/asrithasaiproject/quotation.html', 'utf-8');
content = content.replace(/\r\n/g, '\n');

const oldMessage = `const defaultNotesText = "• Delivery within 7-10 working days\\n• 2 years warranty on products\\n• GST extra as applicable";`;
const newMessage = `const defaultNotesText = "Thank you for considering Ashritha Sai Services & Trading Pvt. Ltd.\\nWe truly appreciate your business and look forward to serving you.\\nFor any queries regarding this quotation, please feel free to reach out.";`;

const oldHeading = `<h4>📝 Terms & Conditions</h4>`;
const newHeading = `<h4>📝 Additional Notes</h4>`;

if(content.includes(oldMessage)) {
    content = content.replace(oldMessage, newMessage);
    content = content.replace(oldHeading, newHeading);
    fs.writeFileSync('c:/Users/Rishikumarvadada/Downloads/asrithasaiproject/quotation.html', content, 'utf-8');
    console.log('Update successful');
} else {
    console.log('Message string not found. Is it already updated?');
}
