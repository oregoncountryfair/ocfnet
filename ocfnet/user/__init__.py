from flask import Blueprint
from flask.ext.login import LoginManager, login_user, logout_user, \
    current_user

from ocfnet.user.forms import RegistrationForm, LoginForm
from ocfnet.user.models import User
from ocfnet.util import jsonify


user = Blueprint('user', __name__)

login_manager = LoginManager()

@user.route('/register', methods=['POST'])
def register():
    form = RegistrationForm()
    if form.validate_on_submit():
        user = User(form.username.data, form.email.data, form.password.data)
        user.save()
        return ''
    form.errors['_status_code'] = 400 
    return jsonify(**form.errors)

@user.route('/login', methods=['POST'])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        user = User.get_user(form.username.data)
        if user and user.check_password(form.password.data):
            login_user(user)
        else:
            return jsonify(username=['Invalid username, email or password.'], 
                _status_code=400)
        return ''
    form.errors['_status_code'] = 400 
    return jsonify(**form.errors)

@user.route('/logout', methods=['POST'])
def logout():
    logout_user()
    return ''
