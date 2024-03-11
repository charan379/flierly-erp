import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";

async function save(branch: Branch, includes?: Prisma.BranchInclude) {

    const data: Prisma.BranchCreateInput = {
        name: branch.name,
        email: branch.email,
        phone: branch.phone,
        alternatePhone: branch.alternatePhone,
        address: {
            connect: { id: branch.addressId },
        },
        taxIdentity: {
            connect: { id: branch.taxIdentityId },
        }
    }

    return prisma.branch.create({
        data,
        include: includes
    });
};

async function findManyWithOffsetPagination(branchQuery: Prisma.BranchWhereInput, skip: number, take: number, include?: Prisma.BranchInclude) {
    return prisma.branch.findMany({
        skip,
        take,
        where: branchQuery,
        include: include,
        orderBy: { id: "desc" },
    });
}

async function countByQuery(branchQuery: Prisma.BranchWhereInput) {
    return prisma.branch.count({
        where: branchQuery,
    });
};

async function findOneById(id: number, includes?: Prisma.BranchInclude) {
    return prisma.branch.findUniqueOrThrow({
        where: {
            id: id,
            isDeleted: false
        },
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
            isDeleted: false,
            email: { equals: email, mode: "insensitive" },
        },
        include: includes
    });
};

async function findOneByPhone(phone: string, includes?: Prisma.BranchInclude) {
    return prisma.branch.findFirst({
        where: {
            isDeleted: false,
            phone: { equals: phone },
        },
        include: includes
    });
};

async function updateOneById(id: number, update: Branch, includes?: Prisma.BranchInclude) {
    const data: Prisma.BranchUpdateInput = {
        name: update.name,
        isActive: update.isActive,
        email: update.email,
        phone: update.phone,
        alternatePhone: update.alternatePhone,
        address: { connect: { id: update.addressId } },
        taxIdentity: { connect: { id: update.taxIdentityId } },
    };

    return prisma.branch.update({
        where: { id: id, isDeleted: false },
        data,
        include: includes
    })
};

async function deleteOneById(id: number) {
    return prisma.branch.update({
        where: { id: id, isDeleted: false },
        data: { isDeleted: true, isActive: false }
    });
}

const branchRespository = { save, findManyWithOffsetPagination, countByQuery, findOneById, findOneByName, findOneByEmail, findOneByPhone, updateOneById, deleteOneById };

export default branchRespository;