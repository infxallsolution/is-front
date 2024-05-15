import { Card, Col, Row } from "antd";
import { ChartComponent } from "components/app-components/Global/ChartComponent";
import AppHeader from "components/shared-components/AppHeader";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { DashboardService } from "services/DashboardService";
import generateLineData from "utils/generateLineData";

export const DefaultDashboard = () => {
  const [dataDashboard, setDataDashboard] = useState([]);
  const [allDashboardData, setAllDashboardData] = useState([]);

  const clientId = useSelector((state) => state?.auth?.user?.clientId);

  useEffect(() => {
    DashboardService.listDataByClient(clientId).then((response) => {
      setAllDashboardData(response);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <AppHeader
        title="Dashboard"
        items={[{ title: "Home", link: "/app" }, { title: "Dashboard" }]}
      />
      <Row gutter={16} style={{ marginTop: "15px" }}>
        {
          allDashboardData?.map((item, index) => {
            return (
              <Col span={12} key={index}>
                <Card title={item.name} className="mb-4">
                  <ChartComponent
                    type={"line"}
                    data={item.dataDetails}
                    series={2}
                  ></ChartComponent>
                </Card>
              </Col>
            );
          })
        }
      </Row>
    </>
  );
};

export default DefaultDashboard;
