#!/usr/bin/env python
import os

from flask import Flask, g, jsonify, render_template, flash, redirect, url_for, request
from flask_webpack import Webpack
from tinydb import TinyDB, Query

app = Flask(__name__)
app.config.from_object(__name__)

app.config.update(dict(
    DB_PATH=os.path.join(app.root_path, 'db/db.json'),
    SECRET_KEY='horse stapling or something like that',
    WEBPACK_MANIFEST_PATH=os.path.join(
        app.root_path, 'static', 'dist', 'manifest.json'),
))

app.config.from_envvar('TUT_SETTINGS', silent=True)

webpack = Webpack()
webpack.init_app(app)


def connect_db():
    # connects to database
    db = TinyDB(app.config['DB_PATH'])
    return db


def get_db():
    """Opens a db connection if there is none for the current application
    context.
    """
    if not hasattr(g, 'tinydb'):
        g.tinydb = connect_db()
    return g.tinydb


@app.teardown_appcontext
def close_db(error):
    """Closes the database again at the end of the request."""
    if hasattr(g, 'tinydb'):
        g.tinydb.close()


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/api/comments', methods=['GET'])
def show_comments():
    db = get_db()
    Comment = Query()
    comments = db.search(Comment.author.exists())

    return jsonify(comments)


@app.route('/api/comment', methods=['POST'])
def insert_comment():
    db = get_db()
    Comment = Query()
    next_id = db.count(Comment.id.exists()) + 1

    new_comment = {
        'author': request.form['author'],
        'text': request.form['text'],
        'id': next_id,
    }
    db.insert(new_comment)
    flash('Comment {} inserted'.format(next_id))

    return jsonify(new_comment)


if __name__ == "__main__":
    app.run()
