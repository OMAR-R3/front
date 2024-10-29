"use client"
import axios from "axios";
async function nuevaVenta(e){
    e.preventDefault();
    const url="http://localhost:3000/ventas/nuevaVenta";
    const datos={
        cantidad:document.getElementById("cantidad").value,
        id_producto:document.getElementById("id_producto").value,
        id_usuario:document.getElementById("id_usuario").value
    }
    const respuesta=await axios.post(url, datos);
    location.replace("http://localhost:3001/ventas/mostrar");
    
}

export default function Nueva() {
    return (
        <div className="m-0 row justify-content-center">
            <form className="col-6 mt-5" onSubmit={nuevaVenta} action="" method="post">
                <div className="card">
                    <div className="card-header">
                        <h1>Nueva Venta</h1>
                    </div>
                    <div className="card-body">
                        <input id="cantidad" required placeholder="Cantidad" autoFocus type="text" className="form-control mb-3" />
                        <input id="id_producto" required placeholder="id_producto" type="text" className="form-control mb-3" />
                        <input id="id_usuario" required placeholder="id_usuario" type="text" className="form-control mb-3" />
                    </div>
                    <div className="card-footer">
                        <button type="submit" className="btn btn-secondary col-12 mt-3 mb-3">Guardar venta</button>
                    </div>
                </div>
            </form>
        </div>
    );
}