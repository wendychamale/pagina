'use strict'

//logueo 
ingreso.addEventListener('click', function(ev){
    var us=document.getElementById("user").value;
    var con=document.getElementById("contra").value;
    var $resultados = document.querySelector("#confirmado");
   ev.preventDefault();
  // if(con==conc){
     $resultados.textContent = "confirmado creando usuario..."+us+con;
     
     //peticion login
    
     console.log("login");

    let xmlhttp = new XMLHttpRequest(); 
<<<<<<< HEAD
     xmlhttp.open("POST", "http://3.16.38.99:3000/login");
=======
     xmlhttp.open("POST", "http://10.0.2.66:3000/login");
>>>>>>> 358b40fe4efeb04e77c82c4121b1f70bff518e96
     xmlhttp.setRequestHeader("Content-Type", "application/json"); 
     let obj = {"user":us,"password":con};
     let jsonData = JSON.stringify(obj);
     xmlhttp.onreadystatechange = function (aEvt) {
       if (xmlhttp.readyState == 4) {
          if(xmlhttp.status == 200)
          {
            var data = JSON.parse(this.responseText); 
            console.log(data); 
         if(data!=0){
          document.location.href="home.html?"+us+"="+data[0].foto_url;
         }else{
          $resultados.textContent = "Error usuario o contraseña incorrecta";
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
     }, false);
  
  
