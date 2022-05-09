const { Date } = require('mssql');
const con = require('../db/conexion');
const libsodium = require('../webapi/libsodium/libsodium')
let Obtenerpagos = async function consulta(boleta,codauth,ref){

    return new Promise(function(resolve,reject){
        
        var url= "http://grupoalvarez.com.mx:8089/maxilanaApp/api/consultas/pagosempeno/"+boleta+"/"+codauth+"/"+ref;
        var request = require('request');
        request(url, function (error, response, body) {
             ResultadoSQL = JSON.parse(response.body);
             let arr = ResultadoSQL.data.response;
             resolve(arr)
        });

    });

}
module.exports={
    Obtenerpagos
}
