import React from 'react';
import { Button, Popconfirm, Tooltip } from 'antd';
import {
   DeleteOutlined,
  EditOutlined
  } from "@ant-design/icons";

const ActionsColumn = ({ disableEdit, disabledDelete, record, onEdit, onDelete }) => {
    return (
        <div style={{ display: "flex", gap : '10px' }}>
            <Tooltip title={"Editar Registro"} >
            <Button
                type="primary"
                shape="square"
                disabled={disableEdit}
                size="small"
                icon={<EditOutlined />}
                onClick={() => onEdit(record)}
            >
            </Button>
            </Tooltip>
            <Tooltip title={"Eliminar registro"}>
            <Popconfirm
                title="¿Estás seguro de eliminar?"
                disabled={disabledDelete}
                onConfirm={() => onDelete(record)}
                okText="Si"
                cancelText="No"
            >
                 <Button
                    type="primary"
                    danger
                    shape="circle"
                    icon={<DeleteOutlined />}
                    size="small"
                    disabled={disabledDelete}
                  />
            </Popconfirm>
            </Tooltip>
        </div>
    );
};

export default ActionsColumn;
