import MaterialTable from "material-table";
import tableIcons from "./IconProvider";
import * as React from "react";
import { useState, useEffect } from "react";
// import { AddBox, ArrowDownward } from "@material-ui/icons";

const columns = [
  { title: "ID", field: "id" },
  { title: "Full Name", field: "name" },
  { title: "Username", field: "username" },
  { title: "Email", field: "email" },
];

export const UsersTable = ({ tableTitle }) => {
  const [tableData, setTableData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((data) => data.json())
      .then((data) => setTableData(data));
  }, []);

  const tableRef = React.createRef();
  return (
    <MaterialTable
      title="Users Table"
      icons={tableIcons}
      columns={columns}
      data={tableData}
      options={{
        draggable: true,
        exportButton: true,
        grouping: true,
        sorting: true,
        paging: true,
        pageSize: 7,
      }}
    />
  );
};
