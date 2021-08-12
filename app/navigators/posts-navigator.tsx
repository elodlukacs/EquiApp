import React from "react"
import { createStackNavigator } from '@react-navigation/stack';
import { PostsScreen, PostDetails } from "../screens";

export type NavigatorParamList = {
  PostsList: undefined
  PostDetails: undefined
}

const Stack = createStackNavigator<NavigatorParamList>();

export const PostsStackNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="PostsList"
        component={PostsScreen}
      />
      <Stack.Screen
        name="PostDetails"
        component={PostDetails}
        options={{title: "Article Details Screen"}}
      />
    </Stack.Navigator>
  )
}