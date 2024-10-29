import BorrarUsuario from "@/components/borrar";
import axios from "axios";
import Link from "next/link";
async function getUsuarios() {

    const url = "http://localhost:3000/usuarios";
    const usuarios = await axios.get(url);
    //console.log(universidades.data);
    return usuarios.data;

}

export default async function Usuarios() {
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

    const usuarios = await getUsuarios();
    return (
        <>
            <h1 style={{ textAlign: 'center', color: '#333' }}>Usuarios</h1>
            <table className="table" style={{ width: '80%', margin: '20px auto', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f2f2f2' }}>
                        <th style={tabEncabezado}>Id</th>
                        <th style={tabEncabezado}>Nombre</th>
                        <th style={tabEncabezado}>Usuario</th>
                        <th style={tabEncabezado}>Editar/Borrar</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map((usuario, i) => (
                        <tr key={i} style={i % 2 === 0 ? { backgroundColor: '#f9f9f9' } : { backgroundColor: '#ffffff' }}>
                            <td style={tabstyle2}>{i + 1}</td>
                            <td style={tabstyle2}>{usuario.nombre}</td>
                            <td style={tabstyle2}>{usuario.usuario}</td>
                            <td style={tabstyle2}>
                                <BorrarUsuario id={usuario.id} />
                                <> / </>
                                <Link href={`/usuarios/modificar/${encodeURIComponent(JSON.stringify({ id: usuario.id, nombre: usuario.nombre, usuario: usuario.usuario }))}`}>
                                Modificar</Link>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="d-flex justify-content-center">
                <Link href="/usuarios/nuevo" className="btn btn-primary">Nuevo</Link>
            </div>
        </>
    );
}