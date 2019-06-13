<?php
  $to = "delivery@foretion.com";
  $subject = "[".$_POST['contact-type-list']."]안녕하세요.".$_POST['contact-customer-name']."입니다.";
  $contents = $_POST['contact-customer-body'];
  $headers = 'MIME-Version: 1.0'."\r\n";
  $headers = 'Content-Type: text/html; charset=utf-8'."\r\n";
  $headers .= "From: ".$_POST['contact-customer-email']."\r\n";

  mail($to, $subject, $contents, $headers);
?>
