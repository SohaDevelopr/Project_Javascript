let followedBtn = document.querySelectorAll(".profile button");
let btnArray = Array.from(followedBtn);

btnArray.forEach((ele) => {
    ele.addEventListener("click", (e) => followUnFollow(e.target));
  });

function followUnFollow(button){
  button.classList.toggle("followed")
  if(button.innerText == "Follow"){
    button.innerText = "Unfollow"
  }
  else {
    button.innerText = "Follow"
  }
}