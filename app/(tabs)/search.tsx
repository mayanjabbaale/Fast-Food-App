import { View, Text, Button, FlatList } from 'react-native'
import React, { use, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import seed from '@/lib/seed'
import useAppwrite from '@/lib/useAppwrite'
import { get_categories, get_menu } from '@/lib/appwrite'
import { useLocalSearchParams } from 'expo-router'
import CartButton from '@/components/CartButton'
import clsx from 'clsx'
import { Category, MenuItem } from '@/type'
import MenuCard from '@/components/menuCard'
import SearchBar from '@/components/SearchBar'
import Filter from '@/components/Filter'

const SearchScreen = () => {

  const { category, query } = useLocalSearchParams<{query?: string; category?: string}>()

  const { data, refetch, loading } = useAppwrite({
    fn: get_menu,
    params: { category: category ?? '', query: query ?? '', limit: 6}
  });

  const { data: categories } = useAppwrite({ fn: get_categories })

  useEffect(()=>{
    refetch({ category: category ?? '', query: query ?? '', limit: 6})
  }, [refetch, query, category])

  return (
    <SafeAreaView className='bg-white h-full'>
      <Button title='Seed' onPress={() => seed().catch((error) => console.log("Error occured", error) )} />
      <FlatList 
          ListHeaderComponent={()=> (
            <View className='my-5 gap-5'>
              <View className='flex-between flex-row w-full'>
                <View className='flex-start'>
                  <Text className='small-bold uppercase text-primary'>Search</Text>
                  <View className='flex-start flex-row gap-x-1 mt-0.5'>
                    <Text className='paragraph-semibold text-dark-100'>Find your favorite food</Text>
                  </View>
                </View>
                <CartButton />
              </View>

              <SearchBar />
              <Filter categories={categories as unknown as Category[]}/>
            </View>
          )}
          data={data}
          renderItem={({item, index})=>{
            const isFirstRightColItem = index % 2 === 0;
            return (
              <View className={clsx('flex-1 max-w-[48%]', !isFirstRightColItem? 'mt-10':'mt-0')}>
                <MenuCard item={ item as unknown as MenuItem } />
              </View>
            )
          }}
          keyExtractor={item => item.$id}
          numColumns={2}
          columnWrapperClassName='gap-7'
          contentContainerClassName='gap-7 px-5 pb-32'/>
    </SafeAreaView>
  )
}

export default SearchScreen