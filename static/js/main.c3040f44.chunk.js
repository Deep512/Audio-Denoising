(this.webpackJsonpchatsapp_frontend=this.webpackJsonpchatsapp_frontend||[]).push([[0],{37:function(e,t,n){e.exports=n(61)},42:function(e,t,n){},43:function(e,t,n){},44:function(e,t,n){},56:function(e,t,n){},59:function(e,t,n){},60:function(e,t,n){},61:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),o=n(20),c=n.n(o),s=(n(42),n(29)),u=n(30),i=n(35),l=n(34),p=(n(43),n(16)),f=n(6),h=n(4);function d(e,t,n){var r=new Date;r.setTime(r.getTime()+24*n*60*60*1e3);var a="expires="+r.toUTCString();document.cookie=e+"="+t+";"+a+";path=/"}function m(e){document.cookie=e+"=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;"}function g(e){for(var t=e+"=",n=document.cookie.split(";"),r=0;r<n.length;r++){for(var a=n[r];" "==a.charAt(0);)a=a.substring(1);if(0==a.indexOf(t))return a.substring(t.length,a.length)}return""}var v=n(10),b=n.n(v),y=(n(44),n(66)),j=n(63),O=n(64),w=n(65),x=n(67),E=n(68),k=n(15),S=function(){var e=Object(r.useState)(""),t=Object(h.a)(e,2),n=t[0],o=t[1],c=Object(r.useState)(""),s=Object(h.a)(c,2),u=s[0],i=s[1],l=Object(r.useState)(""),m=Object(h.a)(l,2),v=m[0],S=(m[1],Object(f.g)()),N=Object(k.useSpeechSynthesis)(),C=N.speak,T=N.voices,U=null;T.forEach((function(e){"hi-IN"===e.lang&&(U=e)})),Object(r.useEffect)((function(){if(function(){var e=g("username");return g("password"),""!=e}()){var e=null;T.forEach((function(t){"hi-IN"===t.lang&&(e=t)}));var t=g("username"),n=g("password");console.log(t),console.log(n),fetch("https://stormy-tundra-81519.herokuapp.com/auth/login",{method:"post",headers:{"Content-type":"application/json"},credentials:"include",body:JSON.stringify({username:t,password:n})}).then((function(e){return e.json()})).then((function(n){if(console.log(n),n.error)return C({text:"Unable to sign in. ".concat(n.error),voice:e}),void b.a.toast({html:n.error});C({text:"Signed in successfully as ".concat(t,"!"),voice:e}),b.a.toast({html:"Signed in successfully!"}),console.log(n),localStorage.setItem("jwt",n.token),localStorage.setItem("user",JSON.stringify(n.user)),S.push("/usr/contacts")})).catch((function(e){return console.log("error",e)}))}}),[v]);return a.a.createElement(y.a,{className:"mycard"},a.a.createElement("div",{classsname:"card auth-card"},a.a.createElement(j.a,{className:"justify-content-center"},a.a.createElement("h2",{className:"brand-logo"},"Login")),a.a.createElement(j.a,{className:"justify-content-center"},a.a.createElement(O.a,null,a.a.createElement(w.a,{xs:12},a.a.createElement(x.a,{style:{margin:"5px 5px 5px 5px"},type:"text",placeholder:"Username",value:n,onChange:function(e){return o(e.target.value)}})),a.a.createElement(w.a,{xs:12},a.a.createElement(x.a,{style:{margin:"5px 5px 5px 5px"},type:"password",placeholder:"Password",value:u,onChange:function(e){return i(e.target.value)}})),a.a.createElement(E.a,{onClick:function(){fetch("https://stormy-tundra-81519.herokuapp.com/auth/login",{method:"post",headers:{"Content-type":"application/json"},credentials:"include",body:JSON.stringify({username:n,password:u})}).then((function(e){return e.json()})).then((function(e){if(console.log(e),e.error)return C({text:"Unable to sign in. ".concat(e.error),voice:U}),void b.a.toast({html:e.error});C({text:"Signed in successfully as ".concat(n,"!"),voice:U}),b.a.toast({html:"Signed in successfully!"}),console.log(e),localStorage.setItem("jwt",e.token),localStorage.setItem("user",JSON.stringify(e.user)),d("username",n,3650),d("password",u,3650),S.push("/usr/contacts")})).catch((function(e){return console.log("error",e)}))},className:"btn-s waves-effect waves-light",type:"submit"},"Signin"," "),a.a.createElement(p.b,{to:"/signup"},"Dont have an account?")),a.a.createElement("div",{style:{display:"flex",justifyContent:"space-around"}}))))},N=function(){var e=Object(r.useState)(""),t=Object(h.a)(e,2),n=t[0],o=t[1],c=Object(r.useState)(""),s=Object(h.a)(c,2),u=s[0],i=s[1],l=Object(r.useState)(""),d=Object(h.a)(l,2),m=d[0],g=d[1],v=Object(r.useState)(""),w=Object(h.a)(v,2),S=w[0],N=w[1],C=Object(f.g)(),T=Object(k.useSpeechSynthesis)(),U=T.speak,R=T.voices,M=null;R.forEach((function(e){"hi-IN"===e.lang&&(M=e)}));return a.a.createElement(y.a,{className:"mycard"},a.a.createElement("div",{classsname:"card auth-card"},a.a.createElement(j.a,{className:"justify-content-center"},a.a.createElement("h2",{className:"brand-logo"},"Signup")),a.a.createElement(O.a,null,a.a.createElement(j.a,{classname:"justify-content-center"},a.a.createElement(x.a,{style:{margin:"5px 20px 5px 20px"},type:"text",placeholder:"Name",value:S,onChange:function(e){return N(e.target.value)}}),a.a.createElement(x.a,{style:{margin:"5px 20px 5px 20px"},type:"text",placeholder:"Username",value:n,onChange:function(e){return o(e.target.value)}}),a.a.createElement(x.a,{style:{margin:"5px 20px 5px 20px"},type:"password",placeholder:"Password",value:m,onChange:function(e){return g(e.target.value)}}),a.a.createElement(x.a,{style:{margin:"5px 20px 5px 20px"},type:"text",placeholder:"Phone",value:u,onChange:function(e){return i(e.target.value)}}),a.a.createElement(E.a,{className:"btn-s waves-effect waves-light",type:"submit",onClick:function(){fetch("https://stormy-tundra-81519.herokuapp.com/register",{method:"post",headers:{"Content-type":"application/json"},body:JSON.stringify({username:n,password:m,name:S,phone:u})}).then((function(e){return e.json()})).then((function(e){if(console.log(e),e.error)return U({text:"Unable to register. ".concat(e.error),voice:M}),void b.a.toast({html:e.error});U({text:"Successfully registered with username ".concat(n),voice:M}),b.a.toast({html:e.message}),C.push("/signin")}))}},"Signup"),a.a.createElement(p.b,{to:"/signin"},"Already have an account?"))),a.a.createElement("div",{style:{display:"flex",justifyContent:"space-around"}})))},C=n(2),T=n.n(C),U=n(5),R=(n(55),n(56),function(e){return{type:"Update_history",payload:{history:e}}}),M=function(e){return{type:"Update_loggedInUser",payload:{loggedinUser:e}}},I=function(e){return{type:"Update_message",payload:{from:e.from,to:e.to,text:e.text,type:e.type,enc:e.enc}}},J=n(8);var D=function(e){(function(e){return"touches"in e})(e)&&e.touches.length<2&&e.preventDefault&&e.preventDefault()},P=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},a=n.shouldPreventDefault,o=void 0===a||a,c=n.delay,s=void 0===c?300:c,u=Object(r.useState)(!1),i=Object(h.a)(u,2),l=i[0],p=i[1],f=Object(r.useRef)(),d=Object(r.useRef)(),m=Object(r.useCallback)((function(t){o&&t.target&&(t.target.addEventListener("touchend",D,{passive:!1}),d.current=t.target),f.current=setTimeout((function(){e(t),p(!0)}),s)}),[e,s,o]),g=Object(r.useCallback)((function(e){var n=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];f.current&&clearTimeout(f.current),n&&!l&&t(),p(!1),o&&d.current&&d.current.removeEventListener("touchend",D)}),[o,t,l]);return{onMouseDown:function(e){return m(e)},onTouchStart:function(e){return m(e)},onMouseUp:function(e){return g(e)},onMouseLeave:function(e){return g(e,!1)},onTouchEnd:function(e){return g(e)}}},L=function(e){var t=Object(f.g)(),n=Object(J.b)(),o=(Object(J.c)((function(e){return e.reciepient})),Object(J.c)((function(e){return e.history})),Object(J.c)((function(e){return e.loggedInUser}))),c=Object(r.useState)([]),s=Object(h.a)(c,2),u=s[0],i=s[1],l=Object(r.useState)([]),p=Object(h.a)(l,2),d=p[0],g=p[1],v=Object(r.useState)([o]),y=Object(h.a)(v,2),j=y[0],O=(y[1],function(e,t){var n=a.a.useState((function(){var n=localStorage.getItem(e);return n?JSON.parse(n):t})),r=Object(h.a)(n,2),o=r[0],c=r[1];return a.a.useEffect((function(){window.localStorage.setItem(e,JSON.stringify(o))}),[o,e]),[o,c]}("ptr",0)),w=Object(h.a)(O,2),x=w[0],E=w[1],S=Object(k.useSpeechSynthesis)(),N=S.speak,C=S.voices,R=Object(r.useState)(""),M=Object(h.a)(R,2),I=M[0],D=M[1],L=Object(r.useState)(!1),A=Object(h.a)(L,2),_=A[0],Y=A[1],B=Object(k.useSpeechRecognition)({onResult:function(e){D(e.replace(/[^\d]/g,""))},onEnd:function(){console.log("Final number:",I),10===I.length?(Q("The number recorded is ".concat(I.split("").join(" "),". Click to accept and long press to reject it.")),Y(!0)):Q("Invalid entry. Please record the number again.")}}),F=B.listen,G=B.listening,W=B.stop,H=P((function(){Q("Discarding number."),Y(!1),D("")}),(function(){Q("Adding contact..."),K().then((function(){Y(!1),D("")}))}),{shouldPreventDefault:!0,delay:300}),V=function(){G||F()},$=function(){G&&W()},q=null;C.forEach((function(e){"hi-EN"===e.lang&&(q=e)}));var z="";Object(r.useEffect)((function(){function t(){return(t=Object(U.a)(T.a.mark((function t(){return T.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("https://stormy-tundra-81519.herokuapp.com/contacts",{method:"get",headers:{"Content-type":"application/json"}}).then((function(e){return e.json()})).then((function(e){i(e)}));case 2:setTimeout(Object(U.a)(T.a.mark((function t(){return T.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("https://stormy-tundra-81519.herokuapp.com/contacts/friends",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:e.loggedinUser})}).then((function(e){return e.json()})).then((function(e){g(e)})).catch((function(e){return console.log(e)}));case 2:case"end":return t.stop()}}),t)}))),50);case 3:case"end":return t.stop()}}),t)})))).apply(this,arguments)}!function(){t.apply(this,arguments)}()}),[e.loggedinUser,d]);var K=function(){var t=Object(U.a)(T.a.mark((function t(){var n;return T.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("https://stormy-tundra-81519.herokuapp.com/contacts",{method:"get",headers:{"Content-type":"application/json"}}).then((function(e){return e.json()})).then((function(e){i(e),console.log(e)}));case 2:return n=!1,u.forEach(function(){var t=Object(U.a)(T.a.mark((function t(r){return T.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(r.username===e.loggedinUser||r.phone!==I){t.next=6;break}return n=!0,t.next=4,fetch("https://stormy-tundra-81519.herokuapp.com/contacts/addcontact",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:e.loggedinUser,friend:r.username})}).then((function(e){return e.json()})).then((function(e){return console.log(e)})).catch((function(e){return console.log(e)}));case 4:return t.next=6,fetch("https://stormy-tundra-81519.herokuapp.com/contacts/friends",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:e.loggedinUser})}).then((function(e){return e.json()})).then((function(e){Q("Number added to friend list."),g(e),console.log("friendlist",e)})).catch((function(e){return console.log(e)}));case 6:return Y(!1),t.abrupt("return");case 8:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()),Y(!1),!1===n&&(Q("User doesnt exist"),b.a.toast({html:"User doesnt exist!!"})),t.abrupt("return");case 7:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),Q=function(e){N({text:e,voice:q}),b.a.toast({html:e})};return a.a.createElement("div",{className:"maindiv"},a.a.createElement("div",{className:"buttons"},a.a.createElement("div",{className:"top-left button",onClick:function(){0!==d.length?0==x?(E(d.length-1),console.log(d[d.length-1]),z=j.indexOf(d[d.length-1].username)>-1?" online":" not online",Q(d[d.length-1].username+z)):(E(x-1),console.log(d[x-1]),z=j.indexOf(d[x-1].username)>-1?" online":" not online",Q(d[x-1].username+z)):Q("You have no friends, Add new friends using the center button!")}},"Left"),a.a.createElement("div",{className:"top-right button",onClick:function(){0!==d.length?x==d.length-1?(E(0),console.log(d[0]),z=j.indexOf(d[0].username)>-1?" online":" not online",Q(d[0].username+z)):(E(x+1),console.log(d[x+1]),z=j.indexOf(d[x+1].username)>-1?" online":" not online",Q(d[x+1].username+z)):Q("You have no friends, Add new friends using the center button")}},"Right"),a.a.createElement("div",{className:"bottom-left button",onClick:function(){localStorage.setItem("ptr",0),m("username"),m("password"),e.logout()}},"Logout"),a.a.createElement("div",{className:"bottom-right button",onClick:function(){d!==[]?d[x].username===e.loggedinUser?Q("You cant chat with yourself. LONER!"):(n({type:"Update_reciepient",payload:{reciepientName:d[x].username}}),Q("Entering chat with ".concat(d[x].username)),t.push("/usr/chat")):Q("You have no friends. Add new friends using the center button!")}},"Chat"),_?a.a.createElement("div",Object.assign({className:"center"},H),"Verify contact.."):a.a.createElement("div",{className:"center",onTouchStart:V,onTouchEnd:$,onMouseDown:V,onMouseUp:$,onMouseLeave:$},G?"Listening...":"Add")),a.a.createElement("div",{className:"current",onClick:function(){Q("You are on Contacts page. ".concat(d!==[]?"The contacts pointer is on ".concat(d[x].username):"You have no friends, add new friends using the center button."))}},"Current"))},A=n(22),_=(n(59),function(e){var t=Object(J.b)(),n=Object(f.g)(),o=Object(J.c)((function(e){return e.history})),c=Object(r.useState)(0),s=Object(h.a)(c,2),u=s[0],i=s[1],l=Object(k.useSpeechSynthesis)(),p=l.speak,d=l.voices,m=null;d.forEach((function(e){"hi-EN"===e.lang&&(m=e)})),Object(r.useEffect)((function(){function n(){return(n=Object(U.a)(T.a.mark((function n(){var r,a,o;return T.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return(r=new Headers).append("Content-Type","application/json"),a=JSON.stringify({to:e.recipient,from:e.loggedinUser}),o={method:"POST",headers:r,body:a,redirect:"follow",credentials:"include"},n.next=6,fetch("https://stormy-tundra-81519.herokuapp.com/message/history",o).then((function(e){return e.json()})).then(function(){var e=Object(U.a)(T.a.mark((function e(n){return T.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:console.log("data from server:",n),t(R(n)),console.log("history from contact: ",n),i(n.length-1);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).catch((function(e){return console.log("error",e)}));case 6:case"end":return n.stop()}}),n)})))).apply(this,arguments)}!function(){n.apply(this,arguments)}()}),[e.loggedinUser]);var g=function(e){p({text:e,voice:m}),b.a.toast({html:e})},v=function(){var e=Object(U.a)(T.a.mark((function e(t){return T.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(void 0!==t){e.next=2;break}return e.abrupt("return");case 2:if(g("From ".concat(t.from," To ").concat(t.to," ")),"text"!==t.type){e.next=7;break}g("The text message was ".concat(t.text.charAt(0).toUpperCase()+t.text.slice(1))),e.next=12;break;case 7:return g("The audio message was "),e.next=10,new Promise((function(e){return setTimeout(e,6e3)}));case 10:new Audio(t.enc).play();case 12:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return a.a.createElement("div",{className:"maindiv"},a.a.createElement("div",{className:"buttons"},a.a.createElement("div",{className:"top-left button",onClick:Object(U.a)(T.a.mark((function t(){var n;return T.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:0!==o.length?0==u?g("No more previous messages"):(i(u-1),n=o[u-1],console.log(n),v(n)):g("There has been no conversation with ".concat(e.recipient));case 1:case"end":return t.stop()}}),t)})))},"Left"),a.a.createElement("div",{className:"top-right button",onClick:Object(U.a)(T.a.mark((function t(){var n;return T.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:0!==o.length?u==o.length-1?g("No more new messages"):(i(u+1),n=o[u+1],console.log(n),v(n)):g("There has been no conversation with ".concat(e.recipient));case 1:case"end":return t.stop()}}),t)})))},"Right"),a.a.createElement("div",{className:"bottom-left button",onClick:function(){n.push("/usr/contacts"),g("Going back to contacts page")}},"Back"),a.a.createElement(A.ReactMediaRecorder,{render:function(e){var r=e.status,o=e.startRecording,c=e.stopRecording,s=e.mediaBlobUrl,u=function(){o()},i=function(){var e=Object(U.a)(T.a.mark((function e(){var r,a;return T.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(c(),s){e.next=3;break}return e.abrupt("return");case 3:return e.next=5,fetch(s).then((function(e){return e.blob()}));case 5:r=e.sent,(a=new FileReader).readAsDataURL(r),a.onloadend=function(){var e=a.result;t(I({type:"audio",enc:e})),n.push("/usr/recorder")};case 9:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return a.a.createElement("div",{className:"bottom-right button",onTouchStart:u,onTouchEnd:i,onMouseDown:u,onMouseUp:i,onMouseLeave:i},"recording"===r?"Recording...":"Record")}}),a.a.createElement("div",{className:"center",onClick:Object(U.a)(T.a.mark((function t(){return T.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(o===[]){t.next=8;break}return i(o.length-1),g("Jumping back to latest message"),t.next=5,new Promise((function(e){return setTimeout(e,3e3)}));case 5:v(o[o.length-1]),t.next=9;break;case 8:g("There has been no conversation with ".concat(e.recipient));case 9:case"end":return t.stop()}}),t)})))},"Latest")),a.a.createElement("div",{className:"current",onClick:Object(U.a)(T.a.mark((function t(){return T.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return console.log(o),g("You are on Chat page with ".concat(e.recipient,". ").concat(0!==o.length?"Current message is ":"There are no messages here.")),t.next=4,new Promise((function(e){return setTimeout(e,4e3)}));case 4:v(o[u]);case 5:case"end":return t.stop()}}),t)})))},"Current"))});n(60);function Y(e){var t=Object(k.useSpeechSynthesis)(),n=t.speak,r=t.voices,o=Object(J.b)(),c=Object(J.c)((function(e){return e.message})),s=Object(J.c)((function(e){return e.reciepient})),u=Object(f.g)(),i=null;r.forEach((function(e){"hi-IN"===e.lang&&(i=e)}));var l=function(e){n({text:e,voice:i}),b.a.toast({html:e})},p=function(){var t=Object(U.a)(T.a.mark((function t(){return T.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return l("Sending message to ".concat(s,".")),t.next=3,e.sendMessage();case 3:return t.next=5,new Promise((function(e){return setTimeout(e,2e3)}));case 5:u.push("/usr/chat");case 6:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();return a.a.createElement("div",{className:"maindiv"},a.a.createElement("div",{className:"buttons"},a.a.createElement(A.ReactMediaRecorder,{render:function(e){var t=e.status,n=e.startRecording,r=e.stopRecording,c=e.mediaBlobUrl,s=function(){n()},u=function(){var e=Object(U.a)(T.a.mark((function e(){var t,n;return T.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r(),c){e.next=3;break}return e.abrupt("return");case 3:return e.next=5,fetch(c).then((function(e){return e.blob()}));case 5:t=e.sent,(n=new FileReader).readAsDataURL(t),n.onloadend=function(){var e=n.result;o(I({type:"audio",enc:e}))};case 9:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return a.a.createElement("div",{className:"top-left button",onTouchStart:s,onTouchEnd:u,onMouseDown:s,onMouseUp:u,onMouseLeave:u},"recording"===t?"Recording...":"Re-Record")}}),a.a.createElement("div",{className:"top-right button",onClick:function(){new Audio(c.enc).play()}},"Replay"),a.a.createElement("div",{className:"bottom-left button",onClick:function(){u.push("/usr/chat"),l("Discarding the audio and going back to chat page"),o(I({}))}},"Back"),a.a.createElement("div",{className:"bottom-right button",onClick:p},"Send")),a.a.createElement("div",{className:"current",onClick:function(){return l("You are on the recordings page")}},"Current"))}var B=function(e){var t=Object(J.b)(),n=Object(f.g)(),o=Object(f.h)().type,c=Object(J.c)((function(e){return e.reciepient})),s=Object(J.c)((function(e){return e.message})),u=Object(J.c)((function(e){return e.history})),i=Object(J.c)((function(e){return e.loggedInUser})),l="https://stormy-tundra-81519.herokuapp.com/",p=new WebSocket("wss://stormy-tundra-81519.herokuapp.com/message"),h=[],d=function(){var e=Object(U.a)(T.a.mark((function e(){var n,r,a;return T.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return(n=new Headers).append("Content-Type","application/json"),r=JSON.stringify({to:c,from:i}),a={method:"POST",headers:n,body:r,redirect:"follow",credentials:"include"},e.next=6,fetch("https://stormy-tundra-81519.herokuapp.com/message/history",a).then((function(e){return e.json()})).then(function(){var e=Object(U.a)(T.a.mark((function e(n){return T.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:console.log("data from server:",n),t(R(n)),console.log("history from contact: ",u);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).catch((function(e){return console.log("error",e)}));case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();Object(r.useEffect)((function(){function e(){return(e=Object(U.a)(T.a.mark((function e(){var n;return T.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return p.onerror=function(e){console.log(e)},p.onmessage=function(e){console.log(e.data),d()},n=g("username"),e.next=5,fetch(l+"self/".concat(n),{method:"GET",headers:{Accept:"application/json","Content-Type":"application/json"},credentials:"include"}).then((function(e){return e.json()})).then(function(){var e=Object(U.a)(T.a.mark((function e(n){return T.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:console.log("data from fetch(/self): ",n),t(M(n.username));case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}!function(){e.apply(this,arguments)}()}),[i]);if(""===i)return null;switch(o){case"contacts":return a.a.createElement(L,{loggedinUser:i,logout:function(){p.close(),fetch("https://stormy-tundra-81519.herokuapp.com/auth/logout",{method:"GET"}).then((function(e){n.push("/signin")})).catch((function(e){return console.log(e)}))}});case"chat":if(void 0!==c)return a.a.createElement(_,{loggedinUser:i,recipient:c});case"recorder":if(void 0!==c)return a.a.createElement(Y,{sendMessage:function(){console.log("Message body in websocket function:",s);var e=JSON.stringify({from:i,to:c,type:s.type,enc:s.enc,text:s.text,timestamp:Date.now()});p?(h.forEach((function(e){p.send(e)})),h.length=0,p.send(e)):(console.log("ws not available"),h.includes(e)||h.push(e))}});default:return null}},F=n(18),G=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"Update_reciepient":var n=t.payload.reciepientName;return n;default:return e}},W=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"Update_message":var n=t.payload;return n;default:return e}},H=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"Update_history":var n=t.payload.history;return n;default:return e}},V=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"Update_loggedInUser":var n=t.payload.loggedinUser;return n;default:return e}},$=n(33),q=n(11),z=Object(q.a)(),K=Object(F.createStore)(Object(F.combineReducers)({reciepient:G,message:W,history:H,loggedInUser:V}),Object($.composeWithDevTools)()),Q=function(e){Object(i.a)(n,e);var t=Object(l.a)(n);function n(){return Object(s.a)(this,n),t.apply(this,arguments)}return Object(u.a)(n,[{key:"render",value:function(){return a.a.createElement(J.a,{store:K},a.a.createElement(p.a,{history:z},a.a.createElement(f.d,null,a.a.createElement(f.b,{exact:!0,path:"/"},a.a.createElement(S,null)),a.a.createElement(f.b,{path:"/signup"},a.a.createElement(N,null)),a.a.createElement(f.b,{path:"/usr/:type"},a.a.createElement(B,null)),a.a.createElement(f.a,{to:"/"}))))}}]),n}(r.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(a.a.createElement(a.a.StrictMode,null,a.a.createElement(Q,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[37,1,2]]]);
//# sourceMappingURL=main.c3040f44.chunk.js.map