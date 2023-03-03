// About.js
import './App.css';
import React from "react";

class RecCenters extends React.Component{
  constructor(props){
  super(props);
  this.state = {sortedby: ''}
  this.clickedSort = this.clickedSort.bind(this)
  }

  clickedSort(props)
  {     
      if(props === 1)
      {
          alert('hello, this should show up if the page rendered lol, Sort by Facility Quaity') 
          this.setState({sortedBy: 'Facility Quaity'})
      }
      if(props === 2)
      {
          alert('hello, this should show up if the page rendered lol, Sort by Hours');  
          this.setState({sortedBy: 'Hours'})
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
      if(props === 5)
      {
          alert('hello, this should show up if the page rendered lol, Sort by Business');  
          this.setState({sortedBy: 'Business'})
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
<img src="https://linespace.com/wp-content/uploads/2018/03/UCLA_BeFit_091615_04-1170x658.jpg" alt="BFit" width="720" height="405" class = "Bfit"/>
  <p>Here you can find every dorm on campus.</p>
   <p>Sort By:</p>
   <ul>
    <ol><button type='button' className="btn btn-primary" onClick={() => { this.clickedSort(1);}}>Facility Quaity{this.state.sortedby}</button></ol>
    <ol><button type='button' className="btn btn-primary" onClick={() => { this.clickedSort(2);}}>Hours{this.state.sortedby}</button></ol>
    <ol><button type='button' className="btn btn-primary" onClick={() => { this.clickedSort(3);}}>Space{this.state.sortedby}</button></ol>
    <ol><button type='button' className="btn btn-primary" onClick={() => { this.clickedSort(4);}}>Location{this.state.sortedby}</button></ol>
    <ol><button type='button' className="btn btn-primary" onClick={() => { this.clickedSort(4);}}>Business{this.state.sortedby}</button></ol>
    </ul>
</body>
</html>
  );
}
}

export default RecCenters;