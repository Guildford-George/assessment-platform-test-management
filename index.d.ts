import type { IOrganizationUser, IPublicPayload } from "./src/lib/types";

declare global {
    namespace Express {
        interface Request  {
            user?: IOrganizationUser | IPublicPayload
        }
    }
}

export {}