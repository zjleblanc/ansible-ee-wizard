from flask import Blueprint, jsonify
from ..services.galaxy import GalaxyService

collections = Blueprint('collections', __name__)

@collections.route('/collections/<string:query>', methods = ['GET'])
def query_collections(query):
    galaxy = GalaxyService()
    results = galaxy.search(query)
    return jsonify(results)

@collections.route('/collections/<string:collection_name>/versions', methods = ['GET'])
def get_versions(collection_name):
    galaxy = GalaxyService()
    results = galaxy.getVersions(collection_name)
    return jsonify(results)
