import React from "react";
import { Table, Button } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const GenericTable = ({ data, columns, onDelete, onEdit }) => {
    const deleteColumn = {
        title: 'Editar',
        key: 'edit',
        render: (text, record) => (
            <Button
                type="primary"
                shape="circle"
                icon={<EditOutlined />}
                style={{ marginRight: "5px" }}
                onClick={() => onEdit(record.id)}>
            </Button>
        ),
    };

    const editColum = {
        title: 'Eliminar',
        key: 'delete',

        render: (text, record) => (
            <Button type="primary"
                danger
                shape="circle"
                icon={<DeleteOutlined />}
                onClick={() => onDelete(record.id)}>
            </Button>
        ),

    }

    const completeColumns = [...columns, editColum, deleteColumn];

    return (
        <Table
            dataSource={data}
            columns={completeColumns}
            rowKey="id"
            pagination={{ pageSize: 10 }}
        />
    );
};

export default GenericTable;