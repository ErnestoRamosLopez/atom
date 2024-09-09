import { useEffect, useState } from "react";
import { InformacionDestacada } from "../../store/informacion-destacada/informacion-destacada.types";
import InformacionDestacadaItem from "../item-destacado/item-destacado.component";

const Destacados: React.FC<any> = () => {
    const [listaDestacados, setDestacados] = useState([] as InformacionDestacada[]);
    useEffect(() => {
        setDestacados([
            {
                icono: 'shopping_cart.svg',
                nombre: 'Ordenes en curso',
                numeroPendiente: 9,
                backgroundColor: 'bg-rose-400',
                textColor: 'text-white'
            },
            {
                icono: 'star.svg',
                nombre: 'Lista de deseados',
                numeroPendiente: 35,
                backgroundColor: 'bg-fuchsia-600',
                textColor: 'text-white'
            },
            {
                icono: 'star.svg',
                nombre: 'Lista de deseados',
                numeroPendiente: 35,
                backgroundColor: 'bg-fuchsia-600',
                textColor: 'text-white'
            }
        ]);
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