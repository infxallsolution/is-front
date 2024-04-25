import { Empty, Input, Table } from "antd";
import React, { useEffect, useState } from "react";
import SearchInput from "../Global/SearchInput";
const columns = [
  {
    key: "name",
    title: "Nombre",
    dataIndex: "name",
  },
  {
    key: "identification",
    title: "Identificación",
    dataIndex: "identification",
  },
  {
    key: "email",
    title: "Correo",
    dataIndex: "email",
  },
  {
    key: "number",
    title: "Número de contacto",
    dataIndex: "number",
  },
  {
    key: "address",
    title: "Dirección",
    dataIndex: "address",
  },
  {
    key: "type",
    title: "Tipo de Negocio",
    dataIndex: "type",
  },
  {
    key: "status",
    title: "Estado",
    dataIndex: "status",
  },
  {
    key: "actions",
    title: "Acciones",
    dataIndex: "actions",
  },
];

const data = [
  {
    key: "1",
    name: "John Doe",
    identification: "123456789",
    email: "asdf@gmail.com",
    number: "123456789",
    address: "1234 Main St",
    type: "Cliente",
    status: "Activo",
  },
  {
    key: "2",
    name: "Jane Doe",
    identification: "987654321",
    email: "asdfgas@comas.com",
    number: "987654321",
    address: "5678 Main St",
    type: "Cliente",
    status: "Inactivo",
  },
  {
    key: "3",
    name: "John Smith",
    identification: "123456789",
    email: "lhgas@gmail.com",
    number: "123456789",
    address: "1234 Main St",
    type: "Cliente",
    status: "Activo",
  },
];

const ClientTable = () => {
  const [search, setSearch] = useState("");
  const [loading, isLoading] = useState(false);

  const onSearch = (value, _e, info) => {
    setSearch(value);
  };

  let results = [];
  if(search){
    results = data.filter((item) =>
      item.name.toLowerCase().includes(search.toLocaleLowerCase())
    );
  }


  return (
    <div>
      <SearchInput onSearch={onSearch} />
      {results.length === 0 ? (
        <Empty description={false} />
      ) : (
        <Table columns={columns} dataSource={results} />
      )}
    </div>
  );
};

export default ClientTable;
