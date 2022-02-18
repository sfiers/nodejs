import React from "react"; 

function TableHeader({ sortColumn, onSort, columns }) {
  const raiseSort = (path) => {
    const tempSortColumn = { ...sortColumn };

    if (sortColumn.path === path) {
      tempSortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      tempSortColumn.path = path;
      tempSortColumn.order = "asc";
    }
    onSort(tempSortColumn);
  };

  const renderSortIcon = (column) => {
      if (column.path !== sortColumn.path) return null;
      if (sortColumn.order === 'asc') return <i className='fa fa-sort-asc'></i>
      return <i className='fa fa-sort-desc'></i>
  }

  return (
    <thead>
      <tr className="clickable">
        {columns.map((column) => (
           
          <th key={column.path || column.key} onClick={() => raiseSort(column.path)}>{column.label} {column.path && renderSortIcon(column)}</th>
        ))}
      </tr>
    </thead>
  );
}

export default TableHeader;
