"use client"
const axios = require("axios");
async function validarLogin(e) {
    e.preventDefault();
    const url = "http://localhost:3000/usuarios/login";
    const datos = {
        usuario: document.getElementById("usuario").value,
        password: document.getElementById("password").value
    }
    const usuario= await axios.post(url,datos);
    console.log(usuario.data);
    
}
export default function Login() {   
    return (
        <div className="m-0 row justify-content-center">
            <form className="col-3 mt-5" onSubmit={validarLogin} action="">
                <div className="card">
                    <div className="card-header">
                        <h1>Login</h1>
                    </div>
                    <div className="card-body">
                        <input className="form-control mb-3" type="text" id="usuario" placeholder="Usuario" autoFocus />
                        <input className="form-control mb-3" type="text" id="password" placeholder="Password" />
                    </div>
                    <div className="card-footer">
                        <button className="btn btn-primary col-12" type="submit">Inicia sesión</button>
                    </div>
                </div>
            </form>
        </div>
    );
}