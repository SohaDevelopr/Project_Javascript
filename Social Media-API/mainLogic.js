// ==== BASE URL ====
const baseUrl = 'https://tarmeezacademy.com/api/v1';
setupUI();
// ==== FUNCTION SETUP UI ====
function setupUI() {
  let userInfo = document.getElementById("userInfo");
  const token = localStorage.getItem("token");
  console.log(token)
  let user = getCurrentUser();
  const loginLi = document.getElementById("login-li");
  const registerLi = document.getElementById("register-li");
  const logoutLi = document.getElementById("logout-li");
  const addBtn = document.getElementById("add-btn");
  const addCommentDiv = document.getElementById("addComment-div");
  if (token == null) {
    loginLi.style.display = "block";
    registerLi.style.display = "block";
    logoutLi.style.display = "none";
    if (addBtn != null) {
      addBtn.style.display = "none";
    }
    if (addCommentDiv != null) {
      addCommentDiv.style.display = "none";
    }
    document.getElementById("img").src = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png";
    if(userInfo != null){
      userInfo.innerHTML = "";
    }
  } //token is guest (notlogged in)
  else {
    loginLi.style.display = "none";
    registerLi.style.display = "none";
    logoutLi.style.display = "block";
    if (addBtn != null) {
      addBtn.style.display = "flex";
    }
    if (addCommentDiv != null) {
      addCommentDiv.style.display = "flex";
    }
    let isString = (typeof user.profile_image === "string" || user.profile_image instanceof String);
    document.getElementById("img").src = isString? user.profile_image : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png";
    console.log("image src is string? ", isString);
    let content = 
      `
              <div class="d-flex align-items-center">
                ${
                  isString
                    ? `
                  <img src="${user.profile_image}" alt="" width="40px" height="40px" class="rounded-circle object-fit-cover">
                  `
                    : `
                  <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png" alt="" class="rounded-circle object-fit-cover">
                  `
                }
                <div class="d-flex flex-column mx-3">
                  <a href="#" class="fw-bold mb-0 text-decoration-none text-dark">${
                    user.name
                  }</a>
                  <small>@${user.username}</small>
                </div>
              </div>
              <div class="dropdown">
                <button type="button" class="btn d-flex justify-content-end fs-6 text-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                  Switch
                </button>
                <ul class="dropdown-menu">
                  <li id="new-account"><a class="dropdown-item" href="#">Add a new account</a></li>
                  <li id="exist-account"><a class="dropdown-item" href="#">Add an existing account</a></li>
                </ul>
              </div>
      `;
    if(userInfo != null){
        userInfo.innerHTML = content;
    }
  }
}

// ==== FUNCTION LOGIN ====
function loginBtnClicked() {
  let username = document.getElementById("username-input").value;
  let password = document.getElementById("password-input").value;
  let closeBtn = document.getElementById("closeBtn");
  console.log(username, password);
  const params = {
   "username": username,
   "password": password
  };
  const url = `${baseUrl}/login`;
  axios.post(url, params)
    .then(function (response) {
      console.log(response.data);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("currentUser", JSON.stringify(response.data.user));
      if (response.status === 200) {
        closeBtn.click();
        showAlert("Logged in successfully", "success");
        setupUI();
      }
    })
    .catch((error) => {
      const message = error.response.data.message;
      showAlert(message, "danger");
    });
}

// ==== FUNCTION REGISTER ====
function registerBtnClicked() {
  const image = document.getElementById("register-image-input").files[0];
  const name = document.getElementById("register-name-input").value;
  const username = document.getElementById("register-username-input").value;
  const password = document.getElementById("register-password-input").value;
  let closeBtn = document.getElementById("register-closeBtn");
  console.log(name, username, password);

  const url = `${baseUrl}/register`;

  let formDate = new FormData();
  formDate.append("image", image);
  formDate.append("name", name);
  formDate.append("username", username);
  formDate.append("password", password);
  const headers = {
    "Content-Type": "multipart/form-data",
  };

  axios
    .post(url, formDate, {
      headers: headers,
    })
    .then(function (response) {
      console.log(response.data);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("currentUser", JSON.stringify(response.data.user));
      closeBtn.click();
      showAlert("New User Registered successfully", "success");
      setupUI();
    })
    .catch((error) => {
      const message = error.response.data.message;
      showAlert(message, "danger");
    });
}

// ==== FUNCTION LOGOUT ====
function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("currentUser");
  showAlert("Logged out successfully", "success");
  setupUI();
}

// ==== FUNCTION CREATE NEW POST ====
function createNewPostClicked() {
  let postId = document.getElementById("post-id-input").value;
  let isCreate = postId == null || postId == "";
  console.log(postId)

  let title = document.getElementById("post-title-input").value;
  let body = document.getElementById("post-body-input").value;
  let image = document.getElementById("post-image-input").files[0];

  let formDate =  new FormData();
  formDate.append("title",title);
  formDate.append("body",body);
  formDate.append("image",image);

  let url = ``;
  let msg = "";
  const token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "multipart/form-data",
    "authorization": `Bearer ${token}`
  }

  if(isCreate) {
    url = `${baseUrl}/posts`;
    msg = "New Post Has Been Created Successfully";
  }else {
    formDate.append("_method","put");
    url = `${baseUrl}/posts/${postId}`;
    msg = "The Post Has Been Updated Successfully";
  } 

  axios.post(url,formDate,{
    headers: headers
  })
  .then(function (response) {
    console.log(response.data);
    const modal = document.getElementById("create-post-modal");
    const modalInstance = bootstrap.Modal.getInstance(modal);
    modalInstance.hide();
    showAlert(msg,'success');
    getPosts();
    getUsers();

  }).catch((error)=> {
    const message = error.response.data.message;
    showAlert(message,'danger');
    console.log(message)
  }) 
}

// ==== FUNCTION EDIT POST BTN ON CLICKED ====
function editPostBtnClicked(postObject) {
  let post = JSON.parse(decodeURIComponent(postObject));
  console.log(post);
  document.getElementById("post-id-input").value = post.id;
  document.getElementById("post-modal-title").innerHTML = "Edit Post"; 
  document.getElementById("post-modal-submit-btn").innerHTML = "Update";
  document.getElementById("post-image-input").files[0] = post.image;
  let postModal = new bootstrap.Modal(document.getElementById("create-post-modal"),{});
  postModal.toggle();
  document.getElementById("post-title-input").value = post.title;
  document.getElementById("post-body-input").value = post.body;
}


// ==== FUNCTION DELETE POST BTN ON CLICKED ====
function deletePostBtnClicked(postObject) {
  let post = JSON.parse(decodeURIComponent(postObject));
  console.log(post);
  document.getElementById("delete-post-id-input").value = post.id;
  let postModal = new bootstrap.Modal(document.getElementById("delete-post-modal"),{});
  postModal.toggle();
}

// ==== FUNCTION CONFIRM POST DELETE ====
function confirmPostDelete() {
  const postId = document.getElementById("delete-post-id-input").value ;
  const url = `${baseUrl}/posts/${postId}`;
  const token = localStorage.getItem("token");
  const headers = {
    "authorization": `Bearer ${token}`
  }
  axios.delete(url,{
    headers: headers
  })
  .then(function (response) {
    console.log(response);
    const modal =  document.getElementById("delete-post-modal");    
    const modalInstance = bootstrap.Modal.getInstance(modal);
    modalInstance.hide();
    showAlert("The Post Has Been Deleted Successfully",'success');
    getPosts();
    getUsers();
  })
  .catch((error) => {
    const message = error.response.data.message;
    showAlert(message, "danger");
  });
}

// ==== FUNCTION SHOW ALERT ====
function showAlert(customMessage, type) {
  const successAlert = document.getElementById("success-alert");
  const alert = (message, type) => {
    console.log(message)
    const wrapper = document.createElement("div");
    wrapper.innerHTML = [
      `<div class="alert alert-${type} alert-dismissible" role="alert">`,
      `   <div>${message}</div>`,
      '   <button type="button" class="btn-close" data-bs-dismiss="alert" id="close-btn" aria-label="Close"></button>',
      "</div>",
    ].join("");

    successAlert.append(wrapper);
  };

  alert(customMessage, type);
  document.querySelector("#success-alert").style.display = "block";
  setTimeout(() => {
    document.querySelector("#success-alert").style.display = "none";
  }, 3000);
}

// ==== FUNCTION GET CURRENT USER ====
function getCurrentUser() {
  let user = null;
  const storageUser = localStorage.getItem("currentUser");
  if (storageUser != null) {
    user = JSON.parse(storageUser);
    console.log(user)
  }

  return user;
}

// ==== FUNCTION SHOW PASSWORD ====
function showPassword() {
  let password = document.getElementById("password-input");
  if (password.type === "password") {
    password.type = "text";
  } else {
    password.type = "password";
  }
}

