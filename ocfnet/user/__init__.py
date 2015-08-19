from flask import Blueprint
from flask.ext.login import LoginManager

from ocfnet.user.forms import RegistrationForm
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