// export default function Contacts(){
//     return (
//         <div>
//             <h3>
//                 YAYYY
//             </h3>
//         </div>
//     );
// }
import React, { useState } from 'react';

function ContactUs() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Message:', message);
    // You can add your own logic here to send the form data to your backend
  }

  return (
    
//Was having difficulty getting background to display correctly in the CSS file so put it here instead
    <form onSubmit={handleSubmit}>

      <div style={{ position: 'relative' }}>
          <div style={{ 
            backgroundImage: 'url(https://cdn2.lamag.com/wp-content/uploads/sites/6/2022/09/UCLA.jpg)',
            backgroundSize: 'cover',
            height: '100vh',
            position: 'relative' }}>
          </div>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.3)', // Example background color
            font: "Lucida Console",
	          align: "center",
	          fontSize: '30px',
	          padding: '0px 12px'
          }}>
            <h5>Contact Us</h5>
            <p>We'd love to hear from you!</p>
          </div>
      </div>
   

      <div style={{
        verticalAlign: "middle"
      }}>

      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          class="ContactBox"
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          class="ContactBox"
        />
      </div>
      <div>
        <label htmlFor="message">Message:</label>
        <textarea
          id="message"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          class="ContactBox"
          // margin="10px"
        />
      </div>
      <button type="submit">Submit</button>
      </div>
    </form>
  );
}

export default ContactUs;
