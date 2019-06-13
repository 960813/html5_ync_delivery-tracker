$(document).ready(function() {
  $.get('../php/CheckLogin.php', function(data) {
    var _status = data["status"];
    var login_section = $(".top_login_section span");
    if (_status == "logined") {
      var user_id = data["user_id"];
      login_section.append('<p><b>' + user_id + '</b>님, 안녕하세요.</p>');
      login_section.append('<a href="//delivery.foretion.com/php/Logout.php">로그아웃</a>');
    } else {
      login_section.append('<p>배송정보를 지속적으로 추적하고 관리하세요.</p>');
      login_section.append('<a href="//delivery.foretion.com/pages/login_signup.html">로그인</a>');
    }
  });

  $.get('../php/read_boardlist.php', function(data) {
    var _status = data["status"];
    if (_status == "success") {
      $(data["detail"]).each(function(index, value) {
        $(".bottom_notice table").append('<tr></tr>');
        $(".bottom_notice table tr:nth-child(" + (index+1) + ") td:nth-child(1)").append('<a href="//delivery.foretion.com/pages/board_view.html?cno='+value["no"]+'">'+value["title"]+'</a>');

        var _date = new Date(value["date"].replace(" ","T"));
	var notice_date = _date.getFullYear() + '-' + number_padding(_date.getMonth()+1,2) + '-' + number_padding(_date.getDate(),2);
        $(".bottom_notice table tr:nth-child(" + (index+1) + ") td:nth-child(2)").append(notice_date);
      });
    } else {

    }
  });
});

function number_padding(n, width) {
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
}
