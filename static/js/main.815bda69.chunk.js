(this.webpackJsonpformtrainer=this.webpackJsonpformtrainer||[]).push([[0],{122:function(e,t,n){},123:function(e,t,n){},142:function(e,t,n){},148:function(e,t,n){"use strict";n.r(t);var s=n(0),c=n(1),a=n.n(c),r=n(47),i=n.n(r),o=(n(122),n(7)),l=n(2),u=n(19),j=(n(123),n(15)),d=n.n(j),h=n(11),b=(n(142),n.p+"static/media/formimage.c91428e7.png"),p=function(e){var t=Object(l.f)();return Object(s.jsxs)("div",{className:"main-container",children:[Object(s.jsx)("header",{children:Object(s.jsxs)("h1",{className:"logo-big",children:["Form",Object(s.jsx)("span",{className:"logo-small",children:"survway"})]})}),Object(s.jsxs)("div",{className:"main-content",children:[Object(s.jsxs)("div",{className:"left-content",children:[Object(s.jsxs)("h1",{className:"white-header",children:["Create free ",Object(s.jsx)("span",{class:"surveys-text",children:"surveys"})]}),Object(s.jsx)("h1",{className:"white-header",children:"and collect data!"}),Object(s.jsx)("button",{className:"create-button",onClick:function(){return t.push("/")},children:"Create survey"})]}),Object(s.jsx)("div",{className:"right-content",children:Object(s.jsx)("img",{className:"image",src:b,alt:""})})]}),Object(s.jsxs)("footer",{children:[Object(s.jsx)("p",{children:"Easily get the answers you need."}),Object(s.jsx)(u.b,{className:"linkki no-margin",to:"/",children:"Start now."}),Object(s.jsxs)("p",{className:"light-blue",children:["Form",Object(s.jsx)("span",{className:"logo-small",children:"survway"})]})]})]})},O=function(e){var t=Object(c.useRef)();return Object(c.useEffect)((function(){var n=[];e.data.answer.map((function(t){var s=n.filter((function(n){return n.value===e.data.options[t]}));if(n.length<1)n.push({value:e.data.options[t],count:1});else if(s[0]){var c=n.indexOf(s[0]);n[c].count+=1}else n.push({value:e.data.options[t],count:1})}));var s=n,c=h.d(t.current),a=c.attr("width"),r=c.attr("height"),i=c.append("g").attr("transform","translate(".concat(a/2,", ").concat(r/2,")")),o=h.c(["#cfe1f2","#b5d4e9","#93c3df","#6daed5","#4b97c9","#2f7ebc","#1864aa","#0a4a90","#08306b"]),l=h.b().sort(null).value((function(e){return e.count})),u=h.a().outerRadius(200).innerRadius(0),j=h.a().outerRadius(200).innerRadius(170),d=i.selectAll(".arc").data(l(s)).enter().append("g").attr("class","arc");d.append("path").attr("d",u).attr("fill",(function(e){return o(e.data.value)})),d.append("text").attr("transform",(function(e){return"translate(".concat(j.centroid(e),")")})).text((function(e){return e.data.value+" "+e.data.count}))}),[]),Object(s.jsx)("div",{children:Object(s.jsx)("svg",{ref:t,width:"400",height:"400"})})},x=function(e){var t=Object(l.g)().id,n=Object(c.useState)(""),a=Object(o.a)(n,2),r=a[0],i=a[1],u=Object(c.useState)([]),j=Object(o.a)(u,2),h=j[0],b=j[1];return Object(c.useEffect)((function(){d.a.get("".concat("https://formsbackend231.herokuapp.com/","/forms/getFormAnswers"),{params:{url:t}}).then((function(e){console.log(e.data),i(e.data.header),b(e.data.answers)}))}),[]),Object(s.jsxs)("div",{className:"App",children:[Object(s.jsx)("h1",{className:"survey-header",children:r}),0!==h.length?h.map((function(e){return e.options?Object(s.jsxs)("div",{children:[Object(s.jsx)("h2",{children:e.question}),Object(s.jsx)(O,{data:e})]}):Object(s.jsxs)("div",{className:"answer-container",children:[Object(s.jsx)("h2",{children:e.question}),e.answer.map((function(e){return Object(s.jsx)("p",{className:"single-answer",children:e},e)}))]})})):Object(s.jsx)("h1",{className:"survey-header",children:"You dont have any responses yet! "})]})},m=function(e){var t=Object(l.f)();return Object(s.jsx)("div",{children:Object(s.jsx)("button",{className:"submit-button",onClick:function(){d.a.post("".concat("https://formsbackend231.herokuapp.com/","/forms/newForm"),{questions:e.questions,header:e.header}).then((function(n){return function(n){console.log(n),e.setUrl(n),t.push("/submitted/"+n)}(n.data)}))},children:" Submit "})})},f=function(e){return Object(s.jsx)("div",{className:"App",children:Object(s.jsx)("h1",{className:"survey-header",children:"Thanks for answering our survey!"})})},v=function(e){var t=Object(l.f)(""),n=Object(c.useState)(!1),a=Object(o.a)(n,2),r=a[0],i=a[1],u=Object(c.useState)(!1),j=Object(o.a)(u,2),d=j[0],h=j[1];return Object(s.jsx)("div",{className:"App",children:Object(s.jsxs)("div",{className:"center-text",children:[Object(s.jsx)("h1",{children:"Your survey has been created!"}),Object(s.jsx)("p",{children:"Share your survey and see the answers."}),Object(s.jsx)("p",{children:"You can now share your survey by sharing this link:"}),Object(s.jsxs)("div",{className:"link-container",children:[1==r?Object(s.jsx)("p",{children:"Link Copied!"}):Object(s.jsx)("p",{children:"https://henripar.github.io/Formsurway/form/"+e.url}),Object(s.jsxs)("svg",{"aria-label":"Copy link",onClick:function(){var t;t=e.url,navigator.clipboard.writeText("https://henripar.github.io/Formsurways/form/".concat(t)),i(!0),setTimeout((function(){i(!1)}),3e3)},xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round",class:"feather feather-copy",children:[Object(s.jsx)("title",{children:"Copy link!"}),Object(s.jsx)("rect",{x:"9",y:"9",width:"13",height:"13",rx:"2",ry:"2"}),Object(s.jsx)("path",{d:"M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"})]})]}),Object(s.jsx)("p",{children:"You can see the survey results by following this link: "}),Object(s.jsxs)("div",{className:"link-container",children:[1==d?Object(s.jsx)("p",{children:"Link Copied!"}):Object(s.jsx)("p",{children:"https://henripar.github.io/Formsurway/answers/"+e.url}),Object(s.jsxs)("svg",{onClick:function(){var t;t=e.url,navigator.clipboard.writeText("".concat("/Formsurways","/answers/").concat(t)),h(!0),setTimeout((function(){h(!1)}),3e3)},xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round",class:"feather feather-copy",children:[Object(s.jsx)("title",{children:"Copy link!"}),Object(s.jsx)("rect",{x:"9",y:"9",width:"13",height:"13",rx:"2",ry:"2"}),Object(s.jsx)("path",{d:"M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"})]}),Object(s.jsxs)("svg",{onClick:function(){return t.push("/answers/"+e.url)},xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round",class:"feather feather-arrow-right",className:"arrow",children:[Object(s.jsx)("line",{x1:"5",y1:"12",x2:"19",y2:"12"}),Object(s.jsx)("polyline",{points:"12 5 19 12 12 19"})]})]})]})})},g=function(e){var t=Object(l.g)().id,n=Object(l.f)(),a=Object(c.useState)([]),r=Object(o.a)(a,2),i=r[0],u=r[1],j=Object(c.useState)(""),h=Object(o.a)(j,2),b=h[0],p=h[1],O=Object(c.useState)([{}]),x=Object(o.a)(O,2),m=x[0],f=x[1];return Object(c.useEffect)((function(){d.a.get("".concat("https://formsbackend231.herokuapp.com/","/forms/getForm"),{params:{urlParam:t}}).then((function(e){console.log(e.data),u(e.data.questions),p(e.data.header),f(e.data.questions)}))}),[]),Object(s.jsxs)("div",{className:"App",children:[Object(s.jsx)("h1",{className:"survey-header",children:b}),Object(s.jsxs)("form",{id:"form-answers",children:[i.map((function(e,t){return e.value?Object(s.jsxs)("div",{children:[Object(s.jsx)("p",{children:e.value}),e.options.map((function(n,c){return Object(s.jsx)("div",{children:Object(s.jsxs)("label",{htmlFor:n,children:[Object(s.jsx)("input",{type:"radio",value:n,id:n,onClick:function(){!function(e,t,n){var s=i;s[e].question=n,s[e].answer=t,f(s)}(t,c,e.value)},name:e.value}),n]})},n)}))]},e.value):Object(s.jsxs)("div",{children:[Object(s.jsxs)("label",{htmlFor:e,children:[" ",e,"  "]}),Object(s.jsx)("input",{className:"answer-form-input",id:e,placeholder:"Your answer..",onChange:function(n){!function(e,t,n){e.preventDefault(),console.log(t,n,e);var s=i;s[t]={question:n,answer:e.target.value},f(s)}(n,t,e)},type:"text"})]},e)})),Object(s.jsx)("button",{className:"submit-button",type:"button",onClick:function(){d.a.post("".concat("https://formsbackend231.herokuapp.com/","/forms/newAnswers"),{answers:m,url:t}).then((function(){n.push("/answered")}))},children:"Submit"})]})]})},w=function(e){var t=Object(c.useState)(""),n=Object(o.a)(t,2),a=n[0],r=n[1];return Object(s.jsxs)("div",{className:"option-div",children:[Object(s.jsx)("input",{readOnly:!0,name:"hep",type:"radio",disabled:!0}),Object(s.jsx)("input",{type:"text",name:a,value:a,onChange:function(t){return function(t,n,s){console.log(s,n,t),t.preventDefault();var c=e.questions;c[n].options[s]=t.target.value,e.setQuestions(c),r(t.target.value)}(t,e.index,e.i)},placeholder:"Option "+(e.i+1)})]},e.option.value)},y=function(e){return Object(s.jsxs)("div",{className:"button-question-menu-container",children:[Object(s.jsx)("button",{className:"button-main",onClick:function(){e.setQuestions(e.questions.concat("")),e.setQuestionType(!0)},children:"Text"}),Object(s.jsx)("button",{className:"button-main",onClick:function(){e.setQuestions(e.questions.concat({value:"",options:["",""]})),e.setQuestionType(!0)},children:"Multiple Choice"})]})};var N=function(){var e=Object(c.useState)([{header:""}]),t=Object(o.a)(e,2),n=t[0],a=t[1],r=Object(c.useState)(""),i=Object(o.a)(r,2),j=i[0],d=i[1],h=Object(c.useState)(!0),b=Object(o.a)(h,2),O=b[0],N=b[1],k=Object(c.useState)(""),C=Object(o.a)(k,2),F=C[0],S=C[1],q=Object(l.f)();return Object(s.jsx)(u.a,{children:Object(s.jsxs)(l.c,{children:[Object(s.jsxs)(l.a,{path:"/submitted/:id",children:[Object(s.jsx)("header",{children:Object(s.jsxs)("h1",{className:"logo-big",children:["Form",Object(s.jsx)("span",{className:"logo-small",children:"survway"})]})}),Object(s.jsx)(v,{url:F})]}),Object(s.jsxs)(l.a,{path:"/answers/:id",children:[Object(s.jsx)("header",{children:Object(s.jsxs)("h1",{className:"logo-big",children:["Form",Object(s.jsx)("span",{className:"logo-small",children:"survway"})]})}),Object(s.jsx)(x,{})]}),Object(s.jsxs)(l.a,{exact:!0,path:"/answered",children:[Object(s.jsx)("header",{children:Object(s.jsxs)("h1",{className:"logo-big",children:["Form",Object(s.jsx)("span",{className:"logo-small",children:"survway"})]})}),Object(s.jsx)(f,{})]}),Object(s.jsxs)(l.a,{path:"/form/:id",children:[Object(s.jsx)("header",{children:Object(s.jsxs)("h1",{className:"logo-big",children:["Form",Object(s.jsx)("span",{className:"logo-small",children:"survway"})]})}),Object(s.jsx)(g,{})]}),Object(s.jsx)(l.a,{path:"/frontpage",children:Object(s.jsx)(p,{})}),Object(s.jsxs)(l.a,{exact:!0,path:"/",children:[Object(s.jsx)("header",{children:Object(s.jsxs)("h1",{className:"logo-big",children:["Form",Object(s.jsx)("span",{className:"logo-small",children:"survway"})]})}),Object(s.jsxs)("div",{className:"App",children:[Object(s.jsxs)("form",{id:"userform",children:[Object(s.jsx)("input",{className:"form-name-input",type:"text",name:"header",form:"userform",placeholder:"Form name",onChange:function(e){!function(e){d(e.target.value)}(e)}}),n.map((function(e,t){return e.options?Object(s.jsxs)("div",{children:[Object(s.jsx)("input",{name:t,type:"text",onChange:function(e){return function(e,t){var s=n;s[t]={value:e.target.value,options:[{value:""}]},a(s)}(e,t)},className:"question-input",placeholder:"Question"}),e.options.map((function(e,c){return Object(s.jsx)("div",{children:Object(s.jsx)(w,{questions:n,setQuestions:a,index:t,i:c,option:e})},c)})),Object(s.jsx)("button",{className:"addoption-button",type:"button",onClick:function(e){!function(e,t){N(Math.random()),console.log(e);var s=n;s[e].options.push(""),a(s)}(t)},children:" + Add option"})]},t):Object(s.jsx)("div",{children:Object(s.jsx)("input",{className:"text-input",name:t,placeholder:"Question",type:"text",onChange:function(e){return function(e,t){var s=n;s[t]=e.target.value,a(s)}(e,t)},value:e.value})},t)})),"  "]}),O?Object(s.jsx)("div",{className:"add-button-container",children:Object(s.jsx)("button",{className:"button-main",onClick:function(){N(!1)},children:" + New Question "})}):Object(s.jsx)(y,{questions:n,setQuestions:a,setQuestionType:N}),Object(s.jsx)(m,{setUrl:S,history:q,header:j,questions:n})]})]})]})})},k=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,149)).then((function(t){var n=t.getCLS,s=t.getFID,c=t.getFCP,a=t.getLCP,r=t.getTTFB;n(e),s(e),c(e),a(e),r(e)}))};i.a.render(Object(s.jsx)(a.a.StrictMode,{children:Object(s.jsx)(N,{})}),document.getElementById("root")),k()}},[[148,1,2]]]);
//# sourceMappingURL=main.815bda69.chunk.js.map