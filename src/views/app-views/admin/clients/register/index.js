import { Button, Card } from "antd";
import ClientForm from "components/app-components/clients/ClientForm";
import AppHeader from "components/shared-components/AppHeader";
import React from "react";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";

const ClientRegister = () => {
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
            justifyContent: "flex-start",
            marginBottom: "20px",
          }}
        >
          <NavLink to={"/app/admin/clients/list"}>
            <ArrowLeftOutlined /> Regresar
          </NavLink>
        </div>
        <ClientForm />
      </Card>
    </>
  );
};

export default ClientRegister;
