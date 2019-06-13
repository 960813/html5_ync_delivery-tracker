<?php
  include("database/Db_connection.php");
  header('Content-type: application/json;');

  $response_array['title'] = 'YNC DeliveryTracker';

  $cno = '';

  if(!empty($_POST['cno']))
      $cno = $_POST['cno'];


  $viewnotice_query="select * from notice_list where no=".$cno;
  $res = mysqli_query($dbcon,$viewnotice_query);
  if(mysqli_num_rows($res)>0)
  {
    $response_array["detail"] = array();
    $response_array['status'] = 'success';
    while($row = mysqli_fetch_array($res))
    {
      array_push($response_array["detail"], array('no'=>$row[0],'title'=>$row[1],'content'=>$row[2],'author'=>$row[3],'date'=>$row[4]));
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
