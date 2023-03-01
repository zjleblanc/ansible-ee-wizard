from flask import Blueprint, jsonify
from services.galaxy import GalaxyService

collections = Blueprint('collections', __name__)

@collections.route('/collections/<string:query>', methods = ['GET'])
def query_collections(query):
    galaxy = GalaxyService()
    results = galaxy.search(query)
    return jsonify(results)
