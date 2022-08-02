import React, { useState, useEffect } from "react";
import apiURL from "../../../axios/axiosConfig";

import { DatePicker, Space } from "antd";
import moment from "moment";
import dayjs from "dayjs";

import Weight from "../../commons/UserUpdate/Weight";
import Circumference from "../../commons/UserUpdate/Circumference";
import BodyFields from "../../commons/UserUpdate/BodyFields";
import BioIndicators from "../../commons/UserUpdate/BioIndicators";
import OverallStatus from "../../commons/UserUpdate/OverallStatus";
import SolarExposition from "../../commons/UserUpdate/SolarExposition";
import Gastrointestinal from "../../commons/UserUpdate/Gastrointestinal";
import Lactation from "../../commons/UserUpdate/Lactation";
import SocioeconomicData from "../../commons/UserUpdate/SocioeconomicData";
import HoursOfSleep from "../../commons/UserUpdate/HoursOfSleep";
import {
  capitilizeWord,
  isInvalidElem,
  isEmptyString,
  getUserHash,
} from "../../../utils";

import "./user.scss";

const standardAvatar =
  "https://res.cloudinary.com/dwjv6orjf/image/upload/v1618875313/standard_avatar_txfgx5.png";

const Usuarios = () => {
  const [info, setInfo] = useState({});
  let [name, setName] = useState("");
  let [apellidoP, setApellidoP] = useState("");
  let [apellidoM, setApellidoM] = useState("");
  let [celular, setCelular] = useState("");
  let [ciudadResidencia, setCiudadResidencia] = useState("");
  let [tiempoResidando, setTiempoResidando] = useState("");
  let [estadoDeNacomiento, setEstadoDeNacimiento] = useState("");
  let [fechaNacimiento, setFechaNacimiento] = useState("");
  let [genero, setGenero] = useState("");

  const globalUserId = getUserHash();
  const isPhotoExist = !isInvalidElem(info?.foto) && !isEmptyString(info?.foto);
  const formattedBirthday = dayjs(info.fechaDeNacimiento).format("YYYY-MM-DD");

  function onChange(date, dateString) {
    setFechaNacimiento(dateString);
  }

  useEffect(() => {
    fethInfo();
    return () => {
      setInfo({});
    };
  }, []);

  useEffect(() => {
    if (info?.usuario) {
    }
  }, [info]);

  const fethInfo = async () => {
    try {
      const { data, status } = await apiURL.get(
        `/informacionUsuarios/individual?usuario=${globalUserId}`
      );

      setInfo(data);
    } catch (error) {
      console.groupCollapsed("Error en la funcion fetchInfo");
      console.error(error);
      console.groupEnd();
    }
  };

  async function GuardarCambios() {
    if (name !== "") {
    } else {
      name = info.nombre;
    }

    if (apellidoP !== "") {
    } else {
      apellidoP = info.apellidoPaterno;
    }

    if (apellidoM !== "") {
    } else {
      apellidoM = info.apellidoMaterno;
    }

    if (celular !== "") {
    } else {
      celular = info.celular;
    }

    if (ciudadResidencia !== "") {
    } else {
      ciudadResidencia = info.ciudadDeResidencia;
    }

    if (tiempoResidando !== "") {
    } else {
      tiempoResidando = info.tiempoViviendoAhi;
    }

    if (estadoDeNacomiento !== "") {
    } else {
      estadoDeNacomiento = info.estadoDeNacimiento;
    }

    if (fechaNacimiento !== "") {
    } else {
      fechaNacimiento = info.fechaDeNacimiento;
    }

    if (genero !== "") {
    } else {
      genero = info.genero;
    }

    try {
      const body = {
        nombre: name,
        apellidoPaterno: apellidoP,
        apellidoMaterno: apellidoM,
        celular: celular,
        ciudadDeResidencia: ciudadResidencia,
        tiempoViviendoAhi: tiempoResidando,
        estadoDeNacimiento: estadoDeNacomiento,
        fechaDeNacimiento: fechaNacimiento,
        genero: genero,
      };

      const res = await apiURL.patch(
        `/informacionUsuarios/individual?usuario=${globalUserId}`,
        body
      );
      console.log(res);
    } catch (error) {
      console.groupCollapsed("Error en la funcion fetchInfo");
      console.error(error);
      console.groupEnd();
    }

    fethInfo();
  }

  return (
    <>
      <div className="basicContainer">
        <div className="containData">
          <div className="profile-imgBasic">
            <img
              src={isPhotoExist ? info.foto : standardAvatar}
              className="photo"
              alt="userImage"
            />
            <h2>Configuración de perfil</h2>
          </div>

          <div className="basicInfo-Container">
            <div className="entradas">
              <div className="labels">
                <label className="id-name">Nombre:</label>
              </div>
              <div className="inputs">
                <input
                  className="lb-name"
                  placeholder={info.nombre || ""}
                  type="text"
                  name="nombre"
                  onChange={(event) => setName(event.target.value)}
                ></input>
              </div>
            </div>

            <div className="entradas">
              <div className="labels">
                <label className="id-name">Apellido Paterno:</label>
              </div>
              <div className="inputs">
                <input
                  className="lb-name"
                  placeholder={info.apellidoPaterno || ""}
                  type="text"
                  name="apellidoPaterno"
                  onChange={(event) => setApellidoP(event.target.value)}
                ></input>
              </div>
            </div>

            <div className="entradas">
              <div className="labels">
                <label className="id-name">Apellido Materno:</label>
              </div>
              <div className="inputs">
                <input
                  className="lb-name"
                  placeholder={info.apellidoMaterno || ""}
                  type="text"
                  name="apellidoMaterno"
                  onChange={(event) => setApellidoM(event.target.value)}
                ></input>
              </div>
            </div>
          </div>

          <div className="basicInfo-Container">
            <div className="entradas">
              <div className="labels">
                <label className="id-name">Celular:</label>
              </div>
              <div className="inputs">
                <input
                  className="lb-name"
                  placeholder={info.celular || ""}
                  type="number"
                  name="celular"
                  onChange={(event) => setCelular(event.target.value)}
                ></input>
              </div>
            </div>
            <div className="entradas">
              <div className="labels">
                <label className="id-name">Ciudad de residencia:</label>
              </div>
              <div className="inputs">
                <input
                  className="lb-name"
                  placeholder={info.ciudadDeResidencia || ""}
                  type="text"
                  name="ciudad"
                  onChange={(event) => setCiudadResidencia(event.target.value)}
                ></input>
              </div>
            </div>
            <div className="entradas">
              <div className="labels">
                <label className="id-name">Tiempo Residando:</label>
              </div>
              <div className="inputs">
                <input
                  className="lb-name"
                  placeholder={capitilizeWord(info.tiempoViviendoAhi || "")}
                  type="text"
                  name="residando"
                  onChange={(event) => setTiempoResidando(event.target.value)}
                ></input>
              </div>
            </div>
          </div>

          <div className="basicInfo-Container">
            <div className="entradas">
              <div className="labels">
                <label className="id-name">Estado de Nacimiento:</label>
              </div>
              <div className="inputs">
                <input
                  className="lb-name"
                  placeholder={capitilizeWord(info.estadoDeNacimiento || "")}
                  type="text"
                  name="estadoDN"
                  onChange={(event) =>
                    setEstadoDeNacimiento(event.target.value)
                  }
                ></input>
              </div>
            </div>

            <div className="entradas">
              <div className="labels">
                <label className="id-name">Fecha de Nacimiento:</label>
              </div>
              <div className="inputs">
                <Space direction="vertical">
                  {formattedBirthday !==
                    dayjs(new Date()).format("YYYY-MM-DD") && (
                    <DatePicker
                      defaultValue={moment(formattedBirthday, "YYYY-MM-DD")}
                      placeholder={formattedBirthday}
                      onChange={onChange}
                    />
                  )}
                </Space>
              </div>
            </div>
            <div className="entradas">
              <div className="labels">
                <label className="id-name">Genero:</label>
              </div>
              <div className="inputs">
                <input
                  className="lb-name"
                  placeholder={capitilizeWord(info.genero || "")}
                  type="text"
                  name="genero"
                  onChange={(event) => setGenero(event.target.value)}
                ></input>
              </div>
            </div>
          </div>
          <br />
          <div className="basicInfo-Save">
            <button
              className="btn-see-circunferencia"
              onClick={() => GuardarCambios()}
            >
              Guardar
            </button>
          </div>
        </div>
      </div>

      <SocioeconomicData id={globalUserId} />
      <Weight id={globalUserId} />
      <Circumference id={globalUserId} />
      <BodyFields id={globalUserId} />
      <BioIndicators id={globalUserId} />
      <OverallStatus id={globalUserId} />
      <SolarExposition id={globalUserId} />
      <HoursOfSleep id={globalUserId} />
      <Gastrointestinal id={globalUserId} />
      <Lactation id={globalUserId} />
    </>
  );
};

export default Usuarios;
