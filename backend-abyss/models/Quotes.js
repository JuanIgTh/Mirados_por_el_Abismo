import mongoose from "mongoose";
const Schema = mongoose.Schema;

const quotesSchema = new Schema({
    quote: {
        type: String

    },
    author: {
        type: String
    },
    year: {
        type: String
    }
},
    { versionKey: false }
);

quotesSchema.set('toJSON', {
    virtuals: true,
    versionKey:false,
    transform: function (doc, ret) {   delete ret._id  }
});

const Quotes = mongoose.model('Quotes', quotesSchema);
export default Quotes;