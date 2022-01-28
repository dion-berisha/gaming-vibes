import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";

export const MuiTable = () => {
  const [tableData, setTableData] = useState([]);

  const columns = [
    { headerName: "ID", field: "id" },
    { headerName: "Full Name", field: "name" },
    { headerName: "Username", field: "username" },
    { headerName: "Email", field: "email" },
  ];

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((data) => data.json())
      .then((data) => setTableData(data));
  }, []);

  console.log("we are filtering table data");

  return (
    <DataGrid
      columns={columns}
      data={tableData}
      options={{}}
      pageSize={5}
      rowsPerPageOptions={[5]}
      checkboxSelection
    />
  );
};
