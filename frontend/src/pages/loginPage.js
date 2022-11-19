import React, { useState } from 'react';
import {BulbFilled} from '@ant-design/icons';
import { Button } from 'antd';
const LogInPage = ({setLogIn}) => {
    const LogIn=() => {
        setLogIn(true)
    }

  return (
    <>
     <Button type="primary" icon={<BulbFilled />} size={"large"} style={{backgroundColor:"#507be6"}} onClick={LogIn}>
        LogIn
     </Button>
    </>
  );
};
export default LogInPage;