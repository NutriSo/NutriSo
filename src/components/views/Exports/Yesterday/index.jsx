import React, { useState, useEffect } from 'react';
import apiURL from '@/axios/axiosConfig';
import { isEmptyObject, isEmptyArray } from '@/utils';
import dayjs from 'dayjs';
import keys from '../data/excelKeys';
import { message } from 'antd';
import { baseColumnsYesterday } from '../data';
import CustomExport from '@/components/commons/CustomExport';
import * as calories from '../data/calories';
import * as vitamins from '../data/vitamins';
import * as minerals from '../data/minerals';
import * as glycemic from '../data/glycemic';
import * as environmental from '../data/environmental';
import * as economic from '../data/economic';
import * as bioactives from '../data/bioactives';
import * as additives from '../data/additives';
import useData from '../hooks/useData';

import {
  getFinalColumns,
  normalizeYesterdayByQuantity,
  normalizeAlimentosYesterday,
  generateFinalCsvRows,
} from '../utils';


const Yesterday = ({selected = false, setLoading, users}) => {
const [exportData, setExportData] = useState(null);
  const [fileReady, setFileReady] = useState(false);
  
  const [columns, setColumns] = useState([
    ...baseColumnsYesterday,
    ...calories.caloriasMacronutrientes0,
    ...vitamins.vitaminas0,
    ...minerals.minerales0,
    ...glycemic.aspectoGlucemico0,
    ...environmental.aspectosMedioambientales0,
    ...economic.aspectosEconomicos0,
    ...bioactives.componentesBioactivos0,
    ...additives.aditivosAlimentarios0,
  ]);
  const [yesterday, setYesterday] = useState(null);

    const onFileReady = () => {
        setFileReady(true);
        setLoading(false);
    };
    useEffect(() => {
      selected && getExportData();
      
  }, [selected]);

    const handleCancel = () => {
        setFileReady(false);
        setExportData(null);
        setLoading(false);
    };
    const useDataHook = useData({
        selected,
        type: keys.grupoExportable,
        onCancel: handleCancel,
    });
    
    
    useEffect(() => {
        yesterday && createExportData();
    }, [yesterday]);

    const getExportData= async () => {
      
      console.log('Obteniendo datos de exportación...');
      try {
      
      
      const rows = [];
      const objPush = [];
      
      const { data } = await apiURL.get("alimentacionUsuarios/yesterday");
      //console.log({users});
      
      if (data?.length <= 0) {
        message.error('No hay datos para exportar');
        handleCancel();
        return;
    }
    
      data.forEach((row) => {
        
        const {
          usuario, createdAt,
          cenaAyer,
          colacion1Ayer,
          colacion2Ayer,
          comidaAyer,
          desayunoAyer,
        } = row;
        const array = [usuario, createdAt];
        
       
        normalizeAlimentosYesterday(cenaAyer, array, objPush);
        normalizeAlimentosYesterday(colacion1Ayer, array, objPush);
        normalizeAlimentosYesterday(colacion2Ayer, array, objPush);
        normalizeAlimentosYesterday(comidaAyer, array, objPush);
        normalizeAlimentosYesterday(desayunoAyer, array, objPush);
        

        
      });
      
      objPush.forEach((row) => {
        rows.push(row);
        
      });
      setYesterday(rows);
    } catch (error) {
      message.error('Error al obtener los datos');
      console.groupCollapsed('[Exports] getExportData');
      console.error(error);
      console.groupEnd();
    }
};
    
    const createExportData = () => {
      console.log('Armando los datos de exportación...');
      try {
        

        if(isEmptyArray(yesterday)){
          message.info('No hay datos para exportar');
          handleCancel();
          return;
        }
        
        const cvsRows =  yesterday;
        console.log({cvsRows});
        const finalColumns = getFinalColumns(columns, 1);

        setColumns(finalColumns);
        setExportData(cvsRows);
        setTimeout(() => {
            onFileReady();
        }, 1000);

      } catch (error) {
        handleCancel();
            message.error('Ocurrió un error al armar los datos para exportar');
            console.groupCollapsed('[Exports] createExportData');
            console.error(error);
            console.groupEnd();
      }
    };
    
      return (
        <CustomExport
            dataSource={exportData}
            columns={columns}
            fileReady={fileReady}
            fileName={`Yesterday ${dayjs(new Date()).format('DD-MM-YYYY')}`}
        />
    );
 };

 export default Yesterday;