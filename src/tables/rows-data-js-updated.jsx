
const [finalRows, setFinalRows] = useState([]);

const tenants = [
  { tenantNAme: "1", crudData() },
  { tenantNAme: "1", crudData() },
  { tenantNAme: "1", crudData() },
  { tenantNAme: "1", crudData() },
];

const dataRows = [
  {
    id: "1",
    name: "user1",
    tenantsList: tenants,
  },
  {
    id: "1",
    name: "user1",
    tenantsList: tenants,
  },
  {
    id: "1",
    name: "user1",
  },
  {
    id: "1",
    name: "user1",
  },
  {
    id: "1",
    name: "user1",
  },
  {
    id: "1",
    name: "user1",
  },
  {
    id: "1",
    name: "user1",
  },
];

const mapTenantCrudAccess = (tenantCrud) => {
    const crudData = tenantCrud;
    return crudData.split('');
}

const addTenantsToRows = (data) => {
  const newMappedList = data.map((item) => ({
    ...item,
    tenants: tenantsList,
  }));

  setFinalRows(newMappedList);
};

const crudData = (cruds) => {
    return newStringsCreated;
}


return <DataGrid columns={} rows={finalRows} />
