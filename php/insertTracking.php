<?php
  include("database/Db_connection.php");
  header('Content-type: application/json;');
  $response_array['title'] = 'YNC DeliveryTracker';
  $user_id = '';
  $company_name = '';
  $invoice = '';

  if(!empty($_POST['user_id']))
      $user_id = $_POST['user_id'];
  if(!empty($_POST['company_name']))
      $company_name = $_POST['company_name'];
  if(!empty($_POST['invoice']))
      $invoice = $_POST['invoice'];

  $check_user_query="select * from tracking_items WHERE user_id='$user_id' AND invoice='$invoice'";
  $run_query=mysqli_query($dbcon,$check_user_query);

  if(mysqli_num_rows($run_query)>0)
  {
      $response_array['status'] = "exist";
      echo json_encode($response_array);
      exit();
  }

  $insert_tracking="insert into tracking_items (user_id,company_name,invoice) VALUE ('$user_id','$company_name','$invoice')";
  if(mysqli_query($dbcon,$insert_tracking))
  {
      $response_array['status'] = "success";
  }
  echo json_encode($response_array);

?>
