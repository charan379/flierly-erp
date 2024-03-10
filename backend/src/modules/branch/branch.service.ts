import FlierlyException from "@/lib/flierly.exception";
import branchRespository from "./branch.repository";
import HttpCodes from "@/constants/httpCodes";

async function create(branch: Branch): Promise<Branch> {
    return await branchRespository.save(branch) as Branch;
}

async function fetchById(id: number): Promise<Branch> {
    return await branchRespository.findOneById(id) as Branch;
}

async function existsByName(name: string): Promise<boolean> {
    return await branchRespository.findOneByName(name) ? true : false;
}

async function existsByEmail(email: string): Promise<boolean> {
    return await branchRespository.findOneByEmail(email) ? true : false;
}

async function existsByPhone(phone: string): Promise<boolean> {
    return await branchRespository.findOneByPhone(phone) ? true : false;
}

async function updateById(branchId: number, update: Branch): Promise<Branch> {
    const branch = await fetchById(branchId);

    if (update?.name && update?.name.toLowerCase() !== branch.name.toLowerCase()) {
        if (await existsByName(update?.name)) throw new FlierlyException("Invalid Branch update", HttpCodes.BAD_REQUEST, "Branch name already exists", "")
        branch.name = update?.name;
    }

    if (update?.email && update?.email.toLowerCase() !== branch.email.toLowerCase()) {
        if (await existsByEmail(update?.email)) throw new FlierlyException("Invalid Branch update", HttpCodes.BAD_REQUEST, "Branch email already exists", "");
        branch.email = update?.email;
    }

    if (update.phone && update?.phone !== branch.phone) {
        if (await existsByPhone(update?.phone)) throw new FlierlyException("Invalid Branch update", HttpCodes.BAD_REQUEST, "Branch phone already exists", "");
        branch.phone = update?.phone;
    }

    if (update?.alternatePhone && update?.alternatePhone !== branch.alternatePhone) {
        branch.alternatePhone = update?.alternatePhone
    }

    if (update?.isActive !== undefined && update?.isActive !== null && update?.isActive !== branch.isActive) {
        branch.isActive = update?.isActive
    }

    return await branchRespository.updateOneById(branchId, branch) as Branch;
};

async function updateAddressById(branchId: number, addressId: number): Promise<Branch> {
    const branch = await fetchById(branchId);

    if (branch.addressId !== addressId) {
        branch.addressId = addressId;
    }

    return await branchRespository.updateOneById(branchId, branch) as Branch;
};

async function updateTaxIdentityById(branchId: number, taxIdentityId: number): Promise<Branch> {
    const branch = await fetchById(branchId);

    if (branch.taxIdentityId) {
        throw new FlierlyException('Invalid Branch update', HttpCodes.BAD_REQUEST, "Can't change taxIdentity of branch, create new branch if needed.", "")
    }

    if (branch.taxIdentityId !== taxIdentityId) {
        branch.taxIdentityId = taxIdentityId;
    }

    return await branchRespository.updateOneById(branchId, branch) as Branch;
}

async function deleteById(id: number): Promise<Branch> {
    return await branchRespository.deleteOneById(id) as Branch;
};

const branchService = { create, fetchById, existsByName, existsByEmail, existsByPhone, updateById, updateAddressById, updateTaxIdentityById, deleteById };

export default branchService;