//!创建聊天
$("#btnSend").click(() => {
  let text = $("#ipt").val().trim();
  // console.log(text);
  if (text.length <= 0) {
    //?   移动端中用清空文字来代替alert弹出事件
    return $("#ipt").val("");
  }
  //   把Input里的文字赋值给talk_list里去
  $("#talk_list").append(` <li class="right_word">
  <img src="img/person02.png" /> <span>${text}</span>
</li>`);
  // 清空input里的值
  $("#ipt").val("");
  getMsg(text);
  //   让滚动条始终处于最底下
  resetui();
});
//! 定义发送消息的函数
const getMsg = (text) => {
  // $.get("http://www.liulongbin.top:3006/api/robot", { spoken: text }, (res) => {
  //   // console.log(res);
  //   if (res.message !== "success") return;
  //   let text = res.data.info.text;
  //   console.log(text);
  //   $("#talk_list").append(` <li class="left_word">
  //                           <img src="img/person01.png" /> <span>${text}</span>
  //                              </li>`);
  //   resetui();
  //   getVoice(text);
  // });
  $.ajax({
    type: "GET",
    url: "http://www.liulongbin.top:3006/api/robot",
    data: {
      spoken: text,
    },
    success:  (res)=> {
      if (res.message !== "success") {
        return;
      }
      let text = res.data.info.text;
      console.log(text);
      $("#talk_list").append(` <li class="left_word">
                              <img src="img/person01.png" /> <span>${text}</span>
                                 </li>`);
      resetui();
      getVoice(text);
    },
  });
};

//! 获取语音
const getVoice = (text) => {
  $.ajax({
    type: "GET",
    url: "http://www.liulongbin.top:3006/api/synthesize",
    data: {
      text: text,
    },
    success: (res) => {
      // console.log(res);
      if (res.status === 200) {
        //播放语音
        $("#voice").attr("src", res.voiceUrl);
      }
    },
  });
};
//!为文本绑定keyup事件
$("#ipt").on("keyup", function (e) {
  // console.log(e.keyCode);
  if (e.keyCode === 13) {
    $("#btnSend").click();
  }
});
