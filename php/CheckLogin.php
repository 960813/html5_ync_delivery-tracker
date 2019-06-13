<?php
  header('Content-type: application/json;');
  $response_array['title'] = 'YNC DeliveryTracker';

  session_start();
  if(isset($_SESSION["ydt_user_id"])) {
    $response_array['status'] = 'logined';
    session_start();
    $response_array['user_id'] = $_SESSION["ydt_user_id"];
    $response_array['user_grade'] = $_SESSION["ydt_user_grade"];
    echo json_encode($response_array);
    exit();
  }else{
    $response_array['status'] = 'logouted';
    echo json_encode($response_array);
    exit();
  }
?>
