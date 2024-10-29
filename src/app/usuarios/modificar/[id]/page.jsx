"use client";
export default function Modificar({ params }) {
    // esto permite convertit lo que llega en la url para poderlo manejar en formato json
    const usuario = JSON.parse(decodeURIComponent(params.id));

    const modificarUsuario = async (e) => {
        e.preventDefault();

        const data = {
            id: usuario.id,
            nombre: document.getElementById("nombre").value,
            usuario: document.getElementById("usuario").value,
            password: document.getElementById("password").value,
        };

        const url = "http://localhost:3000/usuarios/modificarUsuario";

        await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        location.replace("http://localhost:3001/usuarios/mostrar");
    };

    return (
        <div className="m-0 row justify-content-center">
            <form className="col-6 mt-5" onSubmit={modificarUsuario}>
                <div className="card">
                    <div className="card-header">
                        <h1>Modificar Usuario</h1>
                    </div>
                    <div className="card-body">
                        <input id="id" defaultValue={usuario.id} type="text" className="form-control mb-3 d-none" />
                        <input id="nombre" defaultValue={usuario.nombre} type="text" className="form-control mb-3" />
                        <input id="usuario" defaultValue={usuario.usuario} type="text" className="form-control mb-3" />
                        <input id="password" required placeholder="Nuevo password" type="text" className="form-control mb-3" />
                    </div>
                    <div className="card-footer">
                        <button type="submit" className="btn btn-secondary col-12 mt-3 mb-3">Guardar cambios</button>
                    </div>
                </div>
            </form>
        </div>
    );
}
