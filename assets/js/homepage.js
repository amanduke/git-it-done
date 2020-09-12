var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");


var displayRepos = function(repos, searchTerm) {
  // check if api returned any repos
  if (repos.length === 0) {
    repoContainerEl.textContent = "No repositories found.";
    return;
  }
  
  // clear old content
repoContainerEl.textContent = "";
repoSearchTerm.textContent = searchTerm;
// loop over repos
for (var i = 0; i < repos.length; i++) {
  // format repo name
  var repoName = repos[i].owner.login + "/" + repos[i].name;

  // create a container for each repo
  var repoEl = document.createElement("div");
  repoEl.classList = "list-item flex-row justify-space-between align-center";

  // create a span element to hold repository name
  var titleEl = document.createElement("span");
  titleEl.textContent = repoName;

  // append to container
  repoEl.appendChild(titleEl);

  // append container to the dom
  repoContainerEl.appendChild(repoEl);
}

};

var formSubmitHandler = function(event) {
  event.preventDefault();
  console.log(event);

// get value from input element
var username = nameInputEl.value.trim();

if (username) {
  getUsersRepos(username);
  nameInputEl.value = "";
} else {
  alert("Please enter a GitHub username");
}


};



var getUsersRepos = function(user) {
  // format the gitbuh api url
  var apiUrl = "https://api.github.com/users/" + user + "/repos";


  // make a request to the url
  fetch(apiUrl).then(function(response) {
    if (response.ok) {
      response.json().then(function(data) {
        displayRepos(data, user);
      });  
    } else {
      alert("Error: " + response.statusText);
    }
  })
  .catch(function(error) {
   // Notice this `.catch()` getting chained onto the end of the `.then()` method
   alert("Unable to connect to GitHub");

    });
 
};
      
      console.log("outside");
    



// getUsersRepos();

// adds sumbit listener to userFormEl
// this kind of event needs to be at the bottom of the file
userFormEl.addEventListener("submit", formSubmitHandler);