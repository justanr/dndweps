from flask import Flask
from flask_bootstrap import Bootstrap
from .api import api
from .ui import ui

app = Flask(__name__)
Bootstrap(app)
app.register_blueprint(api)
app.register_blueprint(ui)

if __name__ == '__main__':
    app.run(debug=True)
