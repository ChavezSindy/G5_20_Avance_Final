var UrlMateriales = 'http://52.152.236.67:90/G5_20/controller/Materiales.php?opc=GetMateriales';
var UrlPostMateriales = 'http://52.152.236.67:90/G5_20/controller/Materiales.php?opc=InsertMateriales';
var UrlGetMaterial = 'http://52.152.236.67:90/G5_20/controller/Materiales.php?opc=GetMateriale';
var UrlUpdateMaterial = 'http://52.152.236.67:90/G5_20/controller/Materiales.php?opc=UpdateMaterial';
var UrlDeleteMateriales = 'http://52.152.236.67:90/G5_20/controller/Materiales.php?opc=DeleteMaterial';



$(document).ready(function(){ 
    cargarmateriales();
});

function cargarmateriales(){
    $.ajax({
        url: UrlMateriales,
        type: 'GET',
        datatype: 'JSON',
        success: function(reponse){
         var MiItems = reponse;
         var Valores='';

         for( i=0; i < MiItems.length; i++){
                    Valores += '<tr>'+
                    '<td>'+ MiItems[i].ID +'</td>'+
                    '<td>'+ MiItems[i].DESCRIPCION +'</td>'+
                    '<td>'+ MiItems[i].UNIDAD +'</td>'+
                    '<td>'+ MiItems[i].COSTO +'</td>'+
                    '<td>'+ MiItems[i].PRECIO +'</td>'+
                    '<td>'+ MiItems[i].APLICA_ISV +'</td>'+
                    '<td>'+ MiItems[i].PORCENTAJE_ISV + '</td>'+
                    '<td>'+ MiItems[i].ESTADO +'</td>'+
                    '<td>'+ MiItems[i].ID_SOCIO +'</td>'+
                    '<td>'+
                    '<button class="btn btn-primary" onclick="editarmaterial('+MiItems[i].ID+')">Editar</button>'+
                    '<button class="btn btn-danger" id="btneliminar" onclick="EliminarMaterial('+MiItems[i].ID+')" >Eliminar</button>'+
                    '</td>'+
                    
                    '</tr>';
                   $( '.material').html(Valores);
            }
        }
        
         
      
    });
    
}



function editarmaterial(idmaterial){
        var datosmaterial = {
            ID:idmaterial
        };


        var datosmaterialjson = JSON.stringify(datosmaterial);

        
        $.ajax({
               url: UrlGetMaterial,
               type: 'POST',
               data: datosmaterialjson,
               datatype: 'JSON',
               contentType: 'application/json',
               
               success:function(response){
                   var MiItems = response;
                   $('#DESCRIPCION').val(MiItems[0].DESCRIPCION);
                   $('#UNIDAD').val(MiItems[0].UNIDAD);
                   $('#COSTO').val(MiItems[0].COSTO);
                   $('#PRECIO').val(MiItems[0].PRECIO);
                   $('#APLICA_ISV').val(MiItems[0].APLICA_ISV);
                   $('#PORCENTAJE_ISV').val(MiItems[0].PORCENTAJE_ISV);
                   $('#ESTADO').val(MiItems[0].ESTADO);
                   $('#ID_SOCIO').val(MiItems[0].ID_SOCIO);
                   var btnactualizar = '<input type="submit" id="btnactualizar" onclick="ActualizarMaterial('+MiItems[0].ID+')" value="Actualizar Material" class="btn btn-primary">'
                   $('#btnMaterial').html(btnactualizar);
               }
        })
    } 

function AgregarMaterial(){
    var datosmaterial={
        DESCRIPCION:$('#DESCRIPCION').val(),
        UNIDAD:$('#UNIDAD').val(),
        COSTO:$('#COSTO').val(),
        PRECIO:$('#PRECIO').val(),
        APLICA_ISV:$('#APLICA_ISV').val(),
        PORCENTAJE_ISV:$('#PORCENTAJE_ISV').val(),
        ESTADO:$('#ESTADO').val(),
        ID_SOCIO:$('#ID_SOCIO').val()
    
    };
    var datosmaterialesJson = JSON.stringify(datosmaterial);
    
    $.ajax({
        url: UrlPostMateriales,
        type: 'POST',
        data: datosmaterialesJson,
        datatype: 'JSON',
        contenttype:'application/json',
        
        success: function(reponse){
            console.log(reponse);
        },
        
        error:function(){
            alert('Error Al Crear Material');
        }
    });
    alert('Materiales Agregados');

}
 


function ActualizarMaterial(idmaterial){
    var datosmaterial={
        ID:idmaterial,
        DESCRIPCION:$('#DESCRIPCION').val(),
        UNIDAD:$('#UNIDAD').val(),
        COSTO:$('#COSTO').val(),
        PRECIO:$('#PRECIO').val(),
        APLICA_ISV:$('#APLICA_ISV').val(),
        PORCENTAJE_ISV:$('#PORCENTAJE_ISV').val(),
        ESTADO:$('#ESTADO').val(),
        ID_SOCIO:$('#ID_SOCIO').val(),
        
    
    };
    var datosmaterialesJson = JSON.stringify(datosmaterial);
    
    $.ajax({
        url: UrlUpdateMaterial,
        type: 'PUT',
        data: datosmaterialesJson,
        datatype: 'JSON',
        contenttype:'application/json',
        
        success: function(reponse){
            console.log(reponse);
        },
        
        error:function(){
            alert('Error Al Actualizar Material');
        }
    });
    alert('Materiales Actualizados');


}

function EliminarMaterial(idmaterial){
 
    var datosmaterial = {
        ID:idmaterial
    };


    var datosmaterialjson = JSON.stringify(datosmaterial);

    
    $.ajax({
           url: UrlDeleteMateriales,
           type: 'DELETE',
           data: datosmaterialjson,
           datatype: 'JSON',
           contentType: 'application/json',
           success: function(response){
            console.log(response)
        }
    });
    alert("Material eliminado");
    $(document).ready(function(){
        cargarmateriales();
        });
  

}