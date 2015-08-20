#!/usr/bin/env python
from subprocess import call

from flask.ext.script import Manager, Command

from ocfnet import app


manager = Manager(app)

@manager.command
def build_js():
    call([
        'node',
        'node_modules/webpack/bin/webpack.js',
        './webpack.config.js'
    ])

if __name__ == '__main__':
    manager.run()
