import { useEffect, useState } from "react";
import { InformacionDestacada } from "../../store/informacion-destacada/informacion-destacada.types";
import InformacionDestacadaItem from "../item-destacado/item-destacado.component";
import { destacadosList } from "../../utils/constantes-test.utils";

const Destacados: React.FC<any> = () => {
    const [listaDestacados, setDestacados] = useState([] as InformacionDestacada[]);
    useEffect(() => {
        setDestacados(destacadosList);
    }, []);
    return (
        <div className="carousel rounded-box overflow-y-hidden">
            {listaDestacados.map((item, index) => 
                <InformacionDestacadaItem item={item} key={index} />
            )}
        </div>
    );
  }
  
  export default Destacados;