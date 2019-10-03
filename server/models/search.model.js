import mongoose from 'mongoose'
import crypto from 'crypto'
const SearchSchema = new mongoose.Schema({
  description: {
    type: String,
    required: 'Description is required'
  },
  postedBy: {type: mongoose.Schema.ObjectId, ref: 'User'},
  created: {
    type: Date,
    default: Date.now
  }
})

export default mongoose.model('Search', SearchSchema)
