# POKEMONS APP

Simple application crated using create-react-app to list pokemons, show description of each pokemons and a list of those marked as favorites.

## STRUCTURE

A simple architecture was build to manage this project where App will manage the main state and the contexts related to the favorite list and user data.
From App.js the router is implemented to show a login page, a home page with the list of pokemon and a bottom bar navigation to move between favorites and home.


The Api is located in the Services folder where the methods used to get data from external api is implemented

## Components

* Dashboard: Component that will render the home page with it's title, pagination and list of card where the pokemons are shown
* Description: Page where a simple description page is implemented and opened in a new window everytime the user click on Learn more
* CURRENT ISSUE: I had no opportunity to fix an issue related with the state manager that is restarted when a new window is opened.
* ISSUE SOLVED: all the state is being managed in a unique state with all properties that will be stored in 
* The localstorage and reloaded if it exists when the page is reloaded. in this way, the issue mentioned before, to keep the state even if a new window is opened, was solved. now, any description of any pokemon can be opened with no problems
* Favorite: this page will show a list with the cards of the pokemons marked as favorites
* Footer: component that contains the bottom navigation bar with two links to Home and Favorites
* ImageCard: Component that holds the structure used to show the pokemon name, it's photo and it's details
* Pagination: Component used to show the available pages of pagination based on the total of records
* FilterInput: Component used to filter the list ok pokemons shown in Favorites or Home
* Sharedlayout: Basic structure used to put the bottom navigation bar on each page
* SignIn: Component created to validate the access to the application with the following credentials
* USER: abc@gmail.com
* PASSWORD: abc



The explanation of the code can be found in this link
https://www.loom.com/share/b73b1c4778004494b8d9f137786853ad?sharedAppSource=personal_library



The information is being obtained from this Api
https://pokeapi.co/api/v2/

the session is being stored as a cookie

the general state of the application is being maintained with all the pokemons information and it's saved as well in the localstorage with the following name
* pokemon-temp-list
In this way the general state will be shared with new blank opened windows


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
