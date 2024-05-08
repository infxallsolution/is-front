import { Input } from "antd";
import React from "react";
import { SearchOutlined } from "@ant-design/icons";

const SearchInput = ({ onSearch, isLoading, placeholder }) => {
  return (
    <div
      style={{
        marginBottom: "15px",
      }}
    >
      <Input.Search
        placeholder={placeholder}
        enterButton={<SearchOutlined />}
        onChange={(e) => onSearch(e.target.value)}
        loading={isLoading}
      />
    </div>
  );
};

export default SearchInput;
