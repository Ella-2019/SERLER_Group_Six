import mongoose from 'mongoose'
const ArticleSoliSchema = new mongoose.Schema({
        title: {
            type: String,
            required: true
        },
        author: {
            type: String,
            required: true
        },
        authorID: {
            type: String
        },
        body: {
            type: String,
            required: true
        },
        addedOn: {
            type: Date,
            default: Date.now,
            required: true
        }
    });
    export default mongoose.model('ArticleSoli', ArticleSoliSchema);
    
