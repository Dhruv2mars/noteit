// apps/noteit-expo/app/download-mobile.tsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Linking } from 'react-native';
import { Link } from 'expo-router';

const EAS_UPDATE_URL = 'exp+://expo-development-client/?url=https://u.expo.dev/332f5ada-3e10-4550-b5ce-87b5f27c1472/group/e7520571-ac9d-4ac9-8a93-43250894853e';

export default function DownloadMobilePage() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Get NoteIt on Mobile</Text>
      <Text style={styles.instructions}>
        To use NoteIt on your mobile device, you'll need the Expo Go app installed.
        Follow the instructions below to get started:
      </Text>
      
      <Text style={styles.subHeader}>Scan QR Code (Android & iOS)</Text>
      <View style={styles.qrContainer}>
        <Image 
          source={require('../assets/images/eas-update-qr.png')} 
          style={styles.qrImage}
        />
      </View>
      <Text style={styles.platformInstructionText}>
        Android users: Scan the QR code directly with the Expo Go app.
        {/* iOS users can also scan if their camera app supports it and redirects to Expo Go, but URL is more reliable. */}
      </Text>
      
      <Text style={styles.subHeader}>Or Use Expo Go URL</Text>
      <TouchableOpacity onPress={() => Linking.openURL(EAS_UPDATE_URL)} style={styles.urlContainer}>
        <Text style={styles.urlText} numberOfLines={1} ellipsizeMode='tail'>{EAS_UPDATE_URL}</Text>
      </TouchableOpacity>
      <Text style={styles.platformInstructionText}>
        iOS users: Copy the URL above and paste it into the Expo Go app (on the 'Builds' or 'Development' tab, look for an option to open a URL).
      </Text>
      <Text style={styles.platformInstructionText}>
        Android users: You can also copy and paste this URL into Expo Go if scanning the QR code is not convenient.
      </Text>
      
      <Text style={styles.infoText}>
        Expo Go allows you to run development builds of Expo apps easily.
        Make sure you have it installed from your device's app store.
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
  qrContainer: {
    width: 220,
    height: 220,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10, // Reduced margin as text follows
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#dee2e6',
    backgroundColor: '#f8f9fa', // Light background for the QR area
    padding: 10, // Padding around the QR image itself
  },
  qrImage: {
    width: 200, // Actual image size
    height: 200,
    resizeMode: 'contain',
  },
  platformInstructionText: {
    fontSize: 14,
    textAlign: 'center',
    color: '#495057',
    marginBottom: 20,
    paddingHorizontal: 10,
    lineHeight: 20,
  },
  qrPlaceholder: {
    width: 220,
    height: 220,
    backgroundColor: '#e9ecef',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#dee2e6',
  },
  urlContainer: {
    width: '95%',
    paddingVertical: 15,
    paddingHorizontal:10,
    backgroundColor: '#e9ecef',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10, // Reduced margin as text follows
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#dee2e6',
  },
  urlText: {
    fontSize: 14,
    color: '#007bff', // Link color
    textDecorationLine: 'underline',
  },
  urlPlaceholder: {
    width: '90%',
    paddingVertical: 15,
    paddingHorizontal:10,
    backgroundColor: '#e9ecef',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#dee2e6',
  },
  placeholderText: {
    fontSize: 16,
    color: '#6c757d',
  },
  smallText: {
    fontSize: 12,
    color: '#adb5bd',
    marginTop: 5,
  },
  subHeader: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
    color: '#495057',
  },
  infoText: {
    fontSize: 14,
    color: '#6c757d',
    textAlign: 'center',
    marginTop: 20,
    lineHeight: 20,
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
