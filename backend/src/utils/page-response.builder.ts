

async function pageResponseBuilder<T>(data: T[], page: number, pageSize: number, totalResults: number, sort: object): Promise<PageResult<T>> {

    let pageResponse: PageResult<T> = {
        data: [],
        page,
        pageSize,
        totalResults,
        totalPages: Math.ceil(totalResults / pageSize),
        sort,
    };

    pageResponse = {
        ...pageResponse,
        hasNextPage: (page < pageResponse.totalPages),
        hasPreviousPage: (page > 1 && pageResponse?.totalPages > 0),
    };

    pageResponse = {
        ...pageResponse,
        nextPage: (pageResponse?.hasNextPage) ? (page + 1) : undefined,
        previousPage: (pageResponse?.hasPreviousPage) ? (page - 1) : undefined
    }

    pageResponse.data = data;

    return pageResponse;
};


export default pageResponseBuilder;