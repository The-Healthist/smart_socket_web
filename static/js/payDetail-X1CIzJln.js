import{_ as O}from"./index-B68_FZo7.js";import{d as $,p as d,l as q,v as A,c as x,a as w,b as e,e as h,t as s,n as b,i as u,A as U,B as E,w as N,o as y}from"./index-D0pO9Tvl.js";import{_ as P}from"./PrimaryButton.vue_vue_type_script_setup_true_lang-scL_XI_H.js";import{u as G,a as J,b as L,c as Q}from"./textStore-CRw0B2M-.js";import{g as W}from"./socket-D0hgB3PH.js";import{e as l}from"./data-C6fO1sHB.js";import"./index-C8rzKqQ3.js";import"./base-CHC5KoCc.js";const X={class:"rounded-card bg-base flex flex-col gap-2.5 p-2.5 w-[95vw] h-[auto] mt-[4vh] absolute"},Y={class:"bg-base rounded-button w-full flex flex-col gap-2. justify-center items-center h-[205px]"},Z=["src"],ee={class:"text-baseC text-base"},te={class:"text-baseC text-base"},oe={class:"text-baseC text-base"},se={class:"flex flex-col w-full"},ne={class:"border-primary rounded-t-button border-solid border-l-[1px] border-t-[1px] border-r-[1px] flex flex-row w-full justify-center items-center gap-2.5 px-2.5 pt-2.5"},re={class:"flex flex-row w-full justify-between p-1.5"},ae={class:"flex flex-col items-end"},le={class:"text-small font-normal text-baseC/50"},ie={class:"flex justify-center items-center"},ce={class:"text-red-500 text-base font-bold"},de={class:"flex flex-row w-full justify-between p-1.5"},ue={class:"flex flex-col justify-start items-end"},fe={class:"text-small font-normal text-baseC/50"},pe={class:"flex justify-center items-center"},xe={class:"text-red-500 text-base font-bold"},me={class:"border-primary rounded-b-card border-solid border-b-[1px] border-l-[1px] border-r-[1px] flex flex-row w-full justify-center items-center gap-2.5 p-2.5"},ve={class:"flex flex-col justify-end items-end w-[25%]"},be={class:"text-red-500 text-base font-bold"},_e={class:"text-baseC/60 text-small truncate"},we={key:0,class:"h-[24px] flex flex-row justify-center items-center gap-2"},he={key:1,class:"h-[24px] flex flex-col justify-center items-center"},ye={class:"flex flex-row justify-center items-center gap-2"},ge={class:"text-larger text-inverted font-bold tracking-wide"},ke=$({name:"Home"}),Ie=$({...ke,setup(je){const a=d(),g=q(),k=g.currentRoute.value.params.socketId,n=d({name:"",location:"",quantity:"",amount:"",pictureUrl:"",function_price:"function calc(amount) {return amount * 2.1}"}),i=d(null);A(async()=>{try{const o=await W({socketId:`${k}`});a.value=o.data.device,n.value=o.data.device,n.value.function_price=o.data.device.priceFormula,i.value=o.data.currentOrder,C()}catch(o){console.error("Error fetching list info",o)}});const D=G(),z=x(()=>D.getTheme),F=J(),I=x(()=>F.getRounded),K=L(),R=x(()=>K.getFontSize),B=Q(),j=x(()=>B.getText),r=d(1),m=d(4),M=()=>{var f,p;let o=r.value===3?m.value:r.value,t=l(o,n.value.function_price);g.push({name:"OrderConfirm",query:{device_id:k,location:(f=a.value)==null?void 0:f.location,quantity:o,amount:t,name:(p=a.value)==null?void 0:p.name}})},c=d(0),V=x(()=>{if(!c.value||c.value<=0)return"0h0min";const o=Math.floor(c.value/(60*60*1e3)),t=Math.floor(c.value%(60*60*1e3)/(60*1e3));return`${o}h${t}min`});let _=null;const C=()=>{if(i.value&&i.value.endAt){const o=new Date(i.value.endAt).getTime(),t=new Date().getTime();c.value=Math.max(0,o-t)}else c.value=0};return _!==null&&clearInterval(_),_=window.setInterval(C,1e4),(o,t)=>{var p,T,H,S;const f=O;return y(),w("div",{class:b([`font-${j.value} theme-color-${z.value} theme-rounded-${I.value} theme-fontsize-${R.value} font-${j.value} `,"text-muted bg-gradient-to-b from-skin-primary to-skin-secondary h-[100vh] relative flex justify-center items-center"])},[e("div",X,[e("div",Y,[e("img",{class:"w-[136px] h-[133.02px] shadow",src:(p=a.value)==null?void 0:p.deviceType.pictureUrl},null,8,Z),e("span",ee,s((T=a.value)==null?void 0:T.name),1),e("span",te,"類型: "+s((H=a.value)==null?void 0:H.deviceType.name),1),e("span",oe,"位置: "+s((S=a.value)==null?void 0:S.location),1)]),e("div",se,[e("div",ne,[e("button",{class:b([r.value==1?"border-primary rounded-option border-solid border-[1.5px] bg-primary/20":"border-base/30 rounded-option border-solid border-[1px]","w-[50%] flex flex-row justify-center items-center"]),onClick:t[0]||(t[0]=v=>r.value=1)},[e("div",re,[e("div",ae,[t[4]||(t[4]=e("span",{class:"text-baseC text-base font-bold tracking-wide"},"1H",-1)),e("span",le,"平均: "+s(u(l)(1,n.value.function_price))+"HKD/H",1)]),e("div",ie,[e("span",ce,s(u(l)(1,n.value.function_price))+"HKD",1)])])],2),e("button",{class:b([r.value==2?"border-primary rounded-option border-solid border-[1.5px] bg-primary/20":"border-base/30 rounded-option border-solid border-[1px]","w-[50%] flex flex-row justify-center items-center"]),onClick:t[1]||(t[1]=v=>r.value=2)},[e("div",de,[e("div",ue,[t[5]||(t[5]=e("span",{class:"text-baseC text-base font-bold tracking-wide"},"2H",-1)),e("span",fe,"平均: "+s(u(l)(1,n.value.function_price))+"HKD/H",1)]),e("div",pe,[e("span",xe,s(u(l)(2,n.value.function_price))+"HKD",1)])])],2)]),e("div",me,[e("div",{class:b([r.value==3?"border-primary rounded-option border-solid border-[1.5px] bg-primary/20 ":"border-base/30 rounded-option border-solid border-[1px]","flex flex-row w-full justify-center items-center p-2.5"]),onClick:t[3]||(t[3]=v=>r.value=3)},[U(e("input",{"onUpdate:modelValue":t[2]||(t[2]=v=>m.value=v),type:"number",class:"w-[177px] h-[34px] text-center truncate py-[5px] rounded-[5px] shadow-inner text-base font-bold"},null,512),[[E,m.value]]),t[6]||(t[6]=e("div",{class:"text-baseC text-base font-bold w-[15%] flex flex-row justify-center items-center"}," H ",-1)),e("div",ve,[e("span",be,s(u(l)(m.value,n.value.function_price))+"HKD",1),e("span",_e,"平均: "+s(u(l)(1,n.value.function_price))+"HKD/H",1)])],2)])]),h(P,{class:"grow-x-1",disabled:i.value!=null,onClick:M},{default:N(()=>[i.value==null?(y(),w("div",we,[h(f,{icon:"mingcute:flash-line",class:"text-[20px]"}),t[7]||(t[7]=e("span",{class:"text-larger text-inverted font-bold tracking-wide"},"即刻支付",-1))])):(y(),w("div",he,[e("div",ye,[h(f,{icon:"mingcute:lock-line",class:"text-[20px]"}),e("span",ge,"使用中 ("+s(V.value)+")",1)])]))]),_:1},8,["disabled"])])],2)}}});export{Ie as default};
