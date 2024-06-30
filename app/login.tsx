import { ActivityIndicator, KeyboardAvoidingView, StyleSheet, Text, View, Image, TextInput, Alert } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import { defaultStyles } from '@/constants/Styles'
import Colors from '@/constants/Colors'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useSignIn, useSignUp } from '@clerk/clerk-expo';


const Page = () => {
  const { type } = useLocalSearchParams<{ type: string }>()
  console.log('page type' + type)
  const [loading, setLoading] = React.useState(false)
  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')
  const { signIn, setActive, isLoaded } = useSignIn();
  const { signUp, isLoaded: signUpLoaded, setActive: signupSetActive } = useSignUp();
  const onSignInPress = async () => {
    if (!isLoaded) {
      return;
    }
    setLoading(true);
    try {
      const completeSignIn = await signIn.create({
        identifier: emailAddress,
        password,
      });

      // This indicates the user is signed in
      await setActive({ session: completeSignIn.createdSessionId });
    } catch (err: any) {
      Alert.alert(err.errors[0].message);
    } finally {
      setLoading(false);
    }
  };

  const onSignUpPress = async () => {
    if (!signUpLoaded) {
      return;
    }
    setLoading(true);

    try {
      // Create the user on Clerk
      const result = await signUp.create({
        emailAddress,
        password,
      });

      // This indicates the user is signed in
      signupSetActive({ session: result.createdSessionId });
    } catch (err: any) {
      alert(err.errors[0].message);
    } finally {    
      setLoading(false);
    }
  };



  return (
    <KeyboardAvoidingView behavior="padding"
      keyboardVerticalOffset={1}
      style={styles.container}
    >
      {loading && (
        <View style={defaultStyles.loadingOverlay}>
          <ActivityIndicator size="large" color="#FFF" />
        </View>
      )}
      <Image source={require('../assets/images/logo-dark.png')} style={styles.logo} />
      <Text style={styles.title}>
        {type === 'register' ? 'Sign up' : 'Log in'}
      </Text>
      <TextInput
        style={styles.inputField}
        placeholder="Email"
        value={emailAddress}
        onChangeText={setEmailAddress}
      />
      <TextInput
        style={styles.inputField}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {type === 'login' ? (
        <TouchableOpacity style={[defaultStyles.btn, styles.btnPrimary]} onPress={onSignInPress}>
          <Text style={styles.btnPrimaryText}>Login</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={[defaultStyles.btn, styles.btnPrimary]} onPress={onSignUpPress}>
          <Text style={styles.btnPrimaryText}>Create account</Text>
        </TouchableOpacity>
      )}
    </KeyboardAvoidingView>
  )
}

export default Page

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 60,
    height: 60,
    alignSelf: 'center',
    marginVertical: 80,
  },
  title: {
    fontSize: 30,
    marginBottom: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  inputField: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 12,
    padding: 10,
    backgroundColor: '#fff',
  },
  btnPrimary: {
    backgroundColor: Colors.primary,
    marginVertical: 4,
  },
  btnPrimaryText: {
    color: '#fff',
    fontSize: 16,
  },
})