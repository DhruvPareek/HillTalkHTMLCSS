import React from 'react';
import './App.css';

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
            <ol><button type='button' className="btn btn-primary" onClick={() => { clickedSort(1);}}>Health{}</button></ol>
            <ol><button type='button' className="btn btn-primary" onClick={() => { clickedSort(2);}}>Quality{}</button></ol>
            <ol><button type='button' className="btn btn-primary" onClick={() => { clickedSort(3);}}>Time{}</button></ol>
            <ol><button type='button' className="btn btn-primary" onClick={() => { clickedSort(4);}}>Hours{}</button></ol>
            <ol><button type='button' className="btn btn-primary" onClick={() => { clickedSort(5);}}>Location{}</button></ol>
            </ul> 
        </body>
        </html>
    );
  }

function clickedSort(props)
{
    if(props === 1)
    {
        alert('hello, this should show up if the page rendered lol, Sort by Health') 
    }
    if(props === 2)
    {
        alert('hello, this should show up if the page rendered lol, Sort by Quality');  
    }
    if(props === 3)
    {
        alert('hello, this should show up if the page rendered lol, Sort by Time');  
    }
    if(props === 4)
    {
        alert('hello, this should show up if the page rendered lol, Sort by Hours');  
    }
    if(props === 5)
    {
        alert('hello, this should show up if the page rendered lol, Sort by Location'); 
    }
}

export default DiningHalls;