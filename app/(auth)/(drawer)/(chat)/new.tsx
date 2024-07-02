import { View, Text, Button, KeyboardAvoidingView, Platform, StyleSheet, Image } from 'react-native'
import React, { useState } from 'react'
import { useAuth } from '@clerk/clerk-expo'
import { FlatList, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { defaultStyles } from '@/constants/Styles';
import { Redirect, Stack } from 'expo-router';
import HeaderDropDown from '@/components/HeaderDropDown';
import MessageInput from '@/components/MessageInput';
import MessageIdeas from '@/components/MessageIdeas';
import { Message, Role } from '@/utils/Interfaces';
import ChatMessage from '@/components/ChatMessage';
import { useMMKVString } from 'react-native-mmkv';
import { Storage } from '@/utils/Storage';

const DUMMY_MESSAGES: Message[] = [
  {
    content: 'Hello! How can I help you today?',
    role: Role.User,

  },
]
const Page = () => {
  const { signOut } = useAuth();
  const [messages, setMessages] = useState<Message[]>(DUMMY_MESSAGES) // [ { message: string, isUser: boolean }
  const [height, setHeight] = useState(0)


  const [key, setKey] = useMMKVString('apiKey', Storage)
  const [organization, setOrganization] = useMMKVString('org', Storage)
  const [gptVersion, setGptVersion] = useMMKVString('gptVersion', Storage)



  const getCompletion = async (message: string) => {
    // Implement completion logic here
    console.log(message);
  }
  const onLayout = (event: any) => {
    const { height } = event.nativeEvent.layout;
    setHeight(height)
  }
  return (
    <View style={[defaultStyles.pageContainer, { justifyContent: 'space-between' }]}>
      <Stack.Screen
        options={{
          headerTitle: () => (
            <HeaderDropDown
              title="ChatGPT"
              items={[
                { key: '3.5', title: 'GPT-3.5', icon: 'bolt' },
                { key: '4', title: 'GPT-4', icon: 'sparkles' },
              ]}
              onSelect={setGptVersion}
              selected={gptVersion}
            />
          ),
        }}
      />
      <View style={{ flex: 1, justifyContent: 'space-between', }} onLayout={onLayout}>
        <View>
          {messages.length === 0 && (
            <View style={[styles.logoContainer, { marginTop: height / 2 - 100 }]} >
              <Image source={require('@/assets/images/logo-white.png')} style={styles.logo} />
            </View>
          )}
          <FlatList
            data={messages}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) =>
              <ChatMessage {...item} />
            }
          />
        </View>
        <KeyboardAvoidingView
          keyboardVerticalOffset={70}
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
          }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          {messages.length === 0 && <MessageIdeas onSelectCard={getCompletion} />}
          <MessageInput onShouldSend={getCompletion} />
        </KeyboardAvoidingView>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  logoContainer: {
    backgroundColor: 'black',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    alignSelf: 'center'
  },
  logo: {
    width: 30,
    height: 30,
  }
})
export default Page