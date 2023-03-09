// About.js

import {useState, useEffect} from "react";
import React from "react";
import "./App.css";
import{logged} from './Home.js';

import {db} from "./firebase-config"
import {collection, getDocs, addDoc, updateDoc, doc} from "firebase/firestore";

<i class='fas fa-thumbs-up'></i>

function Dorms(){
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
        <div class="ListOfReviews">
          <h3>Reviews:</h3><br></br>
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

//centennial 
function ReviewDatabase(string){

  const [input, setInput] = useState(""); //empty state is "" bc its a empty string  
  const [rating, setRating] = useState(0); //empty state is "" bc its a empty string  
  //const [upvotes, setUpVotes] = useState(0) //empty state is 0 bc there are 0 votes at the beginning //NEW CHANGE
  //const [downvotes, setDownVotes] = useState(0)

  const [allReviews, setReview] = useState([]);
  const reviewCollectionRef = collection(db, string) //grabbing "CentennialReviews" collection and sets it equal to var

  const createReview = async () => {
    if (logged){
      await addDoc(reviewCollectionRef, { TextReview : input, Rating: rating, upvotes: Number(0), downvotes: Number(0)})
    }
    else{
      alert("Need to be logged in to create a Review!!")
    }
    
  }

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
      placeholder="Review..." 
      onChange={(event) => 
        {setInput(event.target.value)
      }}
      class="ReviewBox"
    />

    <input 
      placeholder="1-5" 
      type="number"
      min={0}
      max={5}
      onChange={(event) => 
        {setRating(event.target.value)
      }}
      class="RatingBox"
    />
    <button onClick={createReview}> Add a review</button> 

        {allReviews.map((review) => {
          return (
            <div className="eachReview">
              <p>Review: {review.TextReview}</p> 
              <p>Rating: {review.Rating}</p> 
              <p><button onClick={() => {upVote(review.id, review.upvotes)}} class="thumbsup"><span role="img" aria-label="thumbs-up">
        &#x1F44D;</span></button>{review.upvotes}
              <button onClick={() => {downVote(review.id, review.downvotes)}}class="thumbsdown"><span role="img" aria-label="thumbs-down">
        &#x1F44E;
      </span></button>{review.downvotes}</p>
              
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