import requests
from bs4 import BeautifulSoup
import time
import pandas as pd

url = "https://www.bbcgoodfood.com/search?q=chilli&page="

title_list = []
link_list = []

for i in range(1, 5):
    time.sleep(1)
    url2 = url + str(i)
    res = requests.get(url2)
    soup = BeautifulSoup(res.text, "html.parser")
    articles = soup.find_all(
        class_="card card--horizontal card--inline card--with-borders text-align-left"
    )
    for article in articles:
        title = article.find("h2").get_text()
        print(title)
        title_list = title_list + [title]
        article_url = article.find("a")["href"]
        link_list = link_list + [article_url]
        print(article_url)


df_articles = pd.DataFrame({"title": title_list, "link": link_list})

print(len(df_articles))
print(df_articles.head())
