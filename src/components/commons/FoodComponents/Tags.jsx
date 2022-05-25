import { Tag } from 'antd';
import { useEffect, useState } from 'react';


const Tags = ({itm, borrar}) => {
    const [data,setData] = useState([]);    
    //console.log(data)
    useEffect(() => {   
        setData(itm)       
    }, [itm])    

    return(
        <>     
            {data?.map((item) => 
                <Tag color="blue" onClick={()=>borrar(item)}>{item}</Tag>   
            )}           
                             
        </>
    );
}

export default Tags;