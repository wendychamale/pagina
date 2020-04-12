'use strict'

var extension="";
var base="";
var nombre="";
var numero=Math.floor((999-4)*Math.random()) + 1;
var remplazo="";

(function() {  
  var streaming = false,
      video        = document.querySelector('#video'),
      canvas       = document.querySelector('#canvas'),
      photo        = document.querySelector('#photo'),
      startbutton  = document.querySelector('#startbutton'),
      width = 320,
      height = 0;

  navigator.getMedia = ( navigator.getUserMedia ||
                         navigator.webkitGetUserMedia ||
                         navigator.mozGetUserMedia ||
                         navigator.msGetUserMedia);

  navigator.getMedia(
    {
      video: true,
      audio: false
    },
    function(stream) {
      if (navigator.mozGetUserMedia) {
        video.mozSrcObject = stream;
      } else {
     //   var vendorURL = window.URL || window.webkitURL;
      //  video.src = vendorURL.createObjectURL(stream);  
	  video.srcObject=stream;
      video.play();	
      }
    },
    function(err) {
      console.log("Ocurrio un error " + err);
    }
  );

  video.addEventListener('canplay', function(ev){
    if (!streaming) {
      height = video.videoHeight / (video.videoWidth/width);
      video.setAttribute('width', width);
      video.setAttribute('height', height);
      canvas.setAttribute('width', width);
      canvas.setAttribute('height', height);
      streaming = true;
    }
  }, false);

  function takepicture() {
    canvas.width = width;
    canvas.height = height;
    canvas.getContext('2d').drawImage(video, 0, 0, width, height);
	
  var data = canvas.toDataURL('image/png');
  nombre="foto_";
  nombre+=Math.floor((999-4)*Math.random()) + 1;;
  extension="png";
  base=data;
  remplazo="data:image/"+extension+";base64,";
base = base.replace(remplazo,"");
 // document.write(base);
  photo.setAttribute('src', data);
  }
  startbutton.addEventListener('click', function(ev){
      takepicture();
    ev.preventDefault();
  }, false);

})();
var remplazo1="";
function readFont(input) {
 if ( input.files && input.files[0] ) {
 var FR= new FileReader();	FR.onload = function(e) {
 $('#base64font').val( e.target.result);
 var nombre1=document.getElementById("font").files[0].name;
 var path_splitted = nombre1.split('.');
 var numero=Math.floor((999-4)*Math.random())+1;
 nombre=path_splitted[0]+numero;
 numero="";
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

 };	
 FR.readAsDataURL( input.files[0] );
 }	}	
 $(document).ready(function(){
 $("#font").change(function(){	readFont( this );	});	});
 
ingreso.addEventListener('click', function(ev){
 var us=document.getElementById("user").value;
 var con=document.getElementById("contra").value;
 var $resultados = document.querySelector("#confirmado");
ev.preventDefault();
var ruta="";
var si="";
if(!nombre && !base && !extension && us && con ){
  ruta="http://34.205.17.131:3000/login"
  console.log("login sin foto");
  si="si";
}else if(nombre && base && extension && us){
  ruta="http://34.205.17.131:3000/login_facial"
  console.log("login facial");
  si="si";
}else{
  console.log("ningun login");
}

var vjson = { name: nombre,base64:base,extension:extension,user:us, password:con};
console.log(vjson);

if(si){
  let xmlhttp = new XMLHttpRequest(); 
  xmlhttp.open("POST", ruta,true);
  xmlhttp.setRequestHeader("Content-Type", "application/json"); 
  let obj = {"name":nombre,"base64":base,"extension":extension,"user":us,"password":con};
  let jsonData = JSON.stringify(obj);
  xmlhttp.onreadystatechange = function (aEvt) {
    if (xmlhttp.readyState == 4) {
       if(xmlhttp.status == 200)
       {
        if (xmlhttp.responseText==1)  {
          $resultados.textContent = "" ; document.location.href="home.html?"+us;
        }
        if (xmlhttp.responseText==0)   {
         $resultados.textContent = "usuario o password incorrecto";
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


  }, false);
  
  ;//funcion para colocar la imagen

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
  
  
  
