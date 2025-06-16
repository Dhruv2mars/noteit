---
description: setting up the whole project from a clean repo with step by step guidlines to follow.
---

1. Core Technology Stack

This is the official set of technologies chosen for the project.

Language: TypeScript (TSX) for all application code.

Monorepo Manager: Turborepo to orchestrate tasks and manage dependencies across the project.

Package Manager: Bun will be used for all dependency management and script execution.

Mobile & Web Platform: Expo (SDK 53) is the primary framework for the iOS, Android, and Web applications.

Desktop Platform: Electron (with electron forge) will be used to wrap the web application for macOS, Windows, and Linux distribution.

Backend: This is a client-side only application with no backend. For Now! The whole application should be built in a way, where in future when we introduce a backend, everything implements and runs smoothly without any issues.




2. Architectural Principles

These are the high-level rules that guide how we build and make decisions.

Web Search: always refer to @web to check the docs and find the latest and accurate information wherever necessary.

Expo First: If a feature can be implemented using an Expo-specific module or a general React Native library, we must prioritize the Expo implementation.

SDK 53 Dependency Alignment: All new and existing dependencies must be fully compatible with Expo SDK 53. Before adding a new package, verify its compatibility.

Start Clean: When initializing a new package or app within the monorepo, always start with a minimal setup. Remove any unnecessary boilerplate or example files from default templates.

Aim for Stability: The application across all platforms should be robust and perform as expected. Rigorous testing is encouraged to ensure it "works perfectly all the time."

Make sure: **The app should work perfectly at all times.**




3. Development Workflow

These are the specific, sequential steps for day-to-day development.

Project Setup and Building the App: the whole app should be setup and built completely first, including everything. Then, to run the app for the first time, the following expo setup needs to be done.

Expo Project Setup: When the app has been built and its time to run it for the first time, the initial step is to log in to Expo (bunx expo login) to link your account, which is necessary for using Expo's services.

Commands to Run the App (for both expo and electron workflow):

To run the expo app, the bunx expo start command should be run in expo directory, not from the monorepo root. This isolates the native build process correctly.
To run the electron app, the bun dev command should be run in electron directory, not from the monorepo root. This isolates the native build process correctly.




4. Project Structure

This is the minimal project structure to be followed:

repo-name/
├── app-name-expo/
│   ├── # all the stuff related to expo
│
├── app-name-electron/
│   ├── # all the stuff related to electron




5. Some Considerations:

Expo Configuration

TypeScript Project Setup:
Ensure your Expo TypeScript projects have @types/react installed.
Verify that tsconfig.json is correctly configured for your project.

Entry File Verification:
Confirm that the Expo entry file (index.js) correctly imports the root component (e.g., ./App).

Web and Mobile Differentiation:
The workflow, user flow, UI/UX should be different for a webapp than a mobile app, its a industry standard. To do this, use react native platform.

Web Support:
Install react-dom, react-native-web, and @expo/metro-runtime for web platform compatibility.

Browser Tab Title:
Explicitly set web.title in app.json to define the correct browser tab title.

Dependency version to use:
 @expo/metro-runtime": "^5.0.4",
 @expo/ngrok": "^4.1.3",
    "eas": "^0.1.0",
    "expo": "~53.0.11",
    "expo-dev-client": "^5.2.0",
    "expo-router": "5.0.7",
    "expo-status-bar": "~2.2.3",
    "expo-updates": "~0.28.14",
    "react": "19.0.0",
    "react-dom": "19.0.0",
    "react-native": "0.79.3",
    "react-native-web": "^0.20.0",
    "update": "^0.7.4"
 
  "devDependencies":
    "@babel/core": "^7.25.2",
    "@types/react": "19.0.10",
    "typescript": "~5.8.3"

EAS Configuration Consolidation:
Consolidate all EAS configurations (e.g., projectId, owner) directly into the Expo app's app.json.

Monorepo Management

Dependency Error Resolution:
For dependency errors, clean all node_modules directories and lockfiles (e.g., yarn.lock, package-lock.json), then reinstall all dependencies from the monorepo root.

Workspace Folder Renaming:
After renaming a workspace folder, immediately update the workspaces paths in the root package.json.

Electron Desktop Configuration

Frontend Server Command:
Set Electron's ready event handler to start your frontend server without causing a recursive loop.

Stale Build Artifacts:
After renaming folders, run bun run clean in the Electron project directory to clear any stale build artifacts.

Web Assets Paths:
Ensure that the mainWindow.loadURL configuration in Electron's main process correctly points to your web assets.

Web and Desktop Differentiation:
The workflow, user flow, UI/UX should be different for a webapp than a desktop app, its a industry standard. To do this, use some kind of condition.

Electron Forge:
Use Electron Forge for desktop app build and distribution.

App Name and Version

App Naming:
The actual app name, that will come in the title (for web), app name (mobile), and window/app name (desktop) should be the actual app name (without the -expo or -electron suffix).

App Versions:
The default first version of the app will be 0.0.1 instead of 1.0.0. 

Project Cleanup
remove unused boilerplate code, obsolete test scripts, and redundant [README.md](http://README.md) files from your project.




6. Sequence of Steps

Before doing all the above steps and tasks, you will ask the user, "What app do you want to make?". The user will then tell you about the overall app logic and requirements that needs to be implemented. Based on the user requirement of the app, you will start all the next processes as mentioned above.