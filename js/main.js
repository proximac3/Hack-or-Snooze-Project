"use strict";

// So we don't have to keep re-finding things on page, find DOM elements once:

const $body = $("body");

const $storiesLoadingMsg = $("#stories-loading-msg");
const $allStoriesList = $("#all-stories-list");

const $loginForm = $("#login-form");
const $signupForm = $("#signup-form");

const $navLogin = $("#nav-login");
const $navUserProfile = $("#nav-user-profile");
const $navLogOut = $("#nav-logout");

const createStoryBtn = $('.createStory').get(0)
const newStoryForm = $('.newStory').get(0)
const deleteTest = $allStoriesList.get(0)
const addTofavorites = $allStoriesList.get(0)

const ShowFavorites = $('.favorites').get(0)
const favoritesList = $('.favorites-list').get(0)

const $storiesContainer = $('.stories-container').get(0)
const $hideFavoriteListButton = $('.hideFavoritesButton').get(0)
const favoriteOlList = $('.favoritesOl').get(0)
const $favoritesListDiv = $('.favorites-list').get(0)
const $storiesList = $('#all-stories-list').get(0)

const $editStoryForm = $('.edit-story-form').get(0)

const $submitEditedStoryButton = $('.submitEditedStoryParams').get(0)
const incorrectCredentialMessage = document.querySelector('.IncorrectCredentials')
const userNotAvailable = document.querySelector('.username_not_available')

const userProfile = document.querySelector('.userProfile')
const changeUserName = document.querySelector('.changeUserName')
const submitNewNameForm = document.querySelector('.submitNewName')
const navUserProfileIcon = document.querySelector('#nav-user-profile')
const userNameDisplay = document.querySelector('.currentUSer')


/** To make it easier for individual components to show just themselves, this
 * is a useful function that hides pretty much everything on the page. After
 * calling this, individual components can re-show just what they want.
 */

function hidePageComponents() {
  const components = [
    $allStoriesList,
    $loginForm,
    $signupForm,
  ];
  components.forEach(c => c.hide());
}

/** Overall function to kick off the app. */

async function start() {
  console.debug("start");
  
  // "Remember logged-in user" and log in, if credentials in localStorage
  await checkForRememberedUser();
  await getAndShowStoriesOnStart();
  
  // if we got a logged-in user
  if (currentUser) updateUIOnUserLogin();
}

// Once the DOM is entirely loaded, begin the app
console.warn("HEY STUDENT: This program sends many debug messages to" +
" the console. If you don't see the message 'start' below this, you're not" +
" seeing those helpful debug messages. In your browser console, click on" +
" menu 'Default Levels' and add Verbose");
$(start);

// infinity scrool
window.addEventListener('scroll',()=>{
    if(window.scrollY + window.innerHeight >= 
    document.documentElement.scrollHeight){
      putStoriesOnPage()
    }
})
