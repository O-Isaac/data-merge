// Query array by regex for filter

const QueryArray = (array, regex) => {
    return array.filter(item => item.match(regex)).length > 0;
};

const QueryCE = (crafts, regex) => {
    const reg = new RegExp(regex.toLowerCase(), 'gi');
    return crafts.filter(craft => (craft.name.toLowerCase().match(reg) ?? []).length > 0);
}

module.exports = { QueryArray, QueryCE };