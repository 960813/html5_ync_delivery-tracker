var api_key = 'VFfugJ81dgL3wdDYensFVw';
$(document).ready(function() {
  var company_dic = {}
  $.ajax({
    type: "GET",
    dataType: "json",
    data: {
      t_key: api_key
    },
    url: "https://info.sweettracker.co.kr/api/v1/companylist",
    success: function(data) {
      $.each(data.Company, function(index, item) {
        company_dic[item["Name"]] = item["Code"];
      });
    }
  });

  $.get('../php/CheckLogin.php', function(data) {
    var _status = data["status"];
    if (_status == "logined") {
      var post_data = {
        "user_id": data["user_id"]
      };
      $.post('../php/readTracking.php', post_data, function(readTracking) {
        var _status = readTracking["status"];
        if (_status == "success") {
          var _tbody = $(".tracking-table table tbody");
          $(readTracking["detail"]).each(function(index, value) {
            _tbody.append("<tr id='" + value["no"] + "'></tr>");
            //_tbody.append("<tr id='" + value["no"] + "'></tr>");
            var _last_tr = $(".tracking-table table tbody tr:last-child");
            _last_tr.append('<td>' + (index + 1) + '</td>');
            _last_tr.append('<td>' + value["company"] + '</td>');
            _last_tr.append('<td>' + value["invoice"] + '</td>');
            _last_tr.append('<td class="edit_off">' + value["memo"] + '</td>');
            _last_tr.append('<td><input type="button" class="modify_btn" value="수정" onclick="modify_tracking(' + value["no"] + ');"><input type="button" class="delete_btn" value="삭제" onclick="delete_tracking(' + value["no"] + ');"></td>');
            $(".tracking-table table tbody tr:last-child td").click(function(event) {
              var tgName = event.target.tagName;
              if (tgName != "INPUT") {
                popup_tracking(company_dic[value["company"]], value["invoice"]);
              } else {
                //수정/삭제 버튼 클릭
              }
            });
          });
        }
      });

    } else {
      alert("마이페이지는 회원 로그인을 해야 이용할 수 있는 서비스입니다.");
      window.location.replace("//delivery.foretion.com/pages/login_signup.html");
    }
  });
});

function number_padding(n, width) {
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
}

function popup_tracking(c_code, c_invoice) {
  window.open("//delivery.foretion.com/pages/tracker_popup.html?c_code=" + number_padding(c_code, 2) + "&c_invoice=" + c_invoice, "popup_tracking", "width=600,height=750");
}

function modify_tracking(cno) {
  var c_memo = $(".tracking-table table tbody tr#" + cno + " td:nth-child(4)");
  var c_btn = $(".tracking-table table tbody tr#" + cno + " td:nth-child(5) .modify_btn");
  if (c_memo.attr("class") == "edit_off") {
    c_memo.html('<input id="tmp_contents" type="text" value="' + c_memo.html() + '">');
    c_btn.val('저장');
    c_memo.removeClass("edit_off");
    c_memo.addClass("edit_on");
  } else {
    c_memo.html($("#tmp_contents").val());
    c_btn.val('수정');
    c_memo.removeClass("edit_on");
    c_memo.addClass("edit_off");
    var post_data = {
      "cno": cno,
      "memo": c_memo.html()
    };
    $.post('../php/modifyTracking.php', post_data, function(modifyTracking) {
      if (modifyTracking["status"] == "success") {
        window.location.reload();
      }
    });
  }
}

function delete_tracking(cno) {
  var c_company = $(".tracking-table table tbody tr#" + cno + " td:nth-child(2)");
  var c_invoice = $(".tracking-table table tbody tr#" + cno + " td:nth-child(3)");
  var c_memo = $(".tracking-table table tbody tr#" + cno + " td:nth-child(4)");
  var c_btn = $(".tracking-table table tbody tr#" + cno + " td:nth-child(5) .modify_btn");

  c_memo.html($("#tmp_contents").val());
  c_btn.val('수정');
  c_memo.removeClass("edit_on");
  c_memo.addClass("edit_off");

  var confirm_msg = '';
  confirm_msg += "택배사 :" + c_company.html() + "\n";
  confirm_msg += "송장번호 : " + c_invoice.html() + "\n";
  confirm_msg += "메모 : " + c_memo.html() + "\n";
  confirm_msg += "정말로 삭제하시겠습니까?";



  if (confirm(confirm_msg)) {
    var post_data = {
      "cno": cno
    };
    $.post('../php/deleteTracking.php', post_data, function(deleteTracking) {
      if (deleteTracking["status"] == "success") {
        window.location.reload();
      }
    });
  } else {
    // false
  }
}
