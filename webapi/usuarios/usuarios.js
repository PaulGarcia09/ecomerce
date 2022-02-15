const sql = require("../../node_modules/mssql");
const con = require("../../db/conexion");
const email = require("../emails/sendemailremate");
const request = require("request");
const soap = require("../../node_modules/soap");
const libsodium = require("../../webapi/libsodium/libsodium");
const _sodium = require('../../node_modules/libsodium-wrappers');
let consultarLogin = async function consultar(celular,correo,password){
    var url="api/Usuarios/Cusuario/"+celular+"/Correo/"+correo+"/Contrasena/"+password;
    return new Promise(function(resolve,reject){
        request('http://grupoalvarez.com.mx:8089/maxilanaApp/'+url, function (error, response, body) {
                var response = JSON.parse(body);
                response = response.data.response[0];
                response = response ? response : undefined;
                if(response !== undefined){
                    resolve(response);
                }else{
                    let error = {
                        error : "El usuario o contraseña no existe."
                    }
                    resolve(error);
                }
        });
    });
}
 
let ObtenerSaldoBoleta = async function consultar(usuario){
    var url="api/ConsultarBoletas/Cliente/"+usuario;
    return new Promise(function(resolve,reject){
        request('http://grupoalvarez.com.mx:8089/maxilanaApp/'+url, function (error, response, body) {
                var response = JSON.parse(body);
                console.log(url)
                console.log(response)
                response = response.data.response;
                response = response ? response : undefined;
                if(response !== undefined){
                    resolve(response);
                }else{
                    let error = {
                    }
                    resolve(error);
                }
        });
    });
}

let RegistrarCliente = async function consultar(Apellidop,Apellidom,Nombre,Celular,Corre,Contrasena){
    var url="api/Registro/ApellidoP/"+Apellidop+"/ApellidoM/"+Apellidom+"/Nombre/"+Nombre+"/Celular/"+Celular+"/Correo/"+Corre+"/Contrasena/"+Contrasena;
    return new Promise(function(resolve,reject){
        request('http://grupoalvarez.com.mx:8089/maxilanaApp/'+url, function (error, response, body) {
                var response = JSON.parse(body);
                console.log(response)
                response = response.data.response;
                response = response ? response : undefined;
                if(response !== undefined){
                    resolve(response[0]);
                }else{
                    let error = {
                    }
                    resolve(error);
                }
        });
    });
}

let EditarCliente = async function consultar(Usuario,Apellidop,Apellidom,Nombre,Celular,Corre,Contrasena){
    var url="api/Registro/Editar/Usuario/"+Usuario+"/ApellidoP/"+Apellidop+"/ApellidoM/"+Apellidom+"/Nombre/"+Nombre+"/Celular/"+Celular+"/Correo/"+Corre+"/Contrasena/"+Contrasena;
    return new Promise(function(resolve,reject){
        request('http://grupoalvarez.com.mx:8089/maxilanaApp/'+url, function (error, response, body) {
                var response = JSON.parse(body);
                console.log(response)
                response = response.data.response;
                response = response ? response : undefined;
                if(response !== undefined){
                    resolve(response[0]);
                }else{
                    let error = {
                    }
                    resolve(error);
                }
        });
    });
}

let agregarboleta = async function consultar(usuario,boleta,letra,prestamo){
    var url="api/AgregarBoleta/Cliente/"+usuario+"/Boleta/"+boleta+"/Letra/"+letra+"/Prestamo/"+prestamo;
    return new Promise(function(resolve,reject){
        request('http://grupoalvarez.com.mx:8089/maxilanaApp/'+url, function (error, response, body) {
                var response = JSON.parse(body);
                console.log(response)
                response = response.data.response;
                response = response ? response : [];
                resolve(response);
         
        });
    });
}

let ObtenerCodigoRegistro = async function consultar(celular){
    var url="api/GenerarCodigo/Celular/"+celular;
    return new Promise(function(resolve,reject){
        request('http://grupoalvarez.com.mx:8089/maxilanaApp/'+url, function (error, response, body) {
                var response = JSON.parse(body);
                response = response.data.response;
                response = response ? response : undefined;
                if(response !== undefined){
                    if(response[0].Usuario !== "0" & response[0].Codigo !== "0"){
                        resolve(response[0]);
                    }else{
                        resolve(undefined);
                    }
                }else{
                    resolve(undefined);
                }
        });
    });
}
let ObtenerCodigoFgtPassword = async function consultar(celular,correo){
    var url="api/ForgotPassword/ConfirmarDatos/Celular/"+celular+"/Correo/"+correo;
    return new Promise(function(resolve,reject){
        request('http://grupoalvarez.com.mx:8089/maxilanaApp/'+url, function (error, response, body) {
            console.log(body)
                var response = JSON.parse(body);
                response = response.data.response;
                response = response ? response : undefined;
                if(response !== undefined){
                    if(response[0].Usuario !== "0" & response[0].CodigoGenerado !== "0"){
                        resolve(response[0]);
                    }else{
                        resolve(undefined);
                    }
                }else{
                    resolve(undefined);
                }
        });
    });
}
let ValidarcodigoFgtPassword = async function consultar(){

}

let dejanostucomentario = async function consultar(asunto,titulo){

    return new Promise(function(resolve,reject){
        
        let query = 'insert into comentariosapp(asunto,mensaje,fecha) values '+
                    '('+"'"+asunto+"'"+', '+"'"+titulo+"'"+',now())';
                    console.log(query)
                    con.connection.query(query, function (error, results, fields) {
                        resolve("OK");
       });
    });
}
let obtenercomentariosapp = async function consultar(asunto,titulo){

    return new Promise(function(resolve,reject){

    });
}

module.exports={
    consultarLogin,
    ObtenerSaldoBoleta,
    RegistrarCliente,
    ObtenerCodigoRegistro,
    ObtenerCodigoFgtPassword,
    ValidarcodigoFgtPassword,
    dejanostucomentario,
    obtenercomentariosapp,
    agregarboleta,
    EditarCliente
}