import SearchInput from "components/app-components/Global/SearchInput"
import GenericTable from "components/app-components/Global/tableComponent";
import React, { useState } from "react";
import { Button } from "antd";
import IEConfigurationFieldStep0 from "./IEConfigurationFieldStep0";
import IEConfigurationFieldStep1 from "./IEConfigurationFieldStep1";
import CreateButton from "components/app-components/Global/CreateButton";

const IEConfigurationForm = (props) => {

  const [records, setRecords] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingRecord, setEditingRecord] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [step, setStep ]= useState(0)  
  const [data, setData] = useState([])

  const filteredRecords = [{ year: 2024, payrollYear: 2023 }]

  

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
    setData([])
  }

  const handleCreate =()=>{
    setIsFormVisible(true)
  }

  const handleNextStep = ()=>{
      let nexstep = step +1;
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
    <><div>
      {
        isFormVisible ? (
          <>
            {step==0 ? <IEConfigurationFieldStep0 onCancelHandle={handleCancel} handleNextStep= {handleNextStep} data = {data}  setData={setData} /> :<></>}
            {step==1 ? <IEConfigurationFieldStep1 onCancelHandle={handleCancel} handleNextStep= {handleNextStep} data = {data}  setData={setData} /> :<></>}
          </>
        )
          :
          (
            <>
              <CreateButton onCreate={handleCreate} />
              <SearchInput onSearch={onSearch} placeholder={"Escriba para buscar un formato de ingreso y retenciones"} />
              <GenericTable data={filteredRecords} columns={columns} onDelete={handleDelete} onEdit={handleEdit} />
            </>
          )
      }
    </div>
    </>
  )
}

export default IEConfigurationForm