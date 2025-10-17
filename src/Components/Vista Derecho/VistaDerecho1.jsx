import { Button } from "primereact/button";
import Decoracion from "../../assets/bottom_half_right.png";

export default function VistaDerecho1() {
  return (
    <>
      <div className="container_vista_derecho_1">
        <img src={Decoracion} alt="" className="Decoracion" />
        <div className="contenido_vista_derecho_1">
          <div className="texto_derecho_1">
            <p>- EST. 1967 -</p>
            <h1>
              Taste the Finest Seafood, <br />
              Tarte the Freshness
            </h1>
            <h1></h1>
          </div>
          <div className="buton_menu_explore">
            <Button>Explore the Menu</Button>
          </div>
        </div>
      </div>
    </>
  );
}
