# CS102 PSA Vessel System Backend

## Requirements

For building and running the application you need:

- [Node >= 10.16](https://nodejs.org/en/)
- [npm >= 5.6](https://www.npmjs.com/package/npx)

Before start testing/building the application, do remember to create the environment files, refer to `.env.example` :
- `.env.local` - Used for local testing
- `.env.production` - Used for deployment

## Running the application locally

Before running other terminal commands, please run `npm install` to install all the necessary package and dependencies.

In the project directory, you can run:

### `npm start`

This runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### `gulp -w`

This updates styling files(css, scss) in the development mode.

This will reload if you make edits.
You will also see any lint errors in the console.

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Deploying the application

After running `npm run build`, there will be a `build` folder created at the root directory of the project. You can use FTP or SSH to move everything to the web server.
