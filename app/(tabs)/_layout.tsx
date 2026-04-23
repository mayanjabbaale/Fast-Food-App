import { View, Text } from 'react-native'
import React from 'react'
import { Redirect, Slot, Tabs } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import useAuthStore from '@/store/auth.store'

const TabsLayout = () => {

  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) return <Redirect href='/(auth)/sign_in' />

}

export default TabsLayout;
