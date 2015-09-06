from datetime import datetime

from flask import current_app
from sqlalchemy import Column, DateTime, Integer, String, Boolean, Text, \
    ForeignKey, Table, or_
from sqlalchemy.orm import relationship, backref
from werkzeug.security import check_password_hash, generate_password_hash

from ocfnet.database import Model


class Role(Model):
    """
    A Role that can be applied to N users
    """
    __tablename__ = 'user_role'
    id = Column(Integer, primary_key=True)
    name = Column(String(100), unique=True)

    def __init__(self, name):
        self.name = name

    def to_json(self):
        return dict(id=self.id, name=self.name)

user_role_pivot = Table('user_role_pivot', Model.metadata,
    Column('user_id', Integer, ForeignKey('user.id')),
    Column('role_id', Integer, ForeignKey('user_role.id')))

class User(Model):
    """
    A User Model
    """
    __tablename__ = 'user'
    id = Column(Integer, primary_key=True)
    username = Column(String(255), nullable=False, unique=True)
    email = Column(String(255), unique=True)
    password = Column(Text, nullable=False)
    created_at = Column(DateTime, nullable=False, default=datetime.utcnow)
    updated_at = Column(DateTime)
    verified = Column(Boolean, default=False)
    enabled = Column(Boolean, default=False)
    token = Column(String(255))
    roles = relationship('Role', secondary=user_role_pivot, backref='users')

    def __init__(self, username, email, password):
        self.username = username.lower()
        self.email = email.lower()
        self.password = generate_password_hash(password=password,
                                               method='pbkdf2:sha512',
                                               salt_length=128)

    def check_password(self, password):
        """Check a user's password (includes salt)"""
        return check_password_hash(self.password, password)

    def is_active(self):
        if current_app.config['USER_MUST_BE_ENABLED'] and not self.enabled:
            return False
        if current_app.config['USER_MUST_BE_VERIFIED'] and not self.verified:
            return False
        return True

    def is_anonymous(self):
        return False

    def is_authenticated(self):
        return True

    def get_id(self):
        return unicode(self.id)

    @classmethod
    def get_user(cls, username_or_email):
        return cls.query.filter(or_(cls.username == username_or_email, 
                                    cls.email == username_or_email)).first()
    @classmethod
    def get_user_by_username(cls, username):
        return cls.query.filter(cls.username == username).first()

    @classmethod
    def get_user_by_email(cls, email):
        return cls.query.filter(cls.email == email).first()

    def to_json(self):
        return dict(
            username=self.username,
            email=self.email,
            created_at=self.created_at.strftime('%m/%d/%Y %H:%M:%S'),
            roles=[role.__json__() for role in self.roles])
