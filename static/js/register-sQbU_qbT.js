import{_ as E}from"./index-B68_FZo7.js";import{d as k,c as l,p as r,a as n,b as s,X as G,A as u,B as m,m as c,e as g,w as S,i as b,l as N,n as q,o as i}from"./index-D0pO9Tvl.js";import{_ as A}from"./PrimaryButton.vue_vue_type_script_setup_true_lang-scL_XI_H.js";import{I as D}from"./InvertedButton-B43qZtpD.js";import{u as H,a as M,b as K,c as L}from"./textStore-CRw0B2M-.js";import{s as y,R as X,a as J}from"./index-C8rzKqQ3.js";import{v as h}from"./data-C6fO1sHB.js";import"./base-CHC5KoCc.js";const O={class:"rounded-card bg-base flex flex-col py-2.5 pr-2.5 w-[95vw] h-[auto] mt-[15vh] absolute"},Q={class:"relative mt-2.5 ml-2.5"},W={class:"flex h-2.5"},Y={key:0,class:"text-red-500 text-sm"},Z={class:"relative mt-2.5 flex flex-row items-center"},ee={class:"flex h-2.5 ml-2.5"},te={key:0,class:"text-red-500 text-sm"},se={class:"relative mt-2.5 flex flex-row justify-center items-center"},oe={class:"flex h-2.5 ml-2.5"},le={key:0,class:"text-red-500 text-sm"},ae={class:"relative mt-2.5 flex flex-row items-center"},re={class:"flex h-2.5 ml-2.5"},ne={key:0,class:"text-red-500 text-sm"},ie={class:"flex justify-center items-center gap-2.5 p-2.4 mt-3 ml-2.5"},de={class:"h-[22px] flex flex-row justify-center items-center gap-2"},ue={class:"flex justify-center items-center p-2.4 mt-2.5"},me=k({name:"Register"}),Se=k({...me,setup(ce){const V=H(),C=l(()=>V.getTheme),I=M(),P=l(()=>I.getRounded),R=K(),T=l(()=>R.getFontSize),$=L(),j=l(()=>$.getText),p=N(),t=r({email:"2021632245@qq.com",mobile:"15666823185",password:"1090119",confirmPassword:"1090119"}),z=l(()=>h("email",t.value.email)),B=l(()=>h("mobile",t.value.mobile)),F=l(()=>h("password",t.value.password)),v=r(!1),f=r(!1),x=r(!1),w=r(!1),_=r();async function U(){if(v.value=t.value.email&&!z.value,f.value=!t.value.mobile||!B.value,x.value=!t.value.password||!F.value,w.value=t.value.password!==t.value.confirmPassword,v.value||f.value||x.value||w.value){y("請正確填寫所有必填字段!");return}let a={mobile:t.value.mobile,password:t.value.password};t.value.email&&(a={...a,email:t.value.email});const e=localStorage.getItem("isGuest")==="true",d=localStorage.getItem("common_token");e&&d&&(a={...a,token:d}),X(a).then(o=>{_.value=o,console.log(o),localStorage.setItem("common_token",_.value.token),localStorage.setItem("mobile",t.value.mobile),localStorage.setItem("password",t.value.password),localStorage.setItem("isGuest","false"),t.value.email&&localStorage.setItem("email",t.value.email),J("註冊成功"),p.push({name:"Home"})}).catch(o=>{console.log(o),y(`註冊失敗:${o.response.data.message}`)})}return(a,e)=>{const d=E;return i(),n("div",{class:q([`font-${j.value} theme-color-${C.value} theme-rounded-${P.value} theme-fontsize-${T.value}`,"text-muted bg-gradient-to-b from-skin-primary to-skin-secondary h-[100vh] relative flex justify-center items-center"])},[s("div",O,[e[11]||(e[11]=s("div",{class:"text-largest font-bold tracking-wide flex justify-center"}," 註冊帳號 ",-1)),s("form",{class:"flex flex-col",onSubmit:G(U,["prevent"])},[s("div",Q,[u(s("input",{"onUpdate:modelValue":e[0]||(e[0]=o=>t.value.email=o),placeholder:"郵箱",class:"p-2 border rounded w-full"},null,512),[[m,t.value.email]]),s("div",W,[v.value&&t.value.email?(i(),n("span",Y,"郵箱格式不正確")):c("",!0)])]),s("div",Z,[e[6]||(e[6]=s("span",{class:"text-red-500 text-sm text-center w-2.5"},"*",-1)),u(s("input",{"onUpdate:modelValue":e[1]||(e[1]=o=>t.value.mobile=o),type:"tel",placeholder:"手機號碼",class:"p-2 border rounded w-full"},null,512),[[m,t.value.mobile]])]),s("div",ee,[f.value?(i(),n("span",te,"手機號碼不能位空且為6~12位數字")):c("",!0)]),s("div",se,[e[7]||(e[7]=s("span",{class:"text-red-500 text-sm text-center w-2.5"},"*",-1)),u(s("input",{"onUpdate:modelValue":e[2]||(e[2]=o=>t.value.password=o),type:"password",placeholder:"密碼",class:"p-2 border rounded w-full"},null,512),[[m,t.value.password]])]),s("div",oe,[x.value?(i(),n("span",le,"密碼不能為空且必須是6~16位")):c("",!0)]),s("div",ae,[e[8]||(e[8]=s("span",{class:"text-red-500 text-sm text-center w-2.5"},"*",-1)),u(s("input",{"onUpdate:modelValue":e[3]||(e[3]=o=>t.value.confirmPassword=o),type:"password",placeholder:"確認密碼",class:"p-2 border rounded w-full"},null,512),[[m,t.value.confirmPassword]])]),s("div",re,[w.value?(i(),n("span",ne,"確認密碼與密碼不匹配")):c("",!0)]),s("div",ie,[g(D,{onClick:e[4]||(e[4]=o=>b(p).push({name:"Login"}))},{default:S(()=>e[9]||(e[9]=[s("div",{class:"w-[22vw] h-[22px] flex flex-row justify-center items-center"},[s("span",{class:"text-base text-primary font-bold font-CactusClassicalSerifHK text-center"}," 返回登錄 ")],-1)])),_:1}),g(A,{class:"grow",type:"submit"},{default:S(()=>[s("div",de,[g(d,{icon:"mingcute:flash-line",class:"text-[20px]"}),e[10]||(e[10]=s("span",{class:"text-larger text-inverted font-bold tracking-wide"},"立即註冊",-1))])]),_:1})])],32),s("div",ue,[s("span",{class:"text-primary/80 text-small hover:text-primary cursor-pointer",onClick:e[5]||(e[5]=o=>b(p).push("/login"))},"已有帳號?點擊登錄")])])],2)}}});export{Se as default};
