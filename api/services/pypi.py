import psycopg2
import requests
from flask import current_app
from bs4 import BeautifulSoup

class PYPIService(object):
  def __new__(cls):
    if not hasattr(cls, 'instance'):
      cls.instance = super(PYPIService, cls).__new__(cls)
    return cls.instance

  def __init__(self) -> None:
    self.conn = psycopg2.connect(
      database= current_app.config["PYPI_DB_NAME"],
      user = current_app.config["PYPI_DB_USER"],
      password = current_app.config["PYPI_DB_PWD"],
      host = current_app.config["PYPI_DB_HOST"],
      port = current_app.config["PYPI_DB_PORT"]
    )

  def __del__(self):
    self.conn.close()

  def search(self, query, limit, offset) -> list:
    cur = self.conn.cursor()
    cur.execute(f"select name from packages where name like '%{query}%' limit {limit} offset {offset}")
    rows = map(lambda row: row[0], cur.fetchall())
    cur.close()
    return list(rows)

  def getVersions(self, package) -> list:
    simple = requests.get(f"https://pypi.org/simple/{package}/")
    links = BeautifulSoup(simple.content, "html.parser").find_all('a')
    valid = filter(lambda link: not link.text.endswith('.whl'), links)
    versions = map(self.__parse_version, valid)
    return list(versions)

  def __parse_version(self, link):
     return link.text.rstrip(".tar.gz").split("-")[-1]
