import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";
const connectString= process.env["DATABASE_URL"]!
const adapter= new PrismaPg(connectString)
const prisma= new PrismaClient({adapter})

export default prisma