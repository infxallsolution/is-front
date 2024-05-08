import { Input } from "antd";
import React from "react";
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
        onChange={(e) => onSearch(e.target.value)}
        loading={isLoading}
      />
    </div>
  );
};

export default SearchInput;
