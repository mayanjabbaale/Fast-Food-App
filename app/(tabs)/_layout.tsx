import { View, Text, Image } from 'react-native'
import React from 'react'
import { Redirect, Slot, Tabs } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import useAuthStore from '@/store/auth.store'
import { TabBarIconProps } from '@/type'
import { images } from '@/constants'
import clsx from 'clsx'


const TabBarIcon = ({ focused, icon, title }: TabBarIconProps) => (
  <View className='tab-icon'>
    <Image source={icon} className='size-7' resizeMode='contain' tintColor={focused ? '#FE8C00' : '#5D5F6D'} />
    <Text className={clsx('text-sm, font-bold', focused ? 'text-primary' : 'text-gray-200')}>{title}</Text>
  </View>
)

const TabsLayout = () => {

  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) return <Redirect href='/(auth)/sign_in' />

  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarShowLabel: false,
      tabBarStyle: {
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        marginHorizontal: 20,
        position: 'absolute',
        bottom: 40,
        height: 80,
        backgroundColor: 'white',
        shadowColor: '1a1a1a',
        shadowOffset: { width: 0, height: 2 },
        elevation: 5,
        shadowOpacity: 0.1,
        shadowRadius: 4
      }
    }}>
      <Tabs.Screen
        name='index'
        options={{
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} icon={images.home} title='Home' />
        }} />
      <Tabs.Screen
        name='search'
        options={{
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} icon={images.search} title='Search' />
        }} />
      <Tabs.Screen
        name='cart'
        options={{
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} icon={images.bag} title='Cart' />
        }} />
      <Tabs.Screen
        name='profile'
        options={{
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} icon={images.person} title='Profile' />
        }} />
    </Tabs>
  )
}

export default TabsLayout;
