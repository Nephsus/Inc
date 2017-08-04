<%@taglib prefix="core" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>

<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>INC | Login</title>

    <link href="assets/css/bootstrap/bootstrap.min.css" rel="stylesheet">
    <link href="assets/css/font-awesome/css/font-awesome.css" rel="stylesheet">
    <link href="assets/css/animate.css" rel="stylesheet">
    <link href="assets/css/style.css" rel="stylesheet">
    <!-- Mainly scripts -->
    <script type="text/javascript" src="assets/js/jquery-2.1.1.js"></script>
    <script type="text/javascript" src="assets/js/bootstrap/bootstrap.min.js"></script>
</head>

<body class="gray-bg">

    <div class="middle-box text-center loginscreen animated fadeInDown">
        <div>
            <div>

                <h1 class="logo-name">INC</h1>

            </div>
            <h3>Bienvenido a INC</h3>
            <p>Centro de Administración de Itecban.
            </p>
            <p>Inserte su código de empleado y contraseña.</p>
            <form class="m-t" role="form" action="/inc/j_security_check" method="POST">
            	<input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}"/>
                <div class="form-group">
                    <input type="text"  name="username" class="form-control" placeholder="Código" required="">
                </div>
                <div class="form-group">
                    <input type="password" name="password" class="form-control" placeholder="Contraseña" required="">
                </div>
                <button type="submit" class="btn btn-primary block full-width m-b">Login</button>
            </form>
            <p class="m-t"> <small>INC Itecban Notification Center &copy; 2017</small> </p>
        </div>
    </div>



</body>

</html>
