<?php

    include('./library/conn.php');

    $username = $_REQUEST['user'];
    $password = $_REQUEST['password'];

    $sql = "select * from users where username='$username' and password='$password'";

    $result = $mysqli->query($sql);

    $mysqli->close();

    if($result->num_rows>0){

        $row = $result->fetch_assoc(); 

        setcookie('username',$row['username'],time()+3600*24,'/');
        setcookie('isLogined','true',time()+3600*24,'/');

        echo '<script>alert("登陆成功")</script>';
        echo '<script>location.href="../src/html/mi_home-page.html"</script>';
    }else{
        echo '<script>alert("用户名或密码错误")</script>';
        echo '<script>location.href="../src/html/mi_login.html"</script>';
    }
?>