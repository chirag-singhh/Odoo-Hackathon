
import mongoose from 'mongoose'
import { User } from '../models/users.models.js';
import { Answer } from "../models/answers.models.js";
import { Question } from "../models/questions.models.js";
import { Notification } from "../models/notifications.models.js";


// POST /api/answers/:questionId
// export const postAnswer = async (req, res) => {
//   const { content } = req.body;
//   const { questionId } = req.params;
//   console.log(questionId)

//   if (!content || !questionId) {
//     return res.status(400).json({ message: "Content and questionId are required." });
//   }

//   if (!mongoose.Types.ObjectId.isValid(questionId)) {
//     return res.status(400).json({ message: "Invalid question ID." });
//   }

//   try {
//     const question = await Question.findById(questionId);
//     if (!question) {
//       return res.status(404).json({ message: "Question not found" });
//     }

//     const answer = await Answer.create({
//       content,
//       question: questionId,
//       user: req.user._id,
//     });

//     res.status(201).json({ message: "Answer posted", answer });
//   } catch (err) {
//     res.status(500).json({ message: "Failed to post answer", error: err.message });
//   }
// };
// export const postAnswer = async (req, res) => {
//   const { description } = req.body;
//   let { questionId } = req.params;

//   questionId = questionId.trim(); // 🔥 this is key

//   if (!description || !questionId) {
//     return res.status(400).json({ message: "Content and questionId are required." });
//   }

//   if (!mongoose.Types.ObjectId.isValid(questionId)) {
//     return res.status(400).json({ message: "Invalid question ID." });
//   }

//   try {
//     const question = await Question.findById(questionId);
//     if (!question) {
//       return res.status(404).json({ message: "Question not found" });
//     }

//     const answer = await Answer.create({
//       description,
//       question: questionId,
//       user: req.user._id,
//     });

//     res.status(201).json({ message: "Answer posted", answer });
//   } catch (err) {
//     res.status(500).json({ message: "Failed to post answer", error: err.message });
//   }
// };


// export const postAnswer = async (req, res) => {
//   const { description } = req.body;
//   let { questionId } = req.params;

//   questionId = questionId.trim(); // 🔥 Clean trailing %0A etc.

//   if (!description || !questionId) {
//     return res.status(400).json({ message: "Content and questionId are required." });
//   }

//   if (!mongoose.Types.ObjectId.isValid(questionId)) {
//     return res.status(400).json({ message: "Invalid question ID." });
//   }

//   try {
//     const question = await Question.findById(questionId);
//     if (!question) {
//       return res.status(404).json({ message: "Question not found" });
//     }

//     const answer = await Answer.create({
//       description,
//       question: questionId,
//       user: req.user._id,
//     });

//     // ✅ Create notification for the question owner (if not answering their own question)
//     if (question.user.toString() !== req.user._id.toString()) {
//       await Notification.create({
//         recipient: question.user,
//         type: "answer",
//         question: questionId,
//         answer: answer._id,
//         message: `${req.user.fullName} answered your question.`,
//       });
//       console.log("✅ Notification should be created");
//     }

//     res.status(201).json({ message: "Answer posted", answer });
//   } catch (err) {
//     console.error("❌ Error posting answer:", err.message);
//     res.status(500).json({ message: "Failed to post answer", error: err.message });
//   }
// }; // all working


export const postAnswer = async (req, res) => {
  const { description } = req.body;
  let { questionId } = req.params;

  questionId = questionId.trim();
  console.log("➡️ PostAnswer hit");

  if (!description || !questionId) {
    return res.status(400).json({ message: "Content and questionId are required." });
  }

  if (!mongoose.Types.ObjectId.isValid(questionId)) {
    return res.status(400).json({ message: "Invalid question ID." });
  }

  try {
    const question = await Question.findById(questionId);
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    const answer = await Answer.create({
      description,
      question: questionId,
      user: req.user._id,
    });

    console.log("✅ Answer created:", answer._id);

    if (question.user.toString() !== req.user._id.toString()) {
      const user = await User.findById(req.user._id); // Get fullName
      await Notification.create({
        recipient: question.user,
        type: "answer",
        question: questionId,
        answer: answer._id,
        message: `${user.fullName} answered your question.`,
      });

      console.log("✅ Notification created for", question.user);
    }

    res.status(201).json({ message: "Answer posted", answer });
  } catch (err) {
    console.error("❌ Error posting answer:", err.message);
    res.status(500).json({ message: "Failed to post answer", error: err.message });
  }
};

// GET /api/answers/:questionId
export const getAnswers = async (req, res) => {
  let { questionId } = req.params;
  questionId=questionId.trim()
console.log(questionId)
  if (!mongoose.Types.ObjectId.isValid(questionId)) {
    return res.status(400).json({ message: "Invalid question ID." });
  }

  try {
    const answers = await Answer.find({ question: questionId })
      .populate("user", "fullName profilePic")
      .sort({ createdAt: -1 });

    res.status(200).json(answers);
  } catch (err) {
    res.status(500).json({ message: "Failed to get answers", error: err.message });
  }
};

// PUT /api/answers/:id/vote
export const voteAnswer = async (req, res) => {
  const { id } = req.params;
  const { voteType } = req.body;
  const userId = req.user._id;

  if (!["up", "down"].includes(voteType)) {
    return res.status(400).json({ message: "Invalid vote type. Use 'up' or 'down'" });
  }

  try {
    const answer = await Answer.findById(id);
    if (!answer) return res.status(404).json({ message: "Answer not found" });

    const existingVote = answer.voters.find(v => v.userId.toString() === userId.toString());

    if (existingVote) {
      if (existingVote.voteType === voteType) {
        return res.status(400).json({ message: `You already ${voteType}voted` });
      }

      // Change vote type
      existingVote.voteType = voteType;
      answer.votes += voteType === "up" ? 2 : -2;
    } else {
      answer.voters.push({ userId, voteType });
      answer.votes += voteType === "up" ? 1 : -1;
    }

    await answer.save();
    res.status(200).json({ message: "Vote registered", answer });
  } catch (err) {
    res.status(500).json({ message: "Failed to vote", error: err.message });
  }
};

// PATCH /api/answers/:id/accept
export const acceptAnswer = async (req, res) => {
  const { id } = req.params;

  try {
    const answer = await Answer.findById(id).populate("question");
    if (!answer) return res.status(404).json({ message: "Answer not found" });

    if (answer.question.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Only the question owner can accept an answer" });
    }

    // Unaccept previously accepted answers
    await Answer.updateMany(
      { question: answer.question._id, isAccepted: true },
      { $set: { isAccepted: false } }
    );

    answer.isAccepted = true;
    await answer.save();

    res.status(200).json({ message: "Answer accepted", answer });
  } catch (err) {
    res.status(500).json({ message: "Failed to accept answer", error: err.message });
  }
};
