'use strict'
var extension="";
var base="";
var nombre="";
var us="";
var id;
var remplazo1="";
var use=location.search.substring(1,location.search.length);
var foto="";
//funcion para colocar la imagen
$(window).load(function(){
  var remplazo1="%20";
  use = use.replace(remplazo1," ");

  var $resultados = document.querySelector("#nuser");
    $resultados.textContent="usuario: "+use;
 $(function() {
  $('#font').change(function(e) {
      addImage(e); 
     });

     function addImage(e){
      var file = e.target.files[0],
      imageType = /image.*/;
    
      if (!file.type.match(imageType))
       return;
  
      var reader = new FileReader();
  
      reader.onload = function(e){
         var result=e.target.result;
        $('#photo').attr("src",result);
      }   
      reader.readAsDataURL(file);
     }
    });

    obtenerdatos();
  });


  function obtenerdatos() {
  var ruta="10.0.2.66:3000/obtener_datos";
  let xmlhttp = new XMLHttpRequest(); 
  xmlhttp.open("POST", ruta,true);
  xmlhttp.setRequestHeader("Content-Type", "application/json"); 
  let obj = {"user":use};
  let jsonData = JSON.stringify(obj);
  xmlhttp.onreadystatechange = function (aEvt) {
    var i=0;
    var categ= new Array();
   var cadena="";
    if (xmlhttp.readyState == 4) {
       if(xmlhttp.status == 200)
       {
        var data = JSON.parse(this.responseText); 
        console.log(data); 
        var datos = (Object.values(Object.values(data)[0]));  
        cadena=datos[0]; 
        document.getElementById("nombrec").value = datos[0];
        document.getElementById("user").value = datos[1];
        document.getElementById("photo").src=datos[2];
      }     
else
{
 console.log("Error loading page\n");
 $resultados.textContent = "Error conexion ";
}
}
};
xmlhttp.send(jsonData);
}


function readFont(input) {
  if ( input.files && input.files[0] ) {
  var FR= new FileReader();	FR.onload = function(e) {
  $('#base64font').val( e.target.result);
  var nombre1=document.getElementById("font").files[0].name;
  var path_splitted = nombre1.split('.');
  var numero=Math.floor((999-4)*Math.random()) + 1;
  nombre=path_splitted[0]+numero;
  numero="";
  extension = path_splitted.pop();
  base=e.target.result;
  //console.log(base);
 
  if(extension=="jpg"){
 remplazo1="data:image/"+extension+";base64,";
 base = base.replace(remplazo1,"");
 remplazo1="data:image/jpeg;base64,";
 base = base.replace(remplazo1,"");
 remplazo1="";
  }else{
   remplazo1="data:image/"+extension+";base64,";
   base = base.replace(remplazo1,"");
  }
 
  };	
  FR.readAsDataURL( input.files[0] );
  }	}	
  $(document).ready(function(){
  $("#font").change(function(){	readFont( this );	});	});


Guardar.addEventListener('click', function(ev){
  var nombreu=document.getElementById("nombrec").value;
 var us=document.getElementById("user").value;
 var con=document.getElementById("contrac").value;
 var $resultados = document.querySelector("#confirmado");
ev.preventDefault();

  $resultados.textContent = "modificando usuario...";
  var ruta="";
var si="";
if(!nombre && !base && !extension && us ){
//ruta="http://52.87.157.53:3000/registro_sin_foto"
  ruta="10.0.2.66:3000/actualizar_sin_foto"
  console.log("actualizar sin foto");
  si="si";
}else if(nombre && base && extension && us){
  ruta="10.0.2.66:3000/actualizar_con_foto"
  console.log("actualizar con foto");
  si="si";
}else{
  console.log("ninguna modificacion");
}
if(si){
let xmlhttp = new XMLHttpRequest(); 
  xmlhttp.open("POST", ruta,true);
  xmlhttp.setRequestHeader("Content-Type", "application/json"); 
  let obj = {"nombreu": nombreu,"user":use,"user_nuevo":us,"password":con,"name":nombre,"extension":extension,"base64":base};
  let jsonData = JSON.stringify(obj);
  xmlhttp.onreadystatechange = function (aEvt) {
    if (xmlhttp.readyState == 4) {
       if(xmlhttp.status == 200)
       {
        if (xmlhttp.responseText==1) {
          $resultados.textContent = "Usuario modificado correctamente";
          var $resultado = document.querySelector("#nuser");
          $resultado.textContent="usuario: "+us;
          use=us;
           d();
        }  
        if (xmlhttp.responseText==0) {
          $resultados.textContent = "Error no se pudo modificar el usuario verifique password";
        }
        console.log(xmlhttp.responseText);
       }
       else
       {
        console.log("Error loading page\n");
        $resultados.textContent = "Error conexion ";
       }
    }
  };
  xmlhttp.send(jsonData);
}
var vjson = 
{ 
 name: nombre,
  base64:base,
  extension:extension,
  nombreu:nombreu,
  user:us,
  password:con
};
console.log(vjson);
  }, false);

  iniciov.addEventListener('click', function(ev){
    ev.preventDefault();
    document.location.href="home.html?"+use+"="+foto;
  }, false);

  function d(){
  var con=document.getElementById("contrac").value;

   console.log("logueeeea");

  let xmlhttp = new XMLHttpRequest(); 
   xmlhttp.open("POST", "10.0.2.66:3000/login");
   xmlhttp.setRequestHeader("Content-Type", "application/json"); 
   let obj = {"user":use,"password":con};
   let jsonData = JSON.stringify(obj);
   xmlhttp.onreadystatechange = function (aEvt) {
     if (xmlhttp.readyState == 4) {
        if(xmlhttp.status == 200)
        {
          var data = JSON.parse(this.responseText); 
          console.log(data); 
       if(data!=0){
        foto=data[0].foto_url;
       }else{
      
       }
        }
        else
        {
         console.log("Error loading page\n");
         $resultados.textContent = "Error conexion ";
        }
     }
   };
   xmlhttp.send(jsonData);
  }