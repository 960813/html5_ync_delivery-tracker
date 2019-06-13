var api_key = 'VFfugJ81dgL3wdDYensFVw';
$(document).ready(function() {
  var url_params = getJsonFromUrl();
  var code = url_params["c_code"];
  var invoice = url_params["c_invoice"];
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
      console.log(json);
      var tracking_progress = $(".tracking-progresses span");
      tracking_progress.html('');
      $(".tracking-info").html('');
      if (json.result == "Y") {
        var tempTime = '';

        tracking_progress.append('<header class="tracking-header"></header>');
        $(".tracking-header").append('<div class="tracking-title"></div>');
        $(".tracking-header .tracking-title").append('<h1 class="has-text-centered">배송조회</h1');
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
            //END insertTracking

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

function getJsonFromUrl() {
  var query = location.search.substr(1);
  var result = {};
  query.split("&").forEach(function(part) {
    var item = part.split("=");
    result[item[0]] = decodeURIComponent(item[1]);
  });
  return result;
}

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
