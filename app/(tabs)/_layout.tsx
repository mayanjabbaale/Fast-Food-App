import { View, Text } from 'react-native'
import React from 'react'
import { Slot, Tabs } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'

const TabsScreen = () => {
  return (
    <Tabs screenOptions={{headerShown: false}}>
      <Tabs.Screen name='index' options={{title: 'Home'}} />
      <Tabs.Screen name='search' options={{title: 'Search'}} />
      <Tabs.Screen name='cart' options={{title: 'Cart'}} />
      <Tabs.Screen name='profile' options={{title: 'Profile'}} />
    </Tabs>
  )
}

export default TabsScreen