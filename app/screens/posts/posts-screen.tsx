import React, { useEffect } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, FlatList, Image, ImageStyle, TextStyle, Pressable } from "react-native"
import { Screen, Text } from "../../components"
import { useStores } from "../../models"
import { color } from "../../theme"
import { useNavigation } from "@react-navigation/native";

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
  flex: 1,
  paddingHorizontal: 10
}

const HEADER_SPACING: ViewStyle = {
  marginVertical: 40
}

const HEADER_TEXT: TextStyle = {
  ...HEADER_SPACING,
  fontSize: 34
}

const IMAGE: ImageStyle = {
  borderRadius: 2,
  width: 380,
  height: 100,
  marginVertical: 20
}

const TITLE: TextStyle = {
  fontSize: 20,
  fontWeight: "bold"
}

const SINGLE_POST: ViewStyle = {
  marginBottom: 40
}

export const PostsScreen = observer(function PostsScreen() {
  const navigation = useNavigation()
  // Pull in one of our MST stores
  const { postStore } = useStores()
  const { posts } = postStore


  useEffect(() => {
    postStore.getPosts()
    console.log('---------')
  }, [])

  const handleOnPress = (id: number): void => {
    console.log('ONPRESS !!!', id)
  }

  const renderPosts = ({ item }) => {
    return (
      <Pressable onPress={() => navigation.navigate("PostDetails", {id : item.id})}>
        <View style={SINGLE_POST}>
          <Text text={item.title} style={TITLE} />
          <Image source={{ uri: item.image }} style={IMAGE} />
          <Text text={item.excerpt.replace(/<\/?[^>]+>/gi, "")}/>
        </View>
      </Pressable>
    )
  }

  return (
    <Screen style={ROOT} preset="fixed">
      <Text style={HEADER_TEXT} preset="header" text="Posts" />
      <FlatList
        data={posts}
        extraData={{ extraDataForMobX: posts.length > 0 ? posts[0].title : "" }}
        keyExtractor={(item) => item.id}
        renderItem={renderPosts}
      />
    </Screen>
  )
})
