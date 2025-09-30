import { openProducts, saveProducts } from "../models/products.js";

export function getProducts() {
    //TODO sort kommt von mir muss nicht sein könnte als tool eingebaut werden
    //preis ist nicht richtig auf webseite angezeigt von cent in eur
    return openProducts().map(parseProduct).sort((a, b) => a.price - b.price);
}

export function getProductByIndex(index) {
    const products = getProducts();
    const product = products[index];
    if (!product) throw new Error("Produkt nicht gefunden");
    return product;
}

function parseProduct(p) {
    const priceParsed = Number.parseInt(p.price);
    const quantityParsed = Number.parseInt(p.quantity);

    if (Number.isNaN(priceParsed)) {
        throw new Error(`Preis ${p.price} ist kein gültiger Centbetrag`);
    }

    if (Number.isNaN(quantityParsed)) {
        throw new Error(`Menge ${p.quantity} ist keine gültige Zahl`);
    }

    const priceEUR = new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "EUR"
    }).format(priceParsed);

    return {
        name: p.name,
        discription: p.discription,
        img: p.img,
        imgAlt: p.imgAlt,
        quantity: quantityParsed,
        price: priceParsed,
        priceEUR
    };
}