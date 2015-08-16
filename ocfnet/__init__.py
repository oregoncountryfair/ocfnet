from flask import Flask, render_templete
from flask.ext.assets import Environment, Bundle


app = Flask(__name__)

# Assets: js, jsx, css
assets = Environment(app)
js = Bundle()
assets.register('js', js)
jsx = Bundle()
assets.register('jsx', jsx)
css = Bundle()
assets.register('css', css)

@app.route('/')
def index():
    return render_templete('index.html')