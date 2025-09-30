import { readFileSync, writeFileSync } from 'fs';


export function openReviews() {
    const textFile = readFileSync('./src/models/reviews.json');
    const data = JSON.parse(textFile);
    return data;
}

export function saveReviews(reviews) {
    const textFile = JSON.stringify(reviews, null, 4);
    writeFileSync('./src/models/reviews.json', textFile);
}