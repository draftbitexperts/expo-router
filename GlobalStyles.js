import * as StyleSheet from './utils/StyleSheet';

import Breakpoints from './utils/Breakpoints';

import palettes from './themes/palettes';

export const MapViewStyles = theme =>
  StyleSheet.create({
    'Map View': {
      style: { flex: 1, height: '100%', width: '100%' },
      props: {},
    },
  });

export const TextStyles = theme =>
  StyleSheet.create({
    Text: { style: { color: theme.colors.text.strong }, props: {} },
  });

export const ButtonStyles = theme =>
  StyleSheet.create({
    Button: {
      style: {
        backgroundColor: theme.colors.branding.primary,
        borderRadius: 8,
        fontFamily: 'System',
        fontWeight: '700',
        textAlign: 'center',
      },
      props: {},
    },
  });

export const WebViewStyles = theme =>
  StyleSheet.create({ 'Web View': { style: { flex: 1 }, props: {} } });

export const AudioPlayerStyles = theme =>
  StyleSheet.create({
    'Audio Player': {
      style: {
        alignItems: 'center',
        borderRadius: 8,
        borderWidth: 1,
        flexDirection: 'row',
        padding: 8,
      },
      props: {},
    },
  });
