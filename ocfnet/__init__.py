from flask import Flask, render_templete
from flask.ext.assets import Environment, Bundle

from ocfnet.assets import js, babel, css


app = Flask(__name__)

# Assets: js, jsx, css
assets = Environment(app)
assets.register('js', js)
assets.register('babel', babel)
assets.register('css', css)

@app.route('/<path:path>')
def index(path):
    """Main route for the single page app"""
    return render_template('index.html')
