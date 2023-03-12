import {useState, useEffect, useCallback} from "react";
import React from 'react';
import './App.css';

//import{logged} from './Home.js';

import {db} from "./firebase-config"
import {collection, getDocs, addDoc, updateDoc, doc} from "firebase/firestore";


import {
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "./firebase-config";



function useForceUpdate() {
  const [value, setValue] = useState(0);
  return () => setValue((value) => value + 1);
}

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
            <ol><button type='button' className="btn-btn-primary" onClick={() => { clickedSort(1);}}>Health{}</button></ol>
            <ol><button type='button' className="btn-btn-primary" onClick={() => { clickedSort(2);}}>Quality{}</button></ol>
          {/* <ol><button type='button' className="btn-btn-primary" onClick={() => { clickedSort(3);}}>Time{}</button></ol> */}
            <ol><button type='button' className="btn-btn-primary" onClick={() => { clickedSort(3);}}>Hours{}</button></ol>
            <ol><button type='button' className="btn-btn-primary" onClick={() => { clickedSort(4);}}>Location{}</button></ol>
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
let clickedHealth = false;
let clickedQuality = false;
let clickedTime = false;
let clickedHours = false;
let clickedLocation = false;

let checker = "none";

function clickedSort(props)
{
    if(props === 1)
    {
      if(!clickedHealth){
        alert('Opening the health reviews') ;
        clickedHealth = true;
        checker = "Health"
      }
      else{
        alert('Closing the health reviews');
        clickedHealth = false;
        checker = "none"
      }
    }
    if(props === 2)
    {
        alert('hello, this should show up if the page rendered lol, Sort by Quality');  
    }
    if(props === 3)
    {
        alert('hello, this should show up if the page rendered lol, Sort by Hours');  
    }
    if(props === 4)
    {
        alert('hello, this should show up if the page rendered lol, Sort by Location');  
    }

}


// copy this into every file where there are reviews for authenticatio, also need one import statement thats at the top
let logged = false;
function ReviewDatabase(string){
    const [Reviews, setReview] = useState([]); //hook instead of class
    const ReviewCollectionRef = collection(db, string) //gets the collection of reviews from the database and stores into var
    const [newReview, setNewReview] = useState("");
    const [newHealthRating, setNewHealthRating] = useState(0);
    const [newQualityRating, setNewQualityRating] = useState(0);
    const [newTimeRating, setNewTimeRating] = useState(0);
    const [newLocationRating, setNewLocationRating] = useState(0);
    const [reducerValue, forceUpdate] = useReducer(x => x + 1, 0);

   //const [, updateState] = useState();
   //const forceUpdate = useCallback(() => updateState({}), []);
    const forceUpdate = useForceUpdate();

    const [user, setUser] = useState({});
    useEffect(() => {

      onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        if (currentUser){
          logged = true; //we are logged in 
        }
        else{
          logged = false;//we are logged out now
        }
      });
      })
    //end of what you need to copy
    const createReview = async () => {
      if (logged){
        if((newLocationRating !=-1 && newTimeRating !=-1 && newHealthRating != -1 && newQualityRating != -1 && newReview != "" &&  newLocationRating >=0 && newLocationRating <=5 && newTimeRating >= 0 && newTimeRating <= 5 && newHealthRating >= 0 && newHealthRating <= 5 && newQualityRating >= 0 && newQualityRating <= 5)){
        await addDoc(ReviewCollectionRef, { Review: newReview,LocationRating: Number(newLocationRating), TimeRating: Number(newTimeRating), HealthRating: Number(newHealthRating),QualityRating: Number(newQualityRating), upvotes: Number(0) });
        //alert("Review Submitted!! Refresh page to view.")

      }
      else{
        alert("Please leave a review and rating for each field (1-5) in order to submit")
      }
      }
      else{
        alert("Please Login at Home Page before leaving a review")
      }
      forceUpdate();
      };

      //for updating review when upvote button clicked
      const updateReview = async (id, numUpvotes) => {
        const reviewDoc = doc(db, string, id)
        const newFields = {upvotes: numUpvotes+1}
      //for updating review when upvote button clicked
      const updateReview = async (id, numUpvotes) => {
        const reviewDoc = doc(db, string, id)
        const newFields = {upvotes: numUpvotes+1}
        await updateDoc(reviewDoc, newFields)
        forceUpdate()
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
        }}/>
      <input
        type="number"
        min={0}
        max={5}
        placeholder="Health Rating..."
        onChange={(event) => {
          setNewHealthRating(event.target.value);
        }}
      />
      <input
        type="number"
        min={0}
        max={5}
        placeholder="Quality Rating..."
        onChange={(event) => {
          setNewQualityRating(event.target.value);
        }}
      />
      <input
        type="number"
        min={0}
        max={5}
        placeholder="Time Rating..."
        onChange={(event) => {
          setNewTimeRating(event.target.value);
        }}
      />
      <input
        type="number"
        min={0}
        max={5}
        placeholder="Location Rating..."
        onChange={(event) => {
          setNewLocationRating(event.target.value);
        }}
      />


      <button onClick={createReview}> Submit Review</button>
      {/* <button onClick={forceUpdate}>Force refresh </button> */}
      {Reviews.map((review) => {
        return (
          <div className="eachReview">

            <p>Review: {review.Review}</p>

            <p>Health Rating: {review.HealthRating}</p>
            <p>Quality Rating: {review.QualityRating}</p>
            <p>Time Rating: {review.TimeRating}</p>
            <p>Location Rating: {review.LocationRating}</p>
            <p>Upvotes: {review.upvotes}</p>
            <button onClick={() => {updateReview(review.id, review.upvotes)}}>Upvote</button>{/*upvote button */}
                </div>
                );
          })}
    </div>
    );
  }
  

export default DiningHalls;