#!/usr/bin/env python
from subprocess import call

from flask.ext.script import Manager, Command

from ocfnet import app


manager = Manager(app)

@manager.command
def build_js():
    call(['webpack', './webpack.config.js'])

if __name__ == '__main__':
    manager.run()
