import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['answer', 'comment', 'mention'], required: true },
  question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' }, // optional
  answer: { type: mongoose.Schema.Types.ObjectId, ref: 'Answer' },     // optional
  message: { type: String },
  isRead: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

export const Notification = mongoose.model("Notification", notificationSchema);
