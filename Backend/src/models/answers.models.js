// // models/Answer.model.js
// import mongoose from 'mongoose'

// const answerSchema = new mongoose.Schema({
//   question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
//   description: { type: String, required: true }, // rich text
//   // content: { type: String, required: true }, // rich text

//   user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//   votes: { type: Number, default: 0 },
//   isAccepted: { type: Boolean, default: false },
//   createdAt: { type: Date, default: Date.now },
// })

// export const Answer = mongoose.model('Answer', answerSchema)
import mongoose from 'mongoose'

const answerSchema = new mongoose.Schema({
  question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
  description: { type: String, required: true }, // rich text

  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

  votes: { type: Number, default: 0 },

  voters: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      voteType: { type: String, enum: ['up', 'down'] },
    },
  ],

  isAccepted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
})

export const Answer = mongoose.model('Answer', answerSchema)
