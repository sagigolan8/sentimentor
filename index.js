const button = document.getElementById("check-button"); //get button element
button.onclick = function () {
  const userText = document.querySelector(".inputbox").value; //get the text from the user
  const divResult = document.getElementById("result"); //get the result element
  divResult.innerHTML = "<b><u>the result is: <u></b>";
  let loadingDiv = document.getElementById("loading");
  loadingDiv.style.visibility = "visible"; //manipulate the loading animation to show up and than disappear before the reuslt shows up
  const divChild = document.createElement("p");
  const img = document.getElementById("image");
  const response = fetch("https://sentim-api.herokuapp.com/api/v1/", {
    //fetch gets url,methods,headers,body
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text: userText }), //JSON.stringify - turn the object into a string
  })
    .then((response) => {
      divChild.style.borderRadius = "24px";
      divChild.style.border = "3px solid #efe1ce";
      img.setAttribute("src", `https://http.cat/${response.status}`);
      return response.json(); // converting the response to a JavaScript object
    })
    .then((data) => {
      // displaying the result in the right color
      const polarity = data.result.polarity;
      const type = data.result.type;
      if (polarity === 0) {
        divChild.style.color = "rgb(105,105,105)";
      } else if (polarity > 0) {
        divChild.style.color = "#60D528";
      } else if (polarity < 0) {
        divChild.style.color = "#cc233a";
      }
      loadingDiv.style.visibility = "hidden";
      divChild.innerHTML = `<u>polarity:</u> ${polarity} </br> <u>type:</u> ${type}`;
      divResult.append(divChild);
    })
    .catch((error) => {
      loadingDiv.style.visibility = "hidden";
      divChild.style.color = "#cc233a";
      divResult.append(divChild);
      console.log(error);
      divChild.append("An error occurred, ");
      divChild.append(document.createElement("p"));
      divChild.append("details in the console...");
    });
};

const resetButton = document.getElementById("reset-button"); //function that reset the text area input for the convenient of the user
const textArea = document.getElementById("inputbox");
resetButton.onclick = function () {
  textArea.value = "";
};

const removeGif = document.getElementById("remove-animation"); //function that stops the animation
const gifs = document.getElementById("gifs");
removeGif.onclick = function () {
  gifs.style.visibility = "hidden";
};
