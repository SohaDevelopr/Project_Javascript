// ==== BASE URL ====
const base_Url = "https://tarmeezacademy.com/api/v1";
const imgSrc = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT19eLyqRHQDO-VnXj1HhzL_9q8yHF-3ewIhA&usqp=CAU";
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("userId");
console.log(id);
setupUI();
getUser();
getUserPosts();

let postsCount = 0;

// ==== FUNCTION GET USERS ====
function getUser() {
  axios.get(`${base_Url}/users/${id}`)
    .then(function (response) {
      const user = response.data.data;
      console.log(user);
      const user_image = document.getElementById("user-image");
      let isString =
        typeof user.profile_image === "string" ||
        user.profile_image instanceof String;
      if (isString) {
        user_image.src = user.profile_image;
      } else {
        user_image.src = imgSrc;
      }
      document.getElementById("name").innerHTML = user.name;
      document.getElementById("username").innerHTML = "@" + user.username;
      document.getElementById("posts-count").innerHTML = user.posts_count;
      document.getElementById("comments-count").innerHTML = user.comments_count;
    })
    .catch(function (error) {
      const message = error.response.data.message;
      showAlert(message, "danger");
    });
}

// ==== FUNCTION GET POSTS ====
// User Posts
function getUserPosts() {
  toggleLoader(true);
  axios.get(`${base_Url}/users/${id}/posts`)
    .then(function (response) {
      const div_posts = document.getElementById("posts");
      const posts = response.data.data;
      let user = getCurrentUser();
      let isMyProfile = user != null && user.id == id;
      console.log(posts);
      // POSTS
      if (posts != 0) {
        div_posts.innerHTML = "";
        for (let post of posts) {
          const author = post.author;
          let isMyPost = user != null && post.author.id == user.id;
          console.log("is My Profile?", isMyProfile);
          let editBtnContent = ``;
          if (isMyPost) {
            editBtnContent = `
              <li onclick="editPostBtnClicked('${encodeURIComponent(JSON.stringify(post) )}')"><a class="dropdown-item" href="#">Edit</a></li>
              <li><hr class="dropdown-divider"></li>
              <li onclick="deletePostBtnClicked('${encodeURIComponent(JSON.stringify(post))}')"><a class="dropdown-item delete" href="#">Delete</a></li>
            `;
          }

          let contentPosts = `
                <div class="card mb-5">
                  <div class="card-header px-sm-2 px-md-3">
                    <div class="d-flex align-items-center justify-content-between">
                        <div class="d-flex align-items-center info">
                          ${
                            checkSrcImageIsString(
                              author.profile_image,
                              author.profile_image
                            )
                              ? `
                            <img src="${author.profile_image}" alt="profile_image" width="50px" height="50px" class="rounded-circle object-fit-cover">
                            `
                              : `
                            <img src="${imgSrc}" alt="profile_image" width="50px" height="50px" class="rounded-circle object-fit-cover">
                            `
                          }
                          <div class="d-flex flex-column mx-2">
                            <a href="#" class="fw-bold mb-0 text-decoration-none text-dark" style="font-size: 13px;">${
                              author.name
                            }</a>
                            <small style="font-size: 12px; font-weight: 500;">@${
                              author.username
                            }</small>
                          </div>
                        </div>
                      ${
                        isMyProfile
                          ? `
                        <div class="dropdown">
                          <button type="button" class="btn fs-5 text-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                            <i class="fa-solid fa-ellipsis-vertical"></i>
                          </button>
                          <ul class="dropdown-menu post-menu">
                            ${editBtnContent}
                          </ul>
                        </div>                       
                      `
                          : ""
                      }
                    </div>
                  </div>

                  <div class="card-body" onclick="postClicked(${
                    post.id
                  })" style="cursor: pointer;">
                     <img src="${
                       post.image
                     }" alt="" class="w-100 object-fit-cover rounded-1">
                     <h6 class="mt-2" style="color: gray; font-size: 13px;">${
                       post.created_at
                     }</h6>
                     ${
                       post.title == null
                         ? `<h5 class=""></h5> `
                         : `<h5 class="">${post.title}</h5> `
                     }
    
                     ${
                       post.body == null
                         ? `<p style="font-size: 12px;"></p>`
                         : `<p style="font-size: 12px;">${post.body}</p>`
                     }
    
                     <hr>
    
                     <div class="">
                      <i class="fa-regular fa-comment"></i>
                        <span class="ms-1" style="font-size: 12px; font-weight: 500;">(${
                          post.comments_count
                        }) Comments</span>
                     </div>
                  </div>
                </div>
          `;
          div_posts.innerHTML += contentPosts;
        }
      } 
      else {
        let content = "";
        if(isMyProfile) {
          content = `
              <div class="card border-0">
                <div class="card-body m-auto d-flex flex-column justify-content-center align-items-center" style="max-width: 350px;">
                  <div class="d-flex justify-content-center align-items-center rounded-circle border" style="width: 62px; height: 62px; border-width: 2px !important; border-color: var(--bs-body-color) !important;">
                    <i class="material-icons-outlined fs-1" style="color: inherit;">photo_camera</i>
                  </div>
                  <h4 class="my-2" style="color: inherit;">Share Photos</h4>
                  <p class="mb-2" style="text-align: center; font-size: 11px;">When you share photos, they will appear on your profile.</p>
                  <button class="btn p-0 m-0" style="color: inherit; font-size: 12px; color: #6395f7;" onclick="btnAddClicked()">Share your first photo</button>
                </div>
              </div>
          `; }
        else {
          content = `
              <div class="card border-0">
                <div class="card-body m-auto d-flex flex-column justify-content-center align-items-center" style="max-width: 350px;">
                  <div class="d-flex justify-content-center align-items-center rounded-circle border" style="width: 62px; height: 62px; border-width: 2px !important; border-color: var(--bs-body-color) !important;">
                    <i class="material-icons-outlined fs-1" style="color: inherit;">photo_camera</i>
                  </div>
                  <h4 class="mt-2" style="color: inherit;">No Posts Yet</h4>
                </div>
              </div>
          `;  
        }

        div_posts.innerHTML = content;
      }

      // == POSTS ==
    })
    .catch(function (error) {
      const message = error.response.data.message;
      showAlert(message, "danger");
    })
    .finally(() => {
      toggleLoader(false);
    });
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
      getUserPosts();
      getUser();
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
      getUserPosts();
      getUser();
    })
    .catch((error) => {
      const message = error.response.data.message;
      showAlert(message, "danger");
    });
}