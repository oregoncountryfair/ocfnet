from flask import Flask, render_template, session
from flask.ext.assets import Environment
from flask_wtf import CsrfProtect

from ocfnet.assets import css
from ocfnet.user import login_manager, user
from ocfnet.user.forms import LoginForm, RegistrationForm


app = Flask(__name__)

try:
    app.config.from_object('config')
except:
    app.config.from_object('configdist')

app.secret_key = app.config['SECRET_KEY']

app.register_blueprint(user)

csrf = CsrfProtect()
csrf.init_app(app)

# Initialize login manager
login_manager.init_app(app)

# Assets bundles: js, jsx, css
env = Environment(app)
env.load_path = [
    'node_modules',
    'client/style'
]
env.register('css', css)

@app.route('/<path:path>')
def index(path):
    """Main route for the single page app"""
    return render_template('index.html')
