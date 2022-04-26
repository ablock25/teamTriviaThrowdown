import React from 'react';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';

import { HomeScreen } from '../screens/HomeScreen';
import { GameSettingsScreen } from '../screens/GameSettings';
import { GameScreen } from '../screens/GameScreen';
import { StatsScreen } from '../screens/StatsScreen';

const Stack = createStackNavigator();

const gameStack = () => {
  return (
    <>
      <Stack.Navigator
        headerMode="none"
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          gestureDirection: 'horizontal',
        }}
        initialRouteName="HomeScreen"
      >
        <Stack.Screen options={{ gestureEnabled: false }} name="Home" component={HomeScreen} />
        <Stack.Screen options={{ gestureEnabled: false }} name="Stats" component={StatsScreen} />
        <Stack.Screen
          options={{ gestureEnabled: false }}
          name="GameSettings"
          component={GameSettingsScreen}
        />
        <Stack.Screen
          options={{ gestureEnabled: false }}
          name="GameScreen"
          component={GameScreen}
        />
      </Stack.Navigator>
    </>
  );
};

export const MainNavigator = () => {
  return (
    <>
      <Stack.Navigator headerMode={'none'} screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={gameStack} />
      </Stack.Navigator>
    </>
  );
};
