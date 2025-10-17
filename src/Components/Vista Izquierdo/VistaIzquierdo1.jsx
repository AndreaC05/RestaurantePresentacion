import "../../style/Vistas.css";
import Fondo1 from "../../assets/fondo1.jpg";
import Logo from "../../assets/logo.png";

export default function VistaIzquierdo1() {
    return(
        <>
           <div className="container_vista_Izquierdo_1">
            <div className="contenido_vista_izquierdo_1">
                <img src={Fondo1} className="fondo1" alt="" />
                <div className="texto_1">
                    <img src={Logo} alt="" />
                </div>
            </div>
           </div>
        </>
    );
}