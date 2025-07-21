import React from 'react';
import { Button, ScreenContainer, withTheme } from '@draftbit/ui';
import { Text, View } from 'react-native';
import * as GlobalStyles from '../../../GlobalStyles.js';
import * as GlobalVariables from '../../../config/GlobalVariableContext';
import * as CustomCode from '../../../custom-files/CustomCode';
import * as ExternalPackeges from '../../../custom-files/ExternalPackeges';
import palettes from '../../../themes/palettes';
import Breakpoints from '../../../utils/Breakpoints';
import * as StyleSheet from '../../../utils/StyleSheet';
import useNavigation from '../../../utils/useNavigation';
import useParams from '../../../utils/useParams';
import useWindowDimensions from '../../../utils/useWindowDimensions';

const CalendarTestAmitScreen = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const [calendars, setCalendars] = React.useState('');
  const [event, setEvent] = React.useState('');
  const saveEvent = async () => {
    // Type the code for the body of your function or hook here.
    // Functions can be triggered via Button/Touchable actions.
    // Hooks are run per ReactJS rules.

    /* String line breaks are accomplished with backticks ( example: `line one
line two` ) and will not work with special characters inside of quotes ( example: "line one line two" ) */
    const requestCalendarPermission = async () => {
      const { status } =
        await ExternalPackeges.Calendar.requestCalendarPermissionsAsync();

      const calendars = await ExternalPackeges.Calendar.getCalendarsAsync(
        ExternalPackeges.Calendar.EntityTypes.EVENT
      );
      console.log('Here are all your calendars:');
      console.log({ calendars });
      setCalendars(JSON.stringify(calendars));

      return status === 'granted';
    };

    const hasPermission = await requestCalendarPermission();

    if (!hasPermission) {
      alert('Permission to access calendar is required!');
      return;
    }

    const eventDetails = {
      title: 'Draftbit Event Test',
      startDate: new Date(), // current date and time
      endDate: new Date(new Date().getTime() + 3600 * 1000), // one hour later
      timeZone: 'IST',
      location: 'Mumbai',
      notes: 'Details about the event',
      alarms: [
        {
          relativeOffset: -15,
          method: ExternalPackeges.Calendar.AlarmMethod.alert,
        },
      ],
    };

    setEvent(JSON.stringify(eventDetails));

    const calendarId =
      await ExternalPackeges.Calendar.getDefaultCalendarAsync(); // Get the default calendar
    const eventId = await ExternalPackeges.Calendar.createEventAsync(
      calendarId.id,
      eventDetails
    );
    console.log('Event ID:', eventId);
  };

  return (
    <ScreenContainer hasSafeArea={false} scrollable={false}></ScreenContainer>
  );
};

export default withTheme(CalendarTestAmitScreen);
