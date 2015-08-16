import simplejson as json
from flask.json import dumps


class ExtensibleJSONEncoder(json.JSONEncoder):
    """A JSON encoder that returns the to_json method if present"""
    def default(self, obj):
        if hasattr(obj, 'to_json'):
            return obj.to_json()
        return super(ExtensibleJSONEncoder, self).default(obj)

def jsonify(*args, **kwargs):
    """
    Returns a json response
    """
    data = None
    status = kwargs.pop('_status_code', 200)
    if args:
        data = args[0] if len(args) == 1 else args
    if kwargs:
        if data:
            if type(data) != list:
                data = [data]
            data.append(dict(**kwargs))
        else:
            data = dict(**kwargs)
    return app.response_class(dumps(data,
        indent=indent),
        mimetype='application/json')    