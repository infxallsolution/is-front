import { Input } from "antd";
import React from "react";
import {Button} from "antd";

const CreateButton = ({ onCreate }) => {
    return (
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "20px" }}>
            <Button type="primary" style={{ marginRight: "0px", height: '100%', weight: '100%', padding: '5px', paddingLeft: '20px', paddingRight: '20px' }}
                onClick={() => { onCreate() }}  >  Agregar  </Button>
        </div>
    );
};

export default CreateButton;
