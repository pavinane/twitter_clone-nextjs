import { PrismaClient } from "@prisma/client";


// because we using global; , lot of prisma client  so we can make fast responce 

declare global {
    var prisma: PrismaClient | undefined
}
const client = globalThis.prisma || new PrismaClient()
if(process.env.NODE_ENV !== 'production') globalThis.prisma = client;

export default client