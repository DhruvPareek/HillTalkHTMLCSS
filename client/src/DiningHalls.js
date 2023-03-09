import {useState, useEffect} from "react";
import React from 'react';
import './App.css';

import{logged} from './Home.js';

import {db} from "./firebase-config"
import {collection, getDocs, addDoc, updateDoc, doc} from "firebase/firestore";

function DiningHalls() {
    return (
        <html>
        <head>
        <title>HillTalk</title>
        </head>
        <body>
          <img src="https://s3.amazonaws.com/cms.ipressroom.com/173/files/20160/56a670f2bd26f54876001535_UCLAOlympicVillage6/UCLAOlympicVillage6_4d51350a-2c04-4d93-8fe3-ac4e6b248efc-prv.jpg" alt="Bplate" width="720" height="405" class = "Bplate" />
          <p>This page contains every dining hall, takeout and buffet style places from around the hill.</p>
           <p>Sort By:</p>
           <ul>
            <ol><button type='button' className="btn btn-primary" onClick={() => { clickedSort(1);}}>Health{}</button></ol>
            <ol><button type='button' className="btn btn-primary" onClick={() => { clickedSort(2);}}>Quality{}</button></ol>
            <ol><button type='button' className="btn btn-primary" onClick={() => { clickedSort(3);}}>Time{}</button></ol>
            <ol><button type='button' className="btn btn-primary" onClick={() => { clickedSort(4);}}>Hours{}</button></ol>
            <ol><button type='button' className="btn btn-primary" onClick={() => { clickedSort(5);}}>Location{}</button></ol>
            </ul> 
            <br></br>
        <h3>Rendezvous</h3>
        <img src="https://www.sustain.ucla.edu/wp-content/uploads/2013/05/RNDZ_3_web_960x450.jpg"  width="250" height="200" class="Rendezvous"></img>
        <div class="ListOfReviews">
          <h3>Reviews:</h3><br></br>
        {ReviewDatabase("Rendezvous")}
        </div>
        <br />
        <br></br>
        <h3>De Neve</h3>
        <img src="https://portal.housing.ucla.edu/sites/default/files/media/images/DiningWebsite_HeaderImages_DeNeve.png"  width="250" height="200" class="DeNeve"></img>
        <div class="ListOfReviews">
          <h3>Reviews:</h3><br></br>
        {ReviewDatabase("De Neve")}
        </div>
        <br />
        <br></br>
        <h3>Epicuria</h3>
        <img src="https://portal.housing.ucla.edu/sites/default/files/media/images/DiningWebsite_HeaderImages_EpicuriaAckerman2.png"  width="250" height="200" class="Epicuria"></img>
        <div class="ListOfReviews">
          <h3>Reviews:</h3><br></br>
        {ReviewDatabase("Epicuria")}
        </div>
        <br />
        <br></br>
        <h3>Bplate</h3>
        <img src="https://portal.housing.ucla.edu/sites/default/files/media/images/DiningWebsite_HeaderImages_Bruin%20Plate.png"  width="250" height="200" class="Bplate"></img>
        <div class="ListOfReviews">
          <h3>Reviews:</h3><br></br>
        {ReviewDatabase("Bplate")}
        </div>
        <br />
        <br></br>
        <h3>The Study</h3>
        <img src="https://portal.housing.ucla.edu/sites/default/files/media/images/DiningWebsite_HeaderImages_TheStudyatHedrick.png"  width="250" height="200" class="The Study"></img>
        <div class="ListOfReviews">
          <h3>Reviews:</h3><br></br>
        {ReviewDatabase("Study")}
        </div>
        <br />
        <br></br>
        <h3>Bruin Cafe</h3>
        <img src="https://portal.housing.ucla.edu/sites/default/files/media/images/DiningWebsite_HeaderImages_Bruin%20Cafe.png"  width="250" height="200" class="BCafe"></img>
        <div class="ListOfReviews">
          <h3>Reviews:</h3><br></br>
        {ReviewDatabase("Bcafe")}
        </div>
        <br />
        <br></br>
        <h3>Bruin Bowl</h3>
        <img src="https://portal.housing.ucla.edu/sites/default/files/media/images/DiningWebsite_HeaderImages_Bruin%20Bowl.png"  width="250" height="200" class="BruinBowl"></img>
        <div class="ListOfReviews">
          <h3>Reviews:</h3><br></br>
        {ReviewDatabase("BruinBowl")}
        </div>
        <br />
        <br></br>
        <h3>FEAST</h3>
        <img src="https://portal.housing.ucla.edu/sites/default/files/media/images/DiningWebsite_HeaderImages_FEASTatRieber.png"  width="250" height="200" class="FEAST"></img>
        <div class="ListOfReviews">
          <h3>Reviews:</h3><br></br>
        {ReviewDatabase("Feast")}
        </div>
        <br />
        <br></br>
        <h3>The Drey</h3>
        <img src="https://portal.housing.ucla.edu/sites/default/files/media/images/DiningWebsite_HeaderImages_TheDrey_1.png"  width="250" height="200" class="Drey"></img>
        <div class="ListOfReviews">
          <h3>Reviews:</h3><br></br>
        {ReviewDatabase("Drey")}
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
        alert('hello, this should show up if the page rendered lol, Sort by Health') 
    }
    if(props === 2)
    {
        alert('hello, this should show up if the page rendered lol, Sort by Quality');  
    }
    if(props === 3)
    {
        alert('hello, this should show up if the page rendered lol, Sort by Time');  
    }
    if(props === 4)
    {
        alert('hello, this should show up if the page rendered lol, Sort by Hours');  
    }
    if(props === 5)
    {
        alert('hello, this should show up if the page rendered lol, Sort by Location'); 
    }
}

function ReviewDatabase(string){
    const [Reviews, setReview] = useState([]); //hook instead of class
    const ReviewCollectionRef = collection(db, string) //gets the collection of reviews from the database and stores into var
    const [newReview, setNewReview] = useState("");
    const [newRating, setNewRating] = useState(0);

    
    const createReview = async () => {
      if (logged){
        await addDoc(ReviewCollectionRef, { Review: newReview, Rating: Number(newRating), upvotes: Number(0) });
      }
      else{
        alert("Need to be logged in to create a Review!!")
      }
      };

      //for updating review when upvote button clicked
      const updateReview = async (id, numUpvotes) => {
        const reviewDoc = doc(db, string, id)
        const newFields = {upvotes: numUpvotes+1}
        await updateDoc(reviewDoc, newFields)
      }
    useEffect(() => {
      
      const getReviews = async () => {
        const data = await getDocs(ReviewCollectionRef); //getDocs returns all the documents from the collection of reviews
        setReview(data.docs.map((doc) => ({...doc.data(), id: doc.id}))); //doc.data return object containing fields and adds id field to new object
      }
  
      getReviews()  
    }, [])

    return (
      <div className="ReviewDatabase">
        <input
        placeholder="Review..."
        onChange={(event) => {
          setNewReview(event.target.value);
        }}class= "ReviewBox"/>
      <input
        type="number"
        placeholder="Rating..."
        onChange={(event) => {
          setNewRating(event.target.value);
        }}class= "RatingBox"
      />

      <button onClick={createReview}> Add Review</button>
      {Reviews.map((review) => {
        return (
          <div>
            <p>Review: {review.Review}</p>
            <p>Rating: {review.Rating}</p>
            <p>Upvotes: {review.upvotes}</p>
            <button onClick={() => {updateReview(review.id, review.upvotes)}}>Upvote</button>{/*upvote button */}
                </div>
                );
          })}
    </div>
    );
  }
  

export default DiningHalls;