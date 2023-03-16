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
import { async } from "@firebase/util";

<i class='fas fa-thumbs-up'></i>

function Dorms(){
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
    <img src="https://i.pinimg.com/736x/26/04/67/2604674112dd693949fa3cc6babe7c71--dorm-ideas-hall.jpg" alt="tripleClassic" width="720" height="405" class = "DormsCover"/>
      <p>Here you can find every dorm on campus.</p>


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


        <h3>Centennial/Olympic</h3>
        <img src="https://s3.amazonaws.com/cms.ipressroom.com/173/files/20218/614102382cfac27232f4ea45_Olympic+and+Centennial+Hall_5DM47510_Ext2/Olympic+and+Centennial+Hall_5DM47510_Ext2_hero.jpg"  width="250" height="200" class="CentennialOlympic"></img>
        <div class="ListOfReviews">
          <h3>Reviews:</h3><br /><br />
        {ReviewDatabase("Centennial")}
        </div>
        <br />

        <h3>De Neve Acacia, Birch, Cedar, Dogwood, Evergreen, Fir</h3>
        <img src="https://fastly.4sqi.net/img/general/600x600/6826866_k4W8jsn53GD_Y6CHMaGW5AlGywjPaUPbG_8YXquH-5U.jpg"  width="250" height="200" class="DeNeveDorms"></img>
        <div class="ListOfReviews">
          <h3>Reviews:</h3><br></br>
        {ReviewDatabase("DeNeve")}
        </div>
        <br />

        <h3>De Neve Gardenia/Holly</h3>
        <img src="https://humansofuniversity.com/wp-content/uploads/2022/05/67658661.jpg"  width="250" height="200" class="HollyGardenia"></img>
        <div class="ListOfReviews">
          <h3>Reviews:</h3><br></br>
        {ReviewDatabase("HollyGardenia")}
        </div>
        <br />

        <h3>Hedrick Summit</h3>
        <img src="https://s3-media0.fl.yelpcdn.com/bphoto/R7x3cuexqtbDRpbZKK405w/348s.jpg"  width="250" height="200" class="HSummit"></img>
        <div class="ListOfReviews">
          <h3>Reviews:</h3><br></br>
        {ReviewDatabase("HeddySummit")}
        </div>
        <br /> 

        <h3>Dykstra</h3>
        <img src="https://www.saifulbouquet.com/wp-content/uploads/2020/04/47097_web_ns_2_17_dykstramemories_picco.jpg" width="250" height="200" class="Dykstra"></img>
        <div class="ListOfReviews">
          <h3>Reviews:</h3><br></br>
        {ReviewDatabase("Dykstra")}
        </div>
        <br />


        <h3>Hedrick Hall</h3>
        <img src="https://humansofuniversity.com/wp-content/uploads/2022/05/2b0fbb098d13dd26587a5841292cd4aa-1024x768.jpg" width="250" height="200" class="HedrickPic"></img>
        <div class="ListOfReviews">
          <h3>Reviews:</h3><br></br>
        {ReviewDatabase("Hedrick")}
        </div>
        <br /> 

        <h3>Hitch Suites</h3>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJ_zvnYnhBUwc_tFS-fniDWToVlSA_BgtF6g&usqp=CAU"  width="250" height="220" class="HitchSuitesPics"></img>
        <div class="ListOfReviews">
          <h3>Reviews:</h3><br></br>
        {ReviewDatabase("Hitch")}
        </div>
        <br />

        <h3>Rieber Hall</h3>
        <img src="https://www.sgvtribune.com/wp-content/uploads/2022/03/LDN-Z-UCLA-DORMS.jpg?w=620"  width="250" height="230" class="rieberHall"></img>
        <div class="ListOfReviews">
          <h3>Reviews:</h3><br></br>
        {ReviewDatabase("RieberHall")}
        </div>
        <br />

        <h3>Rieber Terrace/Vista</h3>
        <img src="https://conferences.ucla.edu/wp-content/uploads/2019/01/Summer_PlazaRooms_RieberVista.jpg"  width="250" height="200" class="RieberTerraceVista"></img>
        <div class="ListOfReviews">
          <h3>Reviews:</h3><br></br>
        {ReviewDatabase("RieberVista")}
        </div>
        <br />

    </body>
    
    </html>
  );
}

async function retrieveMatchingResults(props){
  let searchMatches = await findMatches(props);
  return searchMatches;
}

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

  const readInHedrickReviews = await readInSearchData(hedrickCollectionRef);
  const readInCentennialReviews = await readInSearchData(centennialCollectionRef);
  const readInDeNeveAFReviews = await readInSearchData(deNeveAFCollectionRef);
  const readInHollyGardeniaReviews = await readInSearchData(hollyGardeniaCollectionRef);
  const readInHeddySummitReviews = await readInSearchData(hedrickSummitCollectionRef);
  const readInDykstraReviews = await readInSearchData(dykstraCollectionRef);
  const readInHitchReviews = await readInSearchData(hitchCollectionRef);
  const readInRieberHallReviews = await readInSearchData(rieberHallCollectionRef);
  const readInVistaTerraceReviews = await readInSearchData(vistaTerraceCollectionRef);

  let allRevs = [];

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

  let matchingElements = [];
  allRevs.forEach(item => {
    if (item.toLowerCase().includes(userSearch.toLowerCase())) {
      matchingElements.push(item)
    }
  });

  return matchingElements;
}


let logged = false;
//centennial 
function ReviewDatabase(string){

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

      onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        if (currentUser){
          logged = true; //we are logged in 
        }
        else{
          logged = false;//we are logged out now
        }
      });
      },[reducerValue])
  const createReview = async () => {
    if (logged){
      if (LocationRating !=1 && SpaceRating !=-1 && NoiseRating !=-1 && CleanlinessRating != -1 && LocationRating <= 5 && LocationRating >= 0 && SpaceRating <= 5 && SpaceRating >= 0 && NoiseRating <=5 && NoiseRating >=0 && CleanlinessRating <= 5 && CleanlinessRating >= 0 && input != "") {
        await addDoc(reviewCollectionRef, { Review: input , LocationRating: Number(LocationRating), NoiseRating: Number(NoiseRating), SpaceRating: Number(SpaceRating), CleanlinessRating: Number(CleanlinessRating), 
          Overall: ((Number(NoiseRating) + Number(LocationRating) + Number(SpaceRating) + Number(CleanlinessRating))/4),upvotes: Number(0), downvotes: Number(0), userEmail: "" })
        forceUpdate();
          //alert("Review Submitted! Refresh page to view.")
      }
      else{
        alert("Please leave a review and rating (0-5) in order to submit")
      }
    }
    else{
      alert("Please login at Home Page before leaving a review")
    }
  }

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

  return (
    <div className="ReviewDatabase">
    
    <div className="form-container">
    <input 
      placeholder="Review (Optional). . ." 
      onChange={(event) => 
        {setInput(event.target.value)
      }}
      class="ReviewBox"
    />

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