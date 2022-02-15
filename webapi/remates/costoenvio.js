const con = require("../../db/conexion");

let Costoenvio = async function consultar(codigo){

    return new Promise(function(resolve,reject){
    let query = 'select a.tipo,r.costo,nombre,marca,r.activo,t.costo as costotipo from remates  as a left join costoenvioporproducto as r on a.codigo = r.codigo inner join cattipoarticulosenvios as t on t.tipo = a.tipo where a.codigo='+"'"+codigo+"'";
        con.connection.query(query, function (error, results, fields) {
            Resultado = JSON.parse(JSON.stringify(results));
       
            var costo = Resultado[0].costo;
            if(costo  !== null){
                Resultado[0].costotipo=costo;
            }

            resolve(Resultado);
         });
    });
}

module.exports={
    Costoenvio
}