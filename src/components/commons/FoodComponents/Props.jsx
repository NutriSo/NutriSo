const Props = () => {          
    let auxOutSugerida = 0; // VARIABLE DE SALIDA AUXILIAR (ESTA SI SALE)
    let auxOutFCHH = 0; // VARIABLE DE SALIDA AUXILIAR (ESTA SI SALE)
    let auxOutPrecio = 0; // VARIABLE DE SALIDA AUXILIAR (ESTA SI SALE)
    let auxOutPunEcologico = 0; // VARIABLE DE SALIDA AUXILIAR (ESTA SI SALE)
    //let auxOut = 0
    function validaNumericos(event,campo) {     
        let out; // SERÁ LA VARIABLE DE SALIDA (ESTA NO SALE)
        switch (campo) { // OBTENGO EL VALOR DE CADA CAMPO
            case "sugerida":
                out = document.getElementById("sugerida").value;                            
                break;
            case "fchh":
                out = document.getElementById("fchh").value;                            
                break;
            case "precio":
                out = document.getElementById("precio").value;                            
                break;
            case "punEcologico":
                out = document.getElementById("puntajeecologico").value;                            
        }   


        
        console.log('Out ->',out);
        console.log('Evento ->',event);
        console.log('Campo ->',campo)
        //console.log('AuxOut ->',auxOut)
        console.log('KeyCode ->',event.keyCode);


        /*
            keyCode -> 48 = 0
            keyCode -> 57 = 9
            keyCode -> 8  = retroceso
            keyCode -> 190 = Punto
            keyCode -> 188 = Coma
        */
        if((event.keyCode >= 48 && event.keyCode <= 57) || event.keyCode === 8 || event.keyCode === 190 || event.keyCode === 188){            
            switch (campo) {
                case "sugerida":
                    auxOutSugerida = out
                break;
                case "fchh":
                    auxOutFCHH = out
                break;
                case "precio":
                    auxOutPrecio = out
                break;
                case "punEcologico":
                    auxOutPunEcologico = out
            }       
        }else{
            
            switch (campo) {
                case "sugerida":
                    document.getElementById("sugerida").value = auxOutSugerida;
                break;
                case "fchh":
                    document.getElementById("fchh").value = auxOutFCHH;
                break;
                case "precio":
                    document.getElementById("precio").value = auxOutPrecio;
                break;
                case "punEcologico":
                    document.getElementById("puntajeecologico").value = auxOutPunEcologico;                         
            }            
        }              
    }

    return(
        <>                                                
            <form id="propsform">
                <div className="property">
                    <h3 id="atr-titulo">Nombre</h3>
                    <input className="atr-editable" id="pName" placeholder="Inserte valor de la propiedad" required/>                        
                </div>

                <div className="property">
                    <h3 id="atr-titulo">SKU</h3>
                    <input className="atr-editable" disabled="true" id="pSku" placeholder="Inserte valor de la propiedad"/>                                                    
                </div>

                <div className="property">
                    <h3 id="atr-titulo">Grupo exportable</h3>
                    <input className="atr-editable" id="pGroupE" placeholder="Inserte valor de la propiedad"/>                                                    
                </div>

                <div className="property">
                    <h3 id="atr-titulo">Sub grupo exportable</h3>
                    <input className="atr-editable" id="pSubGroupE" placeholder="Inserte valor de la propiedad"/>                                                    
                </div>

                <div className="property">
                    <h3 id="atr-titulo">Clasificación exportable</h3>
                    <input className="atr-editable" id="pClasE" placeholder="Inserte valor de la propiedad"/>                                                    
                </div>

                <div className="property">
                    <h3 id="atr-titulo">Grupo de alimento</h3>
                    <input className="atr-editable" id="pGroupAli" placeholder="Inserte valor de la propiedad" required/>                                                    
                </div>



                {/* MENSAJES */}
                <div className="property">
                    <h3 id="atr-titulo">Mensajes<hr/></h3>
                </div>

                <div className="property">
                    <h4 id="sub">Mensaje nutricional</h4>
                    <input className="atr-editable" id="mNutri" placeholder="Inserte valor de la propiedad"/>                                                    
                </div>

                <div className="property">
                    <h4 id="sub">Mensaje ambiental</h4>
                    <input className="atr-editable" id="mAmbien" placeholder="Inserte valor de la propiedad"/>                                                    
                </div>

                <div className="property">
                    <h4 id="sub">Mensaje económico</h4>
                    <input className="atr-editable" id="mEcono" placeholder="Inserte valor de la propiedad"/>                                                    
                </div>

                <div className="property">
                    <h4 id="sub">Mensaje cultura y sociedad</h4>
                    <input className="atr-editable" id="mCult_Soci" placeholder="Inserte valor de la propiedad"/>                                                    
                </div>
                

            
                {/* CANTIDADES */}
                <div className="property">
                    <h3 id="atr-titulo">Cantidades<hr/></h3>
                </div>

                <div className="property">
                    <h4 id="sub">Sugerida</h4>
                    <input className="atr-editable" id="sugerida" onKeyUp={(e) => validaNumericos(e,"sugerida")} placeholder="Inserte valor de la propiedad"/>                                                     
                </div>

                <div className="property">
                    <h4 id="sub">Unidad</h4>
                    <input className="atr-editable" id="unidad" placeholder="Inserte valor de la propiedad"/>                                                     
                </div>

                <div className="property">
                    <h4 id="sub">Peso neto</h4>
                    <input className="atr-editable" id="pesoneto" placeholder="Inserte valor de la propiedad"/>                                                     
                </div>



                {/* MACRONUTRIENTES */}
                <div className="property">
                    <h3 id="atr-titulo">Macronutrientes<hr/></h3>
                </div>

                <div className="property">
                    <h4 id="sub">Energía</h4>
                    <input className="atr-editable" id="energia" placeholder="Inserte valor de la propiedad"/>                                                     
                </div>

                <div className="property">
                    <h4 id="sub">Proteína</h4>
                    <input className="atr-editable" id="proteina" placeholder="Inserte valor de la propiedad"/>                                                     
                </div>

                <div className="property">
                    <h4 id="sub">Lípidos</h4>
                    <input className="atr-editable" id="lipidos" placeholder="Inserte valor de la propiedad"/>                                                     
                </div>

                <div className="property">
                    <h4 id="sub">AG Saturados</h4>
                    <input className="atr-editable" id="saturados" placeholder="Inserte valor de la propiedad"/>                                                     
                </div>

                <div className="property">
                    <h4 id="sub">AG Monoinsaturados</h4>
                    <input className="atr-editable" id="monoinsaturados" placeholder="Inserte valor de la propiedad"/>                                                     
                </div>

                <div className="property">
                    <h4 id="sub">Polinsaturados</h4>
                    <input className="atr-editable" id="polinsaturados" placeholder="Inserte valor de la propiedad"/>                                                     
                </div>

                <div className="property">
                    <h4 id="sub">Colesterol</h4>
                    <input className="atr-editable" id="colesterol" placeholder="Inserte valor de la propiedad"/>                                                     
                </div>

                <div className="property">
                    <h4 id="sub">Omega 3</h4>
                    <input className="atr-editable" id="omega3" placeholder="Inserte valor de la propiedad"/>                                                     
                </div>

                <div className="property">
                    <h4 id="sub">Omega 6</h4>
                    <input className="atr-editable" id="omega6" placeholder="Inserte valor de la propiedad"/>                                                     
                </div>

                <div className="property">
                    <h4 id="sub">Omega 9</h4>
                    <input className="atr-editable" id="omega9" placeholder="Inserte valor de la propiedad"/>                                                     
                </div>

                <div className="property">
                    <h4 id="sub">Hidratos de carbono</h4>
                    <input className="atr-editable" id="hdratoscarbono" placeholder="Inserte valor de la propiedad"/>                                                     
                </div>

                <div className="property">
                    <h4 id="sub">Fibra</h4>
                    <input className="atr-editable" id="fibra" placeholder="Inserte valor de la propiedad"/>                                                     
                </div>

                <div className="property">
                    <h4 id="sub">Fibra insoluble</h4>
                    <input className="atr-editable" id="fibrainsoluble" placeholder="Inserte valor de la propiedad"/>                                                     
                </div>

                <div className="property">
                    <h4 id="sub">Fibra soluble</h4>
                    <input className="atr-editable" id="fibrasoluble" placeholder="Inserte valor de la propiedad"/>                                                     
                </div>

                <div className="property">
                    <h4 id="sub">Azúcar</h4>
                    <input className="atr-editable" id="azucar" placeholder="Inserte valor de la propiedad"/>                                                     
                </div>

                <div className="property">
                    <h4 id="sub">Etanol</h4>
                    <input className="atr-editable" id="etanol" placeholder="Inserte valor de la propiedad"/>                                                     
                </div>



                {/* VITAMINAS */}
                <div className="property">
                    <h3 id="atr-titulo">Vitaminas<hr/></h3>
                </div>

                <div className="property">
                    <h4 id="sub">Tiamina</h4>
                    <input className="atr-editable" id="tiamina" placeholder="Inserte valor de la propiedad"/>                                                     
                </div>

                <div className="property">
                    <h4 id="sub">Riboflavin</h4>
                    <input className="atr-editable" id="riboflavin" placeholder="Inserte valor de la propiedad"/>                                                     
                </div>

                <div className="property">
                    <h4 id="sub">Niacina</h4>
                    <input className="atr-editable" id="niacina" placeholder="Inserte valor de la propiedad"/>                                                     
                </div>

                <div className="property">
                    <h4 id="sub">Ácido pantoténico</h4>
                    <input className="atr-editable" id="acidopantotenico" placeholder="Inserte valor de la propiedad"/>                                                     
                </div>

                <div className="property">
                    <h4 id="sub">Piridoxina</h4>
                    <input className="atr-editable" id="piridoxina" placeholder="Inserte valor de la propiedad"/>                                                     
                </div>

                <div className="property">
                    <h4 id="sub">Biotina</h4>
                    <input className="atr-editable" id="biotina" placeholder="Inserte valor de la propiedad"/>                                                     
                </div>

                <div className="property">
                    <h4 id="sub">Cobalmina</h4>
                    <input className="atr-editable" id="cobalmina" placeholder="Inserte valor de la propiedad"/>                                                     
                </div>

                <div className="property">
                    <h4 id="sub">Ácido ascórbico</h4>
                    <input className="atr-editable" id="acidoascorbico" placeholder="Inserte valor de la propiedad"/>                                                     
                </div>

                <div className="property">
                    <h4 id="sub">Ácido fólico</h4>
                    <input className="atr-editable" id="acidofolico" placeholder="Inserte valor de la propiedad"/>                                                     
                </div>

                <div className="property">
                    <h4 id="sub">Vitamina A</h4>
                    <input className="atr-editable" id="vitaminaA" placeholder="Inserte valor de la propiedad"/>                                                     
                </div>

                <div className="property">
                    <h4 id="sub">Vitamina D</h4>
                    <input className="atr-editable" id="vitaminaD" placeholder="Inserte valor de la propiedad"/>                                                     
                </div>

                <div className="property">
                    <h4 id="sub">Vitamina K</h4>
                    <input className="atr-editable" id="vitaminaK" placeholder="Inserte valor de la propiedad"/>                                                     
                </div>

                <div className="property">
                    <h4 id="sub">Vitamina E</h4>
                    <input className="atr-editable" id="vitaminaE" placeholder="Inserte valor de la propiedad"/>                                                     
                </div>



                {/* MINERALES */}
                <div className="property">
                    <h3 id="atr-titulo">Minerales<hr/></h3>
                </div>

                <div className="property">
                    <h4 id="sub">Calcio</h4>
                    <input className="atr-editable" id="calcio" placeholder="Inserte valor de la propiedad"/>                                                     
                </div>

                <div className="property">
                    <h4 id="sub">Fósforo</h4>
                    <input className="atr-editable" id="fosforo1" placeholder="Inserte valor de la propiedad"/>                                                     
                </div>

                <div className="property">
                    <h4 id="sub">Hierro</h4>
                    <input className="atr-editable" id="hierro" placeholder="Inserte valor de la propiedad"/>                                                     
                </div>

                <div className="property">
                    <h4 id="sub">Hierro no hem</h4>
                    <input className="atr-editable" id="hierronohem" placeholder="Inserte valor de la propiedad"/>                                                     
                </div>

                <div className="property">
                    <h4 id="sub">Hierro total</h4>
                    <input className="atr-editable" id="hierrototal" placeholder="Inserte valor de la propiedad"/>                                                     
                </div>
                
                <div className="property">
                    <h4 id="sub">Magnesio</h4>
                    <input className="atr-editable" id="magnesio" placeholder="Inserte valor de la propiedad"/>                                                     
                </div>

                <div className="property">
                    <h4 id="sub">Sodio</h4>
                    <input className="atr-editable" id="sodio" placeholder="Inserte valor de la propiedad"/>                                                     
                </div>

                <div className="property">
                    <h4 id="sub">Potasio</h4>
                    <input className="atr-editable" id="potasio" placeholder="Inserte valor de la propiedad"/>                                                     
                </div>

                <div className="property">
                    <h4 id="sub">Zinc</h4>
                    <input className="atr-editable" id="zinc" placeholder="Inserte valor de la propiedad"/>                                                     
                </div>

                <div className="property">
                    <h4 id="sub">Selenio</h4>
                    <input className="atr-editable" id="selenio" placeholder="Inserte valor de la propiedad"/>                                                     
                </div>



                {/* ASPECTO GLUCEMICO */}
                <div className="property">
                    <h3 id="atr-titulo">Aspecto glucémico<hr/></h3>
                </div>

                <div className="property">
                    <h4 id="sub">Índice glicémico</h4>
                    <input className="atr-editable" id="indiceglicemico" placeholder="Inserte valor de la propiedad"/>                                                     
                </div>

                <div className="property">
                    <h4 id="sub">Carga glicémica</h4>
                    <input className="atr-editable" id="cargaglicemica" placeholder="Inserte valor de la propiedad"/>                                                     
                </div>



                {/* ASPECTO MEDIOAMBIENTAL */}
                <div className="property">
                    <h3 id="atr-titulo">Aspecto medioambiental<hr/></h3>
                </div>

                <div className="property">
                    <h4 id="sub">Factor de corrección de huella hídrica</h4>
                    <input className="atr-editable" id="fchh" onKeyUp={(e) => validaNumericos(e,"fchh")} placeholder="Inserte valor de la propiedad"/>                                                     
                </div>

                <div className="property">
                    <h4 id="sub">Tipo</h4>
                    <input className="atr-editable" id="tipo" placeholder="Inserte valor de la propiedad"/>                                                     
                </div>

                <div className="property">
                    <h4 id="sub">Lugar</h4>
                    <input className="atr-editable" id="lugar" placeholder="Inserte valor de la propiedad"/>                                                     
                </div>

                <div className="property">
                    <h4 id="sub">Huella hídrica total</h4>
                    <input className="atr-editable" id="hht" placeholder="Inserte valor de la propiedad"/>                                                     
                </div>

                <div className="property">
                    <h4 id="sub">Huella hídrica verde</h4>
                    <input className="atr-editable" id="hhv" placeholder="Inserte valor de la propiedad"/>                                                     
                </div>

                <div className="property">
                    <h4 id="sub">Huella hídrica azul</h4>
                    <input className="atr-editable" id="hha" placeholder="Inserte valor de la propiedad"/>                                                     
                </div>

                <div className="property">
                    <h4 id="sub">Huella hídrica gris</h4>
                    <input className="atr-editable" id="hhg" placeholder="Inserte valor de la propiedad"/>                                                     
                </div>

                <div className="property">
                    <h4 id="sub">Agua para lavado</h4>
                    <input className="atr-editable" id="agualavado" placeholder="Inserte valor de la propiedad"/>                                                     
                </div>

                <div className="property">
                    <h4 id="sub">Agua para cocción</h4>
                    <input className="atr-editable" id="aguacoccion" placeholder="Inserte valor de la propiedad"/>                                                     
                </div>

                <div className="property">
                    <h4 id="sub">Lugar EGEI</h4>
                    <input className="atr-editable" id="lugaregei" placeholder="Inserte valor de la propiedad"/>                                                     
                </div>

                <div className="property">
                    <h4 id="sub">Cita EGEI</h4>
                    <input className="atr-editable" id="citaegei" placeholder="Inserte valor de la propiedad"/>                                                     
                </div>

                <div className="property">
                    <h4 id="sub">Huella de carbono</h4>
                    <input className="atr-editable" id="hcarbono" placeholder="Inserte valor de la propiedad"/>                                                     
                </div>

                <div className="property">
                    <h4 id="sub">Huella ecológica</h4>
                    <input className="atr-editable" id="hecologica" placeholder="Inserte valor de la propiedad"/>                                                     
                </div>

                <div className="property">
                    <h4 id="sub">Energia fósil</h4>
                    <input className="atr-editable" id="energiafosil" placeholder="Inserte valor de la propiedad"/>                                                     
                </div>

                <div className="property">
                    <h4 id="sub">Uso de suelo</h4>
                    <input className="atr-editable" id="usosuelo" placeholder="Inserte valor de la propiedad"/>                                                     
                </div>

                <div className="property">
                    <h4 id="sub">Nitrógeno</h4>
                    <input className="atr-editable" id="nitrogeno" placeholder="Inserte valor de la propiedad"/>                                                     
                </div>

                <div className="property">
                    <h4 id="sub">Fósforo</h4>
                    <input className="atr-editable" id="fosforo2" placeholder="Inserte valor de la propiedad"/>                                                     
                </div>

                <div className="property">
                    <h4 id="sub">Puntaje ecológico</h4>
                    <input className="atr-editable" id="puntajeecologico" onKeyUp={(e) => validaNumericos(e,"punEcologico")} placeholder="Inserte valor de la propiedad"/>                                                     
                </div>



                {/* ASPECTO ECONÓMICO */}
                <div className="property">
                    <h3 id="atr-titulo">Aspecto económico<hr/></h3>
                </div>

                <div className="property">
                    <h4 id="sub">Precio</h4>
                    <input className="atr-editable" id="precio" onKeyUp={(e) => validaNumericos(e,"precio")} placeholder="Inserte valor de la propiedad"/>                                                     
                </div>  

                <div className="property">
                    <h4 id="sub">Lugar de compra</h4>
                    <input className="atr-editable" id="lugarcompra" placeholder="Inserte valor de la propiedad"/>                                                     
                </div>   

                <div className="property">
                    <h4 id="sub">Lugar de venta</h4>
                    <input className="atr-editable" id="lugarventa" placeholder="Inserte valor de la propiedad"/>                                                     
                </div>  



                {/* COMPONENTES BIOACTIVOS */}
                <div className="property">
                    <h3 id="atr-titulo">Componentes bioactivos<hr/></h3>
                </div>

                <div className="property">
                    <h4 id="sub">Fitoquímicos</h4>
                    <input className="atr-editable" id="fitoquimicos" placeholder="Inserte valor de la propiedad"/>                                                     
                </div>  

                <div className="property">
                    <h4 id="sub">Polifenoles</h4>
                    <input className="atr-editable" id="polifenoles" placeholder="Inserte valor de la propiedad"/>                                                     
                </div>            

                <div className="property">
                    <h4 id="sub">Antocianinas</h4>
                    <input className="atr-editable" id="antocianinas" placeholder="Inserte valor de la propiedad"/>                                                     
                </div>

                <div className="property">
                    <h4 id="sub">Taninos</h4>
                    <input className="atr-editable" id="taninos" placeholder="Inserte valor de la propiedad"/>                                                     
                </div>

                <div className="property">
                    <h4 id="sub">Isoflavonas</h4>
                    <input className="atr-editable" id="isoflavonas" placeholder="Inserte valor de la propiedad"/>                                                     
                </div>

                <div className="property">
                    <h4 id="sub">Reserveratrol</h4>
                    <input className="atr-editable" id="reserveratrol" placeholder="Inserte valor de la propiedad"/>                                                     
                </div>

                <div className="property">
                    <h4 id="sub">Isotiocinatos</h4>
                    <input className="atr-editable" id="isotiocinatos" placeholder="Inserte valor de la propiedad"/>                                                     
                </div>

                <div className="property">
                    <h4 id="sub">Caretenoides</h4>
                    <input className="atr-editable" id="caretenoides" placeholder="Inserte valor de la propiedad"/>                                                     
                </div>

                <div className="property">
                    <h4 id="sub">Betacarotenos</h4>
                    <input className="atr-editable" id="betacarotenos" placeholder="Inserte valor de la propiedad"/>                                                     
                </div>

                <div className="property">
                    <h4 id="sub">Licopeno</h4>
                    <input className="atr-editable" id="licopeno" placeholder="Inserte valor de la propiedad"/>                                                     
                </div>

                <div className="property">
                    <h4 id="sub">Luteína</h4>
                    <input className="atr-editable" id="luteina" placeholder="Inserte valor de la propiedad"/>                                                     
                </div>

                <div className="property">
                    <h4 id="sub">Alicina</h4>
                    <input className="atr-editable" id="alicina" placeholder="Inserte valor de la propiedad"/>                                                     
                </div>

                <div className="property">
                    <h4 id="sub">Cafeína</h4>
                    <input className="atr-editable" id="cafeina" placeholder="Inserte valor de la propiedad"/>                                                     
                </div>

                <div className="property">
                    <h4 id="sub">UFC</h4>
                    <input className="atr-editable" id="ufc" placeholder="Inserte valor de la propiedad"/>                                                     
                </div>



                {/* ADITIVOS ALIMENTARIOS */}
                <div className="property">
                    <h3 id="atr-titulo">Aditivos alimentarios<hr/></h3>
                </div>

                <div className="property">
                    <h4 id="sub">Benzoato de sodio</h4>
                    <input className="atr-editable" id="benzoatodesodio" placeholder="Inserte valor de la propiedad"/>                                                     
                </div>

                <div className="property">
                    <h4 id="sub">Polisorbato</h4>
                    <input className="atr-editable" id="polisorbato" placeholder="Inserte valor de la propiedad"/>                                                     
                </div>

                <div className="property">
                    <h4 id="sub">Azul brillante FCF o E133</h4>
                    <input className="atr-editable" id="fcf" placeholder="Inserte valor de la propiedad"/>                                                     
                </div>

                <div className="property">
                    <h4 id="sub">Azorrubina o E102</h4>
                    <input className="atr-editable" id="azorrubina" placeholder="Inserte valor de la propiedad"/>                                                     
                </div>

                <div className="property">
                    <h4 id="sub">Amarillo ocaso FDF o E110</h4>
                    <input className="atr-editable" id="fdf" placeholder="Inserte valor de la propiedad"/>                                                     
                </div>

                <div className="property">
                    <h4 id="sub">Tartrazina o E102</h4>
                    <input className="atr-editable" id="tartrazina" placeholder="Inserte valor de la propiedad"/>                                                     
                </div>

                <div className="property">
                    <h4 id="sub">Verde S o E142</h4>
                    <input className="atr-editable" id="e142" placeholder="Inserte valor de la propiedad"/>                                                     
                </div>

                <div className="property">
                    <h4 id="sub">Negro brillante BN o E151</h4>
                    <input className="atr-editable" id="bn" placeholder="Inserte valor de la propiedad"/>                                                     
                </div>

                <div className="property">
                    <h4 id="sub">Sucralosa</h4>
                    <input className="atr-editable" id="sucralosa" placeholder="Inserte valor de la propiedad"/>                                                     
                </div>

                <div className="property">
                    <h4 id="sub">Stevia</h4>
                    <input className="atr-editable" id="stevia" placeholder="Inserte valor de la propiedad"/>                                                     
                </div>

                <div className="property">
                    <h4 id="sub">Sacarina</h4>
                    <input className="atr-editable" id="sacarina" placeholder="Inserte valor de la propiedad"/>                                                     
                </div>

                <div className="property">
                    <h4 id="sub">Aspartame</h4>
                    <input className="atr-editable" id="aspartame" placeholder="Inserte valor de la propiedad"/>                                                     
                </div>

                <div className="property">
                    <h4 id="sub">Acesulfame K</h4>
                    <input className="atr-editable" id="acesulfame" placeholder="Inserte valor de la propiedad"/>                                                     
                </div>

                <div className="property">
                    <h4 id="sub">Carboxymethylcellulose</h4>
                    <input className="atr-editable" id="carboxy" placeholder="Inserte valor de la propiedad"/>                                                     
                </div>

                <div className="property">
                    <h4 id="sub">Dióxido de titanio</h4>
                    <input className="atr-editable" id="dioxidodetitanio" placeholder="Inserte valor de la propiedad"/>                                                     
                </div>

                <div className="property">
                    <h4 id="sub">Monolaurato de glicerol</h4>
                    <input className="atr-editable" id="glicerol" placeholder="Inserte valor de la propiedad"/>                                                     
                </div>

                {/* ATRIBUTOS ADICIONALES */}
                {/*<div className="property">
                    <h3 id="atr-titulo">Atributos adicionales<hr/></h3>
                </div>

                <div className="property">
                    <h4 id="sub">ID</h4>
                    <input className="atr-editable" id="idAlimento" placeholder="Inserte valor de la propiedad"/>                                                     
                </div>

                <div className="property">
                    <h4 id="sub">Atributo adicional</h4>
                    <input className="atr-editable" id="atr-adicional" placeholder="Inserte valor de la propiedad"/>                                                     
                </div>*/}

                {/* MARCA */}
                <div className="property">
                    <h3 id="atr-titulo">Marca<hr/></h3>
                </div>

                <div className="property">
                    <h4 id="sub">Marca</h4>
                    <input className="atr-editable" id="marca" placeholder="Inserte valor de la propiedad"/>                                                     
                </div>                               
            </form>                            
        </>
    );
}

export default Props;