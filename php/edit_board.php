<?php
  include("database/Db_connection.php");
  header('Content-type: application/json;');

  $response_array['title'] = 'YNC DeliveryTracker';

  $cno = '';
  $title = '';
  $content = '';

  if(!empty($_POST['cno']))
      $cno = $_POST['cno'];
  if(!empty($_POST['title']))
      $title = $_POST['title'];
  if(!empty($_POST['content']))
      $content = $_POST['content'];




  $viewnotice_query="update notice_list SET title='".$title."',content='".$content."' where no=".$cno;
  if(mysqli_query($dbcon,$viewnotice_query))
  {
    $response_array["cno"] = $cno;
    $response_array['status'] = 'success';
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
