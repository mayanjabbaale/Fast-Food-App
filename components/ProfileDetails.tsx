import { View, Text, Image } from 'react-native'
import React from 'react'
import { images } from '@/constants'

interface ProfileDetailsProps {
    icon: any,
    title: string,
    text: string
}

const ProfileDetails = ({ icon, title, text }: ProfileDetailsProps) => {
    return (
        <View className='profile-field mb-5'>
            <View>
                <Image source={icon} className='profile-field__icon' />
            </View>
            <View className='p'>
                <Text className='paragraph-semibold'>{title}</Text>
                <Text className='base-semibold'>{text}</Text>
            </View>
        </View>
    )
}

export default ProfileDetails