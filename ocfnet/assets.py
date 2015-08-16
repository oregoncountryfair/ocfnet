from flask.ext.assets import Bundle

node_modules = (

)
js = Bundle(
    'node_modules/jquery/dist/jquery.js',
    'node_modules/page/page.js',
    'node_modules/alertifyjs/build/alertify.js',
    'node_modules/bable-core/browser.js',
    'node_modules/react/dist/react.js',
    'node_modules/bootstrap/dist/js/bootstrap.js',
    'node_modules/blueimp-bootstrap-image-gallery/js/bootstrap-image-gallery.js',
    'node_modules/blueimp-file-upload/js/vendor/jquery.ui.widget.js',
    'node_modules/blueimp-file-upload/js/jquery.iframe-transport.js',
    'node_modules/blueimp-file-upload/js/jquery.fileupload.js',

    'js/ocfnet.js'
)

babel = Bundle(
    'babel/user.js'
)

css = Bundle(
    'node_modules/alertifyjs/build/css/alertify.min.css',
    'node_modules/bootstrap/dist/css/bootstrap-theme.min.css',
    'node_modules/bootstrap/dist/css/bootstrap.min.css',
    'node_modules/blueimp-bootstrap-image-gallery/css/lightbox.css',
    'node_modules/blueimp-file-upload/css/jquery.fileupload.css',
    
    'css/base.css'
)