// apps/noteit-expo/app/_layout.tsx
import { Link, Slot } from 'expo-router';
import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const AppLayout = () => {
  const isElectron = !!(typeof window !== 'undefined' && window.electronAPI?.isElectron);
  const showNavbar = Platform.OS === 'web' && !isElectron;

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      {showNavbar && (
        <View style={styles.navbar}>
          <Link href="/" style={styles.navLinkBrand}>
            <Text style={styles.navLinkText}>NoteIt</Text>
          </Link>
          <View style={styles.navButtons}>
            <Link href="/download-mobile" style={styles.navLink}>
              <Text style={styles.navLinkText}>Mobile App</Text>
            </Link>
            <Link href="/download-desktop" style={styles.navLink}>
              <Text style={styles.navLinkText}>Desktop App</Text>
            </Link>
          </View>
        </View>
      )}
      <Slot />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f9fa', // A light background for the whole app
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: '#343a40', // Dark navbar
    borderBottomWidth: 1,
    borderBottomColor: '#23272b',
  },
  navLinkBrand: {
    paddingVertical: 5,
  },
  navLink: {
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  navLinkText: {
    color: '#ffffff', // White text for links
    fontSize: 16,
    fontWeight: '500',
  },
  navButtons: {
    flexDirection: 'row',
  },
});

export default AppLayout;
