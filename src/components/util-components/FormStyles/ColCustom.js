
import React from 'react';
import { Col } from 'antd';

const ColCustom = ({ children }) => {


    return (<>
        <Col xs={24} md={12}>
            {children}
        </Col>

    </>)
}

export default ColCustom