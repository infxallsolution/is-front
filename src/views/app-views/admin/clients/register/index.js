import { Card } from 'antd'
import ClientForm from 'components/app-components/Clients/ClientForm';
import AppHeader from 'components/shared-components/AppHeader';
import React from 'react'

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
        <ClientForm />
      </Card>
    </>
  );
}

export default index