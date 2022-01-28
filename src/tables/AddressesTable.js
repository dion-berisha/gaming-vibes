import MaterialTable from "material-table";
import tableIcons from "./IconProvider";
import { useState, useEffect } from "react";

const columns = [
  { title: "ID", field: "id" },
  { title: "Full Name", field: "name" },
  { title: "City", field: "address.city" },
  { title: "Street", field: "address.street" },
];

export const AddressesTable = () => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((data) => data.json())
      .then((data) => setTableData(data));
  });

  return (
    <MaterialTable
      title="Addresses Table"
      icons={tableIcons}
      columns={columns}
      data={tableData}
      options={{
        exportButton: true,
        grouping: true,
        paging: false,
      }}
    />
  );
};
