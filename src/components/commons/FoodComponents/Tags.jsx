import { Tag } from 'antd';
import { useEffect, useState } from 'react';

const Tags = ({ dataSource, borrar }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        setData(dataSource[0]?.value);
    }, [dataSource]);
    console.log(dataSource);
    return (
        <>
            {data?.map((item, index) => (
                <Tag key={index} color='blue' onClick={() => borrar(item)}>
                    {item}
                </Tag>
            ))}
        </>
    );
};

export default Tags;
