// controllers/questionController.js
import { Question } from '../models/questions.models.js'

export const createQuestion = async (req, res) => {
  const { title, description, tags } = req.body
  if (!title || !description) return res.status(400).json({ message: 'Title and description required' })

  try {
    const newQuestion = new Question({
      title,
      description,
      tags,
      user: req.user._id,
    })
    await newQuestion.save()
    res.status(201).json(newQuestion)
  } catch (error) {
    res.status(500).json({ message: 'Failed to create question' })
  }
}

export const getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find().populate('user', 'fullName').sort({ createdAt: -1 })
    res.status(200).json(questions)
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch questions' })
  }
}

export const getQuestionById = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id).populate('user', 'fullName')
    if (!question) return res.status(404).json({ message: 'Question not found' })
    res.status(200).json(question)
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch question' })
  }
}
