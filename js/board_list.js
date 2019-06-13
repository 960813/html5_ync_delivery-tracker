$(document).ready(function(){
  $.get('../php/CheckLogin.php', function(data) {
    var _grade = data["user_grade"];
    if (_grade == "admin") {
      $(".content-navigation").append('<input type="button" class="writenotice_btn btn_blue" value="글쓰기">');
      $(".writenotice_btn").click(function(){
        window.location.replace("//delivery.foretion.com/pages/board_editor.html");
      });
    }
  });

  $.get('../php/read_boardlist_all.php', function(data) {
    var _status = data["status"];
    if (_status == "success") {
      $(data["detail"]).each(function(index, value) {
        $(".notice-table table tbody").append('<tr></tr>');
        $(".notice-table table tbody tr:last-child").append('<td><p>'+value["no"]+'</p></td>');
        $(".notice-table table tbody tr:last-child").append('<td><p>'+value["title"]+'</p></td>');
        $(".notice-table table tbody tr:last-child").append('<td><p>'+value["author"]+'</p></td>');
        $(".notice-table table tbody tr:last-child").append('<td><p>'+value["date"]+'</p></td>');

        $(".notice-table table tbody tr:last-child td").click(function(event) {
            viewboard(value["no"]);
        });

      });
    } else {

    }
  });

});

function viewboard(cno) {
  window.location.href = "//delivery.foretion.com/pages/board_view.html?cno=" + cno;
}
