import React, { useEffect, useState } from 'react';
import { Col, DatePicker, Input, Row, Checkbox, Button, Modal, Select, message } from 'antd';
import { PlusOutlined, SelectOutlined } from '@ant-design/icons';
import '../../commons/RemindersComponent/RowComponent'
import apiURL from '../../../axios/axiosConfig' 
import moment from 'moment';
import dayjs from 'dayjs';




const RowComponent = () => {
    const [listUsers, setlistUsers] = useState([]);
    const [listUsersPut, setlistUsersput] = useState([]);
    const [listRecor, setListRecor] = useState([]);
    const [listUsersEmails, setlistUsersEmails] = useState([]);
    const [titulo, setTitulo] = useState("");
    const [msj, setMsj] = useState("");
    const [categoria, setCategoria] = useState("");
    const { RangePicker } = DatePicker;
    const [fecha, setFecha] = useState([]);
    const { TextArea } = Input;
    const { Option } = Select;
    const [global, setGlobal] = useState(false);
    console.log(categoria);
    //const [state, setState] = useState();
    useEffect(() => {
      fetchData();
      
    }, [])
    const fetchData = async () => {
        
      try {
        const { data } = await apiURL.get('/recordatorios');
        setListRecor(data);
        
        
        console.log(listRecor);
      } catch (error) {
          message.error(`Error: ${error.message}`);
      }
      
    };

    
    //SELECT
    function handleChange(value) {
      console.log(`selected ${value}`);
      
        
    }
  
    console.log(setlistUsersput)
    
    
    //MODAL
    
    const [isModalVisible, setIsModalVisible] = useState(false);
    
    const showModal = async () => {
      
      setIsModalVisible(true);
      try {
        const { data } = await apiURL.get('/informacionUsuarios');
        setlistUsers(data);
        
        
        
        console.log("hola primer list");
      } catch (error) {
          message.error(`Error: ${error.message}`);
      }

    };
    console.log(listUsers);


    const handleOk = async () => {
      setIsModalVisible(false);
      
      try {
        const todosUsuarios = listUsers.map((user)=> user._id);
        const reminder = {

          "usuarios": 
            global ? todosUsuarios :
            listUsersPut
          ,
          //hora y fecha
          "titulo": titulo,
          "mensaje": msj,
          "categoria": categoria,
          "dias": [
            {
              "day": "martes",
              "activo": false
            }
          ],
          "fecha": fecha,
          "global": global
        };
        const response = await apiURL.post('/recordatorios',reminder);
        console.log(response);
        //console.log(reminder);
        //window.location.reload()
        
          
          
      } catch (error) {
          message.error(`Error: ${error.message}`);
      }
    };
    console.log(listUsers);
          console.log(listUsersPut);
    const msjChange = (e) => {

    }
    const handleCancel = () => {
      setIsModalVisible(false);
    };

    
    //{ listUsers.map(users => ( 
    
    //CALENDAR
    const print = (values) => {
      if(values){
        const dateA = values[0];
        const dateB = values[1];
      
        setFecha(getDaysBetweenDates(dateA,dateB));
      }
    };
    
    const getDaysBetweenDates = function (startDate, endDate) {
      let now = startDate.clone(),
          dates = [];
    
      while (now.isSameOrBefore(endDate)) {
          dates.push(dayjs(now).toISOString());
          now.add(1, 'days');
      }
      return dates;
    };

    function onChangeCh(e) {
      console.log(`checked = ${e.target.checked}`);
      console.log(listUsersPut);
      console.log("esta es la lista de users");
      if(e.target.checked){
        setGlobal(true);
      }else{
        setGlobal(false);
      }
    }
    
    return(
      <>
      <Row>
        <Col span={22} style={{ padding: 16 }}><h1> Recordatorios</h1>
          
        </Col>
        <Col span={2} style={{ padding: 16 }}>
          <Button  onClick={showModal} type="primary" shape="circle"  icon={<PlusOutlined />} />
        </Col>
      </Row>

      <Modal title="Agregar nuevo recordatorio" visible={isModalVisible}  onOk={handleOk} onCancel={handleCancel}>
        
        <Row>
          <Col span={6} style={{ padding: 16 }}>
            <p>Titulo:</p>
          </Col>
          <Col span={18} style={{ padding: 16 }}>
            <Input placeholder="Titulo del recordatorio" 
            onChange={(e) => setTitulo(e.target.value)}
            />
          </Col>
        </Row>
        <Row>
          <Col span={6} style={{ padding: 16 }}>
            <p>Descripción (mensaje):</p>
          </Col>
          <Col span={18} style={{ padding: 16 }}>
          <TextArea placeholder="Descripción del recordatorio" 
            autoSize 
            onChange={(e) => setMsj(e.target.value)}
            
              />
            <div style={{ margin: '24px 0' }} />
          </Col>
        </Row>
        
        <Checkbox onChange={onChangeCh}>Global</Checkbox>
        
          <Select
            mode="multiple"
            style={{ width: '100%' }}
            placeholder="Seleccionar usuarios"
            onChange={(value) => setlistUsersput(value)}
            optionLabelProp="label"
            disabled={global?true:false}
          > 
        
          {listUsers.map(users => (
          
            <Option key={users.id} >{users.nombre}</Option>
            
          ))}
              
          </Select>
        
        <Select placeholder="Seleccione Categoría" onChange={(value)=>setCategoria(value)}  style={{ width: '100%' }} >
          
          <Option value="desayuno">Desayuno</Option>
          <Option value="comida">Comida</Option>
          <Option value="cena">Cena</Option>
          <Option value="ejercicio">Ejercicio</Option>
          <Option value="colacion1">Colacion 1</Option>
          <Option value="colacion2">Colación 2</Option>
          <Option value="agua">Agua</Option>
        </Select>
        <div className="site-calendar-demo-card">
         
          <RangePicker onChange={print} />
        </div>
        
      </Modal>
      </>

    );
}

export default RowComponent;