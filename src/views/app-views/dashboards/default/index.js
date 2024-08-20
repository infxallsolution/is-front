import { Card, Col, Row, Select } from "antd";
import { ChartComponent } from "components/app-components/Global/ChartComponent";
import AppHeader from "components/shared-components/AppHeader";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { DashboardService } from "services/DashboardService";

export const DefaultDashboard = () => {
  const [allDashboardData, setAllDashboardData] = useState([]);
  const [option, setOption] = useState("DAY");

  const { Option } = Select;

  const clientId = useSelector((state) => state?.auth?.user?.clientId);
  const company = useSelector((state) => state?.auth?.user?.company);
  console.log(">>>la company:"+company)

  useEffect(() => {
    DashboardService.listDataByClient(clientId, option,company).then((response) => {
      setAllDashboardData(response);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [option]);

  const onChange = (value) => {
    setOption(value)
  };

  return (
    <>
      <AppHeader
        title="Dashboard"
        items={[{ title: "Home", link: "/app" }, { title: "Dashboard" }]}
      />
      <Row gutter={16} style={{ marginTop: "15px" }}>
        <Select
          style={{
            width: "auto",
            paddingLeft: "8px"
          }}
          defaultValue={"DAY"}
          onChange={onChange}
        >
          <Option value="DAY">Ver por Días</Option>
          <Option value="MONTH">Ver por meses</Option>
          <Option value="YEAR">Ver por años</Option>
        </Select>
      </Row>
      <Row gutter={16} style={{ marginTop: "15px" }}>
        {allDashboardData?.map((item, index) => {
          return (
            <Col span={12} key={index}>
              <Card title={item.title} className="mb-4">
                <ChartComponent type={"histogram"} data={item.data} series={index} />
              </Card>
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default DefaultDashboard;
