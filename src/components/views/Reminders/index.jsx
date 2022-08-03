import React, { useState } from 'react';

import RowComponent from '@/components/commons/RemindersComponent/RowComponent';
import CardsComponent from '@/components/commons/RemindersComponent/CardsComponent';

import './reminders.scss';
import '../../commons/RemindersComponent/RowComponent';

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
