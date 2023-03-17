// Dorms.js
// import react packages and CSS for formatting
import {useState, useEffect, useReducer} from "react";
import React from "react";
import "./App.css";

// import database
import {db} from "./firebase-config"
import {collection, getDocs, addDoc, updateDoc, doc} from "firebase/firestore";

import {
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "./firebase-config";
import { async } from "@firebase/util";

<i class='fas fa-thumbs-up'></i>

function Dorms(){
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [matchingResults, setMatchingResults] = useState([]);

  // searches dorms page for keywords and puts them in setMatchingResults, then calls function to display them
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
    <img src="https://i.pinimg.com/736x/26/04/67/2604674112dd693949fa3cc6babe7c71--dorm-ideas-hall.jpg" alt="tripleClassic" width="720" height="405" class = "DormsCover"/>
      <p>Here you can find every dorm on campus.</p>

        {/* HTML buttons to sort reviews */}
       <b>Sort By:</b>
       <ul>
        <button type='button' className="btn btn-primary" onClick={() => { clickedSort(1);}}>Cleanliness{}</button>
        <button type='button' className="btn btn-primary" onClick={() => { clickedSort(2);}}>Noise{}</button>
        <button type='button' className="btn btn-primary" onClick={() => { clickedSort(3);}}>Living Space{}</button>
        <button type='button' className="btn btn-primary" onClick={() => { clickedSort(4);}}>Location{}</button>
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

        {/* Centennial and Olympic content */}
        <h3>Centennial/Olympic</h3>
        <img src="https://s3.amazonaws.com/cms.ipressroom.com/173/files/20218/614102382cfac27232f4ea45_Olympic+and+Centennial+Hall_5DM47510_Ext2/Olympic+and+Centennial+Hall_5DM47510_Ext2_hero.jpg"  width="250" height="200" class="CentennialOlympic"></img>
        <div class="ListOfReviews">
          <h3>Reviews:</h3><br /><br />
          {/* Pulls reviews for Centennial */}
        {ReviewDatabase("Centennial")}
        </div>
        <br />
        {/* De Neve content */}
        <h3>De Neve Acacia, Birch, Cedar, Dogwood, Evergreen, Fir</h3>
        <img src="https://fastly.4sqi.net/img/general/600x600/6826866_k4W8jsn53GD_Y6CHMaGW5AlGywjPaUPbG_8YXquH-5U.jpg"  width="250" height="200" class="DeNeveDorms"></img>
        <div class="ListOfReviews">
          <h3>Reviews:</h3><br></br>
          {/* Pulls reviews for De Neve */}
        {ReviewDatabase("DeNeve")}
        </div>
        <br />

        {/* De Neve Gardenia/Holly content*/}
        <h3>De Neve Gardenia/Holly</h3>
        <img src="https://humansofuniversity.com/wp-content/uploads/2022/05/67658661.jpg"  width="250" height="200" class="HollyGardenia"></img>
        <div class="ListOfReviews">
          <h3>Reviews:</h3><br></br>
          {/* Pulls reviews for Holly and Gardenia */}
        {ReviewDatabase("HollyGardenia")}
        </div>
        <br />

        {/* Hedrick Summit content */}
        <h3>Hedrick Summit</h3>
        <img src="https://s3-media0.fl.yelpcdn.com/bphoto/R7x3cuexqtbDRpbZKK405w/348s.jpg"  width="250" height="200" class="HSummit"></img>
        <div class="ListOfReviews">
          <h3>Reviews:</h3><br></br>
          {/* Pulls reviews for Hedrick Summit */}
        {ReviewDatabase("HeddySummit")}
        </div>
        <br /> 

        {/* Dykstra content */}
        <h3>Dykstra</h3>
        <img src="https://www.saifulbouquet.com/wp-content/uploads/2020/04/47097_web_ns_2_17_dykstramemories_picco.jpg" width="250" height="200" class="Dykstra"></img>
        <div class="ListOfReviews">
          <h3>Reviews:</h3><br></br>
          {/* Pulls reviews for Dykstra */}
        {ReviewDatabase("Dykstra")}
        </div>
        <br />

        {/* Hedrick Hall content*/}
        <h3>Hedrick Hall</h3>
        <img src="https://humansofuniversity.com/wp-content/uploads/2022/05/2b0fbb098d13dd26587a5841292cd4aa-1024x768.jpg" width="250" height="200" class="HedrickPic"></img>
        <div class="ListOfReviews">
          <h3>Reviews:</h3><br></br>
          {/* Pulls reviews for Hedrick Hall */}
        {ReviewDatabase("Hedrick")}
        </div>
        <br /> 
        {/* Hitch Suites content */}
        <h3>Hitch Suites</h3>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJ_zvnYnhBUwc_tFS-fniDWToVlSA_BgtF6g&usqp=CAU"  width="250" height="220" class="HitchSuitesPics"></img>
        <div class="ListOfReviews">
          <h3>Reviews:</h3><br></br>
          {/* Pulls reviews for Hitch */}
        {ReviewDatabase("Hitch")}
        </div>
        <br />

        {/* Rieber Hall content */}
        <h3>Rieber Hall</h3>
        <img src="https://www.sgvtribune.com/wp-content/uploads/2022/03/LDN-Z-UCLA-DORMS.jpg?w=620"  width="250" height="230" class="rieberHall"></img>
        <div class="ListOfReviews">
          <h3>Reviews:</h3><br></br>
        {/* Pulls reviews for Rieber Hall */}
        {ReviewDatabase("RieberHall")}
        </div>
        <br />

        {/* Rieber Terrace/Vista content */}
        <h3>Rieber Terrace/Vista</h3>
        <img src="https://conferences.ucla.edu/wp-content/uploads/2019/01/Summer_PlazaRooms_RieberVista.jpg"  width="250" height="200" class="RieberTerraceVista"></img>
        <div class="ListOfReviews">
          <h3>Reviews:</h3><br></br>
        {/* Pulls reviews for Rieber Vista*/}
        {ReviewDatabase("RieberVista")}
        </div>
        <br />

    </body>
    
    </html>
  );
}

// retrieves results by calling findMatches
async function retrieveMatchingResults(props){
  let searchMatches = await findMatches(props);
  return searchMatches;
}
// reads in review
const readInSearchData = async (reviewCollectionRef) => {
  const querySnapshot = await getDocs(reviewCollectionRef);

  // create array of reviews from collection
  const readInReviews = [];
  
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    data.id = doc.id;
    readInReviews.push(data);
  });

  return readInReviews;
}

// stores all the reviews from each dorm
const findMatches = async(userSearch) => {
  const hedrickCollectionRef = collection(db, "Hedrick");
  const centennialCollectionRef = collection(db, "Centennial");
  const deNeveAFCollectionRef = collection(db, "DeNeve");
  const hollyGardeniaCollectionRef = collection(db, "HollyGardenia");
  const hedrickSummitCollectionRef = collection(db, "HeddySummit");
  const dykstraCollectionRef = collection(db, "Dykstra");
  const hitchCollectionRef = collection(db, "Hitch");
  const rieberHallCollectionRef = collection(db, "RieberHall");
  const vistaTerraceCollectionRef = collection(db, "RieberVista");
// reads in text from dorm reviews to be matched with user input
  const readInHedrickReviews = await readInSearchData(hedrickCollectionRef);
  const readInCentennialReviews = await readInSearchData(centennialCollectionRef);
  const readInDeNeveAFReviews = await readInSearchData(deNeveAFCollectionRef);
  const readInHollyGardeniaReviews = await readInSearchData(hollyGardeniaCollectionRef);
  const readInHeddySummitReviews = await readInSearchData(hedrickSummitCollectionRef);
  const readInDykstraReviews = await readInSearchData(dykstraCollectionRef);
  const readInHitchReviews = await readInSearchData(hitchCollectionRef);
  const readInRieberHallReviews = await readInSearchData(rieberHallCollectionRef);
  const readInVistaTerraceReviews = await readInSearchData(vistaTerraceCollectionRef);
// initialize empty review array
  let allRevs = [];

//Function definition that reads in text from dorm reviews  
  readInHedrickReviews.forEach((review) => {
    allRevs.push("Hedrick Hall: \"" + review.Review + "\""); 
    
  });

  readInCentennialReviews.forEach((review) => {
    allRevs.push("Centennial/Olympic Halls: \"" + review.Review + "\""); 
  });

  readInDeNeveAFReviews.forEach((review) => {
    allRevs.push("De Neve Acacia, Birch, Cedar, Dogwood, Evergreen, Fir: \"" + review.Review + "\""); 
  });

  readInHollyGardeniaReviews.forEach((review) => {
    allRevs.push("De Neve Gardenia/Holly: \"" + review.Review + "\""); 
  });

  readInHeddySummitReviews.forEach((review) => {
    allRevs.push("Hedrick Summit: \"" + review.Review + "\""); 
  });

  readInDykstraReviews.forEach((review) => {
    allRevs.push("Dykstra Hall: \"" + review.Review + "\""); 
  });

  readInHitchReviews.forEach((review) => {
    allRevs.push("Hitch Suites: \"" + review.Review + "\""); 
  });

  readInRieberHallReviews.forEach((review) => {
    allRevs.push("Rieber Hall: \"" + review.Review + "\""); 
  });

  readInVistaTerraceReviews.forEach((review) => {
    allRevs.push("Rieber Vista/Terrace: \"" + review.Review + "\""); 
  });

  // store reviews with matching keywords in empty array
  let matchingElements = [];
  allRevs.forEach(item => {
    if (item.toLowerCase().includes(userSearch.toLowerCase())) {
      matchingElements.push(item)
    }
  });

  return matchingElements;
}

// initialize log-in to false
let logged = false;

// function to store user input for reviews
function ReviewDatabase(string){

  // initialize ratings, reviews, etc. variables
  const [input, setInput] = useState("");   
  const [CleanlinessRating, setCleanlinessRating] = useState(-1); 
  const [NoiseRating, setNoiseRating] = useState(-1);   
  const [SpaceRating, setSpaceRating] = useState(-1);  
  const [LocationRating, setLocationRating] = useState(-1);  

  const [allReviews, setReview] = useState([]);
  const reviewCollectionRef = collection(db, string) //grabbing "CentennialReviews" collection and sets it equal to var
  const [reducerValue, forceUpdate] = useReducer(x => x+1, 0);

  const [user, setUser] = useState({});
    useEffect(() => {
      // if user has made a change to register/login
      onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        // log in or out depending on status of currentUser (will be determined by which button pressed later)
        if (currentUser){
          logged = true; //we are logged in 
        }
        else{
          logged = false;//we are logged out now
        }
      });
      },[reducerValue])

  // function to create a review
  const createReview = async () => {
    // must be logged in
    if (logged){
      // calculate reviews, average rating, and automatically update if submit button is pressed
      if (LocationRating !=-1 && SpaceRating !=-1 && NoiseRating !=-1 && CleanlinessRating != -1 && LocationRating <= 5 && LocationRating >= 0 && SpaceRating <= 5 && SpaceRating >= 0 && NoiseRating <=5 && NoiseRating >=0 && CleanlinessRating <= 5 && CleanlinessRating >= 0 && input != "") {
        await addDoc(reviewCollectionRef, { Review: input , LocationRating: Number(LocationRating), NoiseRating: Number(NoiseRating), SpaceRating: Number(SpaceRating), CleanlinessRating: Number(CleanlinessRating), 
          Overall: ((Number(NoiseRating) + Number(LocationRating) + Number(SpaceRating) + Number(CleanlinessRating))/4),upvotes: Number(0), downvotes: Number(0), userEmail: "" })
        forceUpdate();
          //alert("Review Submitted! Refresh page to view.")
      }
      // must leave a review and rating
      else{
        alert("Please leave a review and rating (0-5) in order to submit")
      }
    }
    // must be logged in to leave a review
    else{
      alert("Please login at Home Page before leaving a review")
    }
  }

    //for updating review when upvote button clicked if user is logged in
    const upVote = async (id, numupvotes, userEmail) => { 
      if(userEmail.includes(auth.currentUser.email)){
        alert("Cannot Vote again!!")
      }
      else if(logged){
        const reviewDoc = doc(db, string, id);
        //increase number of upvotes by one and display the user email
        const newFields = {upvotes: numupvotes + 1, userEmail: [...userEmail, auth.currentUser.email]};
        await updateDoc(reviewDoc, newFields);
        //automatically refresh
        forceUpdate();
        //alert("Upvote counted!! Refresh page to view.")
      }else{
        alert("Please login at Home Page before upvoting")
      }
    }
  
    //for updating review when downvote button clicked if user is logged in
    const downVote = async (id, numdownvotes, userEmail) => { 
      if(userEmail.includes(auth.currentUser.email)){
        alert("Cannot Vote again!!")
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

  //sort reviews by popularity (within same collection)
  const sortReview = async () => {
    const querySnapshot = await getDocs(reviewCollectionRef);

    // create array of reviews from collection
    const readInReviews = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      data.id = doc.id;
      readInReviews.push(data);
    });

    readInReviews.sort((a, b) => b.upvotes - a.upvotes); //sorts from most popular -> least 

    setReview(readInReviews);
  }


  useEffect(() => {

    const getReviews = async () => {
      const data = await getDocs(reviewCollectionRef);
      setReview(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
    }

    getReviews()
  }, [reducerValue])

  // what is displayed on page using jsx
  return (
    <div className="ReviewDatabase">
    
    <div className="form-container">
    <input 
      placeholder="Review. . ." 
      onChange={(event) => 
        {setInput(event.target.value)
      }}
      class="ReviewBox"
    />

    {/* Cleanliness rating box */}
    <div className="input-group-horiz">
    <p className="no-margin">Cleanliness: 
    <input 
      placeholder="0-5" 
      type="number"
      min={0}
      max={5}
      onChange={(event) => 
        {setCleanlinessRating(event.target.value)
      }}
      class="RatingBox"
    /></p>

      {/* Noise rating box */}
    <p className="no-margin">Noise: 
    <input 
      placeholder="0-5" 
      type="number"
      min={0}
      max={5}
      onChange={(event) => 
        {setNoiseRating(event.target.value)
      }}
      class="RatingBox"
    /></p>
    
    {/* Living Space rating box */}
    <p className="no-margin">Living Space: 
    <input 
      placeholder="0-5" 
      type="number"
      min={0}
      max={5}
      onChange={(event) => 
        {setSpaceRating(event.target.value)
      }}
      class="RatingBox"
    /></p>

    {/* Location rating box */}
    <p className="no-margin">Location: 
    <input 
      placeholder="0-5" 
      type="number"
      min={0}
      max={5}
      onChange={(event) => 
        {setLocationRating(event.target.value)
      }}
      class="RatingBox"
    /></p>
    
    <button onClick={createReview} className="rev-button">Submit Review</button> 

    <button onClick={sortReview} className="rev-button">Sort by Popularity</button> 


    </div>
    </div>

        {/* Display the reviews and ratings */}
        {allReviews.map((review) => {
          return (
            <div className="eachReview">
              <p><b>Review: </b>{review.Review}</p> 
              <p><b>Overall Rating: </b>{review.Overall}/5</p>
              <p>Cleanliness: {review.CleanlinessRating}/5  |  Noise: {review.NoiseRating}/5  |  Living Space: {review.SpaceRating}/5  |  Location: {review.LocationRating}/5</p>
              <button onClick={() => {upVote(review.id, review.upvotes, review.userEmail)}} class="thumbsup"><span role="img" aria-label="thumbs-up">
        &#x1F44D;</span></button>{review.upvotes}
              <button onClick={() => {downVote(review.id, review.downvotes, review.userEmail)}}class="thumbsdown"><span role="img" aria-label="thumbs-down">
        &#x1F44E;
      </span></button>{review.downvotes}
              
              </div>
              );
        })}
    </div>
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

export default Dorms;


// //ADDED March 9th
// const sortReviews = async (string) => {

  
//   //orderBy() method specifies that the documents should be ordered by the value of the "rating" field in descending order

//   const querySnapshot = await query(reviewCollectionRef, orderBy("upvotes", "desc")); // 'query' method returns a QuerySnapshot object that contains the results of the query
//   console.log(typeof querySnapshot.docs);

//   // if (querySnapshot.docs.length > 0) {
//   //   const sortedReviews = querySnapshot.docs.map((doc) => doc.data()); //maps snapshots to data objects
//   //   console.log("Sorted reviews:", sortedReviews);
//   //   // Update the state of your component with the sorted reviews data
//   // } else {
//   //   console.warn("No reviews found.");
//   // }

//   // const sortedReviews = querySnapshot.docs.map((doc) => doc.data()); //maps snapshots to data objects
//   // console.log(sortedReviews);
//   // setReviews(sortedReviews); 
// };