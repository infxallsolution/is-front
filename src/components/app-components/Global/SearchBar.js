// src/components/SearchBar.js
import React from 'react';
import { Input, Button, Row, Col } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import RowCustom from 'components/util-components/FormStyles/RowCustom';
import ColCustom from 'components/util-components/FormStyles/ColCustom';

const SearchBar = ({ onSearch }) => {
    const handleSearch = (value) => {
        onSearch(value);  // Pasa el valor de búsqueda al componente padre
    };

    return (
        <RowCustom >
            <ColCustom> 
                <Input.Search
                    placeholder="Buscar ..."
                    enterButton={<Button icon={<SearchOutlined />} />}
                    onSearch={handleSearch}
                    style={{ width: '100%', paddingBottom:"5px" }} 
                />
            </ColCustom>
        </RowCustom>
    );
};

export default SearchBar;
