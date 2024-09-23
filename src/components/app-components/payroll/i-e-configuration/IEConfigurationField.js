import React, { useState,useEffect } from "react";
import { Form, Input, Button } from "antd";
import IEService from "services/IEService";
import SelectComponet from "components/app-components/Global/SelectComponent";

const IEConfigurationField = ({onCancelHandle, editingRecord, handleFinish, onHandleStep })=>{

    const [form] = Form.useForm();
    const [selectdData, setSelectData] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await IEService.GetIEFormats();
          setSelectData(response.data.rows)
         
        } catch (error) {
          console.error("Error fetching data:", error);
          setLoading(false);
        }
      };
  
      fetchData();
    }, []);
  

    return (<>
      <Form form={form} layout="vertical" onFinish={handleFinish} style={{ maxWidth: 600, margin: "0 auto", marginBottom: 20 }}>
         <SelectComponet data={selectdData} id="yearformat" label='Año del formato de ingreso y retención' />
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {editingRecord ? "Actualizar" : "Agregar"}
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={() => { onCancelHandle() }}>
              Cancel
            </Button>
          </Form.Item>
        </Form>
    </>)
}

export default IEConfigurationField