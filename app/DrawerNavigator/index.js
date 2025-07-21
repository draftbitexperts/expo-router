import React from 'react';
import { ScreenContainer, WebView, withTheme } from '@draftbit/ui';
import { View } from 'react-native';
import * as GlobalStyles from '../../GlobalStyles.js';
import * as CustomCode from '../../custom-files/CustomCode';
import * as webPreview from '../../custom-files/webPreview';
import palettes from '../../themes/palettes';
import * as Utils from '../../utils';
import Breakpoints from '../../utils/Breakpoints';
import * as StyleSheet from '../../utils/StyleSheet';
import imageSource from '../../utils/imageSource';
import useNavigation from '../../utils/useNavigation';
import useParams from '../../utils/useParams';
import useWindowDimensions from '../../utils/useWindowDimensions';

const GoToTheWebScreen = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();

  return (
    <ScreenContainer hasSafeArea={false} scrollable={false}></ScreenContainer>
  );
};

export default withTheme(GoToTheWebScreen);
