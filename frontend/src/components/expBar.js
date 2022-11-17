import { Progress } from 'antd';
import "antd/dist/antd.css"
import React from 'react';

const ExpBar = () => {

    return(
        <div
        style={{
            width: 350,
        }}
        >
        <Progress
        type='line'
        strokeColor={{
            '0%': '#AAE5F9',
            '100%': '#BEAAF9',
        }} 
        format={percent => `${percent} EXP`}
        trailColor='#D7E1E5'
        strokeWidth={20}
        percent={45} />
        </div>
    )
};

export default ExpBar;