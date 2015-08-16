from flask.ext.assets import Bundle


js = Bundle(
    'lib/jquery.min.js',
    'lib/page.js',
    'lib/react/console-polyfill.js',
    'lib/react/es5-sham.min.js',
    'lib/react/es5-shim.min.js',
    'lib/react/JSXTransformer.js',
    'lib/react/react.js',
    'lib/bootstrap/js/bootstrap.min.js',
    'lib/lightbox/lightbox.min.js',
    'lib/fileupload/jquery.ui.widget.js',
    'lib/fileupload/jquery.iframe-transport.js',
    'lib/fileupload/jquery.fileupload.js',
    'js/ocfnet.js'
)

babel = Bundle()

css = Bundle(
    'lib/bootstrap/css/bootstrap-theme.min.css',
     'lib/bootstrap/css/bootstrap.min.css',
     'lib/lightbox/lightbox.css',
     'lib/fileupload/jquery.fileupload.css',
    'css/base.css'
)