import express from "express";
import * as quotesController from '../controllers/quotesController.js';

const router = express.Router();

router.get('/quotes', quotesController.showAllQuotes);
router.get('/quotes/search/:query', quotesController.searchQuotesByName);
//router.get('/quotes/search/price/:minPrice/:maxPrice', quotesController.searchQuotesByPrice);
router.get('/quotes/:idQuote',  quotesController.showQuoteById);
router.post('/quotes', quotesController.newQuote);    
router.put('/quotes', quotesController.updateQuote);
router.delete('/quotes/:idQuote', quotesController.deleteQuote);

export default router;



