# NoteIt - Contributor Guide

Welcome to the NoteIt project! This guide provides everything you need to set up your development environment, run the apps locally, and build the final installers.

## 1. Getting Started: Initial Setup

Follow these steps once to prepare your machine.

### Prerequisites

1.  **Git**: Ensure Git is installed on your system.
2.  **Node.js**: `v20.10.0` or later is required.
3.  **Bun**: `v1.1.21` or later is required (the project is locked to this version).

    You can verify your installed versions by running:
    ```sh
    node -v
    bun -v
    ```

### Installation

1.  **Clone the Repository**:
    ```bash
    git clone https://github.com/Dhruv2mars/noteit.git
    cd noteit
    ```

2.  **Install All Dependencies**:
    From the **root directory** of the project, run:
    ```bash
    bun install
    ```
    This command reads the `bun.lockb` file and installs all the necessary packages for the entire project (both the Expo and Electron apps).

## 2. Local Development

This section explains how to run the apps on your local machine for development and testing.

### Running the Mobile App (Expo)

If you are working on the mobile app or the web interface:

1.  Navigate to the Expo app directory:
    ```bash
    cd apps/noteit-expo
    ```
2.  Start the development server:
    > **Note:** The `bun install` command you ran earlier already installed the correct version of the Expo CLI for this project. A separate global install is not needed.
    ```bash
    bun run dev
    ```
3.  The terminal will show you options to open the app:
    *   Press `w` to open it in your web browser.
    *   Scan the QR code with the Expo Go app on your iOS or Android device.

### Running the Desktop App (Electron)

Running the desktop app requires **two terminals** running at the same time, because the Electron shell loads its content from the Expo web development server.

**Terminal 1: Start the Web Content Server**

1.  Navigate to the Expo app directory:
    ```bash
    cd apps/noteit-expo
    ```
2.  Start the web development server specifically:
    ```bash
    bun run web
    ```
3.  Wait for the compilation to finish. You will see a message that the project is running on `http://localhost:8081`. **Leave this terminal running.**

**Terminal 2: Start the Electron App**

1.  Open a **new terminal window**.
2.  Navigate to the Electron app directory:
    ```bash
    cd apps/noteit-electron
    ```
3.  Start the Electron development process:
    ```bash
    bun run dev
    ```
4.  After a moment, the NoteIt desktop application window will appear. It will load its content from `localhost:8081` (from Terminal 1), and you will see the actual app, not a blank template.

## 3. Building the Desktop App Installers

This section is for contributors who are helping create the final installable files for different operating systems.

### Prerequisites for Building

Ensure you have the necessary tools for your specific OS:

*   **Windows**: If you encounter build errors, you may need to install the C++ build tools via the Visual Studio Installer.
*   **macOS**: Xcode Command Line Tools are required. Run `xcode-select --install` if you don't have them.
*   **Linux**: You may need packages like `fakeroot` or `dpkg` for certain build targets.

### Build Commands

All build commands must be run from the Electron app's directory (`apps/noteit-electron`).

1.  **Navigate to the directory**:
    ```bash
    cd apps/noteit-electron
    ```
2.  **Run the build command for your platform**:

    *   **For macOS**:
        ```bash
        bun run build -- --mac
        ```

    *   **For Windows (NSIS Installer)**:
        ```bash
        bun run build -- --win nsis
        ```

    *   **For Linux (AppImage recommended)**:
        ```bash
        bun run build -- --linux appimage
        ```

### Sharing the Installer

1.  After a successful build, find the installer file in the `apps/noteit-electron/out/dist/` directory.
2.  Please upload the installer to a file-sharing service (like Google Drive or Dropbox) and share the link with the project maintainer (@Dhruv2mars).

Thank you for your contribution!
