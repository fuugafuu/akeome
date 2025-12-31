const PASSWORD = "fuuga0703";
const tz = "Asia/Tokyo";

const thresholdUTC = Date.UTC(2025,11,31,15,0,0);

const dtEl = document.getElementById("datetime");
const cdEl = document.getElementById("countdown");
const msgEl = document.getElementById("message");
const imgEl = document.getElementById("overlay");
const bgEl  = document.getElementById("bg");

let activated = false;
let bgOpacity = 0;

function tokyoParts(d){
  const f = new Intl.DateTimeFormat("ja-JP",{
    timeZone:tz,
    year:"numeric",month:"numeric",day:"numeric",
    hour:"2-digit",minute:"2-digit",second:"2-digit",
    hour12:false
  }).formatToParts(d);
  const o={};
  f.forEach(p=>{ if(p.type!=="literal") o[p.type]=p.value;});
  return o;
}

function brightenBackground(){
  const interval = setInterval(()=>{
    bgOpacity += 0.01;
    bgEl.style.opacity = bgOpacity;
    if(bgOpacity >= 1){
      bgEl.style.opacity = 1;
      clearInterval(interval);
    }
  }, 60);
}

function activate(){
  if(activated) return;
  activated = true;

  cdEl.style.display="none";

  brightenBackground();
  msgEl.classList.add("show");
  imgEl.classList.add("show");
}

function tick(){
  const now = new Date();
  const p = tokyoParts(now);

  dtEl.textContent =
    `${p.year}年 ${p.month}.${p.day}日 ${p.hour}:${p.minute}:${p.second}`;

  const diff = thresholdUTC - now.getTime();

  if(diff <= 0){
    activate();
  }else{
    const s = Math.floor(diff/1000);
    const h = Math.floor(s/3600);
    const m = Math.floor((s%3600)/60);
    const sec = s%60;
    cdEl.textContent =
      `カウントダウン ${h}時間 ${m}分 ${sec}秒`;
  }
}

document.getElementById("testBtn").onclick = ()=>{
  const pw = prompt("パスワードを入力");
  if(pw === PASSWORD){
    activate();
  }else if(pw !== null){
    alert("違う。");
  }
};

tick();
setInterval(tick,250);
