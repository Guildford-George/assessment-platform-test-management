import type { Option, QuestionOption, QuestionVersion } from "../../generated/prisma/client";

class QuestionResponse {
    static getQuestion(question: QuestionVersion & {questionOption: QuestionOption & {options: Option[]}}){
        const {categoryId,difficultyLevel,domainId,id,questionText,questionType,score,version,versionStatus,questionOption, updatedAt,createdAt}= question
        const options= questionOption.options.map(({isCorrect,text})=>({text, isCorrect}))
        return {
            id,
            questionType,
            questionText,
            difficultyLevel,
            domainId,
            categoryId,
            score,
            version,
            status: versionStatus,
            createdAt,
            updatedAt,
            options,
        }
    }
}

export default QuestionResponse