"use client";

import axios from "axios";
import { useState } from "react";


async function nuevaVenta(e, idProducto, idUsuario, cantidad) {
    e.preventDefault();
    const url = "http://localhost:3000/ventas/nuevaVenta";
    const datos = {
        id_usuario: idUsuario,
        id_producto: idProducto,
        cantidad: cantidad
    };

    const respuesta = await axios.post(url, datos);

    if (respuesta.status === 200) {
        location.replace("http://localhost:3001/ventas/mostrar");
    } else {
        alert("Error al guardar la venta.");
    }
}

export default function Nuevo() {
    const [sugerenciasProducto, setSugerenciasProducto] = useState([]);
    const [sugerenciasUsuario, setSugerenciasUsuario] = useState([]);
    const [nombreProducto, setNombreProducto] = useState("");
    const [productoSeleccionado, setProductoSeleccionado] = useState(null);
    const [nombreUsuario, setNombreUsuario] = useState("");
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
    const [cantidad, setCantidad] = useState("");

    
    const manejarSugerenciasProducto = async (e) => {
        const termino = e.target.value.toLowerCase();
        setNombreProducto(termino);

        if (termino.length > 0) {
            const respuesta = await axios.get(`http://localhost:3000/productos/sugerirProductos/${termino}`);
            if (respuesta && respuesta.data) {
                setSugerenciasProducto(respuesta.data);
            }
        } else {
            setSugerenciasProducto([]);
        }
    };
    
    const manejarSugerenciasUsuario = async (e) => {
        const termino = e.target.value.toLowerCase();
        setNombreUsuario(termino);

        if (termino.length > 0) {
            const respuesta = await axios.get(`http://localhost:3000/usuarios/sugerirUsuarios/${termino}`);
            if (respuesta && respuesta.data) {
                setSugerenciasUsuario(respuesta.data);
            }
        } else {
            setSugerenciasUsuario([]);
        }
    };
    
    const seleccionarProducto = (producto) => {
        setNombreProducto(producto.producto);
        setProductoSeleccionado(producto);
        setSugerenciasProducto([]);
    };
    
    const seleccionarUsuario = (usuario) => {
        setNombreUsuario(usuario.usuario);
        setUsuarioSeleccionado(usuario);
        setSugerenciasUsuario([]);
    };

    
    const estilosSugerencias = {
        position: "absolute",
        top: "100%",
        left: "0",
        right: "0",
        backgroundColor: "white",
        border: "1px solid #ddd",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        maxHeight: "200px",
        overflowY: "auto",
        zIndex: "10",
        margin: "0",
        padding: "0",
        listStyleType: "none",
    };

    const estilosElementoSugerencia = {
        padding: "8px",
        cursor: "pointer",
    };

    const estilosHover = {
        backgroundColor: "#f0f0f0",
    };

    return (
        <div className="m-0 row justify-content-center">
            <form
                className="col-6 mt-5"
                onSubmit={(e) => nuevaVenta(e, productoSeleccionado?.id, usuarioSeleccionado?.id, cantidad)}
            >
                <div className="card">
                    <div className="card-header">
                        <h1>Nueva Venta</h1>
                    </div>
                    <div className="card-body">
                        
                        <div className="autocomplete-container" style={{ position: "relative" }}>
                            <input
                                onChange={manejarSugerenciasProducto}
                                value={nombreProducto}
                                placeholder="Buscar producto"
                                type="text"
                                className="form-control mb-3"
                            />
                            {sugerenciasProducto.length > 0 && (
                                <ul style={estilosSugerencias}>
                                    {sugerenciasProducto.map((producto) => (
                                        <li
                                            key={producto.id}
                                            onClick={() => seleccionarProducto(producto)}
                                            style={estilosElementoSugerencia}
                                            onMouseOver={(e) => e.target.style.backgroundColor = estilosHover.backgroundColor}
                                            onMouseOut={(e) => e.target.style.backgroundColor = ""}
                                        >
                                            {producto.producto}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        
                        {productoSeleccionado && (
                            <div className="mt-3 mb-3">
                                <label htmlFor="productoId" className="form-label">
                                    ID del producto:
                                </label>
                                <input
                                    id="productoId"
                                    type="text"
                                    value={productoSeleccionado.id}
                                    readOnly
                                    className="form-control"
                                />
                            </div>
                        )}

                        <div className="autocomplete-container" style={{ position: "relative" }}>
                            <input
                                onChange={manejarSugerenciasUsuario}
                                value={nombreUsuario}
                                placeholder="Buscar usuario"
                                type="text"
                                className="form-control mb-3"
                            />
                            {sugerenciasUsuario.length > 0 && (
                                <ul style={estilosSugerencias}>
                                    {sugerenciasUsuario.map((usuario) => (
                                        <li
                                            key={usuario.id}
                                            onClick={() => seleccionarUsuario(usuario)}
                                            style={estilosElementoSugerencia}
                                            onMouseOver={(e) => e.target.style.backgroundColor = estilosHover.backgroundColor}
                                            onMouseOut={(e) => e.target.style.backgroundColor = ""}
                                        >
                                            {usuario.usuario}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

    
                        {usuarioSeleccionado && (
                            <div className="mt-3 mb-3">
                                <label htmlFor="usuarioId" className="form-label">
                                    ID del usuario:
                                </label>
                                <input
                                    id="usuarioId"
                                    type="text"
                                    value={usuarioSeleccionado.id}
                                    readOnly
                                    className="form-control"
                                />
                            </div>
                        )}

                        <input
                            value={cantidad}
                            onChange={(e) => setCantidad(e.target.value)}
                            placeholder="Cantidad"
                            className="form-control mb-3"
                            type="text"
                            required
                        />

                        <button
                            type="submit"
                            className="btn btn-primary mt-2"
                        >
                            Guardar Venta
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
