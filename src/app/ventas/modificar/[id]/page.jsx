"use client";
export default function Modificar({ params }) {
    // esto permite convertit lo que llega en la url para poderlo manejar en formato json
    const venta = JSON.parse(decodeURIComponent(params.id));

    const modificarProducto = async (e) => {
        e.preventDefault();

        const data = {
            id: venta.id,
            cantidad: document.getElementById("cantidad").value
        };

        const url = "http://localhost:3000/ventas/modificarVenta";

        await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        location.replace("http://localhost:3001/ventas/mostrar");
    };

    return (
        <div className="m-0 row justify-content-center">
            <form className="col-6 mt-5" onSubmit={modificarProducto}>
                <div className="card">
                    <div className="card-header">
                        <h1>Modificar Venta</h1>
                    </div>
                    <div className="card-body">
                        <input id="id" defaultValue={venta.id} type="text" className="form-control mb-3 d-none" />
                        <input id="cantidad" defaultValue={venta.cantidad} type="text" className="form-control mb-3" />
                    </div>
                    <div className="card-footer">
                        <button type="submit" className="btn btn-secondary col-12 mt-3 mb-3">Guardar cambios</button>
                    </div>
                </div>
            </form>
        </div>
    );
}
