const { Date } = require('mssql');
const con = require('../db/conexion');
const libsodium = require('../webapi/libsodium/libsodium')
let obtenerventas = async function consulta(tipo,upc){

    return new Promise(function(resolve,reject){
        
        var url= "http://grupoalvarez.com.mx:8089/maxilanaApp/api/Consultas/ventas/tipo/"+tipo+"/upc/"+upc;
        console.log(url)
        var request = require('request');
        request(url, function (error, response, body) {
             ResultadoSQL = JSON.parse(response.body);
             let arr = ResultadoSQL.data.response;
             resolve(arr)
        });

    });

}
module.exports={
    obtenerventas
}