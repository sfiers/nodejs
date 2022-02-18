import _ from "lodash";

export function paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize;
  return _(items) //lodash wrapper
    .slice(startIndex)
    .take(pageSize)
    .value(); // returns a regular array
}
