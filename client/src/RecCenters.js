// About.js
import {useState, useEffect, useReducer} from "react";
import React from "react";
import "./App.css";



import {db} from "./firebase-config"
import {collection, getDocs, addDoc, updateDoc, doc} from "firebase/firestore";

import {
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "./firebase-config";

function RecCenters() {
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
<img src="https://linespace.com/wp-content/uploads/2018/03/UCLA_BeFit_091615_04-1170x658.jpg" alt="BFit" width="720" height="405" class = "RecCenterCover"/>
  <p>Here you can find every recreation center on campus.</p>
   <b>Sort By:</b>
   <ul>
    <button type='button' className="btn btn-primary" onClick={() => { clickedSort(1);}}>Facility Maintenance{}</button>
    <button type='button' className="btn btn-primary" onClick={() => { clickedSort(2);}}>Hours{}</button>
    <button type='button' className="btn btn-primary" onClick={() => { clickedSort(3);}}>Space{}</button>
    <button type='button' className="btn btn-primary" onClick={() => { clickedSort(4);}}>Location{}</button>
    <button type='button' className="btn btn-primary" onClick={() => { clickedSort(5);}}>Activity Level{}</button>
    </ul><br /><br />

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
  const JWCCollectionRef = collection(db, "JWCReviews");
  const bFitCollectionRef = collection(db, "BFITReviews");
  const sunsetCollectionRef = collection(db, "SunsetRecReviews");
  const hitchBBCollectionRef = collection(db, "HitchBBReviews");
  const IMFieldCollectionRef = collection(db, "IMFieldReviews");

  const readInJWCReviews = await readInSearchData(JWCCollectionRef);
  const readInBFITReviews = await readInSearchData(bFitCollectionRef);
  const readInSunsetReviews = await readInSearchData(sunsetCollectionRef);
  const readInHitchBBReviews = await readInSearchData(hitchBBCollectionRef);
  const readInIMFieldReviews = await readInSearchData(IMFieldCollectionRef);

  let allRevs = [];

  readInJWCReviews.forEach((review) => {
    allRevs.push("John Wooden Center: \"" + review.TextReview + "\""); 
    
  });

  readInBFITReviews.forEach((review) => {
    allRevs.push("BFit: \"" + review.TextReview + "\""); 
  });

  readInSunsetReviews.forEach((review) => {
    allRevs.push("Sunset Rec: \"" + review.TextReview + "\""); 
  });

  readInHitchBBReviews.forEach((review) => {
    allRevs.push("Hitch Basketball Courts: \"" + review.TextReview + "\""); 
  });

  readInIMFieldReviews.forEach((review) => {
    allRevs.push("Intramural Fields: \"" + review.TextReview + "\""); 
  });

  let matchingElements = [];
  allRevs.forEach(item => {
    if (item.toLowerCase().includes(userSearch.toLowerCase())) {
      matchingElements.push(item)
    }
  });

  return matchingElements;
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
    
    const [reducerValue, forceUpdate] = useReducer(x => x+1, 0);

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
      }, [reducerValue])  

    const createReview = async() => {
    if (logged){
      if (BusinessRating != -1 && LocationRating != -1 && SpaceRating != -1 && HoursRating != -1 && FacilityQRating != -1 && input != "" && BusinessRating <= 5 && BusinessRating >= 0 && LocationRating <= 5 && LocationRating >= 0 && SpaceRating >= 0 && SpaceRating <= 5 && HoursRating >= 0 && HoursRating <= 5 && FacilityQRating >= 0 && FacilityQRating <= 5) {
        await addDoc(reviewCollectionRef, { TextReview: input ,BusinessRating: BusinessRating, LocationRating: LocationRating, SpaceRating: SpaceRating, HoursRating: HoursRating, FacilityQRating : FacilityQRating, 
          Overall: ((Number(BusinessRating) + Number(LocationRating) + Number(SpaceRating) + Number(HoursRating) + Number(FacilityQRating))/5), upvotes: Number(0), downvotes: Number(0) })
        forceUpdate();
        //  alert("Review Submitted! Refresh page to view.")
      }
      else{
          alert("Please leave a review and rating (0-5) in order to submit")
      }
    }
    else{
      alert("Please login at Home Page before leaving a review")
    }
    };
    
    //for updating review when upvote button clicked if user is logged in
    const upVote = async (id, numupvotes) => { // NEW CHANGE
      if(logged){
        const reviewDoc = doc(db, string, id);
        const newFields = {upvotes: numupvotes + 1};
        await updateDoc(reviewDoc, newFields);
        forceUpdate();
        //alert("Upvote counted!! Refresh page to view.")
      }else{
        alert("Please login at Home Page before upvoting")
      }
    }
  
    //for updating review when downvote button clicked if user is logged in
    const downVote = async (id, numdownvotes) => { // NEW CHANGE
      if(logged){
        const reviewDoc = doc(db, string, id);
        const newFields = {downvotes: numdownvotes + 1};
        await updateDoc(reviewDoc, newFields);
        forceUpdate();
        //alert("Downvote counted!! Refresh page to view.")
      }else{
        alert("Please login at Home Page before downvoting")
      }
    }

    useEffect(() => {
      
      const getReviews = async () => {
        const data = await getDocs(reviewCollectionRef);
        setReview(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
      }
  
      getReviews()
    }, [reducerValue])

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
      <p className="no-margin">Facility Maintenance:
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
        placeholder="0-5"
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
      <p className="no-margin">Activity Level:
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
                    <p><b>Review: </b>{review.TextReview}</p>
                    <p><b>Overall Rating: </b>{review.Overall}/5</p>
                    <p>Facility Maintenance: {review.FacilityQRating}/5  |  Hours: {review.HoursRating}/5  |  Space: {review.SpaceRating}/5  |  Location: {review.LocationRating}/5  |  Activity Level: {review.BusinessRating}/5 </p>

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