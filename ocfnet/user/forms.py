from wtforms import validators, HiddenField, PasswordField, StringField, \
    TextField, BooleanField
from wtforms.widgets import TextArea

from flask_wtf import Form


class RegistrationForm(Form):
    username = TextField('Username', [validators.Length(min=4, max=25)])
    email = TextField('Email Address', [validators.Length(min=6, max=35)])
    password = PasswordField('New Password', [
        validators.Required(),
        validators.EqualTo('confirm', message='Passwords must match')
    ])
    confirm = PasswordField('Repeat Password')
    accept_tos = BooleanField('I agree to follow the OCF Intranet Rules', [
        validators.Required()
    ])

class LoginForm(Form):
    username = TextField('Username', validators=[validators.DataRequired()])
    password = TextField('Password', validators=[validators.DataRequired()])