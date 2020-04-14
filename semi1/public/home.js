var extension="";
var base="";
var nombre="";
var us="";
var id;
var remplazo1="";
var use1=location.search.substring(1,location.search.length);
var use2=use1.split("=");
var use=use2[0];
var url=use2[1];
$(window).load(function(){
    use = use.replace("%20"," ");
    var $resultados = document.querySelector("#nuser");
    $resultados.textContent="usuario: "+use;

    document.getElementById("us").src=url;

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
  obtenerpublicaciones();

  
});

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


    
ver.addEventListener('click', function(ev){
    ev.preventDefault();
    document.location.href="verperfil.html?"+use;
  }, false);



  function obtenerpublicaciones() {
    var ruta="http://3.133.105.35:3000/obtener_publicaciones";
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
          console.log(datos);
          var cantidad=data.length;
          console.log(cantidad);
          var amigos= new Array();
          var si="";
          var cadena=" <ul class=\"list-group list-group-flush\">  <li class=\"list-group-item\">Amigos</li>";
          var cadena1="<table><tr><td></td>";
          var i,j,k;
          k=0;
        
          for (i = 0; i < cantidad; i++) {
            var c=data[i].usuario;
                amigos[i]=c;
                var p=data[i].publicacion;
                var fecha=data[i].fecha;
                var u=data[i].usuario;
                var im=data[i].imagen_url;
                var f=data[i].foto_url;
            for (var j = 0; j < i; j++) {
                if(c==amigos[j]){
                  si="si";
                }
            }
            cadena1+="<td><div class=\"card\" style=\"width: 18rem; color: rgb(4, 48, 194); background: #ffffff;\"> "
            +"<ul class=\"list-group list-group-flush\" >"
            +"<li class=\"list-group-item\">"+u+"<img src=\""+f+"\"  height=\"50px\"  width=\"50px\"></li>  </ul>"+
            "<h5 class=\"card-title\" style=\"  color: rebeccapurple;\">"+fecha+"</h5>";
            if(p!="null"){
            cadena1+= "<div class=\"card-body\" style=\"  color: black;\">"+
            "<p class=\"card-text\">"+p+"</p> </div>";
            }
            if(im!="null"){
             cadena1+="<img src=\""+im+"\" class=\"card-img-top\"  >";
            }
            
          cadena1+= "</td> </tr> <tr><td></td>";
            if(si=="si"){
              si="";
            }else{
             cadena+="     <li class=\"list-group-item\">" +c+"</li>";
             categ[k]=c;
              k=k+1;
            }

        }
    cadena+="</ul>";
    cadena1+="</tr></table>";
    document.getElementById("amigos").innerHTML =cadena;
    document.getElementById("publicar").innerHTML =cadena1;


        }     
  else
  {
   console.log("Error loading page\n");
  }
  }
  };
  xmlhttp.send(jsonData);
  }


enviar.addEventListener('click', function(ev){
   var texto=document.getElementById("texto").value;
   var $resultados = document.querySelector("#confirmado");
  ev.preventDefault();
  if((nombre && base && extension) || texto){
    $resultados.textContent = "subiendo publicacion....";
    var ruta="";
  var si="";
  if(!nombre && !base && !extension && texto ){
    ruta="http://3.133.105.35:3000/publicacion_texto"
    console.log("publicacion sin foto");
    si="si";
  }else if(nombre && base && extension && !texto){
    ruta="http://3.133.105.35:3000/publicacion_imagen"
    console.log("publicacion con foto");
    si="si";
  }else{
    ruta="http://3.133.105.35:3000/publicacion"
    console.log("publicacion completa");
    si="si";
  }
  if(si){
  let xmlhttp = new XMLHttpRequest(); 
    xmlhttp.open("POST", ruta,true);
    xmlhttp.setRequestHeader("Content-Type", "application/json"); 
    let obj = {"user":use,"publicacion":texto,"name":nombre,"extension":extension,"base64":base};
    let jsonData = JSON.stringify(obj);
      
  console.log(jsonData);
    xmlhttp.onreadystatechange = function (aEvt) {
      if (xmlhttp.readyState == 4) {
         if(xmlhttp.status == 200)
         {
          if (xmlhttp.responseText==1)   $resultados.textContent = "publicacion exitosa";
          if (xmlhttp.responseText==0) $resultados.textContent = "erro publicacion no se hizo";
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
    $resultados.textContent = "no puede hacer una publicacion vacia";
  }
    }, false);