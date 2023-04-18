// ==== BASE URL ====
const base_Url = 'https://tarmeezacademy.com/api/v1';
let id  =  1914;
getUser();
getPosts();


// ==== FUNCTION GET USERS ====
function getUser() {
    axios.get(`${base_Url}/users/${id}`)
    .then(function (response) {
        const user = response.data.data;
        console.log(user);
        const user_image = document.getElementById("user-image");        
        let isString = (typeof user.profile_image === 'string' || user.profile_image instanceof String);
        if(isString){
            user_image.src = user.profile_image;
        }else {
            user_image.src = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
        }
        document.getElementById("name").innerHTML = user.name;
        document.getElementById("username").innerHTML = "@" + user.username;
        document.getElementById("posts-count").innerHTML = user.posts_count;
        document.getElementById("comments-count").innerHTML = user.comments_count;
  
    })
    .catch(function (error) {
      const message = error.response.data.message;
      showAlert(message,'danger');
    })
    
}

// ==== FUNCTION GET POSTS ====
function getPosts() {
    axios.get(`${base_Url}/users/${id}/posts`)
    .then(function (response) {
        const div_posts = document.getElementById("posts");
        const posts = response.data.data;
          div_posts.innerHTML = "";
    
        // POSTS
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