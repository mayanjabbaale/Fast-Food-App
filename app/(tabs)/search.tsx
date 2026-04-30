import { View, Text, Button, FlatList } from 'react-native'
import React, { useMemo } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import seed from '@/lib/seed'
import { useLocalSearchParams } from 'expo-router'
import CartButton from '@/components/CartButton'
import clsx from 'clsx'
import { Category, MenuItem } from '@/type'
import MenuCard from '@/components/menuCard'
import SearchBar from '@/components/SearchBar'
import Filter from '@/components/Filter'
import dummyData from '@/lib/data'

const SearchScreen = () => {
  const { category, query } = useLocalSearchParams<{query?: string; category?: string}>()

  // Extract categories from dummy data
  const categories: Category[] = dummyData.categories.map((cat) => ({
    $id: cat.name,
    $collectionId: '',
    $databaseId: '',
    $createdAt: new Date().toISOString(),
    $updatedAt: new Date().toISOString(),
    $permissions: [],
    $sequence: '',
    name: cat.name,
    description: cat.description,
  }))

  // Filter menu items by category and search query
  const menuItems = useMemo(() => {
    let filtered = dummyData.menu as unknown as MenuItem[];

    // Filter by category
    if (category && category !== '') {
      filtered = filtered.filter(item => 
        (item as any).category_name?.toLowerCase() === category.toLowerCase()
      );
    }

    // Filter by search query
    if (query && query !== '') {
      const searchLower = query.toLowerCase();
      filtered = filtered.filter(item => 
        item.name.toLowerCase().includes(searchLower) ||
        item.description.toLowerCase().includes(searchLower)
      );
    }

    return filtered.slice(0, 6); // Limit to 6 items like the original
  }, [category, query])

  return (
    <SafeAreaView className='bg-white h-full'>
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
              <Filter categories={categories}/>
            </View>
          )}
          data={menuItems}
          renderItem={({item, index})=>{
            const isFirstRightColItem = index % 2 === 0;
            return (
              <View className={clsx('flex-1 max-w-[48%]', !isFirstRightColItem? 'mt-10':'mt-0')}>
                <MenuCard item={item as MenuItem} />
              </View>
            )
          }}
          numColumns={2}
          columnWrapperClassName='gap-7'
          contentContainerClassName='gap-7 px-5 pb-32'/>
    </SafeAreaView>
  )
}

export default SearchScreen
