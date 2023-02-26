import requests
from bs4 import BeautifulSoup
import pathlib

root = pathlib.Path(__file__).parent.parent.resolve()

URL = "https://pypi.org/simple/"
page = requests.get(URL)

soup = BeautifulSoup(page.content, "html.parser").find_all('a')
projects = map(lambda link: link.text, list(soup))
filtered = list(filter(lambda name: len(name) <= 100, projects))
print(f"Found {len(filtered)} projects")

with open(str(root) + '/seed/simple.index.csv', 'w+') as db:
    db.write("name\n")
    db.writelines("\n".join(filtered))
