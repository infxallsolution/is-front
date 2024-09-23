import React, { useState,useEffect } from "react";
import { Form, Input, Button, Table } from "antd";
import IEService from "services/IEService";
import SelectComponet from "components/app-components/Global/SelectComponent";
import { DeleteOutlined, EditOutlined, PlusCircleOutlined } from "@ant-design/icons";

const IEConfigurationFieldStep1 = ({onCancelHandle, editingRecord, handleFinish, data,setdata, handleStep })=>{

    const [form] = Form.useForm();
    const [tableData, setTableData] = useState([]);
    const [loading, setLoading] = useState(true);

    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Consecutive',
        dataIndex: 'consecutive',
        key: 'consecutive',
      },
      {
        title: 'Asignar conceptos',
        key: 'addconcept',
        render: (text, record) => (
            <Button
                type="primary"
                shape="circle"
                icon={<PlusCircleOutlined />}
                style={{ marginRight: "5px" }}
              onClick={() => console.log(`Action on item ${record.key}`)}
            >
            </Button>
        )
      }
    ];

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await IEService.GetDetailIEFormat(data.ieformat);
          setTableData(response.data)
        } catch (error) {
          console.error("Error fetching data:", error);
          setLoading(false);
        }
      };
  
      fetchData();
    }, []);
  
    return (
      <div>
        {/* Table for dynamic data */}
        <Table
          columns={columns}
          dataSource={tableData}
          pagination={false}
          rowKey="key"
        />
      </div>
    );
}

export default IEConfigurationFieldStep1