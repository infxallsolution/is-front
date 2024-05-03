import { Card } from 'antd';
import ModulesForm from 'components/app-components/modules/ModulesForm';
import AppHeader from 'components/shared-components/AppHeader'
import React from 'react'

const Modules = () => {
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

export default Modules