import { useEffect, useState } from "react";
import { userData } from "../data";
import { DataGrid } from "@mui/x-data-grid";

import Api from "../api/";
import { getToken } from "../helpers/index";

export const NewTable = () => {
  const [userColumns, setUserColumns] = useState([]);
  const tableColumns = Object.keys(userData[0]);
  const [tenants, setTenants] = useState([]);
  const [tenantAccess, setTenantAccess] = useState([]);
  const [filteredColumns, setFilteredColumns] = useState([]);

  const token = getToken();

  const userAccess = (userDetails) => {
    let preAccess = [];
    let Access = [];

    userDetails.map((user) => {
      const getAccess = {
        id: user.tenantAccess,
      };
      preAccess.push(getAccess);
    });

    preAccess.map((access) => {
      const accessArray = {
        crud: access.id,
      };
      Access.push(accessArray);
    });
    const Dioni = ["1011"];
    const splitted = Dioni.split("");

    console.log(splitted);
    // console.log(splittedAccess);
  };

  const filterAndSetTenants = (tenantIds, tenantNames) => {
    // set tenants with tenantIds, and merge with tenantList

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
      setUserColumns(userDetails);
      filterAndSetTenants(tenantIds, tenantNames);
      userAccess(userDetails);
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
    <div>
      <DataGrid columns={tableColumns} />
    </div>
  );
};
