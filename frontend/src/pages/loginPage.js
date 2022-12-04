import React, { useState } from 'react';
import {BulbFilled} from '@ant-design/icons';
import { Button } from 'antd';
const LogInPage = ({setLogIn}) => {
    const LogIn=() => {
        setLogIn(true)
    }

  return (
    <>
     <button className="btn btn-lg btn-outline-info" type="button" onClick={LogIn}>LogIn</button>

     <div className="form-group has-success" style={{width: 300}}>
      <label className="form-label mt-4" for="inputValid">Valid input</label>
      <input type="text" value="correct value" className="form-control is-valid" id="inputValid"/>
      <div className="valid-feedback">Success! You've done it.</div>
    </div>

    <div className="form-group has-danger" style={{width: 300}}>
      <label className="form-label mt-4" for="inputInvalid">Invalid input</label>
      <input type="text" value="wrong value" className="form-control is-invalid" id="inputInvalid"/>
      <div className="invalid-feedback">Sorry, that username's taken. Try another?</div>
    </div>
    </>
  );
};
export default LogInPage;