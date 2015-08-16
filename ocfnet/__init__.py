from flask import Flask, render_template, session
from flask.ext.assets import Environment, Bundle
from flask_wtf import CsrfProtect

from ocfnet.assets import js, babel, css
from ocfnet.user import login_manager
from ocfnet.user.forms import LoginForm, RegistrationForm


app = Flask(__name__)

try:
    app.config.from_object('config')
except:
    app.config.from_object('configdist')

app.secret_key = app.config['SECRET_KEY']

csrf = CsrfProtect()
csrf.init_app(app)

# Initialize login manager
login_manager.init_app(app)

# Assets bundles: js, jsx, css
assets = Environment(app)
assets.register('js', js)
assets.register('babel', babel)
assets.register('css', css)

@app.route('/<path:path>')
def index(path):
    """Main route for the single page app"""
    return render_template('index.html')
