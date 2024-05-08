import { Button, Empty, Table } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import SearchInput from "../Global/SearchInput";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import ClientService from "services/ClientService";
import { useNavigate } from "react-router-dom";

const ClientTable = () => {

  const navigate = useNavigate()

  const columns = useMemo(()=>[
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
      key: "contact",
      title: "Número de contacto",
      dataIndex: "contact",
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
      render: (__, values) => {
        return (
          <>
            <Button
              type="primary"
              shape="circle"
              icon={<EditOutlined />}
              style={{ marginRight: "5px" }}
              onClick={() =>
                navigate(`/app/admin/clients/register/${values.id}?action=edit`)
              }
            />
            <Button
              type="primary"
              danger
              shape="circle"
              icon={<DeleteOutlined />}
            />
          </>
        );
      },
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  ], [])

  const [results, setResults] = useState([]);
  const [clients, setClients] = useState([]);

  useEffect(() => {
    ClientService.getAllClients().then((data) => {
      setClients(data);
    });
  }, []);

  const onSearch = (value) => {
    if (value) {
      setResults(
        clients.filter((item) =>
          item.name.toLowerCase().includes(value.toLocaleLowerCase())
        )
      );
    }
  };

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
