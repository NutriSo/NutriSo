import { Tag } from 'antd';
import { useEffect, useState } from 'react';
import { CloseCircleTwoTone } from '@ant-design/icons';

const Tags = ({ dataSource, borrar }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        setData(dataSource[0]?.value);
    }, [dataSource]);

    return (
        <>
            {data?.map((item, index) => (
                <Tag
                    key={index}
                    color='blue'
                    onClick={() => borrar(item)}
                    title='Haga click para borrar'>
                    {item} <CloseCircleTwoTone />
                </Tag>
            ))}
        </>
    );
};

export default Tags;
