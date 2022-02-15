const con = require("../../db/conexion");
let Resultado = [];
let Obtenertodo = async function consultar(categoria,query,sucursal,ciudades,categoria_or,query_or,sucursal_or,ciudades_or,orden,min,max,vtalinea,page,limits,codigo){
    let consulta='';
    vtalinea = vtalinea ? vtalinea : undefined;
    let ordenar ='';
    let rangodeprecios = '';
    let selectinicial = 'select r.codigo,r.tipo as idcategoria,t.slug as slugcategoria,t.nombre as nombrecategoria,CASE WHEN r.tipo =10 THEN CONCAT(r.marca," ",r.nombre) WHEN r.tipo=54 THEN CONCAT(r.marca," ",r.nombre) WHEN r.tipo=57 THEN CONCAT(r.nombre," ",r.marca) ELSE r.nombre end as nombre,r.sucursal as idsucursal,s.nombre as nombresucursal,s.slug as slugsucursal, c.id as idciudad,c.nombre as ciudadnombre,c.slug as slugciudad, r.precio,r.precioneto,r.marca,r.observaciones,r.imagen,r.imagen,r.precod,r.ventalinea,cd.costo as descuento,UNIX_TIMESTAMP(r.fechaimagen) as fechaimagen from remates r , sucursales s, ciudades c, tipos t, catdescuentosadicionales cd where s.numero = r.sucursal and c.id = s.ciudad and t.id = r.tipo and cd.tipo=r.tipo'
    if(max !== undefined){
        rangodeprecios = rangodeprecios + " and r.precioneto <="+max;
    }
    if(min !== undefined){
        rangodeprecios = rangodeprecios + " and r.precioneto >="+min;
    }
    if(orden !== undefined){
        if(orden == 'rand'){
           ordenar=" order BY RAND()";
        }else{
            ordenar = " order by r.precioneto "+orden
        }
    }else{
        ordenar = " order by r.precio asc"
    }
    if(categoria !== undefined){
        consulta = consulta +" and r.tipo in("+categoria+")";
    }
    if(categoria_or !== undefined){
        consulta = consulta +" or r.tipo in("+categoria+")";
    }
    if(query !== undefined){
        consulta = consulta + " and CONCAT(r.nombre,r.marca,r.observaciones) REGEXP("+"'"+query+"'"+") ";
    }
    if(query_or !== undefined){
        consulta = consulta + " or CONCAT(r.nombre,r.marca,r.observaciones) REGEXP("+"'"+query+"'"+")"
    }
    if(sucursal !== undefined){
        consulta = consulta + " and r.sucursal in("+sucursal+")"
    }
    if(sucursal_or !== undefined){
        consulta = consulta + " or r.sucursal in("+_sucursal+")"
    }
    if(ciudades !== undefined){
        consulta = consulta + " and s.ciudad in("+ciudades+")"
    }
    if(ciudades_or !== undefined){
        consulta = consulta + " or s.ciudad in("+ciudades_or+")"
    }
    if(codigo !== undefined){
        items = codigo.replace(/,/g,"','");
        consulta = consulta + " and r.codigo in('"+items+"')";
    }
    if(vtalinea !== undefined){
        consulta = consulta + " and r.ventalinea="+vtalinea;
    }
    consulta = selectinicial + consulta + rangodeprecios + ordenar;
    console.log(consulta);
    return new Promise(function(resolve,reject){
    let query = consulta;
  //  query = query.replace("r.codigo,r.tipo as idcategoria,t.slug as slugcategoria,t.nombre as nombrecategoria,r.nombre,r.sucursal as idsucursal,s.nombre as nombresucursal,s.slug as slugsucursal, c.id as idciudad,c.nombre as ciudadnombre,c.slug as slugciudad, r.precio,r.precioneto,r.marca,r.observaciones,r.imagen,r.imagen,r.precod,r.ventalinea,cd.costo as descuento"," COUNT(*) as Total ");  
  con.connection.query(query, function (error, results, fields) {
            if(results != undefined){
                console.log("salio")
            Resultadogeneral = JSON.parse(JSON.stringify(results));
            var totalarticulos = Resultadogeneral.length;
            var porpagina=limits;
            var pagina=page;
            var paginas = Math.ceil(totalarticulos/porpagina);
            var next = false;
            var prev = false;
            var limit = '';
                var limiteinicial=(pagina-1)*porpagina;
                limit = limiteinicial+","+porpagina;
            if(pagina > 1){
                if(paginas > pagina){
                    next = true;
                    prev = true;
                }else{
                    next = false;
                    prev = true;
                }
            }else{
                if(paginas > pagina){
                    next = true;
                    prev = false;
                }else{
                    next=false;
                    prev=false;
                }
            }
            let query2 = consulta+" limit "+limit;
            con.connection.query(query2, function (error, results, fields) {
                if(results != undefined){
                    Resultado = JSON.parse(JSON.stringify(results));

                let respons ={
                    pages : paginas,
                    next : next,
                    prev : prev,
                    limit : porpagina,
                    count : totalarticulos,
                    rows: Resultado
                };
                 
                    resolve(Object.assign({},respons));
                }
                else{
                    resolve("No hay información para mostrar.")
                }
            });
        }else{
            let respons ={
                pages : 0,
                next : false,
                prev : 0,
                limit : porpagina,
                count : 0,
                rows: Resultado
            };
            resolve(Object.assign({},respons));
        }
         });
    });
}

let Obtenertodoprueba = async function consultar(categoria,query,sucursal,ciudades,categoria_or,query_or,sucursal_or,ciudades_or,orden,min,max,vtalinea,page,limits,codigo){
    let consulta = 'select * from productos WHERE codigo in("001949106","001949644")'
  //  let filsucursal =   " where articulo ->> '$.Sucursal'="+"'"+sucursal+"'";
   // let ventalinea =   " and articulo ->> '$.VentaLinea'="+"'"+vtalinea+"'";
   // consulta = consulta + filsucursal;
   // console.log(consulta);
    let Filtrado = {};
    let fill = [];
    return new Promise(function(resolve,reject){
    let query = consulta;
        con.connection.query(query, function (error, results, fields) {
            if(results != undefined){
                var obj = JSON.parse(JSON.stringify(results));
                var res = [];
                
                for(var i = 0 ; i < obj.length ; i++){
                    var x = JSON.parse(obj[i].articulo);

                    let filter = Object.keys(x);
                    for(var l = 0 ; l < filter.length ; l++){
                        if(!fill.includes(filter[l])){
                            fill.push(filter[l]);
                        }
                    }
                    
                    res.push(x);
                }
               Filtros=fill;
                    
               removeItemFromArr( Filtros, 'Codigo' );
               removeItemFromArr( Filtros, 'FechaImagen' );
               removeItemFromArr( Filtros , 'Sucursal');
               removeItemFromArr( Filtros, 'Imagen' );
               removeItemFromArr( Filtros, 'Nombre' );
               removeItemFromArr( Filtros, 'Precio' );
               removeItemFromArr( Filtros, 'VentaLinea' );
               removeItemFromArr( Filtros, 'SucursalOrigen' );
               removeItemFromArr( Filtros, 'SucursalCodigo' );
               removeItemFromArr( Filtros, 'PrecioNeto' );

               var lookup = [];
               var items = res;
               var result = [];
               for(var j = 0; j < Filtros.length ;j++){
                lookup=[]
                for (var item, i = 0; item = items[i++];) {
                    let kis = Object.keys(JSON.parse(JSON.stringify(item)));

                    if(kis.indexOf(Filtros[j]) !== -1){
                        console.log(item)
                        if(!lookup.includes(item[Filtros[j]])){
                            lookup.push(item[Filtros[j]]);
                        }
                    }
                }
                
             Filtrado[Filtros[j].toString()]=lookup.sort();
               }
               
               let total = obj.length;
               var porpagina=limits;
               var pagina=page;
               var paginas = Math.ceil(total/porpagina);
               var next = false;
               var prev = false;
               var limit = '';
               var limiteinicial=(pagina-1)*porpagina;
               limit = limiteinicial+","+porpagina;
               if(pagina > 1){
                   if(paginas > pagina){
                       next = true;
                       prev = true;
                   }else{
                       next = false;
                       prev = true;
                   }
               }else{
                   if(paginas > pagina){
                       next = true;
                       prev = false;
                   }else{
                       next=false;
                       prev=false;
                   }
               }
               query = consulta + " LIMIT "+limit
               con.connection.query(query, function (error, results, fields) {
                            var obj = JSON.parse(JSON.stringify(results));
                            var res = [];
                
                            for(var i = 0 ; i < obj.length ; i++){
                                var x = JSON.parse(obj[i].articulo);
                                res.push(x);
                            }
                            let Respuesta={
                                count : total,
                                filtros : Filtrado,
                                next : next,
                                prev : prev,
                                rows : res
                            }
                            resolve(Object.assign({},Respuesta));    

                    });
                
                }
            });
    });
    
}

function isKeyExists(obj,key){
    return obj.hasOwnProperty(key);
}
var removeItemFromArr = ( arr, item ) => {
    var i = arr.indexOf( item );
    i !== -1 && arr.splice( i, 1 );
};
let Obtenerarticulosid = async function consultar(items){
    let consulta='';
    let selectinicial = 'select r.codigo,r.tipo as idcategoria,t.slug as slugcategoria,t.nombre as nombrecategoria,r.nombre,r.sucursal as idsucursal,s.nombre as nombresucursal,s.slug as slugsucursal, c.id as idciudad,c.nombre as ciudadnombre,c.slug as slugciudad, r.precio,r.precioneto,r.marca,r.observaciones,r.imagen,r.imagen,r.precod,r.ventalinea,cd.costo as descuento from remates r , sucursales s, ciudades c, tipos t, catdescuentosadicionales cd where s.numero = r.sucursal and c.id = s.ciudad and t.id = r.tipo and cd.tipo=r.tipo'
    items = items.replace(/,/g,"','");
    consulta = selectinicial + " and r.codigo in('"+items+"')";
    return new Promise(function(resolve,reject){
        let query = consulta;

            con.connection.query(query, function (error, results, fields) {
                if(results != undefined){
                Resultado = JSON.parse(JSON.stringify(results));
                // if(Resultado[0].ventalinea == "1"){
                // var PrecioNeto = Resultado[0].precioneto;
                // var Descuento  = Resultado[0].descuento;
                // Descuento = parseFloat(100-Descuento);
                // var Subdescuento = (parseFloat(PrecioNeto)*(Descuento/100));
                // Subdescuento = Subdescuento.toFixed(2);
                // Resultado[0].precioneto = parseFloat(Subdescuento);
                // }
                    resolve(Resultado[0]);
        
        }   else{
            resolve("No hay información para mostrar.")
        }
         });
    });
}
let Obtenertipos = async function consultar(){
    let consulta = 'select * from tipos';
    return new Promise(function(resolve,reject){
        let query = consulta;

            con.connection.query(query, function (error, results, fields) {
                if(results != undefined){
                Resultado = JSON.parse(JSON.stringify(results));
                    resolve(Resultado);
        
        }   else{
            resolve("No hay información para mostrar.")
        }
         })
    });
}
module.exports={
    Obtenertodo,
    Obtenerarticulosid,
    Obtenertodoprueba,
    Obtenertipos
}
