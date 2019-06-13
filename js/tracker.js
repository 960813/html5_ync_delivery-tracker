/*
 CJ 대한통운 : 348710831640 // 나
 우체국택배 : 6064854146315 // 나
 한진택배 : 414630915462  // 나
 우체국택배 : 6067810407487 // 최종원
 우체국택배 : 6092286892478 // 최종원
 우체국택배 : 6092286728549 // 최종원
 CJ대한통운 : 349156403152 // 최종원
 CJ대한통운 : 622743156194 // 최종원
 로젠택배 : 93858187220  // 이태훈
 CJ대한통운 : 6573287556 // 이선민
 CJ대한통운 : 6569920954 // 이선민
 CJ대한통운 : 6569920943 // 이선민
 CJ대한통운 : 6568467113 // 이선민
 CJ대한통운 : 6568657384 // 이선민
 CJ대한통운 : 6568467080 // 이선민
 CJ대한통운 : 6574467900 // 이선민
 CJ대한통운 : 350116290016 // 이선민
 CJ대한통운 : 347990623594 // 이선민
 CJ대한통운 : 6564928576 // 이선민
 CJ대한통운 : 363101652094 // 이선민
 CJ대한통운 : 349860756754 // 조승우
 CJ대한통운 : 348120675721 // 조승우
*/
var api_key = 'VFfugJ81dgL3wdDYensFVw';
$.ajax({
  type: "GET",
  dataType: "json",
  data: {
    t_key: api_key
  },
  url: "https://info.sweettracker.co.kr/api/v1/companylist",
  success: function(data) {
    $.each(data.Company, function(index, item) {
      var option = $("<option value='" + item["Code"] + "'>" + item["Name"] + "</option>");
      $("#t_code").append(option);
    });
  }
});

$(".trackerForm input[type=submit]").click(function(event) {
  event.preventDefault();

  var code = $(".trackerForm select[name=t_code]").val();
  var invoice = $(".trackerForm input[name=t_invoice]").val();
  var sendData = {
    t_key: api_key,
    t_code: code,
    t_invoice: invoice
  };


  $.ajax({
    type: "GET",
    contentType: "application/json; charset=UTF-8",
    dataType: "json",
    data: sendData,
    url: "https://info.sweettracker.co.kr/api/v1/trackingInfo",
    success: function(json) {
      //console.log(json);
      var tracking_progress = $(".tracking-progresses span");
      tracking_progress.html('');
      $(".tracking-info").html('');
      if (json.result == "Y") {
        var tempTime = '';
        tracking_progress.append('<header class="tracking-header"></header>');
/*
        $(".tracking-header").append('<div class="tracking-title"></div>');
        $(".tracking-header .tracking-title").append('<h1 class="has-text-centered">배송조회</h1');
*/
        $(".tracking-header").append('<div class="tracking-status"></div>');
        $(".tracking-header .tracking-status").append('<h1 class="has-text-centered">' + json.trackingDetails[json.trackingDetails.length - 1].kind + '</h1');
        $(".tracking-header").append('<div class="tracking-illustration has-text-centered"></div>');
        $(".tracking-header .tracking-illustration").append('<img src="../images/delivery.png" alt="Tracking illustration">');


        $(json.trackingDetails.reverse()).each(function(index, value) {
          var date = new Date(value.time);
          var fYear = date.getFullYear();
          var fMonth = date.getMonth() + 1;
          var fDate = date.getDate();
          var fFullDate = fYear + "." + fMonth + "." + fDate;
          if (tempTime != fFullDate) {
            tempTime = fFullDate;
            tracking_progress.append('<div class="tracking-progress-entry"></div>');
            $(".tracking-progress-entry:last-child").append('<time>' + tempTime + '</time><ul></ul>');
          }
          $(".tracking-progress-entry:last-child ul").append('<li></li>');

          $(".tracking-progress-entry:last-child ul li:last-child").append('<div class="loc"></div>');
          $(".tracking-progress-entry:last-child ul li:last-child .loc:last-child").append('<p>' + value.where + '</p>');
          $(".tracking-progress-entry:last-child ul li:last-child .loc:last-child").append('<p>' + formatAMPM(date) + '</p>');

          $(".tracking-progress-entry:last-child ul li:last-child").append('<div class="desc"></div>');
          var fLevel = "";
          switch (value.level) {
            case 1:
              fLevel = "배송준비중";
              break;
            case 2:
              fLevel = "집화완료";
              break;
            case 3:
              fLevel = "배송중";
              break;
            case 4:
              fLevel = "지점 도착";
              break;
            case 5:
              fLevel = "배송출발";
              break;
            case 6:
              fLevel = "배송완료";
              break;
          }
          $(".tracking-progress-entry:last-child ul li:last-child .desc:last-child").append('<p>' + fLevel + '</p>');
          $(".tracking-progress-entry:last-child ul li:last-child .desc:last-child").append('<p>' + value.kind + '</p>');
        });

        $(".tracking-info").append('<div class="tracking-info-title"></div>');
        $(".tracking-info .tracking-info-title").append('<h2 class="has-text-centered">기본정보</h2>');

        $(".tracking-info").append("<ul></ul");
        $(".tracking-info ul").append("<li></li>");
        $(".tracking-info ul li:last-child").append("<h5>받는 사람</h5>");
        $(".tracking-info ul li:last-child").append("<p>" + replaceAsterisk(json.receiverName) + "</p>");

        $(".tracking-info ul").append("<li></li>");
        $(".tracking-info ul li:last-child").append("<h5>송장번호</h5>");
        $(".tracking-info ul li:last-child").append("<p>" + json.invoiceNo + "</p>");

        $(".tracking-info ul").append("<li></li>");
        $(".tracking-info ul li:last-child").append("<h5>보낸 사람</h5>");
        $(".tracking-info ul li:last-child").append("<p>" + replaceAsterisk(json.senderName) + "</p>");

        /*@@@@@@@@@DB에 저장@@@@@@@@@*/
        $.get('../php/CheckLogin.php', function(checkLogin) {
          var _status = checkLogin["status"];
          if (_status == "logined") {
            var post_data = {
              "user_id": checkLogin["user_id"],
              "company_name": $(".trackerForm select[name=t_code] option:selected").text(),
              "invoice": json.invoiceNo
            };
            $.post('../php/insertTracking.php', post_data, function(insertTracking) {
              var _status = insertTracking["status"];
              if (_status == "success") {
                /*insertTracking Success . . . .*/
              }
            });
            //insertTracking

          }
        });


      } else {
        tracking_progress.append('<header class="tracking-header"></header>');
        $(".tracking-header").append('<div class="tracking-title"></div>');
        $(".tracking-header .tracking-title").append('<h1 class="has-text-centered">' + json.msg + '</h1');
      }
      return false;
    }
  });
});

function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? '오후' : '오전';
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  var strTime = ampm + ' ' + hours + ':' + minutes;
  return strTime;
}

function replaceAsterisk(string) {
  if (string.indexOf("*") >= 0) {
    return string;
  } else {
    return string.substring(0, 1) + '*' + string.substring(2);
  }
}
