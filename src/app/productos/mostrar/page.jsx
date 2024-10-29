import BorrarProducto from "@/components/borrarP";
import axios from "axios";
import Link from "next/link";
async function getProductos() {
    const url = "http://localhost:3000/productos";
    const productos = await axios.get(url);
    return productos.data;

}

export default async function Produtos() {
    const tabEncabezado = {
        padding: '10px',
        border: '1px solid #ccc',
        textAlign: 'left',
        fontWeight: 'bold',
        backgroundColor: '#ddd',
    };

    const tabstyle2 = {
        padding: '10px',
        border: '1px solid #ccc',
    };

    const productos = await getProductos();
    return (
        <>
            <h1 style={{ textAlign: 'center', color: '#333' }}>Productos</h1>
            <table className="table" style={{ width: '80%', margin: '20px auto', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f2f2f2' }}>
                        <th style={tabEncabezado}>Id</th>
                        <th style={tabEncabezado}>Producto</th>
                        <th style={tabEncabezado}>Precio</th>
                        <th style={tabEncabezado}>Cantidad</th>
                        <th style={tabEncabezado}>Editar/Borrar</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.map((producto, i) => (
                        <tr key={i} style={i % 2 === 0 ? { backgroundColor: '#f9f9f9' } : { backgroundColor: '#ffffff' }}>
                            <td style={tabstyle2}>{i + 1}</td>
                            <td style={tabstyle2}>{producto.producto}</td>
                            <td style={tabstyle2}>{producto.precio}</td>
                            <td style={tabstyle2}>{producto.cantidad}</td>
                            <td style={tabstyle2}>
                                <BorrarProducto id={producto.id} ></BorrarProducto>
                                <> / </>
                                <Link href={`/productos/modificar/${encodeURIComponent(JSON.stringify({ id: producto.id, producto: producto.producto, cantidad: producto.cantidad, precio: producto.precio }))}`}>
                                    Modificar</Link>

                            </td>
                        </tr>
                    ))}
                </tbody>

            </table>
            <div className="d-flex justify-content-center">
                <Link href="/productos/nuevo" className="btn btn-primary">Nuevo</Link>
            </div>
        </>
    );
}