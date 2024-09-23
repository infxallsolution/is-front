import { Select } from "antd";

const { Option } = Select;
const SelectComponet = ({data, id, label, loading, handleSelect}) =>{
    return (
        <>
         <div style={{ maxWidth: 600, margin: "0 auto", marginBottom: 20 }}>
            <div style={{ maxWidth: 600, margin: "0 auto", marginBottom: 10 }}>
                <label htmlFor={id}>Seleccione un {label}:</label>
            </div>
      <Select
        id={id}
        loading={loading} // Display spinner while loading
        placeholder={`Seleccione un ${label}`}
        onChange={handleSelect}
      >
        {data.map((item) => (
          <Option key={item.id} value={item.id}>
            {item.name} {/* Customize this based on your data */}
          </Option>
        ))}
      </Select>
    </div>
        </>
    );

}

export  default SelectComponet