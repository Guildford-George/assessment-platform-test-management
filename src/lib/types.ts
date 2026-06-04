import type { JwtPayload } from "jsonwebtoken"

export enum TokenType {
    ACCESSTOKEN= "ACCESSTOKEN",
    PUBLICTOKEN="PUBLICTOKEN"
}
export interface IOrganizationUser {
    userId: string
    email: string
    roleId: string,
    roleName: string
    tokenType: TokenType
    organizationId: string
    permissions: string[]
}

export type IPublicPayload = Omit<IOrganizationUser, "organizationId">

export interface JwtPayloadExt extends JwtPayload, IOrganizationUser{}
export type ITokenPayloadList= IPublicPayload | IOrganizationUser

