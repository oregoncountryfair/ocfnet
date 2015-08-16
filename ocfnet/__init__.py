from flask import Flask, render_templete
from flask.ext.assets import Environment, Bundle


app = Flask(__name__)

# Assets: js, jsx, css
assets = Environment(app)
assets.register('js', js)
jsx = Bundle()
assets.register('jsx', jsx)
css = Bundle()
assets.register('css', css)

@app.route('/<path:path>')
def index(path):
    """Main route for the single page app"""
    return render_template('index.html')
