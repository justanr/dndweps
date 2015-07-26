from flask import Blueprint, render_template

ui = Blueprint('ui', __name__)


@ui.route('/')
def home():
    return render_template('index.html')


@ui.route('/weapons')
def weapons():
    return render_template('weapons.html')


