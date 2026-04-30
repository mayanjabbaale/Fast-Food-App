import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomHeader from '@/components/CustomHeader'
import { images } from '@/constants'
import ProfileDetails from '@/components/ProfileDetails'
import ProfileButton from '@/components/ProfileButton'

const ProfileScreen = () => {
  return (
    <SafeAreaView className='bg-white h-full pb-28 px-5 pt-5'>
      <ScrollView>
        <CustomHeader title='Profile' />

        <View className='items-center'>
          <View className="relative size-28">
            <Image
              source={images.avatar}
              className="size-28 rounded-full border-2 border-white"
              resizeMode="cover"
            />

            {/* The Edit/Pencil Icon */}
            <TouchableOpacity className="absolute bottom-1 right-1 bg-primary size-9 items-center justify-center rounded-full border-2 border-white">
              <Image
                source={images.pencil}
                className="size-4"
                tintColor="white" // If your image supports tinting
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </View>


        <View className='mt-10 p-5'>
          <ProfileDetails title='Full Name' text='Mayanja Pius Bbaale' icon={images.user} />
          <ProfileDetails title='Email' text='mayanjabbaale77@gmail.com' icon={images.envelope} />
          <ProfileDetails title='Phone Number' text='+256 761420297' icon={images.phone} />
          <ProfileDetails title='Address' text='Ndejje, Entebbe Rd' icon={images.location} />
        </View>

        <View className='mb-4'>
          <TouchableOpacity className='rounded-full p-3 w-full flex flex-row justify-center bg-amber-100 border border-primary'>
            <Text className='ml-2 text-primary base-semibold'>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity className='rounded-full p-3 w-full flex flex-row justify-center bg-red-100 border border-error'>
            <Image source={images.logout} className='size-6 mt-1' />
            <Text className='ml-2 text-error base-semibold' >Logout</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  )
}

export default ProfileScreen