// About.js
import {useState, useEffect} from "react";
import React from "react";
import "./App.css";



import {db} from "./firebase-config"
import {collection, getDocs, addDoc, updateDoc, doc} from "firebase/firestore";

import {
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "./firebase-config";

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
    <ol><button type='button' className="btn btn-primary" onClick={() => { clickedSort(1);}}>Facility Quality{}</button></ol>
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

let logged = false;
function ReviewDatabase(string){
    const [input, setInput] = useState(""); //this will be the input review from the user
    const [FacilityQRating, setFacilityQRating] = useState(-1); //this will be the inout rating from the user
    const [HoursRating, setHoursRating] = useState(-1); //this will be the inout rating from the user
    const [SpaceRating, setSpaceRating] = useState(-1); //this will be the inout rating from the user
    const [LocationRating, setLocationRating] = useState(-1); //this will be the inout rating from the user
    const [BusinessRating, setBusinessRating] = useState(-1); //this will be the inout rating from the user

    
    const [reviews, setReview] = useState([]);
    const reviewCollectionRef = collection(db, string)

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

    const createReview = async() => {
    if (logged){
      if (BusinessRating != -1 && LocationRating != -1 && SpaceRating != -1 && HoursRating != -1 && FacilityQRating != -1 && input != "" && BusinessRating <= 5 && BusinessRating >= 0 && LocationRating <= 5 && LocationRating >= 0 && SpaceRating >= 0 && SpaceRating <= 5 && HoursRating >= 0 && HoursRating <= 5 && FacilityQRating >= 0 && FacilityQRating <= 5) {
        await addDoc(reviewCollectionRef, { TextReview: input ,BusinessRating: BusinessRating, LocationRating: LocationRating, SpaceRating: SpaceRating, HoursRating: HoursRating, FacilityQRating : FacilityQRating, upvotes: Number(0), downvotes: Number(0) })
        alert("Review Submitted! Refresh page to view.")
      }
      else{
          alert("Please leave a review and rating (1-5) in order to submit")
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
      <div className="form-container">

      <input
        placeholder="Review (Optional). . ."
        onChange={(event) => {
          setInput(event.target.value);
        }}
        class="ReviewBox"
        />
      <div className="input-group-horiz">
      <p className="no-margin">Facility Quality:
      <input
        type="number"
        min={0}
        max={5}
        placeholder="0-5"
        onChange={(event) => {
          setFacilityQRating(event.target.value);
        }}
        class="RatingBox"
        /></p>

      <p className="no-margin">Hours:
      <input
        type="number"
        min={0}
        max={5}
        placeholder="Hours Rating"
        onChange={(event) => {
          setHoursRating(event.target.value);
        }}
        class="RatingBox"
        /></p>

      <p className="no-margin">Space:
      <input
        type="number"
        min={0}
        max={5}
        placeholder="0-5"
        onChange={(event) => {
          setSpaceRating(event.target.value);
        }}
        class="RatingBox"
        /></p>

      <p className="no-margin">Location:
      <input
        type="number"
        min={0}
        max={5}
        placeholder="0-5"
        onChange={(event) => {
          setLocationRating(event.target.value);
        }}
        class="RatingBox"
        /></p>
      <p className="no-margin">Business:
      <input
        type="number"
        min={0}
        max={5}
        placeholder="0-5"
        onChange={(event) => {
          setBusinessRating(event.target.value);
        }}
        class="RatingBox"
        /></p>

        
        
        <button onClick={createReview} className="rev-button">Submit Review</button>
        </div>
        </div>
          {reviews.map((review) => {
            return (
                <div className="eachReview">
                    <p>Comment: {review.TextReview}</p>
                    <p>Facility Quality Rating: {review.FacilityQRating}/5 </p>
                    <p>Hours Rating: {review.HoursRating}/5 </p>
                    <p>Space Rating: {review.SpaceRating}/5 </p>
                    <p>Location Rating: {review.LocationRating}/5 </p>
                    <p>Business Rating: {review.BusinessRating}/5 </p>

                     <button onClick={() => {upVote(review.id, review.upvotes)}} class="thumbsup"><span role="img" aria-label="thumbs-up">
        &#x1F44D;</span></button>{review.upvotes}
                    <button onClick={() => {downVote(review.id, review.downvotes)}} class="thumbsdown"><span role="img" aria-label="thumbs-down">
        &#x1F44E;
      </span></button>{review.downvotes}
                    
                </div>
                );
          })}
      </div>
    );
  }


export default RecCenters;