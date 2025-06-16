// apps/noteit-expo/app/download-desktop.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Linking } from 'react-native';
import { Link } from 'expo-router';

type Platform = 'MacOS' | 'Windows' | 'Linux';

const DownloadButton = ({ title, onPress, platform }: { title: string, onPress: () => void, platform: Platform }) => (
  <TouchableOpacity style={[styles.button, styles[`button${platform}`]]} onPress={onPress}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

const InstructionBlock = ({ title, steps }: { title: string, steps: string[] }) => (
  <View style={styles.instructionBlock}>
    <Text style={styles.instructionTitle}>{title}</Text>
    {steps.map((step, index) => (
      <Text key={index} style={styles.instructionStep}>{`${index + 1}. ${step}`}</Text>
    ))}
  </View>
);

export default function DownloadDesktopPage() {
  const handleDownload = (url: string) => {
    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  };

  const downloads = {
    macOS: 'https://github.com/Dhruv2mars/noteit/releases/download/v0.0.1/NoteIt-0.0.1-arm64.dmg',
    windows: 'https://github.com/Dhruv2mars/noteit/releases/download/v0.0.1/NoteIt.Setup.0.0.1.exe',
    linux: 'https://github.com/Dhruv2mars/noteit/releases/download/v0.0.1/NoteIt-0.0.1-arm64.AppImage',
  };

  const instructions = {
    macOS: [
      "Open the downloaded `.dmg` file.",
      "Drag NoteIt.app into your main Applications folder.",
      "Right-click (or Control-click) the NoteIt.app in your Applications folder and select Open.",
      "A warning dialog will appear. Click the Open button to run the app.",
    ],
    windows: [
      "Run the downloaded `NoteIt Setup.exe` file.",
      'A blue screen saying "Windows protected your PC" will appear.',
      'Click the More info link.',
      'A new button, Run anyway, will appear. Click it to start the installation.',
    ],
    linux: [
      "Open a terminal in the folder where you downloaded the AppImage.",
      "Run the command `chmod +x NoteIt-0.0.1-arm64.AppImage` to make it executable.",
      "Run the app by double-clicking it or with `./NoteIt-0.0.1-arm64.AppImage`.",
    ],
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Download NoteIt for Desktop</Text>
      
      <View style={styles.downloadsContainer}>
        <DownloadButton 
          title="Download for macOS" 
          onPress={() => handleDownload(downloads.macOS)}
          platform="MacOS" 
        />
        <DownloadButton 
          title="Download for Windows" 
          onPress={() => handleDownload(downloads.windows)}
          platform="Windows"
        />
        <DownloadButton 
          title="Download for Linux (.AppImage)" 
          onPress={() => handleDownload(downloads.linux)}
          platform="Linux"
        />
      </View>

      <View style={styles.instructionsContainer}>
        <Text style={styles.instructionsHeader}>First-Time Setup Instructions</Text>
        <Text style={styles.instructionsSubHeader}>
          Your OS will show a security warning because this app is from an indie developer. Follow these one-time steps to run the app.
        </Text>
        <InstructionBlock title="macOS" steps={instructions.macOS} />
        <InstructionBlock title="Windows" steps={instructions.windows} />
        <InstructionBlock title="Linux" steps={instructions.linux} />
      </View>

      <Link href="/" style={styles.backLink}>
         <Text style={styles.backLinkText}>&larr; Back to Home</Text>
      </Link>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 25,
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#343a40',
  },
  downloadsContainer: {
    width: '100%',
    maxWidth: 500,
    alignItems: 'center',
    marginBottom: 40,
  },
  button: {
    width: '100%',
    paddingVertical: 15,
    borderRadius: 8,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonMacOS: {
    backgroundColor: '#007bff',
  },
  buttonWindows: {
    backgroundColor: '#28a745',
  },
  buttonLinux: {
    backgroundColor: '#ffc107',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  instructionsContainer: {
    width: '100%',
    maxWidth: 700,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 25,
    borderWidth: 1,
    borderColor: '#dee2e6',
  },
  instructionsHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#343a40',
  },
  instructionsSubHeader: {
    fontSize: 14,
    textAlign: 'center',
    color: '#6c757d',
    marginBottom: 25,
    lineHeight: 20,
  },
  instructionBlock: {
    marginBottom: 20,
  },
  instructionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#495057',
  },
  instructionStep: {
    fontSize: 15,
    color: '#495057',
    lineHeight: 22,
    marginBottom: 5,
  },
   backLink: {
    marginTop: 40,
    paddingVertical: 10,
  },
  backLinkText: {
    fontSize: 16,
    color: '#007bff',
    fontWeight: '500',
  }
});
