export const urlMatcher = (url) => {
    return url.match(
        /\/tasks\/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/
    )
        ? true
        : false;
};

export const doesExist = (arr, value) => {
    return arr.find((v) => v.id === value) !== undefined ? true : false;
};
