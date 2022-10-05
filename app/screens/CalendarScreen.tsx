import React from 'react';
import { Button, NativeModules } from 'react-native';

import { View } from '../components/common/View';

const { CalendarModule } = NativeModules;

export const CalendarScreen = () => {
  return (
    <View>
      <Button
        title="Calendar"
        onPress={() => {
          // Logs shown in LogCat Android Studio
          CalendarModule.createCalendarEvent('test name', 'test location');
        }}
      />
    </View>
  );
};
