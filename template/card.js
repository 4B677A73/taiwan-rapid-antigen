(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["card.njk"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
output += "<div class=\"card shadow-custom mb-4\">\n    <div class=\"card-body pb-3\">\n        <div class=\"d-flex mb-1\">\n            <h4 class=\"card-title mb-0\">";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "name"), env.opts.autoescape);
output += "</h4>\n            <span class=\"ms-2 small mt-auto\">";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "phone"), env.opts.autoescape);
output += "</span>\n        </div>\n        <p class=\"text-black-50 font-size-16 mb-2\"><strong>";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "address"), env.opts.autoescape);
output += "</strong></p>\n        ";
if(runtime.contextOrFrameLookup(context, frame, "count") < 10) {
output += "\n        <p class=\"mb-1 text-danger\">剩餘 ";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "count"), env.opts.autoescape);
output += " 組</p>\n        ";
;
}
else {
if(runtime.contextOrFrameLookup(context, frame, "count") <= 30) {
output += "\n        <p class=\"mb-1 text-warning\">剩餘 ";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "count"), env.opts.autoescape);
output += " 組</p>\n        ";
;
}
else {
output += "\n        <p class=\"mb-1 text-success\">剩餘 ";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "count"), env.opts.autoescape);
output += " 組</p>\n        ";
;
}
;
}
output += "\n        <p class=\"mb-0\">";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "note"), env.opts.autoescape);
output += "</p>\n    </div>\n    <div class=\"card-footer\">";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "updated"), env.opts.autoescape);
output += "</div>\n</div>";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();

