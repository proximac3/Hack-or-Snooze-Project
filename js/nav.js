"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents();
  putStoriesOnPage();
}

$body.on("click", "#nav-all", navAllStories);

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
}

$navLogin.on("click", navLoginClick);

/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show();
  $navLogin.hide();
  $navLogOut.show();
  $navUserProfile.text(`${currentUser.username}`).show();
  $navUserProfile.append('<i class="fas fa-user"></i>')
}

// Reveal story submissiopn form when cicked
createStoryBtn.addEventListener('click', function (e) {
  newStoryForm.style.display = ''
})

// create new Story and add to story list
newStoryForm.addEventListener('click', async function (evt) {
  evt.preventDefault()

  if (evt.target.tagName === 'BUTTON') {
    const authorsName = $('#author').val()
    const url = $('#url').val()
    const title = $('#title').val()

    await StoryList.addStory(authorsName, url, title)
    newStoryForm.style.display = 'none'

    window.location.reload()
  }

})

//show favorites list and hide main list
ShowFavorites.addEventListener('click', function (e) {
  favoritesList.style.display = ''
  $storiesContainer.style.display = 'none'
})

//hide favorite list and show stories list
$hideFavoriteListButton.addEventListener('click', function () {
  favoritesList.style.display = 'none'
  $storiesContainer.style.display = ''

})