const con = require("../../db/conexion");
const libsodium = require("../libsodium/libsodium.js");
var uniqid = require("uuid");
const env = require('../../node_modules/dotenv').config({ path: '../../.env' });
let Obteneridboleta = async function consultar(Tarjeta,Vencimiento,Ccv,TarjetaHabiente,correoelectronico,Monto,Sucursal,boleta,montoboleta,codigotipopago,fechac,diaspagados){

    return new Promise(function(resolve,reject){

        let id = uniqid.v4();
        id= id.toString().replace(/[^a-zA-Z0-9]/g, '');
        id = id.toString().substr(0,15);
        let query = 'insert into informacionpw2(id, tarjeta, vencimiento, cvv2, nombre, correoelectronico, monto, codigosucursal, identificador, boleta, montoboleta, fecha, codigotipopago, fechaconsulta, diaspagados) values '+
                    '('+"'"+id+"'"+', '+"'"+Tarjeta+"'"+', '+"'"+Vencimiento+"'"+', '+"'"+Ccv+"'"+', '+"'"+TarjetaHabiente+"'"+', '+"'"+correoelectronico+"'"+', '+"'"+Monto+"'"+', '+"'"+Sucursal+"'"+', '+"'"+Sucursal+"'"+','+"'"+boleta+"'"+','+"'"+montoboleta+"'"+', now(),'+ codigotipopago +",'"+fechac+"','"+diaspagados+"'"+')';
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
let Obteneridboletav1 = async function consultar(Tarjeta,Vencimiento,Ccv,TarjetaHabiente,correoelectronico,Monto,Sucursal,boleta,montoboleta,codigotipopago,fechac,diaspagados){

    return new Promise(function(resolve,reject){
        let Validate = 'SELECT * FROM `respuestaspw2` where boleta='+boleta+' AND CAST(fecha as DATE) = CAST(NOW() AS DATE)';
        con.connection.query(Validate, function (error, results, fields) {
            let resul = JSON.parse(JSON.stringify(results));
            if(!resul.length){
                let id = uniqid.v4();
                id= id.toString().replace(/[^a-zA-Z0-9]/g, '');
                id = id.toString().substr(0,15);
                let query = 'insert into informacionpw2(id, tarjeta, vencimiento, cvv2, nombre, correoelectronico, monto, codigosucursal, identificador, boleta, montoboleta, fecha, codigotipopago, fechaconsulta, diaspagados) values '+
                            '('+"'"+id+"'"+', '+"'"+Tarjeta+"'"+', '+"'"+Vencimiento+"'"+', '+"'"+Ccv+"'"+', '+"'"+TarjetaHabiente+"'"+', '+"'"+correoelectronico+"'"+', '+"'"+Monto+"'"+', '+"'"+Sucursal+"'"+', '+"'"+Sucursal+"'"+','+"'"+boleta+"'"+','+"'"+montoboleta+"'"+', now(),'+ codigotipopago +",'"+fechac+"','"+diaspagados+"'"+')';
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
            }else{
                var array=({
                    respuesta :'Pago en proceso'
                });

                resolve(array);
            }
       });

    });
}
let Obteneridboletamultiple = async function consultar(Tarjeta,Vencimiento,Ccv,TarjetaHabiente,correoelectronico,detalledepago){
    return new Promise(function(resolve,reject){


    let id = uniqid.v4();
    id= id.toString().replace(/[^a-zA-Z0-9]/g, '');
    id = id.toString().substr(0,15);
    let detalle = detalledepago;
    for(var i =0; i < detalle.length; i ++){    
        let idDetalle = uniqid.v4();
        idDetalle= idDetalle.toString().replace(/[^a-zA-Z0-9]/g, '');
        idDetalle = idDetalle.toString().substr(0,15);
        let query = 'insert into informacionpw2(idPrincipal ,id , tarjeta, vencimiento, cvv2, nombre, correoelectronico, monto, codigosucursal, identificador, boleta, montoboleta, fecha, codigotipopago, fechaconsulta, diaspagados) values '+
         '('+"'"+id+"'"+', '+"'"+idDetalle+"'"+', '+"'"+Tarjeta+"'"+', '+"'"+Vencimiento+"'"+', '+"'"+Ccv+"'"+', '+"'"+TarjetaHabiente+"'"+', '+"'"+correoelectronico+"'"+', '+"'"+detalle[i].monto+"'"+', '+"'"+detalle[i].sucursal+"'"+', '+"'"+detalle[i].letra+"'"+','+"'"+detalle[i].boleta+"'"+','+"'"+detalle[i].prestamo+"'"+', now(),'+ detalle[i].codigotipopago +",'"+detalle[i].fechaconsulta+"','"+detalle[i].diaspagados+"'"+')';
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
        }


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
    Obteneridboleta,
    informacion3dsecure,
    Obteneridboletamultiple,
    Obteneridboletav1
}
