"use client";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Modificar({ params }) {
    const venta = JSON.parse(decodeURIComponent(params.id));

    const [sugerenciasProducto, setSugerenciasProducto] = useState([]);
    const [sugerenciasUsuario, setSugerenciasUsuario] = useState([]);
    const [nombreProducto, setNombreProducto] = useState(venta.producto); // Producto actual de la venta
    const [productoSeleccionado, setProductoSeleccionado] = useState(venta.producto);
    const [nombreUsuario, setNombreUsuario] = useState(venta.usuario); // Usuario actual de la venta
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(venta.usuario);
    const [cantidad, setCantidad] = useState(venta.cantidad);

    // Estilos para las sugerencias
    const estilosSugerencias = {
        position: "absolute",
        zIndex: 1,
        top: "100%",
        left: 0,
        right: 0,
        border: "1px solid #ccc",
        backgroundColor: "white",
        listStyleType: "none",
        padding: "5px 0",
        margin: 0,
    };

    const estilosElementoSugerencia = {
        padding: "8px 10px",
        cursor: "pointer",
    };

    const estilosHover = {
        backgroundColor: "#f0f0f0",
    };

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

    const modificarVenta = async (e) => {
        e.preventDefault();

        const data = {
            id: venta.id,
            id_usuario: usuarioSeleccionado.id,
            id_producto: productoSeleccionado.id,
            cantidad: cantidad,
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
            <form className="col-6 mt-5" onSubmit={modificarVenta}>
                <div className="card">
                    <div className="card-header">
                        <h1>Modificar Venta</h1>
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
                            className="btn btn-secondary mt-2"
                        >
                            Guardar cambios
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
