import { Card } from "antd";
import AppHeader from "components/shared-components/AppHeader";
import React from "react";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import IEConfigurationForm from "components/app-components/payroll/i-e-configuration/IEConfigurationForm";

const IEConfiguration =()=>{
    return (
        <>
          <AppHeader
            title={"Formato de ingreso y retenciones"}
            items={[
              { title: "Home", path: "/" },
              { title: "Nómina" },
              { title: "Ingreso y retencion en la fuente" },
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
              <NavLink to={"/"}>
                <ArrowLeftOutlined /> Regresar
              </NavLink>
             
            </div>
            <div>
            <IEConfigurationForm/>
            </div>
          </Card>
        </>
      );

}



export default IEConfiguration