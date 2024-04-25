import { Input } from 'antd'
import React from 'react'
import { SearchOutlined } from "@ant-design/icons";

const SearchInput = ({ onSearch, isLoading }) => {
  return (
    <div
      style={{
        marginBottom: "15px",
      }}
    >
      <Input.Search
        placeholder="input search text"
        enterButton={<SearchOutlined />}
        onSearch={onSearch}
        allowClear
        loading={isLoading}
      />
    </div>
  );
};

export default SearchInput