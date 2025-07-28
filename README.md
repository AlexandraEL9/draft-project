# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

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

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

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

## Draft Project SetUp

This is the initial setup for the **Routine Builder** project — a web app that helps users create and manage custom routines. Future features will include timers, calendar integrations, and playlist support.

---

## 🚀 Project Setup

### 1. Clone the Repository

```bash
git clone https://github.com/AlexandraEL9/draft-project.git
cd draft-project
```
2. Create a React App in the Current Folder
```bash
npx create-react-app .
```
If prompted to install create-react-app, type y.

3. Open the Project in VS Code
```bash
code .
```
🧱 Folder Structure
```css
src/
├── components/
│   └── Button.js
├── styles/
│   ├── App.css
│   └── Button.css
├── App.js
└── index.js
```
### 📁 Project File Structure (Explained)
| Path                      | Type       | Description                                                                 |
|---------------------------|------------|-----------------------------------------------------------------------------|
| `src/`                   | Folder     | Main source folder for your React app’s code.                              |
| `src/components/`        | Folder     | Contains reusable React components (e.g. `Button.js`).                     |
| `src/components/Button.js` | JavaScript | A custom button component you created to reuse across the app.             |
| `src/styles/`            | Folder     | Contains CSS files for styling components and the app.                     |
| `src/styles/App.css`     | CSS        | Styles specific to the main `App` component (e.g. body, headings).         |
| `src/styles/Button.css`  | CSS        | Styles for the custom `Button` component (e.g. color, border, padding).    |
| `src/App.js`             | JavaScript | Main React component rendered to the page — acts like your homepage.       |
| `src/index.js`           | JavaScript | Entry point of the React app — renders `App` to the root DOM element.      |

### What is App.js?
`App.js` is the main component of your React application. It serves as the top-level UI layout, and it's the first thing rendered by index.js. Think of it like the `<body>` of a traditional HTML page — it controls what appears on screen.

### index.js
🔍 Purpose:
`index.js` is the entry point of your React app. It's the file that tells React:
- What component to render (App)
- Where in the HTML to inject it (<div id="root"> in index.html)

### index.css
🔍 Purpose:
 This file usually holds global CSS styles, resets, or base typography.
- It's applied before individual component styles like App.css.

📂 Typical uses:
- Set base font family or background color
- Reset margin/padding for all elements
- Define CSS variables or utility classes

### App.css
🔍 Purpose:
- App.css contains component-specific styles for the App.js component.
- It’s imported directly in App.js, so its styles apply only when App is rendered.
- This keeps styling modular and scoped to each component (a core React philosophy).

📂 Typical Uses:
- Style elements defined inside App.js (e.g. headings, sections, layout)
- Customize appearance of the homepage or main app view
- Apply CSS classes used only within App.js

| File        | Scope                 | Typical Use                             |
| ----------- | --------------------- | --------------------------------------- |
| `index.css` | Global (entire app)   | Reset styles, base fonts/colors         |
| `App.css`   | Local (just `App.js`) | Page layout, headings, paragraphs, etc. |

🧪 Run the App
```bash
npm start
```
This will open your app at http://localhost:3000

### Fixes Applied
✅ 1. Prevent node_modules from being committed
Ensure .gitignore contains:
```gitignore
/node_modules
/.pnp
.pnp.js
```
If node_modules/ was already committed, remove it from Git tracking:
```bash
git rm -r --cached node_modules
git commit -m "Remove node_modules from version control"
```
✅ Status
- GitHub repo cloned
- React app scaffolded
- .gitignore verified
- VS Code setup
- App runs locally

---

