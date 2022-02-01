import * as React from "react";
import { useState, useEffect } from "react";
import { userData } from "../data";
import Collapse from "@mui/material/Collapse";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Paper from "@mui/material/Paper";

// import { AddBox, ArrowDownward } from "@material-ui/icons";

export const UsersTable = ({ tableTitle }) => {
  const [tableData, setTableData] = useState([]);
  const [filteredColumns, setFilteredColumns] = useState([]);
  // const [selectedRow, setSelectedRow] = useState(null);

  const tableColumns = Object.keys(userData[0]);

  const populateColumns = () => {
    let groupedData = [];
    tableColumns.map((item) => {
      const addingItem = {
        title: item,
        field: item,
      };
      groupedData.push(addingItem);
    });

    setFilteredColumns(groupedData);
  };

  useEffect(() => {
    populateColumns();
  }, []);

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {filteredColumns.map((item) => (
              <TableCell>{item.title}</TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {userData.map((item) => (
            <TableRow
              key={item.title}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {item.userName}
              </TableCell>
              <TableCell>{item.displayName}</TableCell>
              <TableCell>{item.createdOn}</TableCell>
              {item.tenants.map((tenant) => {
                <TableCell>{tenant.tenantId}</TableCell>;
                <TableCell>{tenant.name}</TableCell>;
                <TableCell>{tenant.description}</TableCell>;
              })}
              <TableCell>
                <IconButton
                  aria-label="expand row"
                  size="small"
                  onClick={() => setOpen(!open)}
                >
                  {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
              </TableCell>
              <TableCell>
                <Collapse in={open} timeout="auto" unmountOnExit>
                  <Box sx={{ margin: 1 }}>
                    <Typography variant="h6" gutterBottom component="div">
                      History
                    </Typography>
                    <Table size="small" aria-label="purchases">
                      <TableHead>
                        <TableRow>
                          <TableCell>Date</TableCell>
                          <TableCell>Customer</TableCell>
                          <TableCell>Amount</TableCell>
                          <TableCell>Total price ($)</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow></TableRow>
                      </TableBody>
                    </Table>
                  </Box>
                </Collapse>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
