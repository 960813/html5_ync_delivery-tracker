<?php
  include("database/Db_connection.php");
  header('Content-type: application/json;');


  $response_array['title'] = 'YNC DeliveryTracker';
  $user_id = '';
  $user_pw = '';
  $user_pw2 = '';
  $user_email = '';

  if(!empty($_POST['user_id']))
      $user_id = $_POST['user_id'];
  if(!empty($_POST['user_pw']))
      $user_pw = $_POST['user_pw'];
  if(!empty($_POST['user_pw2']))
      $user_pw2 = $_POST['user_pw2'];
  if(!empty($_POST['user_email']))
      $user_email = $_POST['user_email'];

  $pw_salt = 'ync-deliverytracker_';
  $user_pw = hash('sha256',$pw_salt . $user_pw);

  $response_array['pw'] = $user_pw;

  $check_user_query="select * from users WHERE user_id='$user_id'";
  $run_query=mysqli_query($dbcon,$check_user_query);

  if(mysqli_num_rows($run_query)>0)
  {
      $response_array['status'] = "exist";
      echo json_encode($response_array);
      exit();
  }

  $insert_user="insert into users (user_id,user_pw,user_email,grade) VALUE ('$user_id','$user_pw','$user_email','normal')";
  if(mysqli_query($dbcon,$insert_user))
  {
      $response_array['status'] = "success";
  }
  echo json_encode($response_array);
?>
