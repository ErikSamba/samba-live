(function(){var h="area,base,basefont,br,col,frame,hr,img,input,isindex,link,meta,param,embed,source,path,animateanimateColor,circle,ellipse,glyph,hatchpath,image,line,mpath,path,polygon,polyline,rect,solidcolorstop,tref,use,view,",h=h.split(","),d={current:null,queue:{local:[],global:[]},enqueue:function(a){this.queue.local=this.queue.local.concat(a);setTimeout(function(){d.processQueue()},0)},processQueue:function(){if(!this.current){for(;this.queue.local.length;)this.queue.global.unshift(this.queue.local.pop());
if(this.queue.global.length){var a=this.queue.global.shift(),b=document.getElementById(a.id);switch(a.type){case "external":var c=document.createElement("script");this.current=c;var e=function(){c.onload=c.onerror=c.onreadystatechange=null;d.current=null;d.processQueue()};"onload"in c?(c.onload=e,c.onerror=e):c.onreadystatechange=function(){"loaded"==c.readyState&&e()};c.src=a.src;b.parentNode.replaceChild(c,b);break;case "inline":d.current=b,(0,eval)(a.code),d.current=null,b.parentNode&&b.parentNode.removeChild(b),
d.processQueue()}}}}},m=0,n=function(a,b){var c=document.createDocumentFragment(),e=document.createElement("div");for(e.innerHTML=b;e.firstChild;)c.appendChild(e.firstChild);"script"==a.nodeName.toLowerCase()||0==a.id.indexOf("dw-tmp-")?a.parentNode.insertBefore(c,a):a.appendChild(c)},k=function(a,b){var c=[],e=/src=['"]?([^\s'"]+)/i,p=/src=['"]?([^\s'"]+['"]?)/i,f=b.replace(/<script(.*?)>([\s\S]*?)<\/script>/ig,function(a,b,f){a="dw-tmp-"+m++;var d=b.match(e);d?c.push({type:"external",id:a,src:d[1]}):
c.push({type:"inline",id:a,code:f});b=("<script"+b+">\x3c/script>").replace(p,"");return"<span id='"+a+"'></span>"+b});n(a,f);d.enqueue(c)},q={code:"",node:null,append:function(a,b){this.node!=a&&(this.code="",this.node=a);this.code+=b;this.isWritable()&&(b=this.code,this.code="",k(this.node,b))},isWritable:function(){for(var a=this.code.replace(/<script[\s\S]*?<\/script>/gi,""),b=a.match(/<[a-z0-9-]+[\s>]/ig)||[],c=a.match(/<\/[a-z0-9-]+/ig)||[],e=[],d=[],f=a=0;f<b.length;f++){var g=b[f].substring(1).toLowerCase(),
g=g.substring(0,g.length-1);-1<h.indexOf(g)||-1<"colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,path,animateanimateColor,circle,ellipse,glyph,hatchpath,image,line,mpath,path,polygon,polyline,rect,solidcolorstop,tref,use,view,".indexOf(g)||(a++,e.push(g))}for(f=b=0;f<c.length;f++)g=c[f].substring(2).toLowerCase(),-1<"colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,path,animateanimateColor,circle,ellipse,glyph,hatchpath,image,line,mpath,path,polygon,polyline,rect,solidcolorstop,tref,use,view,".indexOf(g)||
(b++,d.push(g));"DCWRT_DEBUG"in window&&"function"===typeof window.CustomEvent&&"function"===typeof window.dispatchEvent&&(c={status:!0,tagsOpen:e,tagsClose:d,countOpen:a,countClose:b},a!=b&&(c.status=!1),c=new CustomEvent("documentWriteIsWritable",{detail:c}),window.dispatchEvent(c));return a!=b?!1:!0}},l=function(){for(var a=document.getElementsByTagName("script"),a=d.current||a[a.length-1]||document.body,b="",c=0;c<arguments.length;c++)b+=arguments[c];q.append(a,b)};window.replaceDocumentWrite=
function(){document.write=l;document.writeln=l;document.writeTo=k}})();
//# sourceMappingURL=documentwrite.js.map
