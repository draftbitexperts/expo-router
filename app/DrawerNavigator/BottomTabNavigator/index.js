import React from 'react';
import { AudioPlayer, ScreenContainer, WebView, withTheme } from '@draftbit/ui';
import * as GlobalStyles from '../../../GlobalStyles.js';
import * as GlobalVariables from '../../../config/GlobalVariableContext';
import * as CustomCode from '../../../custom-files/CustomCode';
import * as ExternalPackeges from '../../../custom-files/ExternalPackeges';
import * as LocalAuth from '../../../custom-files/LocalAuth';
import palettes from '../../../themes/palettes';
import * as Utils from '../../../utils';
import Breakpoints from '../../../utils/Breakpoints';
import * as StyleSheet from '../../../utils/StyleSheet';
import imageSource from '../../../utils/imageSource';
import useIsFocused from '../../../utils/useIsFocused';
import useNavigation from '../../../utils/useNavigation';
import useParams from '../../../utils/useParams';
import useWindowDimensions from '../../../utils/useWindowDimensions';

const BlankScreen = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const [appState, setAppState] = React.useState('');
  const [asyncMedia, setAsyncMedia] = React.useState('');
  const [asyncRinger, setAsyncRinger] = React.useState('');
  const [currentVolume, setCurrentVolume] = React.useState('');
  const [mediaVolumeLevel, setMediaVolumeLevel] = React.useState('');
  const [ringerVolumeLevel, setRingerVolumeLevel] = React.useState('');
  const [testVar, setTestVar] = React.useState('trying');
  const [token, setToken] = React.useState('');
  const [volumeLevel, setVolumeLevel] = React.useState('');
  const getVolume = async () => {
    // const { SystemSetting }= ExternalPackeges
    // console.log(SystemSetting)
    // try {
    //     const mediaVolume = await SystemSetting.getVolume('music');
    //     const ringerVolume = await SystemSetting.getVolume('ring');
    //     setMediaVolumeLevel(mediaVolume);
    //     setRingerVolumeLevel(ringerVolume);
    //     console.log("Media Volume:", mediaVolume);
    //     console.log("Ringer Volume:", ringerVolume);
    //   } catch (error) {
    //     console.error("Error getting volume levels:", error);
    //   }
  };

  const handleAppStateChange = nextAppState => {
    if (appState.match(/inactive|background/) && nextAppState === 'active') {
      console.log('App has come to the foreground!');
    } else if (nextAppState === 'background') {
      console.log('App is in the background!');
    }
    setAppState(nextAppState);
  };

  const monitorVolume = () => {
    // const {SystemSetting} = ExternalPackeges
    // SystemSetting.addVolumeListener((volumeData) => {
    //     const { value, type } = volumeData;
    //     if (type === 'music') {
    //       console.log("Updated Media Volume:", value);
    //       setAsyncRinger(value)
    //     } else if (type === 'ring') {
    //       console.log("Updated Ringer Volume:", value);
    //       setAsyncMedia(value)
    //     }
    //   });
  };
  React.useEffect(() => {
    // handleAppStateChange()
    const { AppState } = ExternalPackeges;
    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange
    );

    return () => {
      // Clean up the listener on unmount
      subscription.remove();
    };
  }, [appState]);

  React.useEffect(() => {
    monitorVolume();
  }, [asyncMedia, asyncRinger]);
  React.useEffect(() => {
    const { AppState } = ExternalPackeges;
    setAppState(AppState.currentState);
  }, []);
  const isFocused = useIsFocused();
  React.useEffect(() => {
    try {
      if (!isFocused) {
        return;
      }
      /* hidden 'Run a Custom Function' action */
    } catch (err) {
      console.error(err);
    }
  }, [isFocused]);

  return (
    <ScreenContainer hasSafeArea={false} scrollable={false}></ScreenContainer>
  );
};

export default withTheme(BlankScreen);
