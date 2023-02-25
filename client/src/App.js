// import './App.css';



// function App() {
//   return (
//     <div className="App">
//       <h1>Test for Reveiws</h1>
//       <div className="form">
//         <label>Olympic Hall Cleanliness</label>
//       <input type="text" name="Olympic Hall Cleanliness" />
//       <label></label>
//       <input type="text" name="Review" />
//       </div>   
//       <button onclick='buttonclick()' >Submit</button>
//     </div>
//   );
// }

// export default App;
import React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";

function App()
{

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <h1>Hello World</h1>
        <Link to="about">About Us</Link>
      </div>
    ),
  },
  {
    path: "about",
    element: <div>About</div>,
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
}

export default App;