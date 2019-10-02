import mongoose from 'mongoose'
import crypto from 'crypto'
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
            type: String,
            required: true
        }
    })
    export default mongoose.model('ArticleSoli', ArticleSoliSchema)

    
