import React, { useState, useEffect } from "react";
import { Form, Input, Button, Table, Checkbox } from "antd";
import SelectComponet from "components/app-components/Global/SelectComponent";
import { DeleteOutlined, EditOutlined, PlusCircleOutlined } from "@ant-design/icons";
import ConceptService from "services/payroll/ConceptService";
import IEService from "services/IEService";

const IEConfigurationFieldStep2 = ({ onCancelHandle, editingRecord, handleFinish, data, setData, handleStep, onHandleSubmit }) => {

  const [form] = Form.useForm();
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRowsNames, setSelectedRowsNames] = useState([]);

  const handleCheckboxChange = (record, checked) => {
    if (checked) {
      setSelectedRows([...selectedRows, record.id]);
      setSelectedRowsNames([...selectedRowsNames, record.description]);
      data = { ...data, concepts: [...selectedRows, record.id] }
      setData(data)
    } else {
      setSelectedRowsNames(selectedRowsNames.filter((description) => description !== record.description));
      setSelectedRows(selectedRows.filter((id) => id !== record.id));
      data = { ...data, concepts: selectedRows.filter((id) => id !== record.id) }
      setData(data)
    }

  };

  const columns = [
    {
      title: 'Código',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'Descripción',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Seleccionar concepto',
      key: 'conceptocheck',
      render: (text, record) => {
        console.log('...selectedRows', ...selectedRows)
        {
          return (
            <Checkbox
              onChange={(e) =>
                handleCheckboxChange(record, e.target.checked)
              }
              checked={selectedRows.includes(record.id)}
            />
          )
        }
      }
    }
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ConceptService.get(data.ieformatdetailid);
        let conceptselected = []
        setTableData(response.data)
        if (data.configuration) {
          const conceptsformat = response.data.map(x => x)
          const conceptsconfiguration = data.configuration.filter(w => w.id == data.ieformatdetailid).map(x => x.concepts).flat().flat()
          conceptsformat.map(w => {
            if (conceptsconfiguration.some(z => z == w.id)) {
              conceptselected.push({ id: w.id, name: w.description })
            }
          })

        }
        setSelectedRows(conceptselected.map(x => x.id));
        setSelectedRowsNames(conceptselected.map(x => x.name));
        data = { ...data, concepts: conceptselected.map(x => x.id) }
        setData(data)

      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div id='formatSelected' style={{ display: 'flex', justifyContent: 'left', alignItems: 'left', marginBottom: '10px' }} >El formato que elegiste fue: *  {data.formatName}   </div>
      <div id='conceptselected' style={{ display: 'flex', justifyContent: 'left', alignItems: 'left', marginBottom: '30px' }} >El concepto del formato es: * {data.ieformatdetailidName}</div>
      <h4>Conceptos seleccionados:   {selectedRowsNames.map(x => { return <label id={x}> {x},</label> })}</h4>
      <div style={{ marginTop: '50px' }}>
        <Button type="primary" htmlType="submit" onClick={onHandleSubmit} >
          Guardar
        </Button>
        <Button style={{ marginLeft: 8 }} onClick={() => { onCancelHandle() }}>
          Atras
        </Button>
      </div>
      <div style={{ marginTop: '30px' }}>
        <Table
          columns={columns}
          dataSource={tableData}
          pagination={false}
          rowKey="id"
          scroll={{ y: 500, x: 'max-content' }} // Add scrolling here
        />
      </div>
     
    </div>
  );
}

export default IEConfigurationFieldStep2