from flask import Blueprint, jsonify, request
from services.pypi import PYPIService

packages = Blueprint('packages', __name__)

@packages.route('/packages/<string:query>', methods = ['GET'])
def query_packages(query):
    pypi = PYPIService()
    limit = request.args.get("limit", 50)
    offset = request.args.get("offset", 0)
    results = pypi.search(query, limit, offset)
    return jsonify(results)

@packages.route('/packages/<string:name>/versions', methods = ['GET'])
def get_package_version(name):
    pypi = PYPIService()
    results = pypi.getVersions(name)
    return jsonify(results)
