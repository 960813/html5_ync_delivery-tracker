$(document).ready(function() {
  $.get('../php/CheckLogin.php', function(data) {
    var _status = data["status"];
    if (_status == "logined") {
      var user_id = data["user_id"];

    } else {
      alert("공지사항 작성 권한이 없습니다.");
      window.location.replace("//delivery.foretion.com/pages/login_signup.html");
    }
  });
  var _cno = getJsonFromUrl()["cno"];
  if (_cno != null) {
    var post_data = {
      "cno": _cno
    };
    $.post('../php/view_board.php', post_data, function(data) {
      var article = data["detail"][0];
      $("#notice_title").val(article["title"]);
      $("#notice_content").html(article["content"]);

    });
  }
  $(".writeboard_btn").click(function() {
    var _cno = getJsonFromUrl()["cno"];
    oEditors.getById["notice_content"].exec("UPDATE_CONTENTS_FIELD", []);
    var title = $("#notice_title");
    var content = $("#notice_content");
    if (title.val() == "") {
      alert("제목을 입력해주세요");
      title.focus();
      return false;
    }
    if (content.val() == "<p><br></p>") {
      alert("내용을 입력해주세요");
      return false;
    }

    if (_cno == null) {
      var post_data = {
        "title": title.val(),
        "content": content.val()
      };
      $.post('../php/write_board.php', post_data, function(data) {
        if (data["status"] == "success") {
          window.location.href = "//delivery.foretion.com/pages/board_list.html";
        }
      });
    } else {
      var post_data = {
        "cno": _cno,
        "title": title.val(),
        "content": content.val()
      };
      $.post('../php/edit_board.php', post_data, function(data) {
        if (data["status"] == "success") {
          window.location.href = "//delivery.foretion.com/pages/board_view.html?cno=" + _cno;
        }
      });
    }
  });

  $(".cancel_btn").click(function() {
    var _cno = getJsonFromUrl()["cno"];
    console.log(_cno);
    if (_cno == null) {
      window.location.href = "//delivery.foretion.com/pages/board_list.html";
    } else {
      window.location.href = "//delivery.foretion.com/pages/board_view.html?cno=" + _cno;
    }
  });

});

function getJsonFromUrl() {
  var query = location.search.substr(1);
  var result = {};
  query.split("&").forEach(function(part) {
    var item = part.split("=");
    result[item[0]] = decodeURIComponent(item[1]);
  });
  return result;
}
