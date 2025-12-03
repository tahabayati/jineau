const XLSX = require('xlsx');
const path = require('path');

// Read the Excel file
const filePath = path.join(__dirname, '../public/product_jineau.xlsx');
const workbook = XLSX.readFile(filePath);

// Get the first sheet
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];

// Convert to JSON
const data = XLSX.utils.sheet_to_json(sheet);

console.log('Sheet Name:', sheetName);
console.log('Number of rows:', data.length);
console.log('\nColumn Headers:', Object.keys(data[0] || {}));
console.log('\nData:');
console.log(JSON.stringify(data, null, 2));

