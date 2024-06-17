// ==== BASE URL ====
const base_Url = 'https://tarmeezacademy.com/api/v1';
const imgSrc = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT19eLyqRHQDO-VnXj1HhzL_9q8yHF-3ewIhA&usqp=CAU";
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("postId");
console.log(id);

// ==== ====
setupUI();
getPost();


// ==== FUNCTION GET POSTS ====
function getPost() {
  toggleLoader(true);
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
      let profileImage = (currentUser != null)? currentUser.profile_image : null;
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
        commentsContent+= 
        `
          <!-- COMMENT -->
          <div class="py-4 border-bottom" style="background-color: inherit;">
              <!-- PROFILE + USERNAME -->
              <div class="mb-2 d-flex align-items-center">
              ${
                checkSrcImageIsString(comment.author.profile_image , comment.author.profile_image)?
                  `
                  <img src="${comment.author.profile_image}" alt="profile_image" width="45px" height="45px" class="rounded-circle object-fit-cover">
                  `
                  :
                  `
                  <img src="${imgSrc}" alt="profile_image"  width="45px" height="45px" class="rounded-circle object-fit-cover">
                  `
                }
                  <div class="d-flex flex-column mx-2">
                      <a href="#" class="fw-bold mb-0 text-decoration-none" style="font-size: 13px; color: inherit;">${comment.author.name}</a>
                      <small style="font-size: 12px; font-weight: 500;">@${comment.author.username}</small>
                  </div>
              </div>
              <!-- // PROFILE + USERNAME // -->
              <!-- COMMENT'S BODY -->
              <div style="margin-left: 52px;">
                  ${comment.body}
              </div>
              <!-- // COMMENT'S BODY // -->
          </div>
          <!-- // COMMENT //  -->
        `
      }

      // POSTS
      div_post.innerHTML = "";
      let contentPosts = 
        `
              <div class="card mb-5">
                <div class="card-header px-sm-2 px-md-3">
                  <div class="d-flex align-items-center justify-content-between">
                      <div class="d-flex align-items-center info" onClick="userClicked(${author.id})">
                        ${
                          checkSrcImageIsString(author.profile_image , author.profile_image)?
                          `
                          <img src="${author.profile_image}" alt="" width="50px" height="50px" class="rounded-circle object-fit-cover">
                          `
                          :
                          `
                          <img src="${imgSrc}" alt="" width="50px" height="50px" class="rounded-circle object-fit-cover">
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
                <div id="comments" class="px-3">
                  ${commentsContent}
                </div>
                ${
                  isMyPost?
                  ""
                  :
                  (currentUser != null)?
                  `
                  <div class="input-group px-3 pb-2 pt-3" style="margin: -1px;" id="addComment-div">
                    ${
                      checkSrcImageIsString(profileImage , profileImage)?
                      `
                      <img src="${profileImage}" alt="" width="50px" height="50px" class="rounded-circle object-fit-cover me-2" onclick="profileClicked()" style="cursor: pointer;">
                      `
                      :
                      `
                      <img src="${imgSrc}" alt="" width="50px" height="50px" class="rounded-circle object-fit-cover me-2">
                      `
                    }                
                    <input type="text" class="form-control rounded-start" id="comment-input"  placeholder="write your comment ...." aria-label="Recipient's username" aria-describedby="button-addon2">
                    <button class="btn btn-send" type="button" id="button-send" onclick="createCommentClicked()"><i class="fa-regular fa-paper-plane"></i></button>
                  </div>                
                  `
                  :""
                }
              </div>

        `
      div_post.innerHTML += contentPosts;
      // == POSTS ==
  })
  .catch(function(error) {
    const message = error.response.data.message;
    showAlert(message,'danger');
  })
  .finally(()=>{
    toggleLoader(false);
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
  toggleLoader(true);
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
  .finally(()=>{
    toggleLoader(false);
  });  
}