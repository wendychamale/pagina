'use strict'

var extension="";
var base="";
var nombre="";
var numero=Math.random();

var remplazo1="";
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
 
ingreso.addEventListener('click', function(ev){
  var nombreu=document.getElementById("nombrec").value;
 var us=document.getElementById("user").value;
 var con=document.getElementById("contra").value;
 var conc=document.getElementById("contrac").value;
 var $resultados = document.querySelector("#confirmado");
ev.preventDefault();
if(con==conc){
  $resultados.textContent = "confirmado creando usuario...";
  var ruta="";
var si="";
if(!nombre && !base && !extension && us && con ){
//ruta="http://52.87.157.53:3000/registro_sin_foto"
  ruta="10.0.2.66:3000/registro_sin_foto"
  console.log("registro sin foto");
  si="si";
}else if(nombre && base && extension && us){
  ruta="10.0.2.66:3000/registro_con_foto"
  console.log("registro con foto");
  si="si";
}else{
  console.log("ningun registro");
}
if(si){
let xmlhttp = new XMLHttpRequest(); 
  xmlhttp.open("POST", ruta,true);
  xmlhttp.setRequestHeader("Content-Type", "application/json"); 
  let obj = {"nombreu": nombreu,"user":us,"password":con,"name":nombre,"extension":extension,"base64":base};
  let jsonData = JSON.stringify(obj);
  xmlhttp.onreadystatechange = function (aEvt) {
    if (xmlhttp.readyState == 4) {
       if(xmlhttp.status == 200)
       {
        if (xmlhttp.responseText==1)   $resultados.textContent = "Usuario creado correctamente";
        if (xmlhttp.responseText==0) $resultados.textContent = "Error no se pudo crear el usuario";
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
}else{
  $resultados.textContent = "Las contraseñas no coinciden";
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


//funcion para colocar la imagen
$(window).load(function(){
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
  });
