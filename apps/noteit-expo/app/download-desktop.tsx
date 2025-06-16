// apps/noteit-expo/app/download-desktop.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Link } from 'expo-router';

const DownloadButton = ({ title, onPress, platform }: { title: string, onPress: () => void, platform: string }) => (
  <TouchableOpacity style={[styles.button, styles[`button${platform}`]]} onPress={onPress}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

export default function DownloadDesktopPage() {
  const handleDownload = (platform: string) => {
    alert(`Note: Actual download for ${platform} is not yet implemented. This is a placeholder.`);
    // Future: window.location.href = 'link_to_download';
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Download NoteIt for Desktop</Text>
      <Text style={styles.instructions}>
        Get the native desktop experience for NoteIt. Builds are generated using Electron Forge.
      </Text>
      
      <DownloadButton 
        title="Download for macOS" 
        onPress={() => handleDownload('macOS')}
        platform="MacOS" 
      />
      <DownloadButton 
        title="Download for Windows" 
        onPress={() => handleDownload('Windows')}
        platform="Windows"
      />
      <DownloadButton 
        title="Download for Linux (.deb)" 
        onPress={() => handleDownload('LinuxDeb')}
        platform="Linux"
      />
       <DownloadButton 
        title="Download for Linux (.rpm)" 
        onPress={() => handleDownload('LinuxRpm')}
        platform="Linux"
      />

      <Text style={styles.note}>
        Download links will point to actual build artifacts once they are generated and hosted.
      </Text>
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
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  instructions: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#555',
    lineHeight: 24,
  },
  button: {
    width: '80%',
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
    backgroundColor: '#007bff', // Blue
  },
  buttonWindows: {
    backgroundColor: '#28a745', // Green
  },
  buttonLinux: {
    backgroundColor: '#ffc107', // Yellow/Orange
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  note: {
    fontSize: 14,
    color: '#6c757d',
    textAlign: 'center',
    marginTop: 20,
  },
   backLink: {
    marginTop: 30,
    paddingVertical: 10,
  },
  backLinkText: {
    fontSize: 16,
    color: '#007bff',
    fontWeight: '500',
  }
});
