// ==== BASE URL ====
const baseUrl = "https://tarmeezacademy.com/api/v1";
const img_src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT19eLyqRHQDO-VnXj1HhzL_9q8yHF-3ewIhA&usqp=CAU";
setupUI();

// ==== FUNCTION SETUP UI ====
function setupUI() {
  let userInfo = document.getElementById("userInfo");
  const token = localStorage.getItem("token");
  console.log(token);
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
    document.getElementById("img").src = img_src;
    if (userInfo != null) {
      userInfo.innerHTML = "";
      userInfo.classList.remove("my-3");
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
    document.getElementById("img").src = checkSrcImageIsString(user.profile_image, user.profile_image)? user.profile_image : img_src;
    //  console.log("image src is string? ",checkSrcImageIsString(user.profile_image, user.profile_image));
    let content = `
              <div class="d-flex align-items-center" style="cursor: pointer;" onClick="profileClicked()">
                ${
                  checkSrcImageIsString(user.profile_image, user.profile_image)
                    ? `
                  <img src="${user.profile_image}" alt=""  class="rounded-circle object-fit-cover">
                  `
                    : `
                  <img src="${img_src}" alt="" class="rounded-circle object-fit-cover">
                  `
                }
                <div class="d-flex flex-column mx-3">
                  <a href="#" class="fw-bold mb-0 text-decoration-none" style="color: inherit;">
                  ${user.name}
                  </a>
                  <small>@${user.username}</small>
                </div>
              </div>
              <div class="dropdown">
                <button type="button" class="btn d-flex justify-content-end fs-6 text-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                  Switch
                </button>
                <ul class="dropdown-menu">
                  <li id="new-account"><a class="dropdown-item" href="#" onClick="newAccount()">Add a new account</a></li>
                  <li id="exist-account"><a class="dropdown-item" href="#" onClick="exitingAccount()">Add an existing account</a></li>
                </ul>
              </div>
      
    
    
             `;
    if (userInfo != null) {
      userInfo.innerHTML = content;
      userInfo.classList.add("my-3");
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
    username: username,
    password: password,
  };
  const url = `${baseUrl}/login`;
  toggleLoader(true);
  axios
    .post(url, params)
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
    })
    .finally(() => {
      toggleLoader(false);
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

  toggleLoader(true);

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
    })
    .finally(() => {
      toggleLoader(false);
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
// function createNewPostClicked() {
//   let postId = document.getElementById("post-id-input").value;
//   let isCreate = postId == null || postId == "";
//   console.log(postId);

//   let title = document.getElementById("post-title-input").value;
//   let body = document.getElementById("post-body-input").value;
//   let image = document.getElementById("post-image-input").files[0];

//   let formDate = new FormData();
//   formDate.append("title", title);
//   formDate.append("body", body);
//   formDate.append("image", image);

//   let url = ``;
//   let msg = "";
//   const token = localStorage.getItem("token");
//   const headers = {
//     "Content-Type": "multipart/form-data",
//     authorization: `Bearer ${token}`,
//   };

//   if (isCreate) {
//     url = `${baseUrl}/posts`;
//     msg = "New Post Has Been Created Successfully";
//   } else {
//     formDate.append("_method", "put");
//     url = `${baseUrl}/posts/${postId}`;
//     msg = "The Post Has Been Updated Successfully";
//   }

//   toggleLoader(true);

//   axios.post(url, formDate, {
//       headers: headers,
//     })
//     .then(function (response) {
//       console.log(response.data);
//       const post = response.data;
//       const modal = document.getElementById("create-post-modal");
//       const modalInstance = bootstrap.Modal.getInstance(modal);
//       modalInstance.hide();
//       showAlert(msg, "success");
//       getPosts();
//       getUsers();
//       getUserPosts();
//       getUser();
//     })
//     .catch((error) => {
//       const message = error.response.data.message;
//       showAlert(message, "danger");
//       console.log(message);
//     })
//     .finally(() => {
//       toggleLoader(false);
//     });
// }

// ==== FUNCTION EDIT POST BTN ON CLICKED ====
function editPostBtnClicked(postObject) {
  let post = JSON.parse(decodeURIComponent(postObject));
  console.log(post);
  document.getElementById("post-id-input").value = post.id;
  document.getElementById("post-modal-title").innerHTML = "Edit Post";
  document.getElementById("post-modal-submit-btn").innerHTML = "Update";
  document.getElementById("post-image-input").files[0] = post.image;
  let postModal = new bootstrap.Modal(
    document.getElementById("create-post-modal"),
    {}
  );
  postModal.toggle();
  document.getElementById("post-title-input").value = post.title;
  document.getElementById("post-body-input").value = post.body;
}

// ==== FUNCTION DELETE POST BTN ON CLICKED ====
function deletePostBtnClicked(postObject) {
  let post = JSON.parse(decodeURIComponent(postObject));
  console.log(post);
  document.getElementById("delete-post-id-input").value = post.id;
  let postModal = new bootstrap.Modal(
    document.getElementById("delete-post-modal"),
    {}
  );
  postModal.toggle();
}

// ==== FUNCTION CONFIRM POST DELETE ====
// function confirmPostDelete() {
//   const postId = document.getElementById("delete-post-id-input").value;
//   const url = `${baseUrl}/posts/${postId}`;
//   const token = localStorage.getItem("token");
//   const headers = {
//     authorization: `Bearer ${token}`,
//   };
//   axios.delete(url, {
//       headers: headers,
//     })
//     .then(function (response) {
//       console.log(response);
//       const modal = document.getElementById("delete-post-modal");
//       const modalInstance = bootstrap.Modal.getInstance(modal);
//       modalInstance.hide();
//       showAlert("The Post Has Been Deleted Successfully", "success");
//       getPosts();
//       getUsers();
//       getUserPosts();
//       getUser();
//     })
//     .catch((error) => {
//       const message = error.response.data.message;
//       showAlert(message, "danger");
//     });
// }

// ==== FUNCTION ADD BTN CLICKED ====
function addBtnClicked() {
  document.getElementById("post-id-input").value = "";
  document.getElementById("post-modal-title").innerHTML = "Create A New Post";
  document.getElementById("post-modal-submit-btn").innerHTML = "Create";
  document.getElementById("post-title-input").value = "";
  document.getElementById("post-body-input").value = "";
  let postModal = new bootstrap.Modal(
    document.getElementById("create-post-modal"),
    {}
  );
  postModal.toggle();
}

// ==== FUNCTION SHOW ALERT ====
function showAlert(customMessage, type = "success") {
  const successAlert = document.getElementById("success-alert");
  const alert = (message, type) => {
    console.log(message);
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
    successAlert.style.display = "block";
  setTimeout(() => {
    successAlert.style.display = "none";
    successAlert.textContent = "";
    // console.log(successAlert.textContent);
    
  }, 3000);
}

// ==== FUNCTION GET CURRENT USER ====
function getCurrentUser() {
  let user = null;
  const storageUser = localStorage.getItem("currentUser");
  if (storageUser != null) {
    user = JSON.parse(storageUser);
    console.log(user);
  }

  return user;
}

// ==== FUNCTION SHOW PASSWORD ====
function showPassword() {
  let password = document.querySelectorAll(".password-input");
  if (password[0].type === "password") {
    password[0].type = "text";
  } else {
    password[0].type = "password";
  }
  if (password[1].type === "password") {
    password[1].type = "text";
  } else {
    password[1].type = "password";
  }

}

// ==== FUNCTION POST CLICKED ====
function postClicked(postId) {
  window.location = `postDetails.html?postId=${postId}`;
}

// ==== FUNCTION USER CLICKED ====
function userClicked(userId) {
  window.location = `profile.html?userId=${userId}`;
}

// ==== FUNCTION PROFILE CLICKED ====
function profileClicked() {
  const currentUser = getCurrentUser();
  if(currentUser != null)
  window.location = `profile.html?userId=${currentUser.id}`;
}

// ==== FUNCTION CHECK SRC IMAGE IS STRING ====
function checkSrcImageIsString(value1, value2) {
  let result = typeof value1 === "string" || value2 instanceof String;
  return result;
}

// ==== FUNCTION LOADER ====
function toggleLoader(show = true) {
  if (show) {
    document.getElementById("loader").style.visibility = "visible";
  } else {
    document.getElementById("loader").style.visibility = "hidden";
  }
}

function btnAddClicked() {
  let addBtn = document.getElementById("add-btn");
  addBtn.click();
}

// ==== DARK MODE FUNCTIONS ====
let darkMode = localStorage.getItem("dark-mode");
let btnAdd = document.getElementById("add-btn");
console.log(btnAdd);
console.log(darkMode);

const themeLight = () => {
  document.body.setAttribute("data-bs-theme", "light");
  localStorage.setItem("dark-mode", "light");
  document.querySelector(".icon-mode").textContent = "light_mode";

  if (btnAdd != null) {
    btnAdd.classList.add("bg-dark");
    btnAdd.classList.remove("bg-gray-dark");
    console.log("yes");
  }
};

const themeDark = () => {
  document.body.setAttribute("data-bs-theme", "dark");
  localStorage.setItem("dark-mode", "dark");
  document.querySelector(".icon-mode").textContent = "dark_mode";

  if (btnAdd != null) {
    btnAdd.classList.add("bg-gray-dark");
    btnAdd.classList.remove("bg-dark");
    console.log("yes");
  }
};

// set state of darkMode on page load
if (darkMode === "light") {
  themeLight();
} else {
  themeDark();
}

const changeMode = () => {
  darkMode = localStorage.getItem("dark-mode"); // update darkMode when clicked
  if (darkMode === "light") {
    themeDark();
  } else {
    themeLight();
  }
};
