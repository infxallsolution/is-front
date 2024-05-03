import { Button, Card } from "antd";
import ClientTable from "components/app-components/clients/ClientTable";
import AppHeader from "components/shared-components/AppHeader";
import React from "react";
import {
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { NavLink, useNavigate } from "react-router-dom";

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
          {/* <NavLink to={"/app/pollination/treenode"}>
            <ArrowLeftOutlined /> Regresar
          </NavLink> */}
          <NavLink to={"/app/admin/clients/register"}>
            <Button type="primary" style={{ marginRight: "10px" }}>
              Agregar Cliente
            </Button>
          </NavLink>
        </div>
        <ClientTable />
      </Card>
    </>
  );
};

export default Client;
