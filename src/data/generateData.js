import fs from 'fs';
import { generateFakeProducts } from './fakeData.js';

const numProductsPerSubsection = 10; // Adjust this number as needed
const products = generateFakeProducts(numProductsPerSubsection);

fs.writeFileSync('products.json', JSON.stringify(products, null, 2), 'utf-8');
console.log('Products generated and saved to products.json');
