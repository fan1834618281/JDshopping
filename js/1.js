const twoPart = document.querySelector(".twoPart");
const map = document.querySelector("#map");
const mapA = document.querySelector("#map-a");
const lis = document.querySelector("#lis");
const lisD = lis.querySelectorAll("li")
const mapB = document.querySelector("#mapB");
const nav = document.querySelector("#nav");
const Dli = nav.querySelectorAll("li");


mapA.addEventListener("mouseenter",event=>{
 /*  console.log(1); */
  mapA.style.color="red"
  mapA.style.font.width=200+"px"
  lisD.forEach((item,index)=>{item[index].style.color="red"})
})
mapA.addEventListener("mouseleave",event=>{
 /*  console.log(2); */
  mapA.style.color=""
})

//输入框事件
function jsonp({ url, jsonp, data }) {
  return new Promise((resolve, reject) => {
      // 创建一个全局函数来接收回调数据
      let callbackName = `jQuery_${Date.now()}`;
      window[callbackName] = function (result) {
          delete window[callbackName];  // 删除这个临时函数
          document.body.removeChild(script);  // 删除这个临时script标签
          resolve(result);
      };
      // 将数据参数转换为url参数字符串
      let queryStr = url.indexOf('?') === -1 ? '?' : '&';
      for (let key in data) {
          queryStr += `${key}=${data[key]}&`
      }
      // 创建一个script标签，然后通过该标签的src属性去请求服务端，服务端接收请求后返回一段调用全局函数的js代码
      let script = document.createElement('script');
      script.src = `${url}${queryStr}${jsonp}=${callbackName}`;
      document.body.appendChild(script);
  });
}
const suggestionList =document.getElementById("suggestion-list");
 let keyWord= document.querySelector('.keyWord').addEventListener('input', function (e) {
 /*  console.log(suggestionList); */
  jsonp({
      url: "https://www.baidu.com/sugrec",
      jsonp: "cb",
      data: {prod: "pc",wd:e.target.value}
  }).then(response => {
      const suggestions = response.g || [];
      const suggestionList = document.getElementById('suggestion-list');
      let html = '';
      for (let i = 0; i < suggestions.length; i++) {
          html += `<li>${suggestions[i].q}</li>`;
      }
      suggestionList.innerHTML = html;
  });
});

//循环渲染
let data=null;
function getData() {//获取数据
    let xhr = new XMLHttpRequest;
    xhr.open("get", "./lun.json", false)
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            //console.log(JSON.parse(xhr.response));
            data=JSON.parse(xhr.response);
        }
    }
    xhr.send(null);
}
getData()

function render(){//循环渲染
  let swiperWrapper =document.querySelector(".OTOTOT")
  console.log(swiperWrapper);
    let str="";
    let swiper = data[0].swiper
  /*   console.log(swiper); */
    swiper.forEach(item=>{
    str+=`
    <div class="swiper-slide" ><img src="${item.pic}" alt=""></div>
    `
    })
    swiperWrapper.innerHTML=str;
}
render()


//轮播图
var mySwiper = new Swiper ('.TOTO', {
  direction: 'horizontal', // 垂直切换选项
  loop: true, // 循环模式选项
  // 如果需要分页器
  pagination: {
    el: '.swiper-pagination',
    clickable :true,
  },
  // 如果需要前进后退按钮
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  speed:200,
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
    waitForTransition: false,
  },
})  


//swiperH轮播
var mySwiper = new Swiper('.ONON', {
  direction: 'horizontal',
  loop: true,
  speed:1000,
/*   autoplay: {
    delay: 2000,
    disableOnInteraction: false,
    waitForTransition: false,
  },  */
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
})
//fiveOne轮播
var mySwiper = new Swiper('.fiveOne', {
  direction: 'horizontal',
  loop: true,
  speed:200,
  autoplay: {
    delay: 2000,
    disableOnInteraction: false,
    waitForTransition: false,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
})

//倒计时
function updateCountdown() {
 const textTime="2023-06-30 21:00:00";
 const jiequ=textTime.slice(10,13)
 let overTimeSpan=document.querySelector(".overTime")
overTimeSpan.innerHTML=`${jiequ}`
  const targetDate = new Date(textTime).getTime();
  const now = new Date().getTime();
  const timeRemaining = targetDate - now;
  // 计算剩余的天数、小时、分钟和秒
  const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
  // 补零操作
  const formattedDays = formatNumber(days);
  const formattedHours = formatNumber(hours);
  const formattedMinutes = formatNumber(minutes);
  const formattedSeconds = formatNumber(seconds);

  // 在页面上更新倒计时显示
  const countdownElement = document.getElementById("countdown");


document.querySelector(".aa").innerHTML = `${formattedDays}`
document.querySelector(".bb").innerHTML = `${formattedHours}`
document.querySelector(".cc").innerHTML = ` ${formattedMinutes}`
document.querySelector(".dd").innerHTML = ` ${formattedSeconds}`
const countdownInterval = setInterval(updateCountdown, 1000);
  // 如果目标日期已过，则显示倒计时结束的消息
  if (timeRemaining < 0) {
    clearInterval(countdownInterval);
    countdownElement.innerHTML = "倒计时已结束！";
  }
}
// 格式化数字，补上前导零
function formatNumber(number) {
  return number < 10 ? "0" + number : number;
}
// 初始调用一次函数以立即显示倒计时
updateCountdown();
// 每秒钟更新一次倒计时


