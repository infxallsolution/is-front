import { Button, Card } from "antd";
import ClientTable from "components/app-components/clients/ClientTable";
import AppHeader from "components/shared-components/AppHeader";
import React from "react";
import { useNavigate } from "react-router-dom";

const Client = () => {
  const navigate = useNavigate();

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
        <ClientTable />
      </Card>
    </>
  );
};

export default Client;
