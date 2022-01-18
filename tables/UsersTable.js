import MaterialTable from "material-table";
import tableIcons from "./IconProvider";
import { useState, useEffect } from "react";

const columns = [
  { title: "ID", field: "id" },
  { title: "Full Name", field: "name" },
  { title: "Username", field: "username" },
  { title: "Email", field: "email" },
];

export const UsersTable = () => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((data) => data.json())
      .then((data) => setTableData(data));
  });

  return (
    <MaterialTable
      title="Users Table"
      icons={tableIcons}
      columns={columns}
      data={tableData}
      options={{
        exportButton: true,
        grouping: true,
      }}
    />
  );
};
