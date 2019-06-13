<?php
  include("database/Db_connection.php");
  header('Content-type: application/json;');

  $response_array['title'] = 'YNC DeliveryTracker';

  $user_id = '';
  $user_pw = '';
  if(!empty($_POST['user_id']))
      $user_id = $_POST['user_id'];
  if(!empty($_POST['user_pw']))
      $user_pw = $_POST['user_pw'];

  $pw_salt = "ync-deliverytracker_";
  $user_pw = hash("sha256", $pw_salt . $user_pw);

  $check_user_query="select * from users WHERE user_id='$user_id'";
  if(mysqli_num_rows(mysqli_query($dbcon,$check_user_query))<=0)
  {
      $response_array['status'] = 'nouser';
      echo json_encode($response_array);
      exit();
  }
  $check_user="select * from users WHERE user_id='$user_id' AND user_pw='$user_pw'";
  $res = mysqli_query($dbcon,$check_user);
  if(mysqli_num_rows($res)>0)
  {
    $response_array['status'] = 'success';
    session_start();
    $_SESSION["ydt_user_id"] = $user_id;
    $_SESSION["ydt_user_grade"] = mysqli_fetch_array($res)["grade"];
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
