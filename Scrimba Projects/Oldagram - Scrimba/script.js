const posts = [
  {
    name: "Vincent van Gogh",
    username: "vincey1853",
    location: "Zundert, Netherlands",
    avatar: "images/avatar-vangogh.jpg",
    post: "images/post-vangogh.jpg",
    comment: "just took a few mushrooms lol",
    likes: 21,
  },
  {
    name: "Gustave Courbet",
    username: "gus1819",
    location: "Ornans, France",
    avatar: "images/avatar-courbet.jpg",
    post: "images/post-courbet.jpg",
    comment: "i'm feelin a bit stressed tbh",
    likes: 4,
  },
  {
    name: "Joseph Ducreux",
    username: "jd1735",
    location: "Paris, France",
    avatar: "images/avatar-ducreux.jpg",
    post: "images/post-ducreux.jpg",
    comment:
      "gm friends! which coin are YOU stacking up today?? post below and WAGMI!",
    likes: 152,
  },
];

let cardsContainer = document.getElementById("cards-container");

function renderPosts(posts) {
  let postsString = "";
  posts.forEach((post) => {
    postsString += `
          <div class="card">
            <div class="card-author">
              <img
                class="avatar"
                src="${post.avatar}"
                alt="Portre of Van Gogh"
              />
              <div class="card-author-info">
                <h2 class="name">${post.name}</h2>
                <p class="location">${post.location}</p>
              </div>
            </div>
            <img
              class="post"
              src="${post.post}"
              alt=""
            />
            <div class="card-info">
              <div class="card-icons">
                <img class="icon" src="./images/icon-heart.png" alt="" />
                <img class="icon" src="./images/icon-comment.png" alt="" />
                <img class="icon" src="./images/icon-dm.png" alt="" />
              </div>
              <p class="like-counter">
                <span class="likes">${post.likes}</span> likes
              </p>
              <p>
                <span class="username">${post.username}</span>
                <span class="comment">${post.comment}</span>
              </p>
            </div>
          </div>
    `;
  });
  cardsContainer.innerHTML = postsString;
}

document.addEventListener("DOMContentLoaded", function () {
  renderPosts(posts);
});
