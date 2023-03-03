<?php
try {
    sleep(5);
    $auth = $_POST['login'];
    $pass = $_POST['pass'];

    if ($auth == null || $pass == null) {
        echo "Need login and password";
        throw new ErrorException("Need login and password");
    }

    $login = filter_var(
        trim($_POST['login']),
        FILTER_SANITIZE_STRING
    );
    $pass = filter_var(
        trim($_POST['pass']),
        FILTER_SANITIZE_STRING
    );

    try {
        $pass = md5($pass . "sol");

        $mysql = new mysqli('localhost', 'root', 'root', 'register-bd');


        $result = $mysql->query("SELECT * FROM `users` WHERE `login` = '$login' AND `pass` = '$pass'");
        $user = $result->fetch_assoc();
        if (count($user) == 0) {
            echo "Такой пользователь не найден";
            throw new ErrorException("Такой пользователь не найден");
        }
    } catch (Error $e) {
        echo "Такой пользователь не найден";
        throw new ErrorException("Такой пользователь не найден");
    }


    //setcookie('user', $user['name'], time() + 3600, "/");


    $mysql->close();

    echo $user['name'];

    return json_encode($user['name']);

    //header('Location: /');

} catch (Error $e) {
    echo 'Caught exception: ', $e->getMessage(), "\n";
}

?>