// ==== BASE URL ====
const base_Url = 'https://tarmeezacademy.com/api/v1';
let currentpage = 1;
let lastPage = 1;

// ==== INFINITE SCRILL ====
window.addEventListener("scroll", function() {
  const endOfPage = window.scrollY + window.innerHeight +1 >= document.documentElement.scrollHeight;
  if(endOfPage && currentpage < lastPage) {
    currentpage = currentpage + 1;
    getPosts(false,currentpage);
  }
});
// ====// INFINITE SCRILL// ====

// ==== ====
getPosts();
getUsers();


// ==== FUNCTION GET POSTS ====
function getPosts(reload = true , page = 1) {
axios.get(`${base_Url}/posts?limit=2&page=${page}`)
.then(function (response) {
    lastPage = response.data.meta.last_page;
    const div_posts = document.getElementById("posts");
    const posts = response.data.data;
    if(reload){
      div_posts.innerHTML = "";
    }

    // POSTS
    // onclick="followUnFollow(${post.id})"
    for(let post of posts){
      const author = post.author;
      let user = getCurrentUser();
      let isMyPost = user != null && post.author.id == user.id;
      let editBtnContent = ``;
      let isString = (typeof author.profile_image === 'string' || author.profile_image instanceof String);
      if(isMyPost){
        editBtnContent = 
        `
          <li onclick="editPostBtnClicked('${encodeURIComponent(JSON.stringify(post))}')"><a class="dropdown-item" href="#">Edit</a></li>
          <li><hr class="dropdown-divider"></li>
          <li onclick="deletePostBtnClicked('${encodeURIComponent(JSON.stringify(post))}')"><a class="dropdown-item delete" href="#">Delete</a></li>
        `
      }
      // d-flex justify-content-end 
      let contentPosts = 
      `
            <div class="card mb-5">
              <div class="card-header px-sm-2 px-md-3">
                <div class="d-flex align-items-center justify-content-between">
                    <div class="d-flex align-items-center info">
                      ${
                        isString?
                        `
                        <img src="${author.profile_image}" alt="profile_image" width="48px" height="48px" class="rounded-circle object-fit-cover">
                        `
                        :
                        `
                        <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png" alt="profile_image" width="48px" height="48px" class="rounded-circle object-fit-cover">
                        `
                      }
                      <div class="d-flex flex-column mx-2">
                        <a href="#" class="fw-bold mb-0 text-decoration-none text-dark" style="font-size: 13px;">${author.name}</a>
                        <small style="font-size: 12px; font-weight: 500;">@${author.username}</small>
                    </div>
                  </div>
                  <div class="dropdown">
                    <button type="button" class="btn fs-5 text-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                      <i class="fa-solid fa-ellipsis-vertical"></i>
                    </button>
                    <ul class="dropdown-menu post-menu">
                      <li><a class="dropdown-item" href="#">Visit Profile</a></li>
                      ${editBtnContent}
                    </ul>
                 </div>
                 </div>
              </div>
              <div class="card-body" onclick="postClicked(${post.id})" style="cursor: pointer;">
                 <img src="${post.image}" alt="" class="w-100 object-fit-cover rounded-1">
                 <h6 class="mt-2" style="color: gray; font-size: 13px;">${post.created_at}</h6>
                 ${ 
                   (post.title == null)?
                   `<h5 class=""></h5> `:
                   `<h5 class="">${post.title}</h5> `
                 }

                 ${ 
                   (post.body == null)?
                   `<p style="font-size: 12px;"></p>`:
                   `<p style="font-size: 12px;">${post.body}</p>`
                 }

                 <hr>

                 <div class="">
                  <i class="fa-regular fa-comment"></i>
                    <span class="ms-1" style="font-size: 12px; font-weight: 500;">(${post.comments_count}) Comments</span>
                 </div>
              </div>
            </div>
      `
      div_posts.innerHTML += contentPosts;
    }
    // == POSTS ==
}).catch(function(error) {
  const message = error.response.data.message;
  showAlert(message,'danger');
})

}

// ==== FUNCTION GET USERS ====
function getUsers() {
  axios.get(`${base_Url}/posts?limit=4`)
  .then(function (response) {
      const div_users = document.getElementById("users");
      const users = response.data.data;
      console.log(users);
      // USERS
      div_users.innerHTML = "";
      for(let user of users){
        const author = user.author;
        let isString = (typeof author.profile_image === 'string' || author.profile_image instanceof String);
        let contentUsers = 
        `
          <div class="d-flex flex-column my-1" style="cursor: pointer;" onclick="postClicked(${user.id})">
                  <div class="d-flex align-items-center info">
                    ${
                        isString?
                        `
                        <img src="${author.profile_image}" alt="profile_image" width="48px" height="48px" class="rounded-circle object-fit-cover">
                        `
                        :
                        `
                        <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png" alt="profile_image" width="48px" height="48px" class="rounded-circle object-fit-cover">
                        `
                      }
                    <div class="d-flex flex-column mx-3">
                      <a href="#" class="fw-bold mb-0 text-decoration-none text-dark" style="font-size: 13px;">${author.name}</a>
                      <small style="font-size: 12px; font-weight: 500;">@${author.username}</small>
                  </div>
                  </div>
                  <h6 class="mx-auto" style="color: gray; font-size: 13px;width: 68%;">${user.created_at}</h6>
          </div>
        `
        div_users.innerHTML += contentUsers;
      }
      // == USERS ==

      // onclick="followUnFollow(${users.id})"
  })
  // .catch(function (error) {
  //   const message = error.response.data.message;
  //   showAlert(message,'danger');
  // })
  
}

// ==== FUNCTION ADD BTN CLICKED ====
function addBtnClicked() {
  document.getElementById("post-id-input").value = "";
  document.getElementById("post-modal-title").innerHTML = "Create A New Post"; 
  document.getElementById("post-modal-submit-btn").innerHTML = "Create";
  document.getElementById("post-title-input").value = "";
  document.getElementById("post-body-input").value = "";
  let postModal = new bootstrap.Modal(document.getElementById("create-post-modal"),{});
  postModal.toggle();
}

// ==== FUNCTION CREATE NEW POST ====
// function createNewPostClicked() {
//   let postId = document.getElementById("post-id-input").value;
//   let isCreate = postId == null || postId == "";
//   console.log(postId)

//   document.getElementById("post-modal-title").innerHTML = "Create A New Post"; 
//   document.getElementById("post-modal-submit-btn").innerHTML = "Create";
//   let title = document.getElementById("post-title-input").value;
//   let body = document.getElementById("post-body-input").value;
//   let image = document.getElementById("post-image-input").files[0];

//   let formDate =  new FormData();
//   formDate.append("title",title);
//   formDate.append("body",body);
//   formDate.append("image",image);

//   let url = ``;
//   const token = localStorage.getItem("token");
//   const headers = {
//     "Content-Type": "multipart/form-data",
//     "authorization": `Bearer ${token}`
//   }

//   if(isCreate) {
//     url = `${base_Url}/posts`;
//     axios.post(url,formDate,{
//       headers: headers
//     })
//     .then(function (response) {
//       console.log(response.data);
//       const modal = document.getElementById("create-post-modal");
//       const modalInstance = bootstrap.Modal.getInstance(modal);
//       modalInstance.hide();
//       showAlert("New Post Has Been Created",'success');
//       getPosts();
//       getUsers();
  
//     }).catch((error)=> {
//       const message = error.response.data.message;
//       showAlert(message,'danger');
//     }) 
//   }else {
//     url = `${base_Url}/posts/${postId}`;
//     formDate.append("_method","put");
//     axios.post(url,formDate,{
//       headers: headers
//     })
//     .then(function (response) {
//       console.log(response.data);
//       const modal = document.getElementById("create-post-modal");
//       const modalInstance = bootstrap.Modal.getInstance(modal);
//       modalInstance.hide();
//       showAlert("New Post Has Been Created",'success');
//       getPosts();
//       getUsers();
  
//     }).catch((error)=> {
//       const message = error.response.data.message;
//       showAlert(message,'danger');
//     }) 
//   } 
// }

// ==== FUNCTION EDIT POST BTN ON CLICKED ====
// function editPostBtnClicked(postObject) {
//   let post = JSON.parse(decodeURIComponent(postObject))
//   console.log(post);
//   document.getElementById("post-id-input").value = post.id;
//   document.getElementById("post-modal-title").innerHTML = "Edit Post"; 
//   document.getElementById("post-modal-submit-btn").innerHTML = "Edit";
//   let postModal = new bootstrap.Modal(document.getElementById("create-post-modal"),{});
//   postModal.toggle();
//   document.getElementById("post-title-input").value = post.title;
//   document.getElementById("post-body-input").value = post.body;
// }

// ==== FUNCTION POST CLICKED ====
function postClicked(postId) {
  // alert(postId)
  window.location = `postDetails.html?postId=${postId}`;
//  showAlert("Please Login or Register to View Comments", "danger");
}

// ==== FUNCTION FOLLOW BUTTON ====
let numberFollowing = 0;
function followUnFollow(index) {
  let btnPost = document.getElementById(`btn-post-${index}`);
  btnPost.addEventListener("click", ()=> {
    if(btnPost.innerText === "Follow"){
      btnPost.innerText = "Unfollow";
      btnPost.classList.add("followed");
      numberFollowing+= 1;
    }
    else {
      btnPost.innerText = "Follow";
      btnPost.classList.remove("followed");
      numberFollowing-=1;
    }
    // document.getElementById("num").innerHTML = numberFollowing;
  })

  let btnUser = document.getElementById(`btn-user-${index}`);
  btnUser.addEventListener("click", ()=> {
    if(btnUser.innerText === "Follow"){
      btnUser.innerText = "Unfollow";
      btnUser.classList.add("followed");
      numberFollowing+=1;
    }
    else {
      btnUser.innerText = "Follow";
      btnUser.classList.remove("followed");
      numberFollowing-=1;
    }
    
    // document.getElementById("num").innerHTML = numberFollowing;
  })
}
