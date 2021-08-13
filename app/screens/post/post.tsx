import React  from "react"
// import { observer } from "mobx-react-lite"
import {ViewStyle, TextStyle, Image, ImageStyle} from "react-native"
import { Screen, Text } from "../../components"
import { color } from "../../theme"
import { useStores } from "../../models";
// import { useNavigation } from "@react-navigation/native";

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
  flex: 1,
  paddingHorizontal: 10
}

const IMAGE: ImageStyle = {
  borderRadius: 2,
  width: 380,
  height: 120,
  marginVertical: 20
}

const HEADER_SPACING: ViewStyle = {
  marginVertical: 40
}

const HEADER_TEXT: TextStyle = {
  ...HEADER_SPACING,
  fontSize: 34
}

export const PostDetails = ({ route: { params: { id } } }) => {
  // const navigation = useNavigation()
  // Pull in one of our MST stores
  const { postStore } = useStores()
  const { posts } = postStore

  const [selectedPost] = posts.filter(post => post.id === id)
  const { title, image, excerpt } = selectedPost

  return (
    <Screen style={ROOT} preset="fixed">
      <Text style={HEADER_TEXT} preset="header" text={title} />
      <Image source={{ uri: image }} style={IMAGE} />
      <Text text={excerpt} />
    </Screen>
  )
}
