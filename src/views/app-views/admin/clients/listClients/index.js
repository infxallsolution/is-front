import { Card } from "antd";
import ClientTable from "components/app-components/Clients/ClientTable";
import AppHeader from "components/shared-components/AppHeader";
import React from "react";

const index = () => {
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
        <ClientTable />
      </Card>
    </>
  );
};

export default index;
