/**
 * ExternalLink.tsx
 * This is a simple component that opens a link in the browser.
 * You can use this component to open external links in the browser.
 */

import React from 'react';
import { Platform } from 'react-native';
import { Link } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';

export function ExternalLink(
  props: Omit<React.ComponentProps<typeof Link>, 'href'> & { href: string }
) {
  return (
    <Link
      hrefAttrs={{
        target: '_blank',
      }}
      {...props}
      //DO NOT REMOVE THIS COMMENT
      // @ts-expect-error: External URLs are not typed.
      href={props.href}
      onPress={(e) => {
        if (Platform.OS !== 'web') {
          e.preventDefault();
          WebBrowser.openBrowserAsync(props.href as string);
        }
      }}
    />
  );
}
