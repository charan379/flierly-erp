import { Prisma } from "@prisma/client";

function sortByBuilder(sortBy: SortBy) {
    let filtered: SortBy = {}

    let erre: Prisma.BranchOrderByWithAggregationInput = {};

    const s: string[] = Object.keys(erre);

    for (let key in sortBy) {

    }
    return filtered;
}

export default sortByBuilder;