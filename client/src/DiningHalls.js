import {useState, useEffect, useReducer} from "react";
import React from 'react';
import './App.css';

//import{logged} from './Home.js';

import {db} from "./firebase-config"
import {collection, getDocs, addDoc, updateDoc, doc} from "firebase/firestore";


import {
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "./firebase-config";


function DiningHalls() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [matchingResults, setMatchingResults] = useState([]);

  function handleSearch() {
    retrieveMatchingResults(searchTerm).then((searchMatches) => {
      setMatchingResults(searchMatches);
    });
    setShowSearchResults(true);
  }

    return (
        <html>
        <head>
        <title>HillTalk</title>
        </head>
        <body>
          <img src="https://s3.amazonaws.com/cms.ipressroom.com/173/files/20160/56a670f2bd26f54876001535_UCLAOlympicVillage6/UCLAOlympicVillage6_4d51350a-2c04-4d93-8fe3-ac4e6b248efc-prv.jpg" alt="Bplate" width="720" height="405" class = "DiningHallCover" />
          <p>This page contains every dining hall, takeout and buffet style places from around the hill.</p>
           <b>Sort By:</b>
           <ul>
            <button type='button' className="btn btn-primary" onClick={() => { clickedSort(1);}}>Healthiness{}</button>  
            <button type='button' className="btn btn-primary" onClick={() => { clickedSort(2);}}>Tastiness{}</button>  
            <button type='button' className="btn btn-primary" onClick={() => { clickedSort(3);}}>Wait Time{}</button>  
            <button type='button' className="btn btn-primary" onClick={() => { clickedSort(4);}}>Availability of Seating{}</button>
            </ul> 
            <br></br>

            <div class="searchBox">
        <h4>Search For Keywords in Reviews:</h4>
        <input type="text" value = {searchTerm}  onChange={event => setSearchTerm(event.target.value)} 
        id="searchBox" placeholder="Enter keywords..."></input>
       <button onClick={handleSearch}>Search</button><br />
       </div>

       <div class="SearchResults">  {showSearchResults ? (
    <div>
      {matchingResults.map((result) => (
        <p key={result}>{result}<br /><br /><br /></p>
      ))}
    </div>
  ) : null}</div><br /><br />

        <h3>Rendezvous</h3>
        <img src="https://www.sustain.ucla.edu/wp-content/uploads/2013/05/RNDZ_3_web_960x450.jpg"  width="250" height="200" class="Rendezvous"></img>
        <div class="ListOfReviews">
          <h3>Reviews:</h3><br></br>
        {ReviewDatabase("Rendezvous")}
        </div>
        <br />
        <br></br>
        <h3>De Neve</h3>
        <img src="https://portal.housing.ucla.edu/sites/default/files/media/images/DiningWebsite_HeaderImages_DeNeve.png"  width="250" height="200" class="DeNeveDH"></img>
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
        <img src="https://portal.housing.ucla.edu/sites/default/files/media/images/DiningWebsite_HeaderImages_TheStudyatHedrick.png"  width="250" height="200" class="TheStudy"></img>
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

  async function retrieveMatchingResults(props){
    let searchMatches = await findMatches(props);
    return searchMatches;
    // do something with hedrickMatches
  }
  
  const readInSearchData = async (reviewCollectionRef) => {
    const querySnapshot = await getDocs(reviewCollectionRef);
  
    // create array of reviews from collection
    const readInReviews = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      data.id = doc.id;
      readInReviews.push(data);
      console.log(typeof data);
    });
  
    return readInReviews;
  }

  const findMatches = async(userSearch) => {
    const rendeCollectionRef = collection(db, "Rendezvous");
    const bCafeCollectionRef = collection(db, "Bcafe");
    const bPlateCollectionRef = collection(db, "Bplate");
    const bBowlCollectionRef = collection(db, "BruinBowl");
    const dNeveCollectionRef = collection(db, "De Neve");
    const dreyCollectionRef = collection(db, "Drey");
    const epicCollectionRef = collection(db, "Epicuria");
    const feastCollectionRef = collection(db, "Feast");
    const studyCollectionRef = collection(db, "Study");
  
    const readInRendeReviews = await readInSearchData(rendeCollectionRef);
    const readInBCafeReviews = await readInSearchData(bCafeCollectionRef);
    const readInBPlateReviews = await readInSearchData(bPlateCollectionRef);
    const readInBBowlReviews = await readInSearchData(bBowlCollectionRef);
    const readInDNeveReviews = await readInSearchData(dNeveCollectionRef);
    const readInDreyReviews = await readInSearchData(dreyCollectionRef);
    const readInEpicReviews = await readInSearchData(epicCollectionRef);
    const readInFeastReviews = await readInSearchData(feastCollectionRef);
    const readInStudyReviews = await readInSearchData(studyCollectionRef);
  
    let allRevs = [];
  
    readInRendeReviews.forEach((review) => {
      allRevs.push("Rendezvous: \"" + review.Review + "\""); 
      
    });
  
    readInBCafeReviews.forEach((review) => {
      allRevs.push("BCafe: \"" + review.Review + "\""); 
    });
  
    readInBPlateReviews.forEach((review) => {
      allRevs.push("BPlate: \"" + review.Review + "\""); 
    });
  
    readInBBowlReviews.forEach((review) => {
      allRevs.push("Bruin Bowl: \"" + review.Review + "\""); 
    });
  
    readInDNeveReviews.forEach((review) => {
      allRevs.push("De Neve: \"" + review.Review + "\""); 
    });

    readInDreyReviews.forEach((review) => {
      allRevs.push("Drey: \"" + review.Review + "\""); 
    });

    readInEpicReviews.forEach((review) => {
      allRevs.push("Epicuria: \"" + review.Review + "\""); 
    });

    readInFeastReviews.forEach((review) => {
      allRevs.push("Feast: \"" + review.Review + "\""); 
    });

    readInStudyReviews.forEach((review) => {
      allRevs.push("The Study: \"" + review.Review + "\""); 
    });
  
    let matchingElements = [];
    allRevs.forEach(item => {
      if (item.toLowerCase().includes(userSearch.toLowerCase())) {
        matchingElements.push(item)
      }
    });
  
    return matchingElements;
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
let currUsername = "";
function ReviewDatabase(string){
    const [Reviews, setReview] = useState([]); //hook instead of class
    const ReviewCollectionRef = collection(db, string) //gets the collection of reviews from the database and stores into var
    const [newReview, setNewReview] = useState("");
    const [newHealthRating, setNewHealthRating] = useState(0);
    const [newQualityRating, setNewQualityRating] = useState(0);
    const [newTimeRating, setNewTimeRating] = useState(0);
    const [newSeatingRating, setNewSeatingRating] = useState(0);
    const [reducerValue, forceUpdate] = useReducer(x => x+1, 0);

    const[newUserEmail, setnewUserEmail] = useState([""]);


    const [user, setUser] = useState({});
    useEffect(() => {

      onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        if (currentUser){
          logged = true; //we are logged in 
          //setnewUserEmail([...newUserEmail, auth.currentUser.email])
        }
        else{
          logged = false;//we are logged out now
        }
      });
      }, [reducerValue])
    //end of what you need to copy
    const createReview = async () => {
      if (logged){
        if((newSeatingRating !=-1 && newTimeRating !=-1 && newHealthRating != -1 && newQualityRating != -1 && newReview != "" &&  newSeatingRating >=0 && newSeatingRating <=5 && newTimeRating >= 0 && newTimeRating <= 5 && newHealthRating >= 0 && newHealthRating <= 5 && newQualityRating >= 0 && newQualityRating <= 5)){
        await addDoc(ReviewCollectionRef, { Review: newReview, SeatingRating: Number(newSeatingRating), TimeRating: Number(newTimeRating), HealthRating: Number(newHealthRating), QualityRating: Number(newQualityRating), 
          Overall: ((Number(newSeatingRating) + Number(newTimeRating) + Number(newHealthRating) + Number(newQualityRating))/4), upvotes: Number(0), downvotes: Number(0), userEmail: ""});
        forceUpdate();
          //alert("Review Submitted!! Refresh page to view.")
      }
      else{
        alert("Please leave a review and rating for each field (0-5) in order to submit")
      }
      }
      else{
        alert("Please Login at Home Page before leaving a review")
      }
      };

     //for updating review when upvote button clicked if user is logged in
     const upVote = async (id, numupvotes, userEmail) => { // NEW CHANGE
      if(userEmail.includes(auth.currentUser.email)){
        alert("Cannot Vote again!!")
      }
      else if(logged){
        const reviewDoc = doc(db, string, id);
        const newFields = {upvotes: numupvotes + 1, userEmail: [...userEmail, auth.currentUser.email]};
        await updateDoc(reviewDoc, newFields);
        forceUpdate();
        //alert("Upvote counted!! Refresh page to view.")
      }else{
        alert("Please login at Home Page before upvoting")
      }
    }
  
    //for updating review when downvote button clicked if user is logged in
    const downVote = async (id, numdownvotes, userEmail) => { // NEW CHANGE
      if(userEmail.includes(auth.currentUser.email)){
        alert("Cannot vote again!")
      }
      else if(logged){
        const reviewDoc = doc(db, string, id);
        const newFields = {downvotes: numdownvotes + 1, userEmail: [...userEmail, auth.currentUser.email]};
        await updateDoc(reviewDoc, newFields);
        forceUpdate();
        //alert("Downvote counted!! Refresh page to view.")
      }else{
        alert("Please login at Home Page before downvoting")
      }
    }

    useEffect(() => {
      
      const getReviews = async () => {
        const data = await getDocs(ReviewCollectionRef); //getDocs returns all the documents from the collection of reviews
        setReview(data.docs.map((doc) => ({...doc.data(), id: doc.id}))); //doc.data return object containing fields and adds id field to new object
      }
  
      getReviews()  
    }, [reducerValue])

    return (
      <div className="ReviewDatabase">
      <div className="form-container">
      
        <input
        placeholder="Review (Optional)..."
        onChange={(event) => {
          setNewReview(event.target.value);
        }}
        class="ReviewBox"/>
      <div className="input-group-horiz">
      <p className="no-margin">Healthiness: 
        <input
        type="number"
        min={0}
        max={5}
        placeholder="0-5"
        onChange={(event) => {
          setNewHealthRating(event.target.value);
        }}
        class="RatingBox"
      />
      </p>
      <p className="no-margin">Tastiness: 
      <input
        type="number"
        min={0}
        max={5}
        placeholder="0-5"
        onChange={(event) => {
          setNewQualityRating(event.target.value);
        }}
        class="RatingBox"
      /></p>
      <p className="no-margin">Wait Time: 
      <input
        type="number"
        min={0}
        max={5}
        placeholder="0-5"
        onChange={(event) => {
          setNewTimeRating(event.target.value);
        }}
        class="RatingBox"
      /></p>
      <p className="no-margin">Availability of Seating: 
      <input
        type="number"
        min={0}
        max={5}
        placeholder="0-5"
        onChange={(event) => {
          setNewSeatingRating(event.target.value);
        }}
        class="RatingBox"
      /></p>


      <button onClick={createReview} className="rev-button"> Submit Review</button>
      </div>
      </div>
      {Reviews.map((review) => {
        return (
          <div className="eachReview">

            <p><b>Review: </b>{review.Review}</p>
            <p><b>Overall Rating: </b>{review.Overall}</p>
            <p>Healthiness: {review.HealthRating}/5  |  Tastiness: {review.QualityRating}/5  |  Wait Time: {review.TimeRating}/5  |  Availability of Seating: {review.SeatingRating}/5</p>

            <button onClick={() => {upVote(review.id, review.upvotes, review.userEmail)}} class="thumbsup"><span role="img" aria-label="thumbs-up">
        &#x1F44D;</span></button>{review.upvotes}
        <button onClick={() => {downVote(review.id, review.downvotes, review.userEmail)}} class="thumbsdown"><span role="img" aria-label="thumbs-down">
        &#x1F44E;
      </span></button>{review.downvotes}      
                </div>
            
                );
          })}
    </div>
    );
  }
  

export default DiningHalls;