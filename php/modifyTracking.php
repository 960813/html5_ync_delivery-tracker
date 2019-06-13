<?php
  include("database/Db_connection.php");
  header('Content-type: application/json;');
  $response_array['title'] = 'YNC DeliveryTracker';
  $cno = '';
  $memo = '';

  if(!empty($_POST['cno']))
      $cno = $_POST['cno'];
  if(!empty($_POST['memo']))
      $memo = $_POST['memo'];

  $update_tracking = "update tracking_items SET memo='".$memo."' where no=".$cno;
  if(mysqli_query($dbcon,$update_tracking))
  {
      $response_array['status'] = "success";
  }else{
    $response_array['status'] = "error";
  }
  echo json_encode($response_array);

?>
