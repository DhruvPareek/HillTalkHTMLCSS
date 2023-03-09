// About.js
import {useState, useEffect} from "react";
import React from "react";
import "./App.css";

import{logged} from './Home.js';

import {db} from "./firebase-config"
import {collection, getDocs, addDoc, updateDoc, doc} from "firebase/firestore";



function RecCenters() {
    return (
        <html>
<head>
<title>HillTalk</title>
</head>
<body>
<img src="https://linespace.com/wp-content/uploads/2018/03/UCLA_BeFit_091615_04-1170x658.jpg" alt="BFit" width="720" height="405" class = "Bfit"/>
  <p>Here you can find every recreation center on campus.</p>
   <p>Sort By:</p>
   <ul>
    <ol><button type='button' className="btn btn-primary" onClick={() => { clickedSort(1);}}>Facility Quaity{}</button></ol>
    <ol><button type='button' className="btn btn-primary" onClick={() => { clickedSort(2);}}>Hours{}</button></ol>
    <ol><button type='button' className="btn btn-primary" onClick={() => { clickedSort(3);}}>Space{}</button></ol>
    <ol><button type='button' className="btn btn-primary" onClick={() => { clickedSort(4);}}>Location{}</button></ol>
    <ol><button type='button' className="btn btn-primary" onClick={() => { clickedSort(5);}}>Business{}</button></ol>
    </ul>
    <br></br>
        <h3>John Wooden Center</h3>
        <img src="https://pbs.twimg.com/media/CgMViMxUIAAIU-p.jpg:large"  width="250" height="200" class="JWC"></img>
        <div class="ListOfReviews">
          <h3>Reviews:</h3><br></br>
        {ReviewDatabase("JWCReviews")}
        </div>
        <br />
    <br></br>
        <h3>Bruin Fitness Center (Bfit)</h3>
        <img src="https://conferences.ucla.edu/wp-content/uploads/2019/09/bfit.jpg"  width="250" height="200" class="BFIT"></img>
        <div class="ListOfReviews">
          <h3>Reviews:</h3><br></br>
        {ReviewDatabase("BFITReviews")}
        </div>
        <br />
    <br></br>
        <h3>Sunset Canyon Recreation Center (Sunset Rec)</h3>
        <img src="https://recreation.ucla.edu/sites/default/files/styles/resize_3_2/public/2022-03/facilities_pools_600x400_1.jpg?itok=97qpWsPL"  width="250" height="200" class="SUNSETREC"></img>
        <div class="ListOfReviews">
          <h3>Reviews:</h3><br></br>
        {ReviewDatabase("SunsetRecReviews")}
        </div>
        <br />
    <br></br>
        <h3>Hitch Basketball Courts</h3>
        <img src="https://i.pinimg.com/originals/97/d5/dc/97d5dc01f8ae8694c1e8c319ee3bbf00.png"  width="250" height="200" class="HITCHBB"></img>
        <div class="ListOfReviews">
          <h3>Reviews:</h3><br></br>
        {ReviewDatabase("HitchBBReviews")}
        </div>
        <br />
    <br></br>
        <h3>Intramural Field</h3>
        <img src="https://recreation.ucla.edu/sites/default/files/styles/header_image/public/2022-03/facilities_IMfield_1156x420.jpg?itok=9NBBHMNs"  width="250" height="200" class="IMFIELD"></img>
        <div class="ListOfReviews">
          <h3>Reviews:</h3><br></br>
        {ReviewDatabase("IMFieldReviews")}
        </div>
        <br />
</body>
</html>
    );
}

function clickedSort(props)
{     
    if(props === 1)
    {
        alert('hello, this should show up if the page rendered lol, Sort by Facility Quaity') 
    }
    if(props === 2)
    {
        alert('hello, this should show up if the page rendered lol, Sort by Hours');  
    }
    if(props === 3)
    {
        alert('hello, this should show up if the page rendered lol, Sort by Space');  
    }
    if(props === 4)
    {
        alert('hello, this should show up if the page rendered lol, Sort by Location'); 
    }
    if(props === 5)
    {
        alert('hello, this should show up if the page rendered lol, Sort by Business');  
    }
}


function ReviewDatabase(string){
    const [input, setInput] = useState(""); //this will be the input review from the user
    const [rating, setRating] = useState(-1); //this will be the inout rating from the user
    const [reviews, setReview] = useState([]);
    const reviewCollectionRef = collection(db, string)
    const createReview = async() => {
    if (logged){
      if (rating != -1) {
        await addDoc(reviewCollectionRef, { TextReview: input , Rating : rating, upvotes: Number(0), downvotes: Number(0) })
      }
      else{
          alert("Please leave a rating (1-5) in order to submit")
      }
    }
    else{
      alert("Please login at Home Page before leaving a review")
    }
    };
    
    //for updating review when upvote button clicked
    const upVote = async (id, numupvotes) => { // NEW CHANGE
      const reviewDoc = doc(db, string, id);
      const newFields = {upvotes: numupvotes + 1};
      await updateDoc(reviewDoc, newFields);
    }
  
    const downVote = async (id, numdownvotes) => { // NEW CHANGE
      const reviewDoc = doc(db, string, id);
      const newFields = {downvotes: numdownvotes + 1};
      await updateDoc(reviewDoc, newFields);
    }

    useEffect(() => {
      
      const getReviews = async () => {
        const data = await getDocs(reviewCollectionRef);
        setReview(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
      }
  
      getReviews()
    }, [])

    return (
      <div className="ReviewDatabase">

      <input
        placeholder="Review (Optional). . ."
        onChange={(event) => {
          setInput(event.target.value);
        }}
        class="ReviewBox"
        />
      <input
        type="number"
        min={0}
        max={5}
        placeholder="1-5"
        onChange={(event) => {
          setRating(event.target.value);
        }}
        class="RatingBox"
        />
        <button onClick={createReview}>Submit Rating</button>
          {reviews.map((review) => {
            return (
                <div className="eachReview">
                    <p>Comment: {review.TextReview}</p>
                    <p>Rating: {review.Rating}/5  <button onClick={() => {upVote(review.id, review.upvotes)}} class="thumbsup"><span role="img" aria-label="thumbs-up">
        &#x1F44D;</span></button>{review.upvotes}
                    <button onClick={() => {downVote(review.id, review.downvotes)}} class="thumbsdown"><span role="img" aria-label="thumbs-down">
        &#x1F44E;
      </span></button>{review.downvotes}</p>
                    
                </div>
                );
          })}
      </div>
    );
  }


export default RecCenters;