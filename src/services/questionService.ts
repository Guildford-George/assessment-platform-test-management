import { ResourceStatus, VersionStatus } from "../generated/prisma/enums";
import type { CreateQuestionDto, CreateQuestionVersionDto, ISaveQuestion, IUpdateQuestion, QuestionVersionId, UpdateQuestionDto } from "../lib/dtos/questionDto";
import { QUESTION_ERRORS } from "../lib/exception/errorMessage";
import { BadRequestException } from "../lib/exception/statusCodeExceptions";
import Hash from "../lib/hash";
import Helpers from "../lib/helpers";
import QuestionRepository from "../lib/repository/questionRepository";
import TransactionRepository from "../lib/repository/transactionRepository";
import QuestionResponse from "../lib/response/question";
import type { IOrganizationUser } from "../lib/types";

class QuestionService {
    static async createQuestion(createQuestionDto: CreateQuestionDto){
             const hash= Hash.question(createQuestionDto)
             const questionVersionExist= await QuestionRepository.questionVersionExist(hash)

             if(questionVersionExist){
                // question already exist based on hah value
                throw new BadRequestException({
                    error: QUESTION_ERRORS.ALREADY_EXISTS
                })
             }
             const questionData: ISaveQuestion["question"]= {
                isSystem: Helpers.checkIsSystem(createQuestionDto.organizationId),
                organizationId: createQuestionDto.organizationId,
                resourceStatus: ResourceStatus.ACTIVE
             }

             const questionVersionData: ISaveQuestion["questionVersion"]= {
                categoryId: createQuestionDto.cagetoryId,
                difficultyLevel: createQuestionDto.difficultyLevel,
                domainId: createQuestionDto.domainId,
                questionText: createQuestionDto.questionText,
                questionType: createQuestionDto.questionType,
                score: createQuestionDto.score,
                version: 1,
                versionStatus: VersionStatus.DRAFT,
                hash
             }

             const questionOptionData: ISaveQuestion["questionOption"]= {
                options: createQuestionDto.options,
                hash: Hash.questionOptions(createQuestionDto.options)
             }

            //  save question 
            return QuestionRepository.createQuestion({
                question: questionData,
                questionVersion: questionVersionData,
                questionOption: questionOptionData
            })
             
    }

    static async updateCurrentQuestionVersion(updateQuestionDto: UpdateQuestionDto){
        const hash= Hash.question(updateQuestionDto)
        const questionVersionExist = await QuestionRepository.questionVersionExist(hash)
        const question= (await QuestionRepository.getCurrentQuestionById(updateQuestionDto.questionId))!
        if(questionVersionExist && questionVersionExist.id===updateQuestionDto.questionId){
            // when nothing is updated
            return  question
        }

        if(questionVersionExist && questionVersionExist.id!== updateQuestionDto.questionId){
            // question was updated to questin that already exist 
            throw new BadRequestException({
                error: QUESTION_ERRORS.ALREADY_EXISTS
            })
        }
        const questionVersionId: QuestionVersionId={
            id: question.id,
            version: question.version
        }

        const updateQuestionData: IUpdateQuestion ={
            questionOption: {
                id: question.questionOptionId,
                hash:Hash.questionOptions(updateQuestionDto.options),
                options: updateQuestionDto.options
            },
            questionVersion: {
                questionText: updateQuestionDto.questionText,
                questionType: updateQuestionDto.questionType,
                score: updateQuestionDto.score,
                difficultyLevel:updateQuestionDto.difficultyLevel,
                domainId: updateQuestionDto.domainId,
                categoryId: updateQuestionDto.cagetoryId,
                hash,
            }
        }
        return QuestionRepository.updateCurrentQuestionVersion(questionVersionId, updateQuestionData)
    }

    static async getCurrentQuestionById(questionId: string){
        return QuestionRepository.getCurrentQuestionById(questionId)
    }

    static async deleteQuestionById(questionId:string){
        return QuestionRepository.updateQuestionStatus(questionId, ResourceStatus.DELETED)
    }

    static async getQuestionById(questionId: string){
        const {isSystem,organizationId,questionVersions,createdAt}= (await QuestionRepository.getQuestionById(questionId))!
        const currentQuestionVersion= questionVersions[0]!
        const response= QuestionResponse.getQuestion(currentQuestionVersion)
        return {
            ...response,
            isSystem,
            organizationId,
            createdAt
        }
    }

    static async archiveQuestion(questionId: string){
        return QuestionRepository.updateQuestionStatus(questionId, ResourceStatus.ARCHIVED)
    }

    static async getQuestionList(organizationId: string){
        const questions= await QuestionRepository.getQuestionList(organizationId)

        return questions.map((question)=>{
            const {createdAt,isSystem,questionVersions,}= question
            const {categoryId,difficultyLevel,domainId,id,questionText,questionType,score,updatedAt,version,versionStatus}= questionVersions[0]!
            return {
                id,
                isSystem,
                createdAt,
                difficultyLevel,domainId,categoryId,questionText,questionType,score,version, updatedAt, status: versionStatus
            }
        })
    }

    static async getQuestionVersion(questionVersionId: QuestionVersionId){
        const {id,version}= questionVersionId
        const questionVersion= (await QuestionRepository.getQuestionVersionById({id, version}))!
        return QuestionResponse.getQuestion(questionVersion)
    }

    static async getQuestionVersionList(questionId: string){
        return QuestionRepository.getQuestionVersionList(questionId)
    }

    static async archiveQuestionVersion(questionVersionId: QuestionVersionId){

        return QuestionRepository.updateQuestionVersionStatus(questionVersionId, VersionStatus.ARCHIVED)
    }

    static async deleteQuestionVersion(questionVersionId: QuestionVersionId){
        return QuestionRepository.updateQuestionVersionStatus(questionVersionId, VersionStatus.DELETED)
    }

    static async createQUestionVersion(questionId: string, createQuestionVersionDto: CreateQuestionVersionDto){
        const currentQuestionVersion= (await QuestionRepository.getCurrentQuestionById(questionId))!
        const nextQuestionVersion:CreateQuestionDto= {
            cagetoryId: createQuestionVersionDto.cagetoryId ||  currentQuestionVersion.categoryId,
            difficultyLevel: createQuestionVersionDto.difficultyLevel || currentQuestionVersion.difficultyLevel,
            domainId: createQuestionVersionDto.domainId || currentQuestionVersion.domainId,
            organizationId: createQuestionVersionDto.organizationId as string,
            questionText: createQuestionVersionDto.questionText || currentQuestionVersion.questionText,
            questionType: createQuestionVersionDto.questionType || currentQuestionVersion.questionType,
            score: createQuestionVersionDto.score || currentQuestionVersion.score,
            options: createQuestionVersionDto.options || currentQuestionVersion.questionOption.options.map(({text,isCorrect})=>({text,isCorrect}))
        }

        const nextQuestionVersionHash= Hash.question(nextQuestionVersion)
        if(currentQuestionVersion.hash=== nextQuestionVersionHash){
            throw new BadRequestException({
                error: 
            })
        }
    }
}
export default QuestionService