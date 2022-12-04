import { Progress } from 'antd';
import { useState } from 'react';
import "antd/dist/antd.css"
import React from 'react';

const ExpBar = () => {
    const [percent, setPercent] = useState(75)

    return(
        <div className="progress" style={{width: 500}}>
            <div className="progress-bar progress-bar-striped progress-bar-animated bg-warning" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{flex: percent/100}}></div>
            <p className="text-primary">EXP: {percent}%</p>
        </div>
        // <div
        // style={{
        //     width: 350,
        // }}
        // >
        // <Progress
        // type='line'
        // strokeColor={{
        //     '0%': '#AAE5F9',
        //     '100%': '#BEAAF9',
        // }} 
        // format={percent => `${percent} EXP`}
        // trailColor='#D7E1E5'
        // strokeWidth={20}
        // percent={45} />
        // </div>
    )
};

export default ExpBar;