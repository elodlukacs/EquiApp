import React, {useEffect, useState} from "react"
import { observer } from "mobx-react-lite"
import {ViewStyle, View, FlatList, Image, ImageStyle, TextStyle} from "react-native"
import { Screen, Text } from "../../components"
// import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { color } from "../../theme"

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
  // Pull in one of our MST stores
  const [refreshing, setRefreshing] = useState(false);
  const { postStore } = useStores()
  const { posts } = postStore

  useEffect(() => {
    // postStore.getPosts()
    fetchPosts()
    console.log('---------')
  }, [])

  const fetchPosts = () => {
    setRefreshing(true)
    postStore.getPosts()
    setRefreshing(false)
  }

  const renderPosts = ({ item }) => {
    return (
      <View style={SINGLE_POST}>
        <Text text={item.title} style={TITLE} />
        <Image source={{ uri: item.image }} style={IMAGE} />
        <Text text={item.excerpt.replace(/<\/?[^>]+>/gi, "")}/>
      </View>
    )
  }

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={ROOT} preset="fixed">
      <Text style={HEADER_TEXT} preset="header" text="Posts" />
      <FlatList
        data={posts}
        extraData={{ extraDataForMobX: posts.length > 0 ? posts[0].title : "" }}
        keyExtractor={(item) => item.id}
        onRefresh={fetchPosts}
        refreshing={refreshing}
        renderItem={renderPosts}
      />
    </Screen>
  )
})
