const cfg=window.ZOOPPLEMENTS_CONFIG||{};
let order={flavour:"",base:"",unitPrice:0,creatine:false,quantity:1,name:""};
let inactivityTimer;

function touch(){clearTimeout(inactivityTimer);inactivityTimer=setTimeout(()=>resetOrder(),cfg.inactivityResetMs||90000)}
["click","touchstart","keydown"].forEach(e=>document.addEventListener(e,touch,{passive:true}));
touch();

function go(id){document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));document.getElementById(id).classList.add("active");window.scrollTo(0,0);touch()}
function pickFlavour(v){order.flavour=v;go("base")}
function pickBase(v,p){order.base=v;order.unitPrice=p;go("creatine")}
function pickCreatine(v){order.creatine=v;go("quantity")}
function changeQty(d){order.quantity=Math.max(1,Math.min(10,order.quantity+d));document.getElementById("qty").textContent=order.quantity}
function total(){return (order.unitPrice+(order.creatine?0.5:0))*order.quantity}
function money(v){return "€"+v.toFixed(2)}
function esc(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]))}
function review(){
  const n=document.getElementById("customerName").value.trim();
  if(!/[A-Za-zÀ-ÖØ-öø-ÿ]/.test(n)){alert("Please enter your name.");return}
  order.name=n;
  document.getElementById("reviewCard").innerHTML=
    `<b>${esc(order.quantity+" × "+order.flavour+" Protein Shake")}</b><br>`+
    `${esc(order.base)} — ${money(order.unitPrice)} each<br>`+
    `${order.creatine?"Creatine — +€0.50 each":"No creatine"}<br>`+
    `<div class="total">TOTAL: ${money(total())}</div>`;
  go("review");
}
async function placeOrder(){
  const btn=document.getElementById("placeBtn");
  if(!cfg.orderApiUrl){
    alert("Customer ordering screen is ready. Staff order delivery is not connected yet.");
    return;
  }
  btn.disabled=true;btn.textContent="SENDING...";
  try{
    const res=await fetch(cfg.orderApiUrl,{method:"POST",headers:{"Content-Type":"text/plain;charset=utf-8"},body:JSON.stringify({action:"placeOrder",...order,total:total()})});
    const data=await res.json();
    if(!data.ok)throw new Error(data.error||"Order failed");
    document.getElementById("confirmedName").textContent=order.name;
    document.getElementById("orderNumber").textContent="ORDER #"+data.orderNumber;
    go("confirmed");
  }catch(e){alert("We couldn't send the order. Please order at the bar.");}
  finally{btn.disabled=false;btn.textContent="PLACE ORDER";}
}
function resetOrder(){
  order={flavour:"",base:"",unitPrice:0,creatine:false,quantity:1,name:""};
  document.getElementById("qty").textContent="1";
  document.getElementById("customerName").value="";
  go("welcome");
}