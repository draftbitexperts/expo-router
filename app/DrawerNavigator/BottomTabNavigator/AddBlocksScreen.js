import React from 'react';
import { ScreenContainer, withTheme } from '@draftbit/ui';
import palettes from '../../../themes/palettes';
import useNavigation from '../../../utils/useNavigation';
import useParams from '../../../utils/useParams';
import useWindowDimensions from '../../../utils/useWindowDimensions';

const AddBlocksScreen = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();

  return <ScreenContainer hasSafeArea={false} scrollable={false} />;
};

export default withTheme(AddBlocksScreen);
