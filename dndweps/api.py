from flask import jsonify, request, Blueprint
import json
from random import choice, sample
from werkzeug.exceptions import BadRequest

api = Blueprint('api', __name__, url_prefix='/api')

with open('weapons.json') as fh:
    weapons = json.load(fh)

with open('properties.json') as fh:
    attributes = json.load(fh)


def make_weapon(num_attrs=1):
    weapon = choice(weapons)
    specials = sample(attributes, num_attrs)

    if num_attrs == 1:
        name = ' '.join([specials[0]['prefix'], weapon['name']])
    else:
        prefix = ' '.join([a['prefix'] for a in specials[:-1]])
        name = ' '.join([prefix, weapon['name'], specials[-1]['suffix']])

    attrs = [weapon['attributes']]
    attrs.extend([s['property'] for s in specials])

    return {'name': name, 'attributes': attrs}


@api.route('/weapons')
def serve_weapons():
    num_weps = int(request.args.get('weps', 1))
    num_props = int(request.args.get('props', 1))

    if num_weps <= 0:
        raise BadRequest('Must request one or more weapons')
    if not 0 < num_props <= len(attributes):
        raise BadRequest('Number of properties must be between 1 and {0}'
                         .format(len(attributes)))

    weapons = [make_weapon(num_props) for _ in range(num_weps)]
    return jsonify({'weapons': weapons})


@api.route('/attributes')
def serve_attributes():
    return jsonify({'attributes': attributes})
