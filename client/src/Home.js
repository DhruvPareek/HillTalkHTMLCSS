
export default function Home() {
  return (
<html>
    <head>
<title>HillTalk</title>
<link rel="stylesheet" href="format.css" />
</head>

<body>
<script type="text/javascript" src="test.js"></script>
<section class="header">
</section>
<img src="http://www.housing.ucla.edu/maps/ochmap.jpg" alt="map" width="720" height="405" class = "map" />
<p class ="description">A Place To Rate, Review, and Discuss the Different Features of the Hill</p>
<br></br>
<div>
  <p>Register User</p>
  <input placeholder="Email..." />
  <input placeholder="Password..."/>

  <button>Create User</button>

</div>

<div>
  <p>Login</p>
  <input placeholder="Email..."/>
  <input placeholder="Password..."/>

  <button>Login</button>

</div>

<p>User Logged In: </p>
</body>
</html>

  );
}
