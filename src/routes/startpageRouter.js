import express from 'express';
import { getProductByIndex, getProducts } from '../controllers/productsController.js';
import { getReviews, addReview} from '../controllers/reviewsController.js';


const router = express.Router();

router.get('/', (req, res) => {
    res.redirect('/alleProdukte');
});

router.get('/alleProdukte', function(req, res) {
    res.render('main', { products: getProducts() });
});


router.get('/detailProdukte', function(req, res) {
    const index = Number.parseInt(req.query.index);
    const product = getProductByIndex(index);
    console.log(req.cookies);
    const author = req.cookies?.author??"Max Mustermann";
    
    console.log({author});
    const templateData = {
        author,
        index,
        product,
        reviews: getReviews(product.name)
    }

    res.render("detail", templateData)
 });

export default router;