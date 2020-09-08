var getUsersRepos = function() {
    fetch("https://api.github.com/users/octocat/repos").then(function(response) {
  response.json().then(function(data) {
    console.log(data);
  });
});
      
      console.log("outside");
    }



getUsersRepos();