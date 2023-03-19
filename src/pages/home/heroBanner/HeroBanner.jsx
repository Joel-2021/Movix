import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./HeroBanner.scss";
import { useNavigate } from "react-router";
import useFetch from "../../../hooks/useFetch";
import Img from "../../../components/lazyLoadImage/img.jsx";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
const HeroBanner = () => {
  const { url } = useSelector((state) => state.home);
  const navigate = useNavigate();
  const [background, setBackground] = useState("");
  const [query, setQuery] = useState("");

  const { data, loading } = useFetch("/movie/upcoming");
  const searchHandler = (e) => {
    if (e.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
    }
  };

  useEffect(() => {
    const bg =
      url.backdrop +
      data?.results[Math.floor(Math.random() * 20)].backdrop_path;
    setBackground(bg);
  }, [data]);
  return (
    <div className="heroBanner">
      {!loading && (
        <div className="backdropImg">
          <Img src={background} />
        </div>
      )}
      <div className="opacityLayer"></div>
      <ContentWrapper>
          <div className="heroBannerContent">
            <span className="title">Welcome</span>
            <span className="subTitle">
              Millions of Movies, TV shows and people to discover. Explore now
            </span>
            <div className="searchInput">
              <input
                type="text"
                placeholder="Search for Movie or tv show"
                onKeyUp={searchHandler}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button>Search</button>
            </div>
          </div>
      </ContentWrapper>
    </div>
  );
};

export default HeroBanner;
