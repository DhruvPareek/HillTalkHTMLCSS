// About.js

import {useState, useEffect} from "react";
import React from "react";
import "./App.css";

import {db} from "./firebase-config"
import {collection, getDocs} from "firebase/firestore";

function Dorms(){
  ReviewDatabase();
  return (
    <html>
    <head>
    <title>HillTalk</title>
    </head>
    <body>
    <img src="https://i.pinimg.com/736x/26/04/67/2604674112dd693949fa3cc6babe7c71--dorm-ideas-hall.jpg" alt="tripleClassic" width="720" height="405" class = "tripleClassic"/>
      <p>Here you can find every dorm on campus.</p>
       <p>Sort By:</p>
       <ul>
        <ol><button type='button' className="btn btn-primary" onClick={() => { clickedSort(1);}}>Cleanliness{}</button></ol>
        <ol><button type='button' className="btn btn-primary" onClick={() => { clickedSort(2);}}>Quality{}</button></ol>
        <ol><button type='button' className="btn btn-primary" onClick={() => { clickedSort(3);}}>Space{}</button></ol>
        <ol><button type='button' className="btn btn-primary" onClick={() => { clickedSort(4);}}>Location{}</button></ol>
        </ul>
        <br></br>
        <h3>Centennial/Olympic</h3>
        <img src="https://s3.amazonaws.com/cms.ipressroom.com/173/files/20218/614102382cfac27232f4ea45_Olympic+and+Centennial+Hall_5DM47510_Ext2/Olympic+and+Centennial+Hall_5DM47510_Ext2_hero.jpg"  width="250" height="200" class="CentennialOlympic"></img>
        <br />
    </body>
    
    </html>
  );
}

function clickedSort(props)
{
    
    if(props === 1)
    {
        alert('hello, this should show up if the page rendered lol, Sort by Cleanliness') 
    }
    if(props === 2)
    {
        alert('hello, this should show up if the page rendered lol, Sort by Quality');  
    }
    if(props === 3)
    {
        alert('hello, this should show up if the page rendered lol, Sort by Space');  
    }
    if(props === 4)
    {
        alert('hello, this should show up if the page rendered lol, Sort by Location');  
    }
}

function ReviewDatabase(){
  const [reviews, setReview] = useState([]);
  const reviewCollectionRef = collection(db, "Reviews")

  useEffect(() => {
    
    const getReviews = async () => {
      const data = await getDocs(reviewCollectionRef);
      console.log(data);
    }

    getReviews()
  }, [])
}

export default Dorms;