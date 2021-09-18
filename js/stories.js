"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story) {
  // console.debug("generateStoryMarkup", story);

  const hostName = story.getHostName();
  return $(`
      <li id="${story.storyId}">
        <div class='deletefav' style ="display: none">
          <i class="fas fa-edit"></i>
          <i class="fas fa-trash-alt"></i>
          <i class="far fa-bookmark"></i>
        </div>

        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
}

/** Gets list of stories from server, generates their HTML, and puts on page. */
function putStoriesOnPage() {
  console.debug("putStoriesOnPage");
  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}

//Get current user favorite stories from server and update favorite list
async function updatefavoriteList() {
  let result = await getUser()
  try {
    const favoriteStories = result.favorites
    favoriteStories.forEach(elem => {
      let favStory = generateStoryMarkup(elem)
  
      favStory[0].children[0].children[0].style.display = 'none'
      favStory[0].children[0].children[2].style.display = 'none'
      // favStory[0].children[0].children[1].innerHTML = '<i class="fas fa-trash-alt"></i>'
      favStory[0].children[0].children[1].setAttribute('class', 'fas fa-trash-alt')
      favoriteOlList.prepend(favStory[0])
  
    })
  } catch (er) {
    console.warn(`User must be signed in to access user favorites:`, er)
  }
}
updatefavoriteList()

// Add story to current users Favorite
addTofavorites.addEventListener('click', async function (e) {
  if (e.target.getAttribute('class') === 'far fa-bookmark') {
    const storyId = e.target.parentElement.parentElement.id
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("username");
    e.target.style.color = 'blue'
    // Add Story To favorite
    let res = await StoryList.addtoFavorite(storyId, token, user)
  }

})

// Delete Story from story List
deleteTest.addEventListener('click', async function (e) {
  e.preventDefault()
  if (e.target.getAttribute('class') === 'fas fa-trash-alt') {
    const storyId = e.target.parentElement.parentElement.id
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("username");
    
    // Delete Story 
    let resl = await StoryList.deleteStory(storyId,token,user)
    window.location.reload()
  }
  
})

// Remove Story from favorites.
$favoritesListDiv.addEventListener('click', async function (e) {
  if (e.target.getAttribute('class') === 'fas fa-trash-alt') {
    const storyId = e.target.parentElement.parentElement.id
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("username");

    const results = await StoryList.deleteFromFavorite(user, storyId, token)
  }
})

//Editing Story
let storyID
//When current user click on edit icon, reveal submission form.
$storiesList.addEventListener('click', function (e) {
  if (e.target.getAttribute('class') === "fas fa-edit") {
    $editStoryForm.style.display = ''
    //get story id.
    storyID = e.target.parentElement.parentElement.id
  }
  
})

// Submit edited story.
$submitEditedStoryButton.addEventListener('click', async function (e) {
  e.preventDefault()
  const token = localStorage.getItem("token");
  const authorsName = $('#editAuthorsName').val()
  const title = $('#editTitle').val()
  let result = await StoryList.editStory(storyID, token, authorsName,title)
})











// function testinToSee(x) {
//   for (let i = 0; i < x.length; i++){
//     console.log(x[i])
//   }
//   console.log(`this function runs `)
// }

// testinToSee(deleteAndAddFavDiv)


// console.log(deleteAndAddFavDiv)



// const $deleteButton = document.querySelectorAll('li button')

// function hideButton() {
//   for (let elem of $deleteButton) {
//     console.log( `name`)
//   }
// }

// hideButton()
// console.log($deleteButton)