// ==== BASE URL ====
const base_Url = 'https://tarmeezacademy.com/api/v1';
const imgSrc = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT19eLyqRHQDO-VnXj1HhzL_9q8yHF-3ewIhA&usqp=CAU";
let currentpage = 1;
let lastPage = 1;

// ==== SPLASH SCREEN ====
let intro = document.querySelector('.intro');
let logo = document.querySelector('.logo-header');
let logoSpan = document.querySelectorAll('.logo');

window.addEventListener('DOMContentLoaded', ()=> {
  setTimeout(()=>{
    logoSpan.forEach((span,idx)=>{
      setTimeout(()=>{
        span.classList.add("active");
      },(idx + 1) * 400);
    });

    setTimeout(()=>{
      logoSpan.forEach((span,idx)=>{
        setTimeout(()=>{
          span.classList.remove("active");
          span.classList.add("fade");
        },(idx + 1) * 50);
      });
    },2000);

    setTimeout(()=>{
      intro.style.top = "-100vh";
      intro.style.background = "var(--bs-emphasis-color)";
    },2300)

  });

});

// ==== // SPLASH SCREEN // ====




// ==== INFINITE SCRILL ====
window.addEventListener("scroll", function() {
  const endOfPage = window.innerHeight + window.pageYOffset +1 >= document.body.offsetHeight;
  if(endOfPage && currentpage < lastPage) {
    currentpage = currentpage + 1;
    getPosts(false,currentpage);
  }
});
// ==== // INFINITE SCRILL// ====

// ==== ====
getPosts();
getUsers();


// ==== FUNCTION GET POSTS ====
function getPosts(reload = true , page = 1) {
  toggleLoader(true);
  axios.get(`${base_Url}/posts?limit=2&page=${page}`)
  .then(function (response) {
      toggleLoader(false);
      lastPage = response.data.meta.last_page;
      const div_posts = document.getElementById("posts");
      const posts = response.data.data;
      if(reload){
        div_posts.innerHTML = "";
      }

      // POSTS
      for(let post of posts){
        const author = post.author;
        let user = getCurrentUser();
        let isMyPost = user != null && post.author.id == user.id;
        let editBtnContent = ``;
        if(isMyPost){
          editBtnContent = 
          `
            <li onclick="editPostBtnClicked('${encodeURIComponent(JSON.stringify(post))}')"><a class="dropdown-item" href="#">Edit</a></li>
            <li><hr class="dropdown-divider"></li>
            <li onclick="deletePostBtnClicked('${encodeURIComponent(JSON.stringify(post))}')"><a class="dropdown-item delete" href="#">Delete</a></li>
          `
        }
        let contentPosts = 
        `
              <div class="card mb-5">
                <div class="card-header px-sm-2 px-md-3">
                  <div class="d-flex align-items-center justify-content-between">
                      <div class="d-flex align-items-center info" onClick="userClicked(${author.id})">
                        ${
                          checkSrcImageIsString(author.profile_image , author.profile_image)?
                          `
                          <img src="${author.profile_image}" alt="profile_image" width="50px" height="50px" class="rounded-circle object-fit-cover">
                          `
                          :
                          `
                          <img src="${imgSrc}" alt="profile_image" width="50px" height="50px" class="rounded-circle object-fit-cover">
                          `
                        }
                        <div class="d-flex flex-column mx-2">
                          <a href="#" class="fw-bold mb-0 text-decoration-none" style="font-size: 13px; color: inherit;">${author.name}</a>
                          <small style="font-size: 12px; font-weight: 500;">@${author.username}</small>
                      </div>
                    </div>
                    <div class="dropdown">
                      <button type="button" class="btn fs-5 text-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                        <i class="fa-solid fa-ellipsis-vertical"></i>
                      </button>
                      <ul class="dropdown-menu post-menu">
                        <li onClick="userClicked(${author.id})"><a class="dropdown-item" href="#">Visit Profile</a></li>
                        ${editBtnContent}
                      </ul>
                  </div>
                  </div>
                </div>
                <div class="card-body" onclick="postClicked(${post.id})" style="cursor: pointer;">
                  <img src="${post.image}" alt="" class="w-100 object-fit-cover rounded-1">
                  <h6 class="mt-2" style="color: gray; font-size: 14px;">${post.created_at}</h6>
                  ${ 
                    (post.title == null)?
                    `<h5 class=""></h5> `:
                    `<h5 class="">${post.title}</h5> `
                  }

                  ${ 
                    (post.body == null)?
                    `<p></p>`:
                    `<p>${post.body}</p>`
                  }

                  <hr>

                  <div class="">
                    <i class="fa-regular fa-comment"></i>
                      <span class="ms-1" style="font-size: 13px; font-weight: 500;">(${post.comments_count}) Comments</span>
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
        let contentUsers = 
        `
          <div class="d-flex justify-content-between align-items-center my-3" style="cursor: pointer;" onclick="postClicked(${user.id})">
                  <div class="d-flex align-items-center info">
                    ${
                      checkSrcImageIsString(author.profile_image , author.profile_image)?
                        `
                        <img src="${author.profile_image}" alt="profile_image" width="50px" height="50px" class="rounded-circle object-fit-cover">
                        `
                        :
                        `
                        <img src="${imgSrc}" alt="profile_image" width="50px" height="50px" class="rounded-circle object-fit-cover">
                        `
                      }
                    <div class="d-flex flex-column mx-3">
                      <a href="#" class="fw-bold mb-0 text-decoration-none" style="font-size: 13px; color:inherit;">${author.name}</a>
                      <small style="font-size: 12px; font-weight: 500;">@${author.username}</small>
                  </div>
                  </div>
                  <h6 class="" style="color: gray; font-size: 13px;">${user.created_at}</h6>
          </div>
        `
        div_users.innerHTML += contentUsers;
      }
      // == USERS ==
  })
  .catch(function (error) {
    const message = error.response.data.message;
    showAlert(message,'danger');
  })
  
}

// ==== FUNCTION CREATE NEW POST ====
function createNewPostClicked() {
  let postId = document.getElementById("post-id-input").value;
  let isCreate = postId == null || postId == "";
  console.log(postId);

  let title = document.getElementById("post-title-input").value;
  let body = document.getElementById("post-body-input").value;
  let image = document.getElementById("post-image-input").files[0];

  let formDate = new FormData();
  formDate.append("title", title);
  formDate.append("body", body);
  formDate.append("image", image);

  let url = ``;
  let msg = "";
  const token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "multipart/form-data",
    authorization: `Bearer ${token}`,
  };

  if (isCreate) {
    url = `${baseUrl}/posts`;
    msg = "New Post Has Been Created Successfully";
  } else {
    formDate.append("_method", "put");
    url = `${baseUrl}/posts/${postId}`;
    msg = "The Post Has Been Updated Successfully";
  }

  toggleLoader(true);

  axios.post(url, formDate, {
      headers: headers,
    })
    .then(function (response) {
      console.log(response.data);
      const post = response.data;
      const modal = document.getElementById("create-post-modal");
      const modalInstance = bootstrap.Modal.getInstance(modal);
      modalInstance.hide();
      showAlert(msg, "success");
      getPosts();
      getUsers();
    })
    .catch((error) => {
      const message = error.response.data.message;
      showAlert(message, "danger");
      console.log(message);
    })
    .finally(() => {
      toggleLoader(false);
    });
}

// ==== FUNCTION CONFIRM POST DELETE ====
function confirmPostDelete() {
  const postId = document.getElementById("delete-post-id-input").value;
  const url = `${baseUrl}/posts/${postId}`;
  const token = localStorage.getItem("token");
  const headers = {
    authorization: `Bearer ${token}`,
  };
  axios.delete(url, {
      headers: headers,
    })
    .then(function (response) {
      console.log(response);
      const modal = document.getElementById("delete-post-modal");
      const modalInstance = bootstrap.Modal.getInstance(modal);
      modalInstance.hide();
      showAlert("The Post Has Been Deleted Successfully", "success");
      getPosts();
      getUsers();
    })
    .catch((error) => {
      const message = error.response.data.message;
      showAlert(message, "danger");
    });
}

// ==== FUNCTION ADD NEW ACCOUNT ====
function newAccount() {
  let registerModal = new bootstrap.Modal(document.getElementById("register-modal"),{});
  registerModal.toggle();
}

// ==== FUNCTION ADD EXISTING ACCOUNT ====
function exitingAccount() {
  let loginModal = new bootstrap.Modal(document.getElementById("login-modal"),{});
  loginModal.toggle();
}

