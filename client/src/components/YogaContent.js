import React from 'react';
import YoutubePlayer from './YoutubePlayer'
import VideoBar from './videoBar.js'
import { useEffect, useState } from 'react'
import { GrYoga } from 'react-icons/gr'

const YogaContent = (props) => {

  let yogaStyle = { color: "#7FDBFF", fontSize: "2.5em" };
  
  const [url, setURL] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [videoId, setVideoId] = useState("");
  const [favListId, setFavListId] = useState([]);
  const [watchListId, setWatchListId] = useState([]);
  const [isFav, setIsFav] = useState(false);
  const [isWatch, setIsWatch] = useState(false);
  
  setURL(props.location.state.param1);
  setTitle(props.location.state.param2);
  setDesc(props.location.state.param3);
  setVideoId(props.location.state.param4);
  
  useEffect(() => {
    window.scrollTo(0, 0)
    fetchFavourites()
    fetchWatchList()
    checkLists()
  }, [])

  const fetchFavourites = async () => {

    try {

      const id = localStorage.getItem("userId");
      console.log(id);

      const response = await fetch(`http://localhost:5000/Favourites/${id}`, {
        method: "GET",
      });

      // results from database in JSON
      const jsonData = await response.json();
      console.log(jsonData);

      setFavListId(jsonData.map(({ id }) => id));
    } catch (err) {
      console.log(err);
    }
  }

  const fetchWatchList = async () => {

    try {

      const id = localStorage.getItem("userId");
      console.log(id);

      const response = await fetch(`http://localhost:5000/MyWatchList/${id}`, {
        method: "GET",
      });

      // results from database in JSON
      const jsonData = await response.json();
      console.log(jsonData);

      setWatchListId(jsonData.map(({ id }) => id));
    } catch (err) {
      console.log(err);
    }
  }

  const checkLists = () => {
    
    if (favListId.includes(videoId)) {
      setIsFav(true);
    }
    if (watchListId.includes(videoId)) {
      setIsWatch(true);
    }

  }
  
  return (
  <div>
    <div className="jumbotron vidWithBtns" id="yoga-content ">
      <h1 className="display-3 " id="yoga-title"><span><GrYoga style={ yogaStyle } /></span>Title content will go here</h1>
      <p className="lead" id="yoga-para">Some information about the exercise will go here which will be stored with the video in the database</p>
        <YoutubePlayer url={videoId}/>
      <VideoBar isFav={isFav} isWatch={isWatch} />
      
      </div>
      <footer className="page-footer font-small blue">
        <div className="footer-copyright text-center py-3">© 2021 Copyright</div>
      </footer>
    </div>
    

  )};

export default YogaContent;