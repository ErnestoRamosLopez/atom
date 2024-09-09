import { useEffect, useState } from "react";
import { InformacionDestacada } from "../../store/informacion-destacada/informacion-destacada.types";
import './item-destacado.styles.css';

type ItemDestacadoProps = {
    item: InformacionDestacada
}

const DEFAULT_VALUES = {
    defaultBackgroundColor: '',
    defaultTextColor: ''
}

const InformacionDestacadaItem: React.FC<ItemDestacadoProps> = ({
    item
}) => {    
    const [backgroundColor, setBackgroundColor] = useState(DEFAULT_VALUES.defaultBackgroundColor);
    const [textColor, setTextColor] = useState(DEFAULT_VALUES.defaultTextColor);

    useEffect(() => {
        if( !item.backgroundColor || !item.textColor){
            setBackgroundColor(DEFAULT_VALUES.defaultBackgroundColor);
            setTextColor(DEFAULT_VALUES.defaultTextColor);
        }else{
            setBackgroundColor(item.backgroundColor);
            setTextColor(item.textColor);
        }
    },[item]);

    return (
        <div className="carousel-item  mx-5">
            <div className="cacard bg-base-100 shadow-xlrd">
            <div className={"grid rounded-lg grid-cols-4 card-body neutral-content info-content "+ backgroundColor}>
                <h2 className={"col-span-full card-title ms-3 "+ textColor}>{item.nombre}</h2>
                <p className={'col-start-3 col-span-2 text-6xl font-bold ' + textColor}>{item.numeroPendiente}</p>
                <img src={require("../../assets/icons/"+item.icono)} className="icono ms-10 mb-5 text-white" alt="Icono"/>
            </div>
            </div>
            
        </div>
    );
}
  
  export default InformacionDestacadaItem;