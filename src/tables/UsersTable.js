import * as React from "react";
import { useState, useEffect } from "react";
import { userData } from "../data";
import { getToken } from "../helpers/index";
import Api from "../api/";
import Collapse from "@mui/material/Collapse";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import { tableCellClasses } from "@mui/material/TableCell";
import PropTypes from "prop-types";
import Toolbar from "@mui/material/Toolbar";
import TableSortLabel from "@mui/material/TableSortLabel";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Checkbox from "@mui/material/Checkbox";
import { styled } from "@mui/material/styles";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export const UsersTable = () => {
  const [filteredColumns, setFilteredColumns] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [itemIndex, setItemIndex] = React.useState(null);
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const [userColumns, setUserColumns] = useState([]);
  const [tenants, setTenants] = useState([]);
  const token = getToken();
  const tableColumns = Object.keys(userData[0]);

  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  //--------------------------------Functions------------------------------------
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }
  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }
  function EnhancedTableHead(props) {
    const {
      onSelectAllClick,
      order,
      orderBy,
      numSelected,
      rowCount,
      onRequestSort,
    } = props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              color="primary"
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{
                "aria-label": "select all desserts",
              }}
            />
          </TableCell>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? "right" : "left"}
              padding={headCell.disablePadding ? "none" : "normal"}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }

  EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(["asc", "desc"]).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
  };

  const EnhancedTableToolbar = (props) => {
    const numSelected = props;

    return (
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(numSelected > 0 && {
            bgcolor: (theme) =>
              alpha(
                theme.palette.primary.main,
                theme.palette.action.activatedOpacity
              ),
          }),
        }}
      >
        {numSelected > 0 ? (
          <Typography
            sx={{ flex: "1 1 100%" }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {numSelected} selected
          </Typography>
        ) : (
          <Typography
            sx={{ flex: "1 1 100%" }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            Nutrition
          </Typography>
        )}

        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton>
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
      </Toolbar>
    );
  };

  //------------------------------------------------------------------------------------------------

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  const formatCrudPermissions = (crudData) => {
    // one crudData, means one users tenantAccess with 0s and 1s
    let tenantArray = [];
    crudData.map((tenantId, index) => {
      const splitData = tenantId.split("");

      let newObject = {};
      splitData.map((value, indx) => {
        if (indx === 0) {
          newObject = {
            create: value === "1" ? true : false,
          };
        } else if (indx === 1) {
          newObject = {
            ...newObject,
            read: value === "1" ? true : false,
          };
        } else if (indx === 2) {
          newObject = {
            ...newObject,
            update: value === "1" ? true : false,
          };
        } else {
          newObject = {
            ...newObject,
            delete: value === "1" ? true : false,
          };
        }
      });

      tenantArray.push({ ...tenants[index], crudAccess: newObject });
      newObject = {};
    });

    return tenantArray;
  };

  const formatUserData = (userDetails) => {
    const formattedArray = [];
    const userData = [...userDetails];

    userData.map((existingUser, idx) => {
      let finalUserData = {};

      finalUserData = {
        ...existingUser,
        tenantAccess: formatCrudPermissions(existingUser.tenantAccess),
      };

      formattedArray.push(finalUserData);
    });

    setUserColumns(formattedArray);
  };

  const filterAndSetTenants = (tenantIds, tenantNames) => {
    let preTenants = [];
    let allTenants = [];

    tenantIds.map((tid) => {
      const addingTenants = {
        id: tid,
      };
      preTenants.push(addingTenants);
    });

    if (tenantNames && tenantIds.length === preTenants.length) {
      tenantNames.map((name, index) => {
        const addingTenants = {
          ...preTenants[index],
          name: name,
        };
        allTenants.push(addingTenants);
      });
    }
    setTenants(allTenants);
  };

  const UserData = async ({ usernameFilter }) => {
    const usersData = await Api.userList(
      "/users",
      "listUsers",
      usernameFilter,
      token
    );

    const objData = await usersData;

    if (objData) {
      const { tenantIds, tenantNames, userDetails } = objData;
      filterAndSetTenants(tenantIds, tenantNames);
      formatUserData(userDetails);
      // setUserColumns(userDetails);
    }
  };

  const populateColumns = () => {
    let groupedData = [];
    tableColumns.map((item) => {
      if (item !== "tenants") {
        const addingItem = {
          title: item,
          field: item,
        };
        groupedData.push(addingItem);
      }
    });
    setFilteredColumns(groupedData);
  };
  useEffect(() => {
    populateColumns();

    UserData("");
  }, []);

  return (
    <React.Fragment>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 600 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead stickyHeader aria-label="sticky table">
              <StyledTableRow>
                {filteredColumns.map((item) => (
                  <StyledTableCell>{item.title}</StyledTableCell>
                ))}
                <StyledTableCell>Toggle Tenants</StyledTableCell>
              </StyledTableRow>
            </TableHead>

            <TableBody>
              {/* {(stableSort(userColumns, getComparator(order, orderBy)).slice(
                page * rowsPerPage
              ),
              page * rowsPerPage + rowsPerPage).map((userColumns, index) => {})} */}

              {userColumns &&
                userColumns.map((user, index) => (
                  <>
                    <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
                      <StyledTableCell sx={{ maxWidth: 275 }}>
                        {user.username}
                      </StyledTableCell>
                      <StyledTableCell>{user.displayName}</StyledTableCell>

                      <StyledTableCell>
                        <IconButton
                          aria-label="expand row"
                          size="small"
                          onClick={() => {
                            setOpen(!open);
                            setItemIndex(index);
                          }}
                        >
                          {open && itemIndex === index ? (
                            <KeyboardArrowUpIcon />
                          ) : (
                            <KeyboardArrowDownIcon />
                          )}
                        </IconButton>
                      </StyledTableCell>
                    </TableRow>

                    <StyledTableRow>
                      <StyledTableCell
                        style={{ paddingBottom: 0, paddingTop: 0 }}
                        colSpan={6}
                      >
                        <Collapse
                          in={open && itemIndex === index}
                          timeout="auto"
                          unmountOnExit
                        >
                          <Box sx={{ margin: 1 }}>
                            <Table size="small" aria-label="purchases">
                              <TableHead>
                                <StyledTableRow>
                                  <StyledTableCell>Tenant Name</StyledTableCell>
                                  <StyledTableCell>Create</StyledTableCell>
                                  <StyledTableCell>Read</StyledTableCell>
                                  <StyledTableCell>Update</StyledTableCell>
                                  <StyledTableCell>Delete</StyledTableCell>
                                </StyledTableRow>
                              </TableHead>
                              <TableBody>
                                {tenants.map((tenant) => (
                                  <StyledTableRow key={tenant.tenantIds}>
                                    <StyledTableCell>
                                      {tenant.name}
                                    </StyledTableCell>
                                    <StyledTableCell>
                                      <Checkbox
                                        {...label}
                                        defaultChecked={tenant.create}
                                      />
                                    </StyledTableCell>
                                    <StyledTableCell>
                                      <Checkbox
                                        {...label}
                                        defaultChecked={tenant.read}
                                      />
                                    </StyledTableCell>
                                    <StyledTableCell>
                                      <Checkbox
                                        {...label}
                                        defaultChecked={tenant.update}
                                      />
                                    </StyledTableCell>
                                    <StyledTableCell>
                                      <Checkbox
                                        {...label}
                                        defaultChecked={tenant.delete}
                                      />
                                    </StyledTableCell>
                                    <StyledTableCell>
                                      {tenant.tenantIds}
                                    </StyledTableCell>
                                  </StyledTableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </Box>
                        </Collapse>
                      </StyledTableCell>
                    </StyledTableRow>
                  </>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </React.Fragment>
  );
};
