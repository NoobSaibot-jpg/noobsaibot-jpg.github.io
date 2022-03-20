<?php

$name = $_POST["name"];
$email = $_POST["email"];
$message = $_POST["message"];
$subject = $_POST["subject"];
$receiver = $_POST["receiver"];
$header = "MIME-Version: 1.0\r\n"; 
$header .= "Content-Type: text/plain; charset=utf-8\r\n"; 
$header .= "X-Priority: 1\r\n";
$header .= "From: ${$email}\r\n";

if($name != '' && $email != '' && filter_var($email, FILTER_VALIDATE_EMAIL) && $subject != '' && $message != ''){
	$body = "";
	$body .= "Name: ";
	$body .= $name;
	$body .= "\n";
	$body .= "Email: ";
	$body .= $email;
	$body .= "\n";
	$body .= "Subject: ";
	$body .= $subject;
	$body .= "\n";
	$body .= "Message: \n\n";
	$body .= $message;

	$success = mail($receiver, $subject, $body, $header);

	if ($success){
		echo 'success';
	}else{
		echo 'error';
	}
}else{
	echo 'error';
}

?>
