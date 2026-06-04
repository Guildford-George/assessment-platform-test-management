import jwt from "jsonwebtoken";
import { TokenType, type IOrganizationUser, type IPublicPayload, type ITokenPayloadList, type JwtPayloadExt } from "./types";
import { InternalServerErrorException, UnauthorizedException } from "./exception/statusCodeExceptions";
import { AUTH_ERRORS, SYSTEM_ERRORS } from "./exception/errorMessage";

class AppToken {
    static decodeAccessToken (token: string){
        try {
            const secret= process.env["ACCESSTOKEN_SECRET"] as string
            const verifiedToken= jwt.verify(token,secret)  as JwtPayloadExt
            const {organizationId,email,userId,permissions,roleId,roleName,tokenType}= verifiedToken
            const authUser:IOrganizationUser= {organizationId,email,userId,permissions,roleId,roleName,tokenType}
            return authUser
        } catch (error) {
            if(error instanceof jwt.JsonWebTokenError){
                throw new UnauthorizedException({
                    error: AUTH_ERRORS.INVALID_CREDENTIALS
                })
            }
            if(error instanceof jwt.TokenExpiredError){
                throw new UnauthorizedException({
                    error: AUTH_ERRORS.TOKEN_EXPIRED
                })
            }

            throw error
        }
    }

    static decodePublicToken(token: string){
         try {
            const secret= process.env["PUBLIC_ACCESSTOKEN_SECRET"] as string
            const verifiedToken= jwt.verify(token,secret) 
            const {email,userId,permissions,roleId,roleName,tokenType}= verifiedToken as IPublicPayload
            const publicUser: IPublicPayload= {email,userId,permissions,roleId,roleName,tokenType}
            return publicUser
        } catch (error) {
            if(error instanceof jwt.JsonWebTokenError){
                throw new UnauthorizedException({
                    error: AUTH_ERRORS.INVALID_CREDENTIALS
                })
            }
            if(error instanceof jwt.TokenExpiredError){
                throw new UnauthorizedException({
                    error: AUTH_ERRORS.TOKEN_EXPIRED
                })
            }

            throw error
        }
    }

    static decodeUnknownToken(token: string){
        const tokenTypeList= [TokenType.ACCESSTOKEN, TokenType.PUBLICTOKEN]
        return AppToken.decodeSpecificToken(token, tokenTypeList)
    }
    static decodeSpecificToken(token: string, tokenTypeList: TokenType[]){
         if(!tokenTypeList.length){
            throw new InternalServerErrorException({
                error: SYSTEM_ERRORS.INTERNAL_ERROR,
                details: {cause: "Tokentype list can not be empty"}
            })
        }

        const decodeList: ((token: string) => ITokenPayloadList)[]= []
        for(let tokenType of tokenTypeList){
            switch (tokenType){
                case TokenType.ACCESSTOKEN:
                    decodeList.push(AppToken.decodeAccessToken)
                    break;
                case TokenType.PUBLICTOKEN:
                    decodeList.push(AppToken.decodePublicToken)
                    break;

                default:
                    throw new InternalServerErrorException({
                        error: SYSTEM_ERRORS.INTERNAL_ERROR,
                        details: {cause: "Unhandled token type"}
                    })
            }
        }
        const uniqueErrors= new Map<string, unknown>()
        const user= decodeList.reduce((prev,curr)=>{
            try {
                return curr(token)
            } catch (error) {
                const errorName= (error as Error).name
                uniqueErrors.set(errorName, error)
                return prev
            }
        },undefined as ITokenPayloadList | undefined)

        if(user){return user}
        if(uniqueErrors.has(jwt.TokenExpiredError.name)){
            throw new UnauthorizedException({
                error: AUTH_ERRORS.TOKEN_EXPIRED
            })
        }
        if(uniqueErrors.has(jwt.JsonWebTokenError.name)){
            throw new UnauthorizedException({
                error: AUTH_ERRORS.INVALID_CREDENTIALS
            })
        }
        
        const unknownError= uniqueErrors.values()
        throw unknownError.next().value

    }

    static generateAccessToken(payload: IOrganizationUser){
        return jwt.sign(payload,process.env['ACCESSTOKEN_SECRET']!)
    }
}

export default AppToken