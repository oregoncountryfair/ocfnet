# OCF Intranet Site

## Requirements

* [python 2.7.X](https://www.python.org/download/releases/2.7/)
* [pip](https://pip.pypa.io/en/stable/)
* [virtualenv](https://virtualenv.pypa.io/en/latest/)
* [npm](https://npmjs.com)

## Setup

    $ git clone https://github.com/oregoncountryfair/ocfnet
    $ cd ocfnet
    $ npm install 
    $ virtualenv venv
    $ echo "\n\nexport PYTHONPATH=$(pwd)\ncd PYTHONPATH" >> venv/bin/activate
    $ source venv/bin/activate
    $ pip install -r requriements.txt
    $ alembic upgrade head
    $ mkdir -p ocfnet/static/uploads

## Build javascript bundle

    $ ./manage.py build_js

## Running the development server

    $ ./manage.py runserver -dr

Go to [localhost:5000](http://localhost:5000) in your browser.

## Custom Config [optional]

Copy the config file

    $ cp configdist.py config.py

Import the default settings and override:
    
    # config.py
    from configdist import *

    DATABASE_URL = 'sqlite:///custom.db'
