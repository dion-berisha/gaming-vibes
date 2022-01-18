import MaterialTable from "material-table";
import tableIcons from "./IconProvider";
import { useState, useEffect } from "react";

const columns = [
  { title: "ID", field: "id" },
  { title: "Full Name", field: "name" },
  { title: "Website", field: "website" },
  { title: "Company", field: "company.name" },
];

export const CompaniesTable = () => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((data) => data.json())
      .then((data) => setTableData(data));
  });

  return (
    <MaterialTable
      title="First Table"
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
