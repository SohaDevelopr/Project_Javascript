// ==== BASE URL ====
const base_Url = 'https://tarmeezacademy.com/api/v1';
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("postId");
console.log(id);

// ==== ====
setupUI();
getPost();


// ==== FUNCTION GET POSTS ====
function getPost() {
axios.get(`${base_Url}/posts/${id}`)
.then(function (response) {
    const div_post = document.getElementById("post");
    const post = response.data.data;
    const comments = post.comments;
    const currentUser = getCurrentUser();
    console.log(currentUser);
    console.log(comments);
    const author = post.author;
    let isMyPost = currentUser != null && post.author.id == currentUser.id;
    let editBtnContent = ``;
    if(isMyPost){
      editBtnContent = 
      `
        <li onclick="editPostBtnClicked('${encodeURIComponent(JSON.stringify(post))}')"><a class="dropdown-item" href="#">Edit</a></li>
        <li><hr class="dropdown-divider"></li>
        <li onclick="deletePostBtnClicked('${encodeURIComponent(JSON.stringify(post))}')"><a class="dropdown-item delete" href="#">Delete</a></li>
      `
    }
    // COMMENTS
    let commentsContent = ``
    for(let comment of comments) {
      let isString = (typeof comment.author.profile_image === 'string' || comment.author.profile_image instanceof String);
      commentsContent+= 
      `
        <!-- COMMENT -->
        <div class="py-4 bg-white border-bottom">
            <!-- PROFILE + USERNAME -->
            <div class="mb-2 d-flex align-items-center">
            ${
                isString?
                `
                <img src="${comment.author.profile_image}" alt="profile_image" width="48px" height="48px" class="rounded-circle object-fit-cover">
                `
                :
                `
                <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png" alt="profile_image"  width="48px" height="48px" class="rounded-circle object-fit-cover">
                `
              }
                <div class="d-flex flex-column mx-2">
                    <a href="#" class="fw-bold mb-0 text-decoration-none text-dark" style="font-size: 13px;">${comment.author.name}</a>
                    <small style="font-size: 12px; font-weight: 500;">@${comment.author.username}</small>
                </div>
            </div>
            <!-- // PROFILE + USERNAME // -->
            <!-- COMMENT'S BODY -->
            <div class="m-auto" style="width: 88%;">
                ${comment.body}
            </div>
            <!-- // COMMENT'S BODY // -->
        </div>
        <!-- // COMMENT //  -->
      `
    }
    // POSTS
    // onclick="followUnFollow(${id})"
    div_post.innerHTML = "";
    let isString = (typeof author.profile_image === 'string' || author.profile_image instanceof String);
    let isImage;
    if(currentUser != null){
      isImage = (typeof currentUser.profile_image === 'string' || currentUser.profile_image instanceof String);
    }
    let contentPosts = 
      `
            <div class="card mb-5">
              <div class="card-header px-sm-2 px-md-3">
                <div class="d-flex align-items-center justify-content-between">
                    <div class="d-flex align-items-center info">
                      ${
                        isString?
                        `
                        <img src="${author.profile_image}" alt="" width="40px" height="40px" class="rounded-circle object-fit-cover">
                        `
                        :
                        `
                        <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png" alt="" width="40px" height="40px" class="rounded-circle object-fit-cover">
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
              <div id="comments" class="px-3">
                 ${commentsContent}
              </div>
                <div class="input-group px-3 pb-2 pt-3" style="margin: -1px;" id="addComment-div">
                ${
                  isImage?
                  `
                  <img src="${currentUser.profile_image}" alt="" width="40px" height="40px" class="rounded-circle object-fit-cover me-2">
                  `
                  :
                  `
                  <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png" alt="" width="40px" height="40px" class="rounded-circle object-fit-cover me-2">
                  `
                }                
                <input type="text" class="form-control rounded-start" id="comment-input" placeholder="write your comment ...." aria-label="Recipient's username" aria-describedby="button-addon2">
                <button class="btn btn-outline-dark" type="button" id="button-addon2" onclick="createCommentClicked()"><i class="fa-regular fa-paper-plane"></i></button>
            </div>
            </div>

      `
    div_post.innerHTML += contentPosts;
    // == POSTS ==
})
.catch(function(error) {
  const message = error.response.data.message;
  showAlert(message,'danger');
})

}

// ==== FUNCTION CREATE COMMENT ON CLICKED ====
function createCommentClicked() {
  let commentBody = document.getElementById("comment-input").value;
  console.log(commentBody);

  const url = `${base_Url}/posts/${id}/comments`;
  const token = localStorage.getItem("token");
  console.log(token);
  const headers = {
    "authorization": `Bearer ${token}`
  }
  const params = {
    "body": commentBody
  };

  axios.post(url,params,{
    headers: headers
  })
  .then(function (response) {
    console.log(response.data);
    showAlert("The comment has been created successfully",'success');
    getPost();

  }).catch((error)=> {
    const message = error.response.data.message;
    showAlert(message,'danger');
  })   
}