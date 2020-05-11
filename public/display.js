let xhr = new XMLHttpRequest();
let url = '/postcardDisplay';

xhr.open("GET", url);
xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
xhr.onloadend = function(e) {
  // Log the response
  console.log("Server said %s", xhr.responseText)

  // Parse and log the result
  let myResult = JSON.parse(xhr.responseText);
  console.log(myResult);

  // Select the elements in the display.html
  let postcardPicture = document.getElementById("postcardImage");
  let postcardCaption = document.getElementById("caption");
  let postcardArea = document.querySelector(".postcardArea");
  let border = document.querySelector(".chooseImage");

  // Remove border 
  border.style.border = 'none';

  // Change the image to the user-selected image
  postcardPicture.style.display = 'block';
  postcardPicture.src = myResult.image;

  // Change the caption to the user-inputted caption
  postcardCaption.textContent = myResult.caption;

  // Change the font to the user-selected font
  postcardCaption.className = myResult.font;

  // Change the color to the user-selected color
  postcardArea.style.backgroundColor = myResult.color;
}

// Actually send request to server
xhr.send();
