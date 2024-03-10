import branchRespository from "./branch.repository";



async function create(branch: Branch): Promise<Branch> {
    return await branchRespository.save(branch) as Branch;
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

async function deleteById(id: number): Promise<Branch> {
    return await branchRespository.deleteOneById(id) as Branch;
};

const branchService = { create, existsByName, existsByEmail, existsByPhone, deleteById };

export default branchService;