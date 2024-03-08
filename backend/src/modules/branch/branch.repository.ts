import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";

async function save(newbranch: Prisma.BranchCreateInput) {
    return prisma.branch.create({
        data: newbranch
    });
};

async function findOneByName(name: string) {
    return prisma.branch.findFirst({
        where: {
            name: { equals: name, mode: "insensitive" },
            isDeleted: false
        },
    });
};

async function findOneByEmail(email: string) {
    return prisma.branch.findFirst({
        where: {
            email: { equals: email, mode: "insensitive" },
            isDeleted: false
        },
    });
};

async function findOneByPhone(phone: string) {
    return prisma.branch.findFirst({
        where: {
            phone: { equals: phone },
            isDeleted: false,
        },
    });
};

const respository = { save, findOneByName, findOneByEmail, findOneByPhone };

export default respository;