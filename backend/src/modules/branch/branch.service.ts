import { Prisma } from "@prisma/client";
import respository from "./branch.repository";



async function createBranch(branch: Branch): Promise<Branch> {

    const data: Prisma.BranchCreateInput = {
        name: branch.name,
        email: branch.email,
        phone: branch.phone,
        alternatePhone: branch.alternatePhone,
        address: {
            connectOrCreate: undefined,
        },
        taxIdentity: {
            connectOrCreate: undefined,
        }
    }

    return await respository.save(data) as Branch;
}

async function existsByName(name: string): Promise<boolean> {
    return await respository.findOneByName(name) ? true : false;
}

async function existsByEmail(email: string): Promise<boolean> {
    return await respository.findOneByEmail(email) ? true : false;
}

async function existsByPhone(phone: string): Promise<boolean> {
    return await respository.findOneByPhone(phone) ? true : false;
}
