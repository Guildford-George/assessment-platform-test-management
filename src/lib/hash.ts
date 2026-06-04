import type { CreateQuestionDto, UpdateQuestionDto } from "./dtos/questionDto";
import {createHash} from "crypto"
class Hash {
    static question(data: CreateQuestionDto| UpdateQuestionDto){
        const {cagetoryId,domainId,options,organizationId,questionText,questionType}= data
        options.sort((a,b)=>{
            if(a.text>b.text){
                return 1
            }
            if(a.text<b.text){
                return -1
            }
            
            return 0
        })
        const hash= createHash('sha256')

        const value= `${organizationId}:${domainId}:${cagetoryId}:${questionType}:${questionText}:${options.toString()}`
        hash.update(value)
        return hash.digest("hex")
    }

    static questionOptions(options: (CreateQuestionDto| UpdateQuestionDto)["options"]){
        options.sort((a,b)=>{
            if(a.text>b.text){
                return 1
            }
            if(a.text<b.text){
                return -1
            }
            
            return 0
        })
        const hash= createHash('sha256')
        hash.update(options.toString())
        return hash.digest("hex")
    }
}

export default Hash