import React from 'react';
class DiningHalls extends React.Component{

    constructor(props){
    super(props);
    this.state = {sortedby: ''}
    this.clickedSort = this.clickedSort.bind(this)
    }

    clickedSort(props)
    {
        
        if(props === 1)
        {
            alert('hello, this should show up if the page rendered lol, Sort by Health') 
            this.setState({sortedBy: 'Health'})
        }
        if(props === 2)
        {
            alert('hello, this should show up if the page rendered lol, Sort by Quality');  
            this.setState({sortedBy: 'Quality'})
        }
        if(props === 3)
        {
            alert('hello, this should show up if the page rendered lol, Sort by Time');  
            this.setState({sortedBy: 'Time'})
        }
        if(props === 4)
        {
            alert('hello, this should show up if the page rendered lol, Sort by Hours');  
            this.setState({sortedBy: 'Hours'})
        }
        if(props === 5)
        {
            alert('hello, this should show up if the page rendered lol, Sort by Location'); 
            this.setState({sortedBy: 'Location'})
            this.render()
            alert('hello, this should show up if the page rendered lol, Sort by Location');
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
  <img src="https://s3.amazonaws.com/cms.ipressroom.com/173/files/20160/56a670f2bd26f54876001535_UCLAOlympicVillage6/UCLAOlympicVillage6_4d51350a-2c04-4d93-8fe3-ac4e6b248efc-prv.jpg" alt="Bplate" width="720" height="405" class = "Bplate" />
  <h3>This page contains every dining hall, takeout and buffet style places from around the hill.</h3>
   <p>Sort By:</p>
   <ul>
    <ol><button type='button' className="btn btn-primary" onClick={() => { this.clickedSort(1);}}>Health{this.state.sortedby}</button></ol>
    <ol><button type='button' className="btn btn-primary" onClick={() => { this.clickedSort(2);}}>Quality{this.state.sortedby}</button></ol>
    <ol><button type='button' className="btn btn-primary" onClick={() => { this.clickedSort(3);}}>Time{this.state.sortedby}</button></ol>
    <ol><button type='button' className="btn btn-primary" onClick={() => { this.clickedSort(4);}}>Hours{this.state.sortedby}</button></ol>
    <ol><button type='button' className="btn btn-primary" onClick={() => { this.clickedSort(5);}}>Location{this.state.sortedby}</button></ol>
    </ul>
</body>
</html>
 );
}
}
export default DiningHalls;
