import { Card, Col, Row } from 'antd';
import ModulesForm from 'components/app-components/modules/ModulesForm';
import ModulesTable from 'components/app-components/modules/ModulesTable';
import AppHeader from 'components/shared-components/AppHeader'
import React from 'react'

const index = () => {
  return (
    <>
      <AppHeader
        title={"Módulos"}
        items={[
          { title: "Home", path: "/" },
          { title: "Administracion" },
          { title: "Módulos" },
        ]}
      />
      <Card>
        <ModulesForm />
      </Card>
    </>
  );
}

export default index