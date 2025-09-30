import express from "express";
import { addReview, getReviews } from './../controllers/reviewsController.js';
import { getProductByIndex } from "../controllers/productsController.js";

const router = express.Router();

router.get('/addReview', function (request, response) {
    const productName = request.query.productName;
    if (request.query.author != undefined) {
        addReview(productName, request.query.author, request.query.score, request.query.description);
    }

    const templateData = {
        productName,
        reviews: getReviews(productName)
    }
    response.cookie('author', request.query.author);

    response.render('reviewsTemplate', templateData);
})

//form submit
router.post('/addReview', function (request, response) {
    const index = request.body.index;
    const productName = request.body.productName;
    const author = request.body.author;
    const score = request.body.score;
    const description = request.body.description;

    try {
        if (!author || author.length === 0) {
            return response.status(400).json({ error: 'Name fehlt oder ist zu kurz.' });
            /*var x = document.getElementById("errEmpty");
            x.className = "snackbarShow";
            setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);*/
        } else if (score == null || score < 0 || score > 10) {
            return response.status(400).json({ error: 'Score fehlt oder ist zu klein.' });
            /*var x = document.getElementById("errScore");
            x.className = "snackbarShow";
            setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);*/
        } else {
            // console.log({index, productName, author, score, description});
            addReview(productName, author, score, description);

            response.cookie('author', request.body.author);

            response.status(302).redirect('/detailProdukte?index=' + index);
        }

    } catch (error) {
        response.status(500).render('error', { reason: error });
        /*var x = document.getElementById("errEmpty");
        x.className = "snackbarShow";
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);*/
    }
});

export default router;


