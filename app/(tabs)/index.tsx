import "@/global.css"
import { FlatList, Pressable, Text, View, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images, offers } from "@/constants";
import { Fragment } from "react";
import { clsx } from 'clsx';
import CartButton from "@/components/CartButton";
import useAuthStore from "@/store/auth.store";

export default function Index() {
  const { user } = useAuthStore();
  console.log("User", JSON.stringify(user, null, 2))
  return (
    <SafeAreaView className="flex-1 bg-white">
      <FlatList
        ListHeaderComponent={() => (
          <>
            <View className="flex-between flex-row w-full my-4">
              <View className="flex-start">
                <Text className="small-bold text-primary">DELIVER TO</Text>
                <TouchableOpacity className="flex-center flex-row gap-x-1 mt-0.5">
                  <Text className="paragraph-bold text-dark-100">Kampala</Text>
                  <Image source={images.arrowDown} className="size-3" resizeMode="contain" />
                </TouchableOpacity>
              </View>
              <CartButton />
            </View>
          </>
        )}
        data={offers}
        renderItem={({ item, index }) => {
          const isEven: any = index % 2 === 0;
          return (
            <View>
              <Pressable className={clsx("offer-card", isEven ? 'flex-row-reverse' : 'flex-row')}
                style={{ backgroundColor: item.color }}
                android_ripple={{ color: '#fffff22' }}>
                {({ pressed }) => (
                  <Fragment>
                    <View className="h-full w-1/2">
                      <Image source={item.image} className="size-full" resizeMode="contain" />
                    </View>
                    <View className={clsx("offer-card__info", isEven ? 'pl-10' : 'pr-10')}>
                      <Text className="h1-bold text-white leading-tight">{item.title}</Text>
                      <Image source={images.arrowRight} className="size-9" resizeMode="contain" tintColor={'#ffffff'} />
                    </View>
                  </Fragment>
                )}
              </Pressable>
            </View>
          )
        }}
        contentContainerClassName="pb-28 px-5" />
    </SafeAreaView>
  );
}