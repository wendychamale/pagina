'use strict'
var extension="";
var base="";
var nombre="";
var us="";
var id;
var remplazo1="";
var use=location.search.substring(1,location.search.length);
$(window).load(function(){
    var $resultados = document.querySelector("#nuser");
    $resultados.textContent="usuario: "+location.search.substring(1,location.search.length);
   
    fotoss();
  
});


function fotoss() {
  var ruta="https://g33v88byzb.execute-api.us-east-1.amazonaws.com/practica1/todo";
let xmlhttp = new XMLHttpRequest(); 
xmlhttp.open("POST", ruta,true);
xmlhttp.setRequestHeader("Content-Type", "application/json"); 
let obj = {"user":use};
let jsonData = JSON.stringify(obj);
xmlhttp.onreadystatechange = function (aEvt) {
  var i=0;
  if (xmlhttp.readyState == 4) {
     if(xmlhttp.status == 200)
     {
      var data = JSON.parse(this.responseText);
      var datos = (Object.values(Object.values(data)[0]));
      var cantidad=datos[1];
      var i;
      console.log(cantidad);
      var d=Object.values(datos[0]);
      var cadena="<h3>FOTOS USUARIO: "+use +" </h3><table><tr>";
       var contador=0;
      // var datos = (Object.values(Object.values(myJson)[1]));
           
      for (var i = 0; i < cantidad; i++) {
        console.log(d[i].foto);
        console.log("...foto "+i);
        cadena+="<td>"+"<img id=\"mover\" src=\""+d[i].foto+"\" width=\"200\" height=\"200\" \">"+"</td>"
        contador=contador+1;

        if(contador==4){
          cadena+="</tr><tr>"
          contador=0;
        }

    }
    cadena+="</tr></table>"
    document.getElementById("fot").innerHTML =cadena;
    //comenzamos a ponerlo en la cosa de la pagina

//termina      
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
us= location.search.substring(1,location.search.length);
 if ( input.files && input.files[0] ) {
 var FR= new FileReader();	FR.onload = function(e) {
 $('#base64font').val( e.target.result);
 var nombre1=document.getElementById("font").files[0].name;
 var path_splitted = nombre1.split('.');
 var numero=Math.floor((999-4)*Math.random()) + 1;
 nombre=path_splitted[0]+numero;
 extension = path_splitted.pop();
 base=e.target.result;
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
var $resultados = document.querySelector("#confirmado");
$resultados.textContent = "Cargando.....";
var ruta="http://34.205.17.131:3000/subir_foto_album"
console.log("ingresar album");
var vjson = { name: nombre,base64:base,extension:extension,user:us, id:numero};
console.log(vjson);
 
let xmlhttp = new XMLHttpRequest(); 
  xmlhttp.open("POST", ruta,true);
  xmlhttp.setRequestHeader("Content-Type", "application/json"); 
  let obj = {"name":nombre,"base64":base,"extension":extension,"user":us,"id":numero};
  let jsonData = JSON.stringify(obj);
  xmlhttp.onreadystatechange = function (aEvt) {
    if (xmlhttp.readyState == 4) {
       if(xmlhttp.status == 200)
       {
        if (xmlhttp.responseText==1)   $resultados.textContent = "foto subida correctamente";
        if (xmlhttp.responseText==0)    $resultados.textContent = "Error no se pudo subir la foto";
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
 };	
 FR.readAsDataURL( input.files[0] );
 }	
}	
 $(document).ready(function(){
 $("#font").change(function(){	readFont( this );	});	});

 f.addEventListener('click', function(ev){
 ev.preventDefault();
 fotoss();
 
   }, false);

   al.addEventListener('click', function(ev){
    ev.preventDefault();
    falbum();
  }, false);

  ap.addEventListener('click', function(ev){
    ev.preventDefault();
    fotosaparece();
  }, false);


function falbum() {
  var ruta="https://g33v88byzb.execute-api.us-east-1.amazonaws.com/practica1/categoria";
let xmlhttp = new XMLHttpRequest(); 
xmlhttp.open("POST", ruta,true);
xmlhttp.setRequestHeader("Content-Type", "application/json"); 
let obj = {"user":use};
let jsonData = JSON.stringify(obj);
xmlhttp.onreadystatechange = function (aEvt) {
  var i=0;
  var categ= new Array();

  if (xmlhttp.readyState == 4) {
     if(xmlhttp.status == 200)
     {
      var data = JSON.parse(this.responseText);
      
      var datos = (Object.values(Object.values(data)[0]));   
      var cantidad=datos.length;
      var i,j,k,l,m;
      var si="";
      var cadena="<div class=\"tab\">";
      var cadena1="";
      var contador=0;
      k=0;
      for (var i = 0; i < cantidad; i++) {
        var c=datos[i].categoria;
        console.log(datos[i]);
        for (var j = 0; j < i; j++) {
          if(c==categ[j]){
            si="si";
          }
      }
      if(si=="si"){
        si="";
      }else{
       cadena+="<button class=\"tablinks\" onclick=\"openCity(event, '"+c+"')\">"+"<h2>"+c+"</h2></button>";
       categ[k]=c;
        k=k+1;
      }
  
    }

    for (var m = 0; m < k; m++) {
      cadena1+="<div id=\""+categ[m]+"\" class=\"tabcontent\"> <table><tr>";
      for (var l = 0; l < cantidad; l++) {
        var c=datos[l].categoria;
        if(c==categ[m]){
          cadena1+="<td>"+"<img id=\"mover\" src=\""+datos[l].foto+"\" width=\"200\" height=\"200\">"+"</td>"      
          contador=contador+1;
         if(contador==3){
           cadena1+="</tr><tr>"
           contador=0;
         }
         }
    }
    cadena1+="</tr></table></div>"    
  }
    console.log(cadena1);
    cadena+=cadena1;
    document.getElementById("fot").innerHTML =cadena;
   
    
   


    //comenzamos a ponerlo en la cosa de la pagina

//termina      
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


function fotosaparece() {
  var ruta="https://g33v88byzb.execute-api.us-east-1.amazonaws.com/practica1/aparesco";
let xmlhttp = new XMLHttpRequest(); 
xmlhttp.open("POST", ruta,true);
xmlhttp.setRequestHeader("Content-Type", "application/json"); 
let obj = {"user":use};
let jsonData = JSON.stringify(obj);
xmlhttp.onreadystatechange = function (aEvt) {
  var i=0;
  if (xmlhttp.readyState == 4) {
     if(xmlhttp.status == 200)
     {
      var data = JSON.parse(this.responseText);
      console.log(data);
      var datos = (Object.values(Object.values(data)[0]));
      var cantidad=datos.length;
      var i;    
      var cadena="<h3>Fotos en las que apareces: "+use +" </h3><table><tr>";
       var contador=0;
      // var datos = (Object.values(Object.values(myJson)[1]));
           
      for (var i = 0; i < cantidad; i++) {
        console.log("...foto "+i);
        cadena+="<td>"+"<img id=\"mover\" src=\""+datos[i].foto+"\" width=\"200\" height=\"200\" \">"+"</td>"
        contador=contador+1;
        if(contador==4){
          cadena+="</tr><tr>"
          contador=0;
        }

    }
    console.log(cantidad);
    cadena+="</tr></table>"
    document.getElementById("fot").innerHTML =cadena;
    //comenzamos a ponerlo en la cosa de la pagina

//termina      
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

function openCity(evt, cityName) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}