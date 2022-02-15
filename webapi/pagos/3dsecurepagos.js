const con = require("../../db/conexion");
const libsodium = require("../libsodium/libsodium.js");
var uniqid = require("uuid");
const env = require('../../node_modules/dotenv').config({ path: '../../.env' });
let Obteneridprestamos = async function consultar(Tarjeta,Vencimiento,Ccv,TarjetaHabiente,Monto,Sucursal,codigoprestamo,correo){

    return new Promise(function(resolve,reject){
        let id = uniqid.v4();
        id= id.toString().replace(/[^a-zA-Z0-9]/g, '');
        id = id.toString().substr(0,15);
        let query = 'insert into informacionpp_pw2(id, tarjeta, vencimiento, cvv2, nombre, correoelectronico, monto, codigosucursal, codigoprestamo, esvale, fecha) values '+
                    '('+"'"+id+"'"+', '+"'"+Tarjeta+"'"+', '+"'"+Vencimiento+"'"+', '+"'"+Ccv+"'"+', '+"'"+TarjetaHabiente+"'"+','+"'"+correo+"'"+','+"'"+Monto+"'"+', '+"'"+Sucursal+"'"+', '+"'"+codigoprestamo+"'"+',0,now())';
        con.connection.query(query, function (error, results, fields) {
                        var array=({
                            id : id,
                            merchancity : env.parsed.merchant_city,
                            merchanname : env.parsed.merchant_name,
                            merchanid : env.parsed.merchant_id,
                            correoEmpresa :env.parsed.correoelectronicousuario,
                            correoserv : env.parsed.correoelectronicoservidor,
                            correopass : env.parsed.correoelectronicocontrasena
                        });
        resolve(array);
       });
    });
}
let Obteneridvales = async function consultar(Tarjeta,Vencimiento,Ccv,TarjetaHabiente,Monto,codigoprestamo,correo){

    return new Promise(function(resolve,reject){
 
        let id = uniqid.v4();
        id= id.toString().replace(/[^a-zA-Z0-9]/g, '');
        id = id.toString().substr(0,15);
        let query = 'insert into informacionpp_pw2(id, tarjeta, vencimiento, cvv2, nombre, correoelectronico, monto, codigosucursal, codigoprestamo, esvale, fecha) values '+
                    '('+"'"+id+"'"+', '+"'"+Tarjeta+"'"+', '+"'"+Vencimiento+"'"+', '+"'"+Ccv+"'"+', '+"'"+TarjetaHabiente+"'"+','+"'"+correo+"'"+', '+"'"+Monto+"'"+', 0 , '+"'"+codigoprestamo+"'"+', 1 ,now())';
                    con.connection.query(query, function (error, results, fields) {
                        var array=({
                            id : id,
                            merchancity : env.parsed.merchant_city,
                            merchanname : env.parsed.merchant_name,
                            merchanid : env.parsed.merchant_id,
                            correoEmpresa :env.parsed.correoelectronicousuario,
                            correoserv : env.parsed.correoelectronicoservidor,
                            correopass : env.parsed.correoelectronicocontrasena
                        });
        resolve(array);
        
       });
    });
}

let informacion3dsecure = async function datos(reference){
    return new Promise(function(resolve,reject){
        let query = 'SELECT * FROM informacion3dsecure where reference='+"'"+reference+"'";
            con.connection.query(query,function(error,results,fields){
                if(results){
                    Resultado = JSON.parse(JSON.stringify(results));
                    resolve(Resultado)
                }
                else{
                    resolve([]);
                }
            });
    });
}
module.exports={
    Obteneridvales,
    Obteneridprestamos,
    informacion3dsecure
}
