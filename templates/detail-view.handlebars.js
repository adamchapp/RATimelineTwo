(function(){var a=Handlebars.template,b=Handlebars.templates=Handlebars.templates||{};b["detail-view"]=a(function(a,b,c,d,e){this.compilerInfo=[2,">= 1.0.0-rc.3"],c=c||a.helpers,e=e||{};var f="",g,h="function",i=this.escapeExpression;f+='<div class="details-box">\r\n    <div class="details-title">\r\n        ',(g=c.title)?g=g.call(b,{hash:{},data:e}):(g=b.title,g=typeof g===h?g.apply(b):g),f+=i(g)+'\r\n    </div>\r\n\r\n    <div class="details-descrip">\r\n        ',(g=c.description)?g=g.call(b,{hash:{},data:e}):(g=b.description,g=typeof g===h?g.apply(b):g);if(g||g===0)f+=g;return f+='\r\n    <div>\r\n\r\n    <a href="',(g=c.link)?g=g.call(b,{hash:{},data:e}):(g=b.link,g=typeof g===h?g.apply(b):g),f+=i(g)+'">Link</a>\r\n\r\n</div>',f})})()