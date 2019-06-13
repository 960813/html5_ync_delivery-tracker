<?php
  include("database/Db_connection.php");
  header('Content-type: application/json;');


  $response_array['title'] = 'YNC DeliveryTracker';
  $title = '';
  $content = '';
  session_start();
  $author = $_SESSION["ydt_user_id"];

  if(!empty($_POST['title']))
      $title = $_POST['title'];
  if(!empty($_POST['content']))
      $content = $_POST['content'];

  if($author=="")
  {
    $response_array['status'] = "logouted";
    echo json_encode($response_array);
    exit();
  }

  $insert_user="insert into notice_list (title,content,author) VALUE ('$title','$content','$author')";
  if(mysqli_query($dbcon,$insert_user))
  {
      $response_array['status'] = "success";
      echo json_encode($response_array);
      exit();
  }
?>
