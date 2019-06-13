$(document).ready(function() {
  var url_params = getJsonFromUrl();
  var _cno = url_params["cno"];
  var post_data = {
    "cno":_cno
  };

  $.post('../php/view_board.php', post_data, function(data) {
    var article = data["detail"][0];
    $(".board-view header").append(article["title"]);
    $(".board-view article").append(article["content"]);
  });

  $.get('../php/CheckLogin.php', function(data) {
    var _grade = data["user_grade"];
    if (_grade == "admin") {
      var _href = "'//delivery.foretion.com/pages/board_editor.html'";
      $(".centerArea").append('<input type="button" class="board_btn btn_blue" onclick="location.href=' + _href + '" value="글쓰기">');
      $(".centerArea").append('<input type="button" id="delete_btn" class="board_btn btn_gray" value="삭제">');
      $(".centerArea").append('<input type="button" id="modify_btn" class="board_btn btn_gray" value="수정">');

      $("#modify_btn").click(function(){
        var _cno = getJsonFromUrl()["cno"];
        window.location.href="//delivery.foretion.com/pages/board_editor.html?cno="+_cno;
      });

      $("#delete_btn").click(function(){
        var confirm_msg = '';
        confirm_msg += "정말로 삭제하시겠습니까?";

        if (confirm(confirm_msg)) {
          var _cno = getJsonFromUrl()["cno"];
          var post_data = {
            "cno": _cno
          };
          $.post('../php/delete_board.php', post_data, function(deleteTracking) {
            if (deleteTracking["status"] == "success") {
              window.location.href="//delivery.foretion.com/pages/board_list.html";
            }
          });
        } else {
          // false
        }
      });

    }
  });



})

function getJsonFromUrl() {
  var query = location.search.substr(1);
  var result = {};
  query.split("&").forEach(function(part) {
    var item = part.split("=");
    result[item[0]] = decodeURIComponent(item[1]);
  });
  return result;
}
