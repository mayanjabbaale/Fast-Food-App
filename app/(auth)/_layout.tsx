import { View, Text, KeyboardAvoidingView, ScrollView, Dimensions, Image, Platform } from 'react-native'
import React from 'react'
import { images } from '@/constants'
import { Slot } from 'expo-router'


const AuthLayout = () => {
  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView className='bg-white h-full' keyboardShouldPersistTaps='handled' >
        <View className='w-full relative' style={{height: Dimensions.get('screen').height / 2.25}} >
            <Image source={images.loginGraphic} className='size-full rounded-b-lg' resizeMode='stretch' />
            <Image source={images.logo} className='self-center absolute size-48 z-10 -bottom-16'/>
        </View>
        <Slot />
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default AuthLayout