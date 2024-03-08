import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";

async function save(newbranch: Prisma.BranchCreateInput, includes?: Prisma.BranchInclude) {
    return prisma.branch.create({
        data: newbranch,
        include: includes
    });
};

async function findOneByName(name: string, includes?: Prisma.BranchInclude) {
    return prisma.branch.findFirst({
        where: {
            name: { equals: name, mode: "insensitive" },
            isDeleted: false
        },
        include: includes
    });
};

async function findOneByEmail(email: string, includes?: Prisma.BranchInclude) {
    return prisma.branch.findFirst({
        where: {
            email: { equals: email, mode: "insensitive" },
            isDeleted: false
        },
        include: includes
    });
};

async function findOneByPhone(phone: string, includes?: Prisma.BranchInclude) {
    return prisma.branch.findFirst({
        where: {
            phone: { equals: phone },
            isDeleted: false,
        },
        include: includes
    });
};

const respository = { save, findOneByName, findOneByEmail, findOneByPhone };

export default respository;