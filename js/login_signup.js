function checkvalue(target, event) {
  var cN = target.className;
  event.preventDefault();
  if (cN == 'register-form') {

    var reg_form = $(".register-form");
    var user_id = reg_form.children("input[name=user_id]");
    var user_pw = reg_form.children("input[name=user_pw]");
    var user_pw2 = reg_form.children("input[name=user_pw2]");
    var user_email = reg_form.children("input[name=user_email]");

    if (user_id.val() == "") {
      alert("아이디를 입력해 주세요.");
      user_id.focus();
      return false;
    } else if (user_pw.val() == "") {
      alert("비밀번호를 입력해주세요.");
      user_pw.focus();
      return false;
    } else if (user_pw2.val() == "") {
      alert("비밀번호 확인을 입력해주세요.");
      user_pw2.focus();
      return false;
    } else if (user_email.val() == "") {
      alert("이메일을 입력해주세요.");
      user_email.focus();
      return false;
    }

    if (user_pw.val() != user_pw2.val()) {
      alert("입력된 비밀번호가 일치하지 않습니다.");
      user_pw.val('');
      user_pw2.val('');
      user_pw.focus();
      return false;
    }

    var post_data = $('.register-form').serialize();
    $.post('../php/Registration.php', post_data, function(data) {
      var _status = data["status"];
      if (_status == "success") {
        $("form").each(function() {
          if (this.className == "register-form") this.reset();
        });
        alert("회원가입에 성공하였습니다.");
        $('form').animate({
          height: "toggle",
          opacity: "toggle"
        }, "slow");
      } else if (_status == "exist") {
        alert("이미 등록된 아이디입니다.");
      }
    });

  } else if (cN == 'login-form') {
    var login_form = $(".login-form");
    var user_id = login_form.children("input[name=user_id]");
    var user_pw = login_form.children("input[name=user_pw]");
    if (user_id.val() == "") {
      alert("아이디를 입력해 주세요..");
      user_id.focus();
      return false;
    } else if (user_pw.val() == "") {
      alert("비밀번호를 입력해주세요.");
      user_pw.focus();
      return false;
    }
    var post_data = $('.login-form').serialize();
    $.post('../php/Login.php', post_data, function(data) {
      var _status = data["status"];
      if (_status == "success") {
        $("form").each(function() {
          if (this.className == "login-form") this.reset();
        });
        window.location.replace("//delivery.foretion.com");
      } else if (_status == "nouser") {
        alert("등록되지 않은 회원입니다.")
      } else if (_status == "error") {
        alert("패스워드가 일치하지 않습니다.");
      }
    });
  }

}

$(document).ready(function(){
  $('.message a').click(function() {
    $('form').animate({
      height: "toggle",
      opacity: "toggle"
    }, "slow");
  });
});
