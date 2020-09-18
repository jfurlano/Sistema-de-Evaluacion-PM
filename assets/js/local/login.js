var UrlApi = "http://localhost:53207/API/" // cambiar puerto de nuestra API 


function InicioDeSesion() {
    var email = $("#TxtEmail").val();
    var password = $("#TxtPassword").val();

    if(email == "" || password == "")
    {
        myNotification.showNotification('fas fa-heart-broken', 'danger', 'OOOPS !', 'Porfavor Llenar Todos Los Campos');
    }else
    {
       var settings = {
        "url": UrlApi + "InicioDeSesion",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({
            "TxtEmail": $("#TxtEmail").val(),
            "TxtPassword": $("#TxtPassword").val()
        }),
    };

    $.ajax(settings).done(function(response) {

        $.each(response, function(index, data) {
            if (data.IntResultado > 0) {
                sessionStorage.setItem('token', data.TxtToken);
                var token = sessionStorage.getItem('token');
                setTimeout(function() {
                    myNotification.showNotification('fas fa-smile', 'info', 'Bienvenido !', 'Token: ' + token);
                }, 2000);
                //alert("Valor en variable de sesion es: " + token);
                window.location.href = "./src/dashboard.php";
            } else {
                /*var alerta = document.getElementById("alerta");
                alerta.classList.remove("d-none");
                alerta.innerHTML = "<strong>Oops! </strong>" + data.TxtToken + "<button type='button' class='close' data-dismiss='alert' aria-label='Close'>"
                +"<span aria-hidden='true'>&times;</span></button>";*/
                myNotification.showNotification('fas fa-heart-broken', 'danger', 'OOOPS !', 'Usuario o Contraseña invalida.');
            }
        });
    });
}
}