// models/Question.model.js
import mongoose from 'mongoose'

const questionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },

  tags: [{ type: String }],
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
})

export const Question = mongoose.model('Question', questionSchema)
