import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import clsx from 'clsx'

interface ProfileButtonProps {
    text: string
    icon?: any
    onPress?: () => void
    variant?: 'primary' | 'destructive'
}

const ProfileButton = ({ text, icon, onPress, variant = 'primary' }: ProfileButtonProps) => {
    const variantStyles = {
        primary: 'border-primary',
        destructive: 'border-destructive',
    }

    const variantTextStyles = {
        primary: 'text-primary',
        destructive: 'text-destructive',
    }

    return (
        <TouchableOpacity
            onPress={onPress}
            className={clsx('w-full border-2 rounded-full py-4 px-5 items-center justify-center flex-row gap-x-2 mb-4', variantStyles[variant])}
        >
            {icon && <Image source={icon} className='size-6' resizeMode='contain' tintColor={variant === 'primary' ? '#f97316' : '#dc2626'} />}
            <Text className={clsx('paragraph-semibold', variantTextStyles[variant])}>{text}</Text>
        </TouchableOpacity>
    )
}

export default ProfileButton