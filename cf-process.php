<?
$to = "kra4kas@gmail.com";
$subject = $subject;
$message = $message;
$from = $email;
$headers  = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=utf-8' . "\r\n";
$headers .= "From: <".$from.">\r\n";

if (mail($to,$subject,$message,$headers)) {
	echo "OK";
}
else {
	echo "ERROR";
}?>
