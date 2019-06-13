<?php
  include("database/Db_connection.php");
  header('Content-type: application/json;');

  $response_array['title'] = 'YNC DeliveryTracker';
  $user_id = '';
  if(!empty($_POST['user_id']))
      $user_id = $_POST['user_id'];

  $readTracking_query="select * from tracking_items WHERE user_id='$user_id'";
  $res = mysqli_query($dbcon,$readTracking_query);
  if(mysqli_num_rows($res)>0)
  {
    $response_array["detail"] = array();
    $response_array['status'] = 'success';
    while($row = mysqli_fetch_array($res))
    {
      array_push($response_array["detail"], array('no'=>$row[0],'company'=>$row[3],'invoice'=>$row[4],'memo'=>$row[5]));
    }
    echo json_encode($response_array);
    exit();
  }
  else
  {
    $response_array['status'] = 'error';
      echo json_encode($response_array);
      exit();
  }

?>
