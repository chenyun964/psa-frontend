var toNumber=require("./toNumber"),INFINITY=1/0,MAX_INTEGER=1.7976931348623157e308;function toFinite(e){return e?(e=toNumber(e))===INFINITY||e===-INFINITY?(e<0?-1:1)*MAX_INTEGER:e==e?e:0:0===e?e:0}module.exports=toFinite;