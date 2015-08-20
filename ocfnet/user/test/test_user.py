from flask import session
from flask_wtf.csrf import generate_csrf

from ocfnet.user.models import User
from ocfnet.test import OCFNetTest


class UserTestCase(OCFNetTest):
    user_data = dict(
        username='test',
        email='test@example.com',
        password='test1234'
    )
    def login(self, username, password):
        return self.client.post('/login', data=dict(
            username=username,
            password=password
        ))

    def test_registration(self):
        post_data = self.user_data
        post_data['confirm'] = post_data['password']
        self.assert200(self.client.post('/register', data=post_data))
        assert len(User.all()) == 1;
        self.assert400(self.client.post('/register', data=post_data))
        self.assert200(self.login(self.user_data['username'], 
                                  self.user_data['password']))

    def test_login(self):
        test_user = User(**self.user_data)
        test_user.save()
        self.assert200(self.login(self.user_data['username'], 
                                  self.user_data['password']))
        self.assert400(self.login(self.user_data['username'] + 'x', 
                                  self.user_data['password']))
        self.assert400(self.login(self.user_data['username'], 
                                  self.user_data['password'] + 'x'))
        self.assert400(self.login(self.user_data['username'] + 'x', 
                                  self.user_data['password'] + 'x'))

