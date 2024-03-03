import { PrismaClient } from "@prisma/client";


// funtion to return new prisma client whenever called
const prismaClientSingleton = () => new PrismaClient();

// modify globalThis type to contians prisma client
declare global {
    var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

// declare new variable to store prisma client
let prisma: ReturnType<typeof prismaClientSingleton>;

if(process.env.NODE_ENV === 'production') {
    prisma = prismaClientSingleton();
} else {
    prisma = globalThis.prisma ?? prismaClientSingleton();
    globalThis.prisma = prisma;
};

export default prisma;