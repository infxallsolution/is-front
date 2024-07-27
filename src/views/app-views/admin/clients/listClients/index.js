import { Button, Card, Tag, message } from "antd";
import ClientTable from "components/app-components/clients/ClientTable";
import AppHeader from "components/shared-components/AppHeader";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ClientService from "services/ClientService";
import { error, success } from "utils/notifications";

const Client = () => {
  const navigate = useNavigate();
  const [clients, setClients] = useState([]);
  const [rechargeData, setRechargeData] = useState(false);

  const disableClient = (id, messageApi) => {
    ClientService.disableClient(id).then((response) => {
      if (response.status === 200) {
        setRechargeData(!rechargeData)
        success(messageApi, {
          content: "Cliente deshabilitado correctamente",
        });
      }else{
        error(messageApi, {
          content: "Error al deshabilitar el cliente",
        });
      }
    });
  }

  const enableClient = (id, messageApi) => {
    ClientService.enableClient(id).then((response) => {
      if (response.status === 200) {
        setRechargeData(!rechargeData)
        success(messageApi, {
          content: "Cliente habilitado correctamente",
        });
      } else {
        error(messageApi, {
          content: "Error al habilitar el cliente",
        });
      }
    });
  };

  useEffect(()=>{
    ClientService.getAllClients().then((data) => {
      setClients(
        data.map((client) => ({
          ...client,
          state: client.state ? (
            <Tag color="green">Activo</Tag>
          ) : (
            <Tag color="red">Inactivo</Tag>
          ),
        }))
      );
    });
    setRechargeData(false);
  },[rechargeData])

  return (
    <>
      <AppHeader
        title={"Clientes"}
        items={[
          { title: "Home", path: "/" },
          { title: "Administracion" },
          { title: "Clientes" },
        ]}
      />
      <Card>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "20px",
          }}
        >
          <Button
            type="primary"
            style={{ marginRight: "10px" }}
            onClick={() => navigate("/app/admin/clients/register")}
          >
            Agregar Cliente
          </Button>
        </div>
        <ClientTable
          data={clients}
          enableClient={enableClient}
          disableClient={disableClient}
        />
      </Card>
    </>
  );
};

export default Client;
