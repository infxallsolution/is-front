import React, { useState,useEffect } from "react";
import { Form, Input, Button } from "antd";
import IEService from "services/IEService";
import SelectComponet from "components/app-components/Global/SelectComponent";

const IEConfigurationFieldStep0 = ({onCancelHandle, editingRecord,handleSelectChange, handleFinish, data, setData
  , handleNextStep

 })=>{

    const [form] = Form.useForm();
    const [selectdData, setSelectData] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const handleSelect =(value)=>{
      setData({...data,
           ieformat : value,
      })

    }
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await IEService.GetIEFormats();
          setSelectData(response.data.rows)
          setData({ieformats :response.data.rows })
         
        } catch (error) {
          console.error("Error fetching data:", error);
          setLoading(false);
        }
      };
  
      fetchData();
    }, []);
  

    return (<>
      <Form form={form} layout="vertical" onFinish={handleFinish} style={{ maxWidth: 600, margin: "0 auto", marginBottom: 20 }}>
         <SelectComponet data={selectdData} id="yearformat" handleSelect={handleSelect} label='Año del formato de ingreso y retención' />
          <Form.Item>
            <Button type="primary" htmlType="submit" onClick={handleNextStep} >
             Siguiente
            </Button>
          </Form.Item>
        </Form>
    </>)
}

export default IEConfigurationFieldStep0