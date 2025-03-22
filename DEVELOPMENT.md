# Development

This project uses Node.js for development.

## TLDR

```bash
git clone https://github.com/Khancord/rts-game
cd rts-game
npm i
npm run dev
```

## Steps

### 1. Clone the Repository

Before you can start developing, you need to download the project's source code. You can do this by cloning the repository using [Git](https://git-scm.com/):

```bash
git clone https://github.com/Khancord/rts-game.git
```

This will create a new folder called `rts-game` on your computer with all the project files.

If you don't have Git installed, you can download the source code as a ZIP file from the [GitHub repository page](https://github.com/Khancord/rts-game/). Click on the green "Code" button and select "Download ZIP".

We recommend learning how to use Git as it is a powerful tool for managing source code. If you prefer a GUI, you can use [GitHub Desktop](https://github.com/apps/desktop/).

### 2. Install Node.js

Download and install Node.js from [nodejs.org](https://nodejs.org/).

You can confirm that you've installed Node.js by running the following commands in your terminal:

```bash
node --version
```

### 3. Install Dependencies

We use [three.js](https://threejs.org/) for 3D rendering along with other npm packages for development. You can install all dependenceis by running the following commands:

```bash
cd rts-game
npm install
```

This will install all the dependencies listed in the [`package.json`](package.json) file to a new folder called `node_modules`.

### 4. Start the Development Server

You can start the development server by running the following command:

```bash
npm run dev
```

This will start a local development server at [http://localhost:5173](http://localhost:5173). You can open this link in your web browser to view the game. The server will automatically reload the webpage when you make changes to the source code.

To stop the development server, press <kbd>Ctrl</kbd> + <kbd>C</kbd> in your terminal.
