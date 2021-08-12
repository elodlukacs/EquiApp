import React  from "react"
// import { observer } from "mobx-react-lite"
import { ViewStyle, TextStyle } from "react-native"
import { Screen, Text } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color } from "../../theme"
// import { useNavigation } from "@react-navigation/native";

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

export const PostDetails = () => {
  // const navigation = useNavigation()
  // Pull in one of our MST stores
  // const { postStore } = useStores()
  // const { posts } = postStore

  return (
    <Screen style={ROOT} preset="fixed">
      <Text style={HEADER_TEXT} preset="header" text="Single Post supposed to be ...." />
    </Screen>
  )
}
