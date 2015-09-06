import os

from flask import Flask, render_template, session
from flask.ext.assets import Environment
from flask.ext.login import current_user
from flask.json import dumps
from flask_wtf import CsrfProtect

from ocfnet import database
from ocfnet.assets import css
from ocfnet.user import login_manager, user_bp,  anonymous_user_data
from ocfnet.user.forms import LoginForm, RegistrationForm

def create_app(testing=False):
    app = Flask(__name__)

    try:
        app.config.from_object('config')
    except:
        app.config.from_object('configdist')
    if testing:
        app.config['TESTING'] = True
        app.config['WTF_CSRF_ENABLED'] = False

    app.secret_key = app.config['SECRET_KEY']
    app.register_blueprint(user_bp)

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

    @app.teardown_appcontext
    def shutdown_session(response):
        database.session.remove()

    @app.route('/')
    @app.route('/<path:path>')
    def index(path=None):
        """Main route for the single page app"""
        data = dict(
            user=anonymous_user_data,
            alerts=[]
        )
        if current_user.is_authenticated():
            data['user'] = current_user
        return render_template('index.html', app_data=dumps(data))

    return app