(function(){var a=Handlebars.template,b=Handlebars.templates=Handlebars.templates||{};b.home=a(function(a,b,c,d,e){this.compilerInfo=[2,">= 1.0.0-rc.3"],c=c||a.helpers,e=e||{};var f="",g,h="function",i=this.escapeExpression;return f+="<p>Hello1 ",(g=c.name)?g=g.call(b,{hash:{},data:e}):(g=b.name,g=typeof g===h?g.apply(b):g),f+=i(g)+'</p>\n\n<a href="#login">Go to login</a>',f})})()