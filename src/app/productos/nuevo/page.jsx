"use client"
import axios from "axios";
async function nuevoProducto(e){
    e.preventDefault();
    const url="http://localhost:3000/productos/nuevoProducto";
    const datos={
        producto:document.getElementById("producto").value,
        cantidad:document.getElementById("cantidad").value,
        precio:document.getElementById("precio").value
    }
    const respuesta=await axios.post(url, datos);
    location.replace("http://localhost:3001/productos/mostrar");
    
}

export default function Nuevo() {
    return (
        <div className="m-0 row justify-content-center">
            <form className="col-6 mt-5" onSubmit={nuevoProducto} action="" method="post">
                <div className="card">
                    <div className="card-header">
                        <h1>Nuevo Producto</h1>
                    </div>
                    <div className="card-body">
                        <input id="producto" placeholder="Producto" autoFocus type="text" className="form-control mb-3" />
                        <input id="cantidad" placeholder="Cantidad" type="text" className="form-control mb-3" />
                        <input id="precio" placeholder="Precio" type="text" className="form-control mb-3" />
                    </div>
                    <div className="card-footer">
                        <button type="submit" className="btn btn-secondary col-12 mt-3 mb-3">Guardar producto</button>
                    </div>
                </div>
            </form>
        </div>
    );
}