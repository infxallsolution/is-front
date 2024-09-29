import React, { useState,useEffect } from "react";
import { Form, Input, Button, Table } from "antd";
import IEService from "services/IEService";
import SelectComponet from "components/app-components/Global/SelectComponent";
import { DeleteOutlined, EditOutlined, PlusCircleOutlined } from "@ant-design/icons";
import LinkStatus from "components/app-components/Global/StatusComponent";

const IEConfigurationFieldStep1 = ({onCancelHandle, editingRecord, handleFinish, data,setData, handleNextStep })=>{

    const [form] = Form.useForm();
    const [tableData, setTableData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formatName, setFormatName] = useState(true);
    const [statusLink, setStatusLink] = useState([])
    const [DataConfiguration, setDataConfiguration] = useState([])

  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await IEService.GetDetailIEFormat(data.ieformat);
          setTableData(response.data)
          setFormatName(data.ieformats.find(y=>y.id== data.ieformat).name)
          setData({...data, formatName : data.ieformats.find(y=>y.id== data.ieformat).name,  configuration: response.data})

        } catch (error) {
          console.error("Error fetching data:", error);
          setLoading(false);
        }
      };
  
      fetchData();
    }, []);
  
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
          <div style={{ display: 'flex', alignItems: 'center' }}>
          <Button
            type="primary"
            shape="circle"
            icon={<PlusCircleOutlined />}
            onClick={() => {  
              setData({ ...data, ieformatdetailid: record.id, ieformatdetailidName: record.name });
              handleNextStep();
            }}
          />
            <LinkStatus status={record.status} module={'irformat'}
          /> 
        </div>
        )
      }
    ];
    return (
      <div>
        <div style={{display: 'flex',  justifyContent:'left', alignItems:'left', marginBottom:'20px'}} >El formato que elegiste fue:  * <b> {formatName}</b></div>
        <Table
          columns={columns}
          dataSource={tableData}
          pagination={false}
          rowKey="id"
        />
      </div>
    );
}

export default IEConfigurationFieldStep1