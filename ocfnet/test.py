import os
from datetime import datetime

from flask.ext.testing import TestCase
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker

from ocfnet import create_app, database


class OCFNetTest(TestCase):

    def create_app(self):
        return create_app(True)

    def setUp(self):
        # Create a database for the tests
        _basedir = os.path.abspath(os.path.dirname(__file__))
        database_uri = "sqlite:///" + os.path.join(_basedir, "test.db")
        self.engine = create_engine(database_uri)

        self.db_session = scoped_session(sessionmaker(autocommit=False,
                                                      autoflush=False,
                                                      bind=self.engine))
        database.Model.db = self.db_session
        database.Model.query = self.db_session.query_property()
        database.Model.metadata.create_all(self.engine)

    def tearDown(self):
        # Clear the db
        database.Model.metadata.drop_all(self.engine)
        self.db_session.remove()
