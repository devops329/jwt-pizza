# 🍕 JWT Pizza - Now undergoing work by Kaiden's Devops/QA team

![Coverage badge](coverageBadge.svg)


[![CI Pipeline](https://github.com/KaidenWilliams/jwt-pizza/actions/workflows/ci.yml/badge.svg)](https://github.com/KaidenWilliams/jwt-pizza/actions/workflows/ci.yml)


A JSON Web Token, or [JWT](https://jwt.io/introduction), (pronounced JOT) is a digitally signed transfer of information using JSON notation. Because you can validate the digital signature you can buy JWT pizzas with confidence.

`JWT Pizza` takes the next stage of digital evolution by allowing you to buy pizzas that you can never actually eat. Not only does JWT exchange bitcoin and give you nothing in return, it also allows for you to be come a franchisee and turn the whole vapor company into an MLM.

You can see a working example of the application at [pizza.cs329.click](https://pizza.cs329.click)

## Running locally

1. Fork this repository
   ![Fork repo](forkRepo.png)

   and then clone the fork from your GitHub account to your development environment.

   ```sh
   git clone https://github.com/youraccountnamehere/jwt-pizza.git
   ```

2. Change to the repo dir and install the dependencies
   ```sh
   cd jwt-pizza
   npm install
   ```
3. Run vite
   ```sh
   npm run dev
   ```

## Development notes

JWT Pizza uses Vite, React, Tailwind, and Preline. The following contains some notes about how these components were integrated into the project.

### Vite

Create the basic Vite app.

```sh
npm init -y
npm install vite@latest -D
```

Modify `package.json`

```json
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
```

### React

React works out of the box with Vite, but we do need to install the desired React packages. The `index.html` file loads `index.jsx` which then loads the app component (`src/app.jsx`).

```sh
npm install react react-dom react-router-dom
```

### Tailwind

To process the Tailwind css we are going to use `postcss` and `autoprefixer`.

```sh
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init
```

Modify `tailwind.config.js`

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['index.html', './src/**/*.{html,js,jsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

Create a `main.css` and add the basic Tailwind directives.

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Modify `index.html` to include tailwind output.css.

```html
<head>
  ...
  <link href="./main.css" rel="stylesheet" />
</head>
```

Now when you run with `npm run dev` the css will automatically be generated.

### Preline

Added the Tailwind [Preline component library](https://preline.co/) so that I can use all of their nifty nav, slideshow, containers, and cards.

```sh
npm i preline
```

Updated the tailwind config to use preline.

```js
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['index.html', './src/**/*.{html,js,jsx}', './node_modules/preline/preline.js'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [require('preline/plugin')],
};
```

Import preline into app.jsx.

```js
import 'preline/preline';
```

Initialize components whenever the page location changes.

```js
import { useLocation, Routes, Route, NavLink } from 'react-router-dom';

export default function App() {
  const location = useLocation();

  useEffect(() => {
    window.HSStaticMethods.autoInit();
  }, [location.pathname]);
  //...
```

### Icons

[HeroIcons](https://heroicons.com/) - MIT license
