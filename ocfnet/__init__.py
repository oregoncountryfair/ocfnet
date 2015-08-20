import os

from flask import Flask, render_template, session
from flask.ext.assets import Environment
from flask.ext.login import current_user
from flask.json import dumps
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
root = os.path.dirname(os.path.abspath(__file__)) + '/../'
env.load_path = [
    root + 'node_modules',
    root + 'client/style'
]
env.register('css', css)

@app.route('/<path:path>')
def index(path=None):
    """Main route for the single page app"""
    data = dict(
        authed=current_user.is_authenticated()
    )
    if current_user.is_authenticated():
        data['username'] = str(current_user.username)
    print dumps(data)
    return render_template('index.html', app_data=dumps(data))
