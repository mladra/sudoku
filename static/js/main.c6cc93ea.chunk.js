(this.webpackJsonpsudoku=this.webpackJsonpsudoku||[]).push([[0],[,,,,,,,function(e){e.exports=JSON.parse('[[{"value":1},{"value":1},{"value":1},{"value":1},{"value":1},{"value":1},{"value":1},{"value":1},{"value":1}],[{"value":1},{"value":1},{"value":1},{"value":1},{"value":1},{"value":1},{"value":1},{"value":1},{"value":1}],[{"value":1},{"value":1},{"value":1},{"value":1},{"value":1},{"value":1},{"value":1},{"value":1},{"value":1}],[{"value":1},{"value":1},{"value":1},{"value":1},{"value":1},{"value":1},{"value":1},{"value":1},{"value":1}],[{"value":1},{"value":1},{"value":1},{"value":1},{"value":1},{"value":1},{"value":1},{"value":1},{"value":1}],[{"value":1},{"value":1},{"value":1},{"value":1},{"value":1},{"value":1},{"value":1},{"value":1},{"value":1}],[{"value":1},{"value":1},{"value":1},{"value":1},{"value":1},{"value":1},{"value":1},{"value":1},{"value":1}],[{"value":1},{"value":1},{"value":1},{"value":1},{"value":1},{"value":1},{"value":1},{"value":1},{"value":1}],[{"value":1},{"value":1},{"value":1},{"value":1},{"value":1},{"value":1},{"value":1},{"value":1},{"value":2}]]')},function(e,t,n){e.exports=n(16)},,,,,function(e,t,n){},function(e,t,n){},function(e){e.exports=JSON.parse("{}")},function(e,t,n){"use strict";n.r(t);var a=n(0),u=n.n(a),o=n(6),r=n.n(o),l=(n(13),n(4)),c=n(1),v=(n(14),n(15),n(7));var i=function(){var e=Object(a.useState)(new Array(9).fill().map((function(){return new Array(9).fill().map((function(){return Object.assign({},{color:"#FFFFFF",value:"",selected:!1})}))}))),t=Object(c.a)(e,2),n=t[0],o=t[1],r=Date.now(),i=Object(a.useState)("00"),s=Object(c.a)(i,2),m=s[0],f=s[1],d=Object(a.useState)("00"),b=Object(c.a)(d,2),p=b[0],E=b[1],k=Object(a.useState)("00"),w=Object(c.a)(k,2),y=w[0],O=w[1],j=Object(a.useState)(!1),F=Object(c.a)(j,2),h=F[0],N=F[1],g=Object(a.useState)(!1),C=Object(c.a)(g,2),x=C[0],S=C[1],M=Object(a.useRef)(null);Object(a.useEffect)((function(){var e=setInterval((function(){var e=Date.now()-r,t=Math.floor(e/1e3/60/60),n=Math.floor((e/1e3-3600*t)/60),a=Math.floor(e/1e3-60*n-3600*t);f(L(t)),E(L(n)),O(L(a))}),1e3);return function(){return clearInterval(e)}}),[]),Object(a.useEffect)((function(){var e=function(e){if("button"!==e.target.type&&M.current&&!M.current.contains(e.target)){var t=n.map((function(e){return e.map((function(e){return e.selected=!1,e.color="#FFFFFF",e}))}));o(t)}};return document.addEventListener("mousedown",e),function(){return document.removeEventListener("mousedown",e)}}),[M]),Object(a.useEffect)((function(){var e=function(e){17===e.keyCode&&S(!0)};return document.addEventListener("keydown",e),function(){return document.removeEventListener("keydown",e)}}),[]),Object(a.useEffect)((function(){var e=function(e){17===e.keyCode&&S(!1)};return document.addEventListener("keyup",e),function(){return document.removeEventListener("keyup",e)}}),[]);var L=function(e){return("0"+e).slice(-2)},B=function(e,t){return function(){var a=x?Object(l.a)(n):n.map((function(e){return e.map((function(e){return e.selected=!1,e.color="#FFFFFF",e}))}));a[e][t].selected=!0,a[e][t].color="#F0E68C",o(a)}},D=function(){var e=n.flatMap((function(e){return e.map((function(e){return e.value}))})),t=v.flatMap((function(e){return e.map((function(e){return e.value}))}));return void 0===e.find((function(e,n){return t[n]!==e}))},J=function(e,t){return function(a){if(h){var u=Object(l.a)(n);u[e][t].selected=!0,u[e][t].color="#F0E68C",o(u)}}},R=function(e,t){return function(){N(!0),B(e,t)()}},A=function(e,t,n){var a={backgroundColor:n.color,borderRight:"1px solid black",borderBottom:"1px solid black"};return 0===e&&(a.borderTop="3px solid black"),0===t&&(a.borderLeft="3px solid black"),8!==e&&2!==e&&5!==e||(a.borderBottom="3px solid black"),8!==t&&2!==t&&5!==t||(a.borderRight="3px solid black"),a};return u.a.createElement("div",{onMouseUp:function(){N(!1)}},u.a.createElement("div",{className:"top-bar"},m,":",p,":",y),u.a.createElement("div",{className:"container"},u.a.createElement("div",{ref:M,className:"game"},n.map((function(e,t){return u.a.createElement("div",{className:"row",key:"row-".concat(t)},e.map((function(e,n){return u.a.createElement("div",{key:"".concat(t,"-").concat(n),type:"button",id:"id",className:"row-item",style:A(t,n,e),onClick:B(t,n),onMouseDown:R(t,n),onMouseEnter:J(t,n)},u.a.createElement("h2",null,e.value))})))}))),u.a.createElement("div",{className:"controls"},u.a.createElement("div",{className:"col"},u.a.createElement("h2",{style:{textAlign:"center"}},"Controls"),[[1,2,3],[4,5,6],[7,8,9]].map((function(e){return u.a.createElement("div",{className:"row",key:"nums-row-".concat(e)},e.map((function(t){return u.a.createElement("button",{key:"nums-row-".concat(e,"-num-").concat(t),type:"button",className:"nums-button",onClick:(a=t,function(){var e=n.map((function(e){return e.map((function(e){return e.selected&&(e.value=a),e}))}));o(e)})},t);var a})))})),u.a.createElement("div",{className:"row"},u.a.createElement("button",{type:"button",className:"nums-button",onClick:function(){var e=n.map((function(e){return e.map((function(e){return e.selected&&(e.value=""),e}))}));o(e)}},"Delete"),u.a.createElement("button",{type:"button",className:"nums-button",onClick:function(){var e=D();window.alert("Solved: ".concat(e))}},"Check"),u.a.createElement("button",{type:"button",className:"nums-button",onClick:function(){}},"Restart"))))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(u.a.createElement(u.a.StrictMode,null,u.a.createElement(i,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}],[[8,1,2]]]);
//# sourceMappingURL=main.c6cc93ea.chunk.js.map