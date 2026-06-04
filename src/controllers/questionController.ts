import express from "express"
import questionService from "../services/questionService"
import type { CreateQuestionDto, UpdateQuestionDto } from "../lib/dtos/questionDto"
import type { IOrganizationUser } from "../lib/types"
import QuestionService from "../services/questionService"
class QuestionController {

    static async getQuestionList(req: express.Request, res: express.Response, next: express.NextFunction){
        try {
            const user= req.user as IOrganizationUser
            const questions = await QuestionService.getQuestionList(user.organizationId)
            res.status(200).json({
                success: true,
                data: {questions}
            })
        } catch (error) {
            next(error)
        }
    }
    static async createQuestion (req: express.Request, res: express.Response, next:express.NextFunction){
        try {
            const user= req.user as IOrganizationUser
            const createQuestionDto: CreateQuestionDto= {
                questionText: req.body.questionText,
                questionType: req.body.questionType,
                options: req.body.options,
                cagetoryId: req.body.cagetoryId,
                domainId: req.body.domainId,
                organizationId: user.organizationId,
                difficultyLevel: req.body.difficultyLevel,
                score: req.body.score
            }
            const question= await questionService.createQuestion(createQuestionDto)
            res.status(201).json({
                success: true,
                data: {question}
            })
        } catch (error) {
            next(error)
        }
    }

    static async updateQuestion(req: express.Request, res:express.Response, next: express.NextFunction){
        try {
            const {questionId}= req.params as {questionId: string}
            const user= req.user as IOrganizationUser
            const updateQuestionDto: UpdateQuestionDto= {
                questionText: req.body.questionText,
                questionType: req.body.questionType,
                options: req.body.options,
                cagetoryId: req.body.cagetoryId,
                domainId: req.body.domainId,
                organizationId: user.organizationId,
                difficultyLevel: req.body.difficultyLevel,
                score: req.body.score,
                questionId
            }
            const question= await questionService.updateCurrentQuestionVersion(updateQuestionDto)

            res.status(200).json({
                success: true,
                data: {question}
            })
        } catch (error) {
            next(error)
        }
    }

    static async deleteQuestion(req: express.Request, res: express.Response, next: express.NextFunction){
        try {
            const user= req.user
            const {questionId}= req.params as{questionId: string}

            await QuestionService.deleteQuestionById(questionId)
            res.status(204).json()
        } catch (error) {
            next(error)
        }
    }

    static async getQuestion(req: express.Request, res: express.Response, next: express.NextFunction){
        try {
            const {questionId}= req.params as {questionId: string}
            const question= await QuestionService.getQuestionById(questionId)
            res.status(200).json({
                success: true,
                data: {question}
            })
        } catch (error) {
            next(error)
        }
    }

    static async archiveQuestion(req: express.Request, res: express.Response, next: express.NextFunction){
       try {
        const {questionId}= req.params as {questionId: string}
        const question= await QuestionService.archiveQuestion(questionId)
        res.status(200).json({
            success: true,
            data: {question}
        })
       } catch (error) {
        
       } 
    }


    static async getQuestionVersion(req: express.Request, res: express.Response, next: express.NextFunction){
        try {
            const {questionId, version}= req.params as {questionId: string, version: string}
            const questionVersion = await QuestionService.getQuestionVersion({id: questionId, version: +version})
            res.status(200).json({
                success: true,
                data: {questionVersion}
            })
        } catch (error) {
            next(error)
        }
    }

    static async getQuestionVersionList(req: express.Request, res: express.Response, next: express.NextFunction){
        try {
            const {questionId}= req.params as {questionId: string}
            const questionVersions= await QuestionService.getQuestionVersionList(questionId) 
            res.status(200).json({
                success: true,
                data: {questionVersions}
            })
        } catch (error) {
            next(error)
        }
    }

    static async archiveQuestionVersion(req: express.Request, res: express.Response, next: express.NextFunction){
        try {
            const {questionId, version}= req.params as {questionId: string, version: string}
            const questionVersion= await QuestionService.archiveQuestionVersion({id: questionId, version: +version})
            res.status(200).json({
                success: true,
                data: {questionVersion}
            })
        } catch (error) {
            next(error)
        }
    }
    static async deleteQuestionVersion(req: express.Request, res: express.Response, next: express.NextFunction){
        try {
            const {questionId, version}= req.params as {questionId: string, version: string}
            const questionVersion= await QuestionService.deleteQuestionVersion({id: questionId, version: +version})
            res.status(204).json()
        } catch (error) {
            next(error)
        }
    }

    static async createQuestionVersion(req: express.Request, res: express.Response, next: express.NextFunction){
        try {
            const {questionId}= req.params as {questionId: string}
            const questionVersion= await QuestionService.createQuestionVersion(questionId, req.body)
            res.status(201).json({
                success: true,
                data: {questionVersion}
            })
        } catch (error) {
            next(error)
        }
    }
}

export default QuestionController