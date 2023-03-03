// About.js

import React from "react";
import './App.css';

class Dorms extends React.Component{

  constructor(props){
  super(props);
  this.state = {
    sortedby: '',
    writingReview: false}
    /*use this writingReview bool to change whether the person is in the process of leaving a review
    or they want to leave a review*/
  this.clickedSort = this.clickedSort.bind(this)
  }

  leaveReview(props)
  {
    if(this.state.writingReview == true){
      this.setState({
        writingReview: false
      })
    }else{
      this.setState({
        writingReview: true
      })
    }
  }

  clickedSort(props)
  {
      
      if(props === 1)
      {
          alert('hello, this should show up if the page rendered lol, Sort by Cleanliness') 
          this.setState({sortedBy: 'Cleanliness'})
      }
      if(props === 2)
      {
          alert('hello, this should show up if the page rendered lol, Sort by Quality');  
          this.setState({sortedBy: 'Quality'})
      }
      if(props === 3)
      {
          alert('hello, this should show up if the page rendered lol, Sort by Space');  
          this.setState({sortedBy: 'Space'})
      }
      if(props === 4)
      {
          alert('hello, this should show up if the page rendered lol, Sort by Location');  
          this.setState({sortedBy: 'Location'})
      }
      else
      {
          this.setState({sortedBy: 'none'})
      }
  }

render() {
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
    <ol><button type='button' className="btn btn-primary" onClick={() => { this.clickedSort(1);}}>Cleanliness{this.state.sortedby}</button></ol>
    <ol><button type='button' className="btn btn-primary" onClick={() => { this.clickedSort(2);}}>Quality{this.state.sortedby}</button></ol>
    <ol><button type='button' className="btn btn-primary" onClick={() => { this.clickedSort(3);}}>Space{this.state.sortedby}</button></ol>
    <ol><button type='button' className="btn btn-primary" onClick={() => { this.clickedSort(4);}}>Location{this.state.sortedby}</button></ol>
    </ul>
    <br></br>
    <h3>Centennial/Olympic</h3>
    <img src="https://s3.amazonaws.com/cms.ipressroom.com/173/files/20218/614102382cfac27232f4ea45_Olympic+and+Centennial+Hall_5DM47510_Ext2/Olympic+and+Centennial+Hall_5DM47510_Ext2_hero.jpg"  width="250" height="200" class="CentennialOlympic"></img>
    <button type='button' className="ReviewButton" onClick={() => { this.leaveReview();}}>{this.state.writingReview ? "Submit Review" : "Leave a Review"}</button>
</body>

</html>
  );
}
}

export default Dorms;