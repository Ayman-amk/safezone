import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Alert,
  Image, // Import Image component
} from "react-native";

import { icons } from "../../constants";
import useAppwrite from "../../lib/useAppwrite";
import { getUserPosts, signOut } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";
import { EmptyState, InfoBox, VideoCard } from "../../components";
import { Text } from "react-native-animatable";

const Profile = () => {
  const { user, setUser, setIsLogged } = useGlobalContext();
  const { data: posts = [] } = useAppwrite(() => getUserPosts(user.$id)); // Set default value for posts array

  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLogged(false);

    router.replace("/sign-in");
  };

  return (
    <SafeAreaView className="px-6 py-8 bg-primary h-full">
      <ScrollView className="space-y-8">
        {/* App Title */}
        <View className="pb-4 border-b border-gray-100">
          {/* <Text className="text-3xl text-secondary font-pextrabold">
            Bonjour Mlle. Noha
          </Text>
          <Text className="text-2xl text-[#FFD700] font-pextrabold">
            You have 33 Coins
          </Text> */}
          <FlatList
            data={posts}
            ListHeaderComponent={() => (
              <View className="w-full flex justify-center items-center mt-6 mb-12 px-4">
                <TouchableOpacity
                  onPress={logout}
                  className="flex w-full items-end mb-10"
                >
                  <Image
                    source={icons.logout}
                    resizeMode="contain"
                    className="w-6 h-6"
                  />
                </TouchableOpacity>

                <View className="w-16 h-16 border border-secondary rounded-lg flex justify-center items-center">
                  <Image
                    source="./coins.png"
                    className="w-[90%] h-[90%] rounded-lg"
                    resizeMode="cover"
                  />
                  <Text>Hi, Miss Mounia</Text>
                </View>

                <InfoBox
                  title={user?.username}
                  containerStyles="mt-5"
                  titleStyles="text-lg"
                />

                <View className="mt-5 flex flex-row">
                  {/* <InfoBox
                    title={posts.length || 0}
                    subtitle="Posts"
                    titleStyles="text-xl"
                    containerStyles="mr-10"
                  /> */}
                  <InfoBox
                    title="251"
                    subtitle="Coins"
                    titleStyles="text-[#FFD700] text-3xl"
                  />
                </View>
              </View>
            )}
            // renderItem={({ item }) => (
            //   <VideoCard
            //     video={item} // Render your posts using VideoCard component
            //   />
            // )}
            // keyExtractor={(item) => item.$id}
            // ListEmptyComponent={<EmptyState message="No posts yet!" />}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
