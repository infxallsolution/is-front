import React from 'react';
import { Tag } from 'antd';

// Example statuses

const statusMapDefault = {
    active: { color: 'green', label: 'Active' },
    inactive: { color: 'red', label: 'Inactive' },
    pending: { color: 'orange', label: 'Pending' },
    disabled: { color: 'gray', label: 'Disabled' }
  };

const statusMap = {
  active: { color: 'green', label: 'Configurado' },
  inactive: { color: 'red', label: 'Sin configurar' },
};

const moduleStatus = [
    {
    statusMap : statusMap,
    module : 'irformat'
    },
    {
        statusMap : statusMapDefault,
        module : 'default'
    }
]

const LinkStatus = ({ status, module }) => {
const modul = moduleStatus.find(x=>x.module == module) || moduleStatus.find(x=>x.module == 'default')
  const statusInfo = modul.statusMap[status] || modul.statusMap['disabled'];
  return (
    <Tag color={statusInfo.color}>
      {statusInfo.label}
    </Tag>
  );
};


export default LinkStatus;