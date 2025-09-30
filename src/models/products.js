import { readFileSync, writeFileSync } from 'fs';


export function openProducts() {
    const textFile = readFileSync('./src/models/products.json');
    const data = JSON.parse(textFile);
    return data;
}

export function saveProducts(products) {
    const textFile = JSON.stringify(products, null, 4);
    writeFileSync('./src/models/products.json', textFile);
}