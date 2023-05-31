import Quotes from '../models/Quotes.js';

export const showAllQuotes = async (req, res) => {
    try {
        const documents = await Quotes.find({});
        res.json(documents);
    } catch (error) {
        console.log(error);
    }
};

export const searchQuotesByName = async (req, res) => {
    try {
        const { query } = req.params;
        const documents = await Quotes.find({ author: new RegExp(query, 'i') })
           
        res.json(documents);
    } catch (error) {
        console.log(error);
    }
};

export const searchQuotesByCategory = async (req, res) => {
    try {
        const documents = await Quotes.find({ category:ObjectId(req.params.idCategory) })
                                .populate("category");
            
        res.json(documents);
    } catch (error) {
        console.log(error);
    }
};

/* era para filtrar por precio
export const searchQuotesByPrice = async (req, res) => {
    try {
        const { minPrice, maxPrice } = req.params;
        const documents = await Quotes.find({
            $and:
                [
                    { price: { $gte: minPrice } },
                    { price: { $lte: maxPrice } },
                ]
        }).populate("category");
        res.json(documents);
    } catch (error) {
        console.log(error);
    }
};
 */

export const showQuoteById = async (req, res) => {
    const document = await Quotes.findById(req.params.idQuote);
    if (!document) {
        res.json({ message: 'This quote doesn\'t exist' });
    }
    res.json(document);
};

export const newQuote = async (req, res) => {
    const document = new Quotes(req.body);
    try {
    
        const doc = await document.save();
        res.json({ message: 'New quote was added with id:'+doc._id });
    } catch (error) {
        res.send(error);
    }
};

export const updateQuote = async (req, res) => {
    try {
        const filter = { _id: req.body.id };
        const update = req.body;
        const options = { new: true };
        const document = await Quotes.findOneAndUpdate(filter, update, options);
        res.json({
            "message":"Quote updated successfuly",
            ...document
        });
    } catch (error) {
        res.send(error);
    }
};

export const deleteQuote = async (req, res) => {
    try {
        await Quotes.findByIdAndDelete({ _id: req.params.idQuote });
        res.json({ message: 'The quote was deleted with id:'+req.params.idQuote });
    } catch (error) {
        console.log(error);
    }
};
