import express from "express"
import QuestionController from "../controllers/questionController"
const questionRouter= express.Router()

// question
questionRouter.get("/", QuestionController.getQuestionList)
questionRouter.post("/", QuestionController.createQuestion)
questionRouter.get("/:questionId", QuestionController.getQuestion)
questionRouter.put("/:questionId", QuestionController.updateQuestion)
questionRouter.put("/questionId/archive", QuestionController.archiveQuestion)
questionRouter.delete("/:questionId", QuestionController.deleteQuestion)

// version question'


export default questionRouter