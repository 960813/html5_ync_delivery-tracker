function check() {
  var _email = $("input[name=contact-customer-email]");
  var _name = $("input[name=contact-customer-name]");
  var _body = $("textarea[name=contact-customer-body]");

  if (_email.val() == "") {
    alert("이메일을 입력해 주세요.");
    _email.focus();
    return false;
  } else if (_name.val() == "") {
    alert("이름을 입력해 주세요.");
    _name.focus();
    return false;
  } else if (_body.val() == "") {
    alert("문의 내용 입력해 주세요.");
    _body.focus();
    return false;
  }
  return true;
}


$('form[name=mail_process]').submit(function(event) {
  event.preventDefault();
  var post_data = $('form[name=mail_process]').serialize();
  $.post('../php/sendMessage.php', post_data, function(data) {
    $("form").each(function() {
      if (this.name == "mail_process") this.reset();
    });
    alert("문의 이메일 발송에 성공하였습니다.");
  });
});
