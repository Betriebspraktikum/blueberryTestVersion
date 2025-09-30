import { openReviews, saveReviews } from "../models/reviews.js";


export function getReviews(productName) {
    const reviews = openReviews();
    //console.log(reviews)

    return reviews.filter(review=>review["productName"]==productName);
}

export function addReview(productName, author, score, description) {
    const scoreParsed = Number.parseInt(score);
    if (Number.isNaN(scoreParsed)) {
        throw new Error(`Anzahl ${score} muss eine ganze Zahl sein.`);
    }

    const review = {
        productName,
        author,
        score: scoreParsed,
        description
    };
    const reviews = openReviews();
    reviews[reviews.length] = review;

    saveReviews(reviews);
}