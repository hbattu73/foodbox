from flask import Flask, render_template, request
from flask.helpers import url_for
from flask.json import jsonify
from flask_app.yelp import query
from . import app

@app.route("/")
def index():
    yelp_url = './static/images/Yelp_Logo.svg'
    map_url = './static/images/map-logo.svg'
    return render_template('index.html', yelp=yelp_url, map_logo=map_url)


@app.route('/search')
def search():
    term = request.args.get('term')
    limit = request.args.get('limit')
    location = request.args.get('location')
    sort_by = request.args.get('sort_by')

    if not (term and limit and location and sort_by):
        return jsonify({
            "status" : "failure",
            "msg" : "Provide all paremeters"
        })
    
    try :
        result = query(term, limit, location, sort_by)

    except Exception as e:
        return jsonify({
            "status" : "failure",
            "msg" : "Failed to connect to Yelp Business endpoint"
        })

    locations = len(result)
    return jsonify({
        "status" : "success",
        "locations" : locations,
        "businesses" : result
    })
