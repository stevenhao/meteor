// Template function for rendering the boilerplate html
// Replicates the template defined in boilerplate_web.browser.html
// XXX Does not necessarily preserve formatting (e.g. additionalStaticJs newlines)
// Arguments: root : { htmlAttributes, css : [{ url }], bundledJsCssUrlRewriteHook : Function, head, dynamicHead, body, dynamicBody, inlineScriptsAllowed, additionalStaticJs, meteorRuntimeConfig }

Boilerplate_Web_Browser_Template = function(root) {
  return [].concat(

    // XXX is htmlAttributes ever anything but {}?
    // may just be a generic Blaze/Spacebars thing.
    function props1(htmlAttributes) {
      return [
        ['<html'].concat(Object.keys(htmlAttributes).map(function(key) {

          // XXX probably need to wrap strings in "".
          return key + '=' + htmlAttributes[key];
        })).join(' ') + '>'
      ];
    }(root.htmlAttributes),

    [
      '<head>'
    ],

    function each1(css) {
      var bundledJsCssUrlRewriteHook = root.bundledJsCssUrlRewriteHook;
      return _.map(css, function(obj) {
        var url = obj.url;
        return '  <link rel="stylesheet" type="text/css" class="__meteor-css__" href="' + bundledJsCssUrlRewriteHook(url) + '">';
      });
    }(root.css),

    [
      root.head,
      root.dynamicHead,
      '</head>',
      '<body>',
      root.body,
      root.dynamicBody,
      ''
    ],

    function if1(inlineScriptsAllowed) {
      var meteorRuntimeConfig = root.meteorRuntimeConfig;
      var rootUrlPathPrefix = root.rootUrlPathPrefix;

      if (inlineScriptsAllowed) {
        return [
          '<script type="text/javascript">__meteor_runtime_config__ = JSON.parse(decodeURIComponent(' + meteorRuntimeConfig + '));</script>' // XXX add 2 spaces to fix indentation
        ];
      } else {
        return [
          '<script type="text/javascript" src="' + rootUrlPathPrefix + '/meteor_runtime_config.js"></script>' // XXX add 2 spaces to fix indentation
        ];
      }
    }(root.inlineScriptsAllowed),

    [''],

    function each2(js) {
      var bundledJsCssUrlRewriteHook = root.bundledJsCssUrlRewriteHook;
      return _.map(js, function(obj) {
        var url = obj.url;
        return '  <script type="text/javascript" src="' + bundledJsCssUrlRewriteHook(url) + '"></script>';
      });
    }(root.js),

    function each3(additionalStaticJs) {
      var inlineScriptsAllowed = root.inlineScriptsAllowed;
      var rootUrlPathPrefix = root.rootUrlPathPrefix;
      return _.map(additionalStaticJs, function(obj) {
        var contents = obj.contents;
        var pathname = obj.pathname;
        if (inlineScriptsAllowed) {
          return '  <script>' + contents + '</script>';
        } else {
          return "  <script type='text/javascript' src='" + rootUrlPathPrefix + pathname + "'></script>";
        }
      });
    }(root.additionalStaticJs),

    [
      '', '',
      '</body>',
      '</html>'
    ]
  ).join('\n'); // undefined is treated as empty string (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join)
}
