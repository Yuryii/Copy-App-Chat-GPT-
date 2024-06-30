import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { defaultStyles } from '@/constants/Styles'
import { Stack } from 'expo-router'
import HeaderDropDown from '@/components/HeaderDropDown'

const Page = () => {
  return (
    <View style={defaultStyles.pageContainer}>
      <View>
        <Stack.Screen
          options={{
            headerTitle: () => (
              <HeaderDropDown
                title="ChatGPT"
                items={[
                  { key: 'share', title: 'Share GPT', icon: 'bolt' },
                  { key: 'detail', title: 'See Details ', icon: 'bolt' },
                  { key: 'keep', title: 'Keep in Sidebar', icon: 'sparkles' },
                ]}
                onSelect={() => {}}
              />
            ),
          }}
        />
      </View>
    </View>
  )
}

export default Page

const styles = StyleSheet.create({})