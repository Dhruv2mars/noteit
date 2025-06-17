# NoteIt - Contributor Build Instructions

Thank you for contributing to NoteIt! This guide provides instructions on how to build the Electron application for your specific operating system. Once built, please share the installer with the project maintainer for inclusion in the official GitHub Release.

## Prerequisites

1.  **Git**: Ensure Git is installed on your system.
2.  **Node.js**: Install Node.js (version 20.x or later recommended). You can download it from [nodejs.org](https://nodejs.org/).
3.  **Bun**: This project uses Bun as the JavaScript runtime and package manager. **Bun is required** to ensure consistent dependency management and to run the project's scripts. Install Bun by following the instructions at [bun.sh](https://bun.sh/).
4.  **Platform-Specific Build Tools**:
    *   **Windows**: No special tools are generally needed for NSIS builds if Node.js is set up correctly. However, if you encounter errors related to compiling native modules during dependency installation or the build, you might need to install Visual Studio Build Tools (available from the Visual Studio website, ensure C++ build tools are selected during installation).
    *   **macOS**: Xcode Command Line Tools are required. If you don't have them, run `xcode-select --install` in your terminal.
    *   **Linux**: Depending on your distribution and the target format (e.g., AppImage, deb, rpm), you might need certain libraries like `fakeroot`, `dpkg`, `rpmbuild`. `electron-builder` usually provides good guidance if dependencies are missing during the build.

## Setup Instructions

1.  **Clone the Repository**:
    ```bash
    git clone https://github.com/Dhruv2mars/noteit.git
    cd noteit
    ```

2.  **Install Dependencies**:
    From the root of the `noteit` repository, run:
    ```bash
    bun install
    ```
    This will install dependencies for the entire monorepo, including the Electron app, using the `bun.lockb` lockfile for consistency.

## Building the Application

All build commands should be run from the `apps/noteit-electron` directory.

```bash
cd apps/noteit-electron
```

### macOS Build

```bash
bun run build -- --mac
```
*   **Output**: The installer (e.g., `NoteIt-0.0.1.dmg` or `NoteIt-0.0.1-arm64.dmg`) will be in `apps/noteit-electron/out/dist/`.

### Windows Build (NSIS Installer)

```bash
bun run build -- --win nsis
```
*   **Output**: The installer (e.g., `NoteIt Setup 0.0.1.exe`) will be in `apps/noteit-electron/out/dist/`.

### Linux Build (AppImage recommended)

```bash
bun run build -- --linux appimage
```
*   You can also build for other Linux targets like `deb` or `rpm` if needed:
    ```bash
    bun run build -- --linux deb
    bun run build -- --linux rpm
    ```
*   **Output**: The installer (e.g., `NoteIt-0.0.1.AppImage`) will be in `apps/noteit-electron/out/dist/`.

## Packaging and Sharing Artifacts

1.  **Locate the Installer**: After a successful build, find the installer file in the `apps/noteit-electron/out/dist/` directory.
2.  **Rename (if necessary)**: Ensure the file name clearly indicates the app name, version, and platform/architecture (e.g., `NoteIt-0.0.1-mac-arm64.dmg`, `NoteIt-0.0.1-windows-x64.exe`, `NoteIt-0.0.1-linux-x64.AppImage`). The default names from `electron-builder` are usually good.
3.  **Share the Installer**: Please upload the installer file to a shared drive (e.g., Google Drive, Dropbox) or a file-sharing service and provide the download link to the project maintainer (@Dhruv2mars).

Thank you for your contribution!
