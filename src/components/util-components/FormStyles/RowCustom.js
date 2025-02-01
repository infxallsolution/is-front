
import React from 'react';
import { Row} from 'antd';

const RowCustom = ({children})=>{


return(<>
 <Row gutter={16}>
    {children}
 </Row>

</>)
}

export default RowCustom