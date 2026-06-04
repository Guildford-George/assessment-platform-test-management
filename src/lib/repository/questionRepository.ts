import { ResourceStatus, VersionStatus } from "../../generated/prisma/enums";
import { SortOrder } from "../../generated/prisma/internal/prismaNamespace";
import type { ISaveQuestion, IUpdateQuestion, QuestionVersionId } from "../dtos/questionDto";
import prisma from "../prisma";

class QuestionRepository{
    static async createQuestion(data: ISaveQuestion){
        const {question,questionOption,questionVersion}=data
        return prisma.$transaction(async(tsx)=>{
            
            const saveQuestionOption= await tsx.questionOption.create({
                data: {
                    hash: questionOption.hash,
                    options: {
                        createMany: {
                            data: questionOption.options
                        }
                    },
                },
                include: {
                    options: true
                }
            })
            const savedQuestion= await tsx.question.create({
                data: {
                    ...question,
                    questionVersions: {
                        create: {
                            ...questionVersion,
                            questionOptionId: saveQuestionOption.id,
                            isCurrent: true
                        }
                    }
                },
                include: {
                    questionVersions: true
                }
            })

            return {
                ...savedQuestion,
                questionOption: saveQuestionOption
            }

        })
    }

    static async questionVersionExist(hash: string){
        return prisma.questionVersion.findFirst({
            where: {
                hash,
            }
        })
    }

    static async getCurrentQuestionById(questionId:string){
        return prisma.questionVersion.findFirst({
            where: {
                id: questionId,
                isCurrent: true
            },
            include:{
                questionOption: {
                    include: {
                        options: true
                    }
                }
            }
        })
    }

    static async updateCurrentQuestionVersion(questionVersionId: QuestionVersionId, data: IUpdateQuestion){
        const {questionOption,questionVersion}= data
        return prisma.$transaction(async(tsx)=>{
            await tsx.option.deleteMany({
                where: {
                    questionOptionId: questionOption.id
                }
            })


            const updadteQuestionOption= await tsx.questionOption.update({
                where: {id: questionOption.id},
                data: {
                    hash: questionOption.hash,
                    options: {
                        createMany: {
                            data: questionOption.options
                        }
                    }
                },
                include: {
                    options: true
                }
            })


            const updatedQuestion= await tsx.questionVersion.update({
                where: {
                    id_version: {id: questionVersionId.id, version: questionVersionId.version}
                },
                data:questionVersion
            })
            return {
                ...updatedQuestion,
                questionOption: updadteQuestionOption

            }
        })
    }

    static async getQuestionVersionById(questionVersionId: QuestionVersionId){
        const {id,version}= questionVersionId
        return prisma.questionVersion.findFirst({
            where: {id, version},
            include:{
                questionOption: {
                    include: {
                        options: true
                    }
                }
            }
        })
    }

    // Question
    static async updateQuestionStatus(questionId: string, resourceStatus: ResourceStatus){
        return prisma.question.update({
            where: {id: questionId},
            data: {
                resourceStatus
            }
        })
    }
    static async getQuestionById(questionId: string){
        return prisma.question.findFirst({
            where: {id: questionId},
            include: {
                questionVersions: {
                    where: {
                        isCurrent: true
                    },
                    include: {
                        questionOption: {
                            include: {
                                options: true
                            }
                        }
                    }
                }
            }
        })
    }

    static async getQuestionList(organizationId: string){
        return prisma.question.findMany({
            where: {
                resourceStatus: {
                    in: [ResourceStatus.ACTIVE, ResourceStatus.INACTIVE]
                },
                OR: [
                    {isSystem: true},
                    {organizationId}
                ]
            },
            include: {
                questionVersions: {
                    where: {
                        isCurrent: true
                    }
                }
            }
        })
    }

    static async getQuestionVersionList(id: string){
        return prisma.questionVersion.findMany({
            where: {
                id,
                versionStatus: {
                    in: [VersionStatus.DRAFT, VersionStatus.PUBLISHED]
                }
            },
            orderBy:{
                version: SortOrder.desc
            }
        })
    }

    static async updateQuestionVersionStatus(questionVersionId: QuestionVersionId, status: VersionStatus){
        const {id,version}= questionVersionId
        return prisma.questionVersion.update({
            where: {
                id_version: {id,version}
            },
            data: {
                versionStatus: status
            }
        })
    }
}

export default QuestionRepository