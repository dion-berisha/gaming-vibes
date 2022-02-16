import { useEffect, useState } from "react";
import { userData } from "../data";
import { DataGrid } from "@mui/x-data-grid";

import Api from "../api/";
import { getToken } from "../helpers/index";

export const NewTable = () => {
  const [userColumns, setUserColumns] = useState([]);
  const [tenants, setTenants] = useState([]);

  // Table Columns for fields added to the headear of tables
  const [filteredColumns, setFilteredColumns] = useState([]);
  const tableColumns = Object.keys(userData[0]);
  const token = getToken();

  const sampleJson = {
    created: "",
    displayName: "",
    // Tek qekjo, ki me i shtu, edhe filtru/ndryshu
    // tenantat me crud access
    tenants: [{}],
    userId: "",
    username: "",
  };

  const tenantAccess = ["1111", "1111", "1111", "0000", "0000"];

  const finalTenantState = [
    {
      name: "Justt Business",
      id: "",
      crudAccess: {
        create: false,
        read: false,
        update: true,
        delete: true,
      },
    },
    {
      name: "Justt",
      id: "",
      crudAccess: {
        create: false,
        read: false,
        update: true,
        delete: true,
      },
    },
    {
      name: "DemoContent",
      id: "",
      crudAccess: {
        create: false,
        read: false,
        update: true,
        delete: true,
      },
    },
    {
      name: "Arbias",
      id: "",
      crudAccess: {
        create: false,
        read: false,
        update: true,
        delete: true,
      },
    },
    {
      name: "Med Watch",
      id: "",
      crudAccess: {
        create: false,
        read: false,
        update: true,
        delete: true,
      },
    },
  ];

  const userDataWithTenantsFormatted = {
    name: "arbiasgjoshi",
    created: "",
    displayName: "Arbias Gjoshi",
    email: "arbias@justt.me",
    tenantAccess: finalTenantState,
  };

  const formatCrudPermissions = (crudData) => {
    // one crudData, means one users tenantAccess with 0s and 1s
    let tenantArray = [];
    crudData.map((tenantId, index) => {
      const splitData = tenantId.split("");
      // let crudArray = [];

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
    // let groupedData = [];
    // tableColumns.map((item) => {
    //   if (item !== "tenants") {
    //     const addingItem = {
    //       title: item,
    //       field: item,
    //     };
    //     groupedData.push(addingItem);
    //   }
    // });
    // setFilteredColumns(groupedData);
  };

  useEffect(() => {
    populateColumns();

    UserData("");
  }, []);

  return (
    <div>
      <DataGrid
        columns={tableColumns}
        rowHeight={38}
        rows={userColumns}
        getRowId={(e) => e.userId}
      />
    </div>
  );
};
