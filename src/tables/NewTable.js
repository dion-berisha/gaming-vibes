import { useEffect, useState } from "react";
import { userData } from "../data";
import { DataGrid } from "@mui/x-data-grid";

import Api from "../api/";
import { getToken } from "../helpers/index";

export const NewTable = () => {
  const [userColumns, setUserColumns] = useState([]);
  const [tenants, setTenants] = useState([]);
  const [tenantAccess, setTenantAccess] = useState([]);
  const [filteredColumns, setFilteredColumns] = useState([]);
  
  // Table Columns
  const tableColumns = Object.keys(userData[0]);
  const token = getToken();

  const formatCrudPermissions = (crudData) => {
    let tenantArray = [];

    crudData.map((tenantId, index) => {
      const splitData = tenantId.split('');
      let crudArray = []; 
      splitData.map((value, indx) => {
        let newObject = {};
        if (indx === 0) {
          newObject = {
            create: value === '1' ? true : false
          }
        } else if (indx === 1) {
          newObject = {
            read: value === '1' ? true : false
          }
        } else if (indx === 2) {
          newObject = {
            update: value === '1' ? true : false
          }
        } else {
          newObject = {
            delete: value === '1' ? true : false
          }
        }
        crudArray.push(newObject);
      })

      // console.log(crudArray);
      tenantArray.push({
        crud: crudArray
      }); 
    });

    console.log(tenantArray);
    // return crudArray;
  }

  const formatUserData = (userDetails) => {
    // Nuk di qka ke menu me bo preAccess edhe Access
    // amo qka po shoh eshte ni kopje me funksionin ma poshte
    // qe seshte kane e nevojshme. 

    // let preAccess = [];
    // let Access = [];

    // qka u dashte me bo qetu eshte me 'mutate' te dhanat e qdo useri me tenantat e rujtun ma poshte qe me mujt me convert masnej ne final draft qe me i rujt rows

    // E bon deep copy qetu edhe qesaj user data ja shton tenants me crud
    // po para se me ardhe te qajo pike, ki me i format Cruds
    const userData = [...userDetails];
    // console.log(userData[0]);


    userDetails.map((user, index) => {
      if (index === 100) {
        const tenantFormated = formatCrudPermissions(user.tenantAccess);
      // console.log(tenantFormated);  
      }
    });

    // console.log(preAccess);

    // preAccess.map((access) => {
    //   const accessArray = {
    //     crud: access.id,
    //   };
    //   Access.push(accessArray);
    // });
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
      // setUserColumns(userDetails);
      filterAndSetTenants(tenantIds, tenantNames);
      formatUserData(userDetails);
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
