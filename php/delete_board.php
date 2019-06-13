<?php
  include("database/Db_connection.php");
  header('Content-type: application/json;');
  $response_array['title'] = 'YNC DeliveryTracker';
  $cno = '';

  if(!empty($_POST['cno']))
      $cno = $_POST['cno'];
  $delete_board_query = "delete from notice_list where no=".$cno;
  if(mysqli_query($dbcon,$delete_board_query))
  {
      $response_array['status'] = "success";
  }else{
    $response_array['status'] = "error";
  }
  echo json_encode($response_array);
?>
