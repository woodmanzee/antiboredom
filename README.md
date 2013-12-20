antiboredom
===========

BYU CS 360 Web Application Project
----------------------------------

When looking for something to do in the moment, most people turn to texting all their friends (and then sitting around hoping someone answers) or calling them one by one. Current social media doesn't really help solve this problem, as hours can be spent on "social" media without ever actually talking to another persion. 

This application helps people reach out through the internet to find their friends that are looking for things to do. A simple click of a button will allow them to see all their friends that are wanting to get together and chat in-app.

Contributions
------------


####Melissa Smith
I worked on the backend. I attended the group meetings and helping develop the design. 
I added the username field to sign up. I wrote up and submitted the third milestone report. 
I was willing and  available as much as possible.

####Zack Woodmansee
Worked primarily with the backend, helped with some of the javascript requests
when needed. Set up the API, the JSON requests, and worked with the frontend to pass the
CSRF token so that the POST requests would be recognized. Setup and created the database and 
its tables, set up the github, hosted and posted the application to Heroku.com. Went to group
meetings, finalized the app.

####Melissa Edge
I mostly worked on the front-end. I created the initial html and css files to get a 
starting framework up. I helped get Javascript/JQuery buttons, dialogs, and other elements 
integrated into the html. I wrote code to populate the friends list, activity feed, and 
welcome banner. I also added a get request to return user data based on id and/or the user 
currently logged in. I attended group meetings and helped make sure milestones were 
submitted.

####Mychal Calderon
Focused mainly on the front-end. Created and organized an intial front-end TODO list
and decided to use JQuery to handle our dynamic content. Completed and submitted the first
milestone report. Decided to use JQueryUI to handle pop-ups on the page as they enabled easy
creation of modal dialog boxes. Began initial user interactions and creation of dynamic content
on the page. Helped to get other members of the group set up with ruby and running a local
version of the app on their computers to simplify testing. Helped to write initial ajax calls
that would send GET and POST requests to the server as the user interacted with the app. Helped to
solve host issues that were happening while trying to send requests to the server before the backend
and frontend were tied together. Worked on CSS for the sign in, sign up, and other pages. Modified the
friends controller on the backend to return the correct response for a GET.

MVP Features
------------
<ul>
<li>Sign Up/Login</li>
<li>Add Friends</li>
<li>Flag that you're bored</li>
</ul>

Future Features
---------------
<ul>
<li>Post things you're doing for friends to see/News Feed</li>
<li>Messaging Service</li>
<li>Connect to Facebook to easily add friends/events</li>
</ul>

Languages/Hosting
-----------------
Backend: Ruby on Rails with postgres database<br/>
Frontend: Javascript<br/>
Hosting: Heroku.com<br/>
Mobile: No<br/>

Database Model
--------------
![Database Model](/app/assets/images/dbmodel.png?raw=true)
