import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route } from "react-router";
import { fetchData } from "./utils/api.js";
import { getApiConfiguration,getGenres } from "./store/homeSlice.js";
import Header from "./components/header/Header.jsx";
import Footer from "./components/footer/Footer.jsx";
import Home from "./pages/home/Home.jsx";
import SearchResult from "./pages/searchResult/SearchResult.jsx";
import Explore from "./pages/explore/Explore.jsx";
import PageNotFound from "./pages/404/PageNotFound.jsx";
import Details from "./pages/details/Details.jsx";
function App() {
  const dispatch = useDispatch();
  const { url } = useSelector((state) => state.home);
  useEffect(() => {
    fetchApiConfig();
    genresCall()
  }, []);
  const fetchApiConfig = () => {
    fetchData("/configuration").then((res) => {
      const url = {
        backdrop: res?.images.secure_base_url + "original",
        poster: res?.images.secure_base_url + "original",
        profile: res?.images.secure_base_url + "original",
      };
      dispatch(getApiConfiguration(url));
    });
  };
  const genresCall=async()=>{
    let promises=[]
    let endPoints=['tv','movie']
    let allGenres={}
    endPoints.forEach((url)=>{
      promises.push(fetchData(`/genre/${url}/list`))
    })
    const data=await Promise.all(promises)
    data.map(({genres})=>{
      return genres.map((item)=>(
        allGenres[item.id]=item
      ))
    })
    dispatch(getGenres(allGenres))
  }
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:mediaType/:id" element={<Details />} />
        <Route path="/search/:query" element={<SearchResult />} />
        <Route path="/explore/:mediaType" element={<Explore />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
