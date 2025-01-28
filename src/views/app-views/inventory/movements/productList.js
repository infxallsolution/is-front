import React from "react";
import { Table, Button, Tooltip } from "antd";
import { PlusOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";

const ProductList = ({ productList, onEdit, onDelete, onAdd }) => {
  const columns = [
    {
      title: "Producto",
      dataIndex: "product",
      key: "product",
    },
    {
      title: "Bodega",
      dataIndex: "warehouse",
      key: "warehouse",
    },
    {
      title: "Cantidad",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Precio",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Total",
      dataIndex: "totalValue",
      key: "totalValue",
    },
    {
      title: "Acciones",
      key: "actions",
      render: (_, record) => (
        <div style={{ display: "flex", gap: "10px" }}>
          <Tooltip title="Editar">
            <Button
              type="link"
              icon={<EditOutlined />}
              onClick={() => onEdit(record)}
            />
          </Tooltip>
          <Tooltip title="Eliminar">
            <Button
              type="link"
              danger
              icon={<DeleteOutlined />}
              onClick={() => onDelete(record.key)}
            />
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Button
        type="dashed"
        icon={<PlusOutlined />}
        onClick={onAdd}
        style={{ marginBottom: "10px" }}
      >
        Agregar Producto
      </Button>
      <Table
        dataSource={productList}
        columns={columns}
        rowKey="key"
        scroll={{
          x: 300, // Scroll horizontal si las columnas exceden el ancho
          y: 400, // Scroll vertical para limitar la altura
        }}
        pagination={false} // Sin paginación
      />
    </div>
  );
};

export default ProductList;
