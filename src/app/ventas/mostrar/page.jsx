import BorrarVenta from "@/components/borrarVenta";
import axios from "axios";
import Link from "next/link";
async function getVentas() {
    const url = "http://localhost:3000/ventas";
    const ventas = await axios.get(url);
    return ventas.data;

}
export default async function Ventas() {
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

    const ventas = await getVentas();
    return (
        <>
            <h1 style={{ textAlign: 'center', color: '#333' }}>Ventas</h1>
            <table className="table" style={{ width: '80%', margin: '20px auto', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f2f2f2' }}>
                        <th style={tabEncabezado}>Id</th>
                        <th style={tabEncabezado}>Cantidad</th>
                        <th style={tabEncabezado}>Estado</th>
                        <th style={tabEncabezado}>Fecha/Hora</th>
                        <th style={tabEncabezado}>Producto</th>
                        <th style={tabEncabezado}>Usuario</th>
                        <th style={tabEncabezado}>Borrar</th>
                    </tr>
                </thead>
                <tbody>
                    {ventas.map((venta, i) => (
                        <tr key={i} style={i % 2 === 0 ? { backgroundColor: '#f9f9f9' } : { backgroundColor: '#ffffff' }}>
                            <td style={tabstyle2}>{i + 1}</td>
                            <td style={tabstyle2}>{venta.cantidad}</td>
                            <td style={tabstyle2}>{venta.estado}</td>
                            <td style={tabstyle2}>{venta.fechayhora}</td>
                            <td style={tabstyle2}>{venta.producto}</td>
                            <td style={tabstyle2}>{venta.usuario}</td>
                            <td style={tabstyle2}>
                                <BorrarVenta id={venta.id} />
                                <> / </>
                                <Link href={`/ventas/modificar/${encodeURIComponent(JSON.stringify({ id: venta.id, cantidad: venta.cantidad }))}`}>
                                    Modificar</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>

            </table>
            <div className="d-flex justify-content-center">
                <Link href="/ventas/nuevo" className="btn btn-primary">Nueva</Link>
            </div>
        </>
    );
}