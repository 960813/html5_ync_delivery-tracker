$(document).ready(function() {
  $.get('../php/CheckLogin.php', function(data) {
    var _status = data["status"];
    var _gnb = $(".area_menu_group li:nth-of-type(2)");
    if (_status == "logined") {
      _gnb.append('<a href="//delivery.foretion.com/php/Logout.php" title="로그아웃 페이지로 이동">로그아웃</a>');
    } else if (_status == "logouted") {
      _gnb.append('<a href="//delivery.foretion.com/pages/login_signup.html" title="로그인 페이지로 이동">로그인/회원가입</a>');
    }
  });
});
