import React, { useState, useEffect } from 'react';
import { message } from 'antd';
import apiURL from '../../../axios/axiosConfig';
import '../../commons/RemindersComponent/RowComponent';

import './reminders.scss';
import RowComponent from '../../commons/RemindersComponent/RowComponent';
import CardsComponent from '../../commons/RemindersComponent/CardsComponent';

const Reminders = () => {
    const [data, setData] = useState([]);

    return (
        <div className='main-R'>
            <RowComponent />
            <CardsComponent />
        </div>
    );
};

export default Reminders;
