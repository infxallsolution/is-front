import { Button, Empty, Table, Tag, message } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import SearchInput from "../Global/SearchInput";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import ClientService from "services/ClientService";
import { useNavigate } from "react-router-dom";
import { error, success } from "utils/notifications";

const ClientTable = ({data, enableClient, disableClient}) => {

  const navigate = useNavigate()
  const [messageApi, contextHolder] = message.useMessage();
  const [results, setResults] = useState([]);

  


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
      key: "state",
      title: "Estado",
      dataIndex: "state",
    },
    {
      key: "actions",
      title: "Acciones",
      dataIndex: "actions",
      render: (__, values) => {
        return (
          <>
            {values.state.props.children === "Activo" ? (
              <div>
                <Button
                  type="primary"
                  shape="circle"
                  icon={<EditOutlined />}
                  style={{ marginRight: "5px" }}
                  onClick={() =>
                    navigate(
                      `/app/admin/clients/register/${values.id}?action=edit`
                    )
                  }
                />
                <Button
                  type="primary"
                  danger
                  shape="circle"
                  icon={<DeleteOutlined />}
                  onClick={() => disableClient(values.id, messageApi)}
                />
              </div>
            ) : (
              <Button
                type="primary"
                onClick={() => enableClient(values.id, messageApi)}
              >
                Activar
              </Button>
            )}
          </>
        );
      },
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  ], [data])



  const onSearch = (value) => {
    if (value) {
      setResults(
        data.filter((item) =>
          item.name.toLowerCase().includes(value.toLocaleLowerCase())
        )
      );
    }
  };

  return (
    <div>
      {contextHolder}
      <SearchInput onSearch={onSearch} placeholder={"Escriba para buscar un cliente"}/>
      {results.length === 0 ? (
        <Empty description={false} />
      ) : (
        <Table columns={columns} dataSource={results} size="middle"/>
      )}
    </div>
  );
};

export default ClientTable;
