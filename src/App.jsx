import React, { useEffect, useState } from "react";
import "./styles/App.css";
import axios from "axios";
import Navbar from "./components/Navbar/Navbar";
import { Article } from "./components/Article/Article";
import { Bars } from "react-loader-spinner";

function App() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    async function loadNews() {
      const response = await axios.get(
        "https://api.spaceflightnewsapi.net/v3/articles"
      );
      const newsData = response.data;
      setNews(newsData);
    }

    loadNews();
  }, []);

  return (
    <>
      <Navbar />

      <section id="articles">
        {news.length === 0 ? (
          <div
            style={{
              height: "400px",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Bars
              height="80"
              width="80"
              radius="9"
              color="white"
              ariaLabel="loading"
              wrapperStyle
              wrapperClass
            />
          </div>
        ) : (
          news.map((article) => {
            return (
              <Article
                key={article.id}
                title={article.title}
                provider={article.newsSite}
                description={article.summary}
                thumbnail={article.imageUrl}
              />
            );
          })
        )}
      </section>
    </>
  );
}

export default App;
