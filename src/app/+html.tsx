/**
 * From my experience working with expo-router on the web is a bit complicated and I would not recommend it.
 * But if you want to use it, you can use the following code as a starting point.
 * Hosting on the web needs additional setup
 * */

import { ScrollViewStyleReset } from 'expo-router/html';
import React from 'react';

export default function Root({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head style={{ backgroundColor: '#F09458' }}>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1.00001,viewport-fit=cover"
        />
        <ScrollViewStyleReset />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="Pillar Valley" />
        <meta name="theme-color" content="#F09458" />
        {/* Apple Smart Banner  */}
        {/* replacing {ITUNES_ID} with your app's iTunes ID: */}
        <meta name="apple-itunes-app" content="app-id={ITUNES_ID}" />
      </head>
      <script
        dangerouslySetInnerHTML={{
          __html: `// use full screen on iOS PWAs
      if (window.navigator.standalone === true) {
        const html = document.getElementsByTagName("html")[0];
        html.setAttribute("style", "height: 100vh;");
      }

      // Store the PWA prompt for custom prompting on Android and Chrome
      window.deferredPWAInstallPrompt = null;
      // https://web.dev/customize-install/
      window.addEventListener("beforeinstallprompt", (e) => {
        // Prevent the mini-infobar from appearing on mobile
        e.preventDefault();
        // Stash the event so it can be triggered later.
        window.deferredPWAInstallPrompt = e;
      });`,
        }}
      />

      <body>{children}</body>
    </html>
  );
}
