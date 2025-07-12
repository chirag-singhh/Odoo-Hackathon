// routes/questionRoutes.js
import express from 'express'
import { createQuestion, getAllQuestions, getQuestionById } from '../controllers/questions.controllers.js'
import { protectRoute } from '../middlewares/auth.middlewares.js'

const router = express.Router()

router.post('/', protectRoute, createQuestion)
router.get('/', getAllQuestions)
router.get('/:id', getQuestionById)

export default router
