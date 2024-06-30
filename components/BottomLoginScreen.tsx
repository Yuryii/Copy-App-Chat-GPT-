import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { defaultStyles } from '@/constants/Styles'
import { Ionicons } from '@expo/vector-icons'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Colors from '@/constants/Colors'
import { Link } from 'expo-router'
export default function BottomLoginScreen() {
  const { bottom } = useSafeAreaInsets();
  return (
    <View style={[styles.container, { paddingBottom: bottom }]}>
      <TouchableOpacity style={[defaultStyles.btn, styles.btnLight]}>
        <Ionicons name="logo-apple" size={14} style={styles.btnIcon} />
        <Text style={styles.btnLightText}>Continue with Apple</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[defaultStyles.btn, styles.btnDark]}>
        <Ionicons name="logo-google" size={16} style={styles.btnIcon} color={Colors.light} />
        <Text style={styles.btnDarkText}>Continue with Google</Text>
      </TouchableOpacity>
      <Link href={{
        pathname: 'login',
        params: {type: 'register'}
      }} asChild style={[defaultStyles.btn, styles.btnOutline]}>
        <TouchableOpacity >
          <Text style={styles.btnDarkText}>Sign up with email</Text>
        </TouchableOpacity>
      </Link>
      <Link href={{
        pathname: 'login',
        params: {type: 'login'}
      }} asChild style={[defaultStyles.btn, styles.btnOutline]}>
        <TouchableOpacity >
          <Text style={styles.btnDarkText}>Log in</Text>
        </TouchableOpacity>
      </Link>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#000',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 26,
    gap: 14,
  },
  btnLight: {
    backgroundColor: '#fff',
  },
  btnLightText: {
    color: '#000',
    fontSize: 20,
  },
  btnDark: {
    backgroundColor: Colors.grey,
  },
  btnDarkText: {
    color: '#fff',
    fontSize: 20,
  },
  btnOutline: {
    borderWidth: 3,
    borderColor: Colors.grey,
  },
  btnIcon: {
    paddingRight: 6,
  },
});