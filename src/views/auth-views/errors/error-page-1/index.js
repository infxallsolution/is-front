import React, { useEffect, useState } from 'react'
import { Button, Row, Col } from "antd";
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import RedirectService from 'services/RedirectService';
import { useSelector } from 'react-redux';

const ErrorOne = ({ module }) => {
  const theme = useSelector((state) => state.theme.currentTheme);
  const [url, setUrl] = useState("")

  useEffect(() => {
    RedirectService.redirectModule(module).then((res) => {
      setUrl(res.redirectTo)
    })
  }, [module])

  return (
    <div className={`h-100 ${theme === "light" ? "bg-white" : ""}`}>
      <div className="container-fluid d-flex flex-column justify-content-between h-100 px-md-4 pb-md-4 pt-md-1">
        <div>
          <img
            className="img-fluid"
            src={`/img/${theme === "light" ? "logoInfx.png" : "logoInfx.png"}`}
            alt=""
            style={{
              maxHeight: "100px",
            }}
          />
        </div>
        <div className="container">
          <Row align="middle">
            <Col xs={24} sm={24} md={8}>
              <h1 className="font-weight-bold mb-4 display-4">
                Modulo de {module} siendo actualizado
              </h1>
              <p className="font-size-md mb-4">
                Estamos preparando todo para la nueva
                versión de INFOS, puede continuar a la versión anterior, dándole
                click aquí.
              </p>
                <Button
                  type="primary"
                  icon={<ArrowLeftOutlined />}
                  href={url}
                >
                  Ir al módulo
                </Button>
            </Col>
            <Col xs={24} sm={24} md={{ span: 14, offset: 2 }}>
              <img
                className="img-fluid mt-md-0 mt-4"
                src="/img/others/maintenance.jpg"
                alt=""
              />
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default ErrorOne
