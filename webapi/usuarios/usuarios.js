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
                response = response.data.response;
                response = response ? response : undefined;
            
                if(response !== undefined){
                    for(var i = 0 ; i < response.length;i++){
                        response[i].Nombre = response[i].Nombre.trim();
                        response[i].ApellidoP = response[i].ApellidoP.trim();
                        response[i].ApellidoM = response[i].ApellidoM.trim();
                        let Refrendo = parseFloat(response[i].Refrendo);
                        let Poraplicar = parseFloat(response[i].SaldoPorAplicar);
                        Refrendo = Refrendo - Poraplicar;
                        response[i].Refrendo = Refrendo.toString();
                        var importe = parseFloat(response[i].Refrendo);
                        importe = importe - (parseInt(importe));
                        var residuo = importe.toFixed(1);
                        if(residuo > 0.5){
                            importe = parseInt(response[i].Refrendo) + 1;
                        }else{
                            importe = parseInt(response[i].Refrendo) + 0.5;
                        }
                    }

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
    var url="api/RegistroWeb/ApellidoP/"+Apellidop+"/ApellidoM/"+Apellidom+"/Nombre/"+Nombre+"/Celular/"+Celular+"/Correo/"+Corre+"/Contrasena/"+Contrasena;
    return new Promise(function(resolve,reject){
        request('http://grupoalvarez.com.mx:8089/maxilanaApp/'+url, function (error, response, body) {
                var response = JSON.parse(body);
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
let CambiarContraseña = async function consultar(usuario,contrasena){
    var url="api/ForgotPassword/ChangePassword/Usuario/"+usuario+"/Contrasena/"+contrasena;
    return new Promise(function(resolve,reject){
        request('http://grupoalvarez.com.mx:8089/maxilanaApp/'+url, function (error, response, body) {
            let res={response:true};
            resolve(res);
        });
    });
}
let Validarcodigo = async function consultar(usuario,codigo,tipo){
    var url="api/ValidarCodigo/Usuario/"+usuario+"/Codigo/"+codigo+"/Tipo/"+tipo;
    return new Promise(function(resolve,reject){
        console.log(url)
        request('http://grupoalvarez.com.mx:8089/maxilanaApp/'+url, function (error, response, body) {
            var res = JSON.parse(body);
            res = res.data.response;
            res = res ? res : undefined;
            if(res.length){
                let resultado = {
                    result : true
                }
                resolve(resultado);
            }else{
                let resultado = {
                    result : false
                }
                resolve(resultado);
            }
      
           
        });
    });

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
    dejanostucomentario,
    obtenercomentariosapp,
    agregarboleta,
    EditarCliente,
    CambiarContraseña,
    Validarcodigo
    
}