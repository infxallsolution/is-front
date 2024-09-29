import SearchInput from "components/app-components/Global/SearchInput"
import GenericTable from "components/app-components/Global/tableComponent";
import React, { useState, useEffect } from "react";
import { Form, message, Modal } from "antd";
import IEConfigurationFieldStep0 from "./IEConfigurationFieldStep0";
import IEConfigurationFieldStep1 from "./IEConfigurationFieldStep1";
import IEConfigurationFieldStep2 from "./IEConfigurationFieldStep2";
import CreateButton from "components/app-components/Global/CreateButton";
import IEService from "services/IEService";
import { error, success } from "utils/notifications";
import { useFetcher } from "react-router-dom";


const IEConfigurationForm = (props) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [records, setRecords] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingRecord, setEditingRecord] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [step, setStep] = useState(0)
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false);
  const filteredRecords = [{ year: 2024, payrollYear: 2023 }]
  const [form] = Form.useForm();
  const { confirm } = Modal;

  const onHandleSubmit = async () => {
    setLoading(true)

    confirm({
      title: 'Esta seguro de guardar la informacion?',
      content: 'Esta configuración puede cambiar la existente por favor verificar.',
      async onOk() {
        await IEService.CreateIEConfiguration(data).then((response) => {

          if (response.status == 200) {
            message.success("Configuración creada exitosamente")
            setLoading(false);
            handleCancel();
            setStep(0)
          } else {
            message.error("Ups! algo paso al crear la configuración")
            setLoading(false);
          }
        });
      },
      onCancel() {
        message.info('Save operation cancelled.');
      },
    });
  }


  const handleDelete = (id) => {
    setRecords(records.filter(record => record.id !== id));
  };

  const handleEdit = (id) => {
    setEditingRecord(true)
    if (editingRecord)
      setIsFormVisible(true)
  }

  const handleCancel = () => {
    setIsFormVisible(false)
    setStep(0)
    setData([])
  }

  const handleCreate = () => {
    setIsFormVisible(true)
  }

  const handleNextStep = () => {
    if (step == 0) {
      if (data.ieformat == null || data.ieformat == undefined) {
        message.warning("Por favor seleccione un formato válido")
        return;
      }

    }
    let nexstep = step + 1;
    setStep(nexstep)
    console.log('step', nexstep)
  }

  const columns = [
    { title: 'Año del formato de ingreso y retención', dataIndex: 'year', key: 'year' },
  ];


  const {
    onSearch,
  } = props;

  return (
    <>
      <div>
        {step == 0 ? <IEConfigurationFieldStep0 onCancelHandle={handleCancel} handleNextStep={handleNextStep} data={data} setData={setData} /> : <></>}
        {step == 1 ? <IEConfigurationFieldStep1 onCancelHandle={handleCancel} handleNextStep={handleNextStep} data={data} setData={setData} /> : <></>}
        {step == 2 ? <IEConfigurationFieldStep2 onCancelHandle={handleCancel} handleNextStep={handleNextStep} data={data} setData={setData} onHandleSubmit={onHandleSubmit} /> : <></>}
      </div>
    </>
  )
}

export default IEConfigurationForm