// Always include at top of Javascript file
"use strict";

// UPLOAD IMAGE using a post request
// Called by the event listener that is waiting for a file to be chosen
function uploadFile() {

  // get the file chosen by the file dialog control
  const selectedFile = document.getElementById('fileChooser').files[0];
  // store it in a FormData object
  const formData = new FormData();
  // name of field, the file itself, and its name
  formData.append('newImage',selectedFile, selectedFile.name);

  // Target the part of the HTML which displays the message when uploading an
  // image
  let filePrompt = document.getElementById('imageMessage');

  // build a browser-style HTTP request data structure
  const xhr = new XMLHttpRequest();
  // it will be a POST request, the URL will this page's URL+"/upload"
  xhr.open("POST", "/upload", true);

  // callback function executed when the HTTP response comes back
  xhr.onloadend = function(e) {
    // Get the server's response body
    console.log(xhr.responseText);
    // now that the image is on the server, we can display it!
    let newImage = document.getElementById("serverImage");
    newImage.src = "../images/"+selectedFile.name;

    newImage.style.display = 'block';
    let chooseImageSelector = document.querySelector(".chooseImage");
    chooseImageSelector.classList.replace("upload", "reupload");
    filePrompt.textContent = 'Replace Image';
    
    chooseImageSelector.style.border = 'none';
  }
  // Once we reach this step, we want to change the message to let the user
  // know that their image is uploading
  filePrompt.textContent = "Uploading ..."
  // actually send the request
  xhr.send(formData);
}
// Add event listener to the file input element
document.getElementById("fileChooser").addEventListener("change", uploadFile);

// Remove placeholder when user clicks
let postcardCaption = document.getElementById('caption');
postcardCaption.addEventListener("click", function () {
  postcardCaption.textContent = " ";
});


// Change color of postcard when we click and or hover over the colors
let colorOptions = ["#e6e2cf", "#dbcaac", "#c9cbb3", "#bbc9ca", "#A6A5B5", "#B5A6AB", "#ECCFCF", "#eceeeb", "#BAB9B5"];
let colorBoxes = document.getElementsByClassName("colorsBotton");
colorBoxes[0].style.border = "3px solid black";
let currentIndex = 0;
let postCardAreaColor = document.querySelector(".postcardArea");

function colorClick(colorClicked) {
  postCardAreaColor.style.background = colorOptions[colorClicked];

  colorBoxes[currentIndex].style.border = "none";
  colorBoxes[colorClicked].style.border = "3px solid black";

  currentIndex = colorClicked;
}

function colorHover(colorHovered) {
  postCardAreaColor.style.background = colorOptions[colorHovered];
  colorBoxes[colorHovered].style.border = "2px dashed black";
}

function colorMouseOut(mouseOut) {
  if (currentIndex == mouseOut) {
    colorBoxes[currentIndex].style.border = "3px solid black";
  } else {
    colorBoxes[mouseOut].style.border = "none";
    postCardAreaColor.style.backgroundColor = colorOptions[currentIndex];
  }
}

// Iterate through all font options to find the user-selected one
let fontOptions = ["indieFlower", "dancingScript", "longCang", "homemadeApple"];
let fontIDs = ["indie", "dancing", "cang", "apple"];
let cross = "&#x2756;";
let diamond = "&#x20DF;";

function findFont(fontToFind) {
  for (let i = 0; i < 4; i++){
    if (i == fontToFind) {
      let fontUsing = document.getElementById(fontIDs[i]);
      fontUsing.innerHTML = cross;

      let caption = document.getElementById("caption");
      caption.className = fontOptions[i];
    } else {
      let otherFonts = document.getElementById(fontIDs[i]);
      otherFonts.innerHTML = diamond;
    }
  }
}

// Display the postcard view by displaying new HTML
let sharePostcard = document.getElementById("share");
sharePostcard.addEventListener("click", function () {
  let information = {
    "image": document.getElementById('serverImage').src,
    "caption": document.getElementById('caption').textContent,
    "color": colorOptions[currentIndex],
    "font": document.getElementById('caption').className
  }

  let newRequest = new XMLHttpRequest();
  newRequest.open("POST", '/sendDisplay');
  newRequest.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  newRequest.onloadend = function(e) {
    console.log(newRequest.responseText);
    window.location = "https://scarlet-sadat-daily.glitch.me/display.html";
  }

  newRequest.send(JSON.stringify(information));
});
