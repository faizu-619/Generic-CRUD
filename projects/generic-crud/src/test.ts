// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import 'zone.js';
import 'zone.js/testing';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

declare const require: any;

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);

// Support both legacy require.context and modern webpackContext test discovery.
const legacyContext = typeof require !== 'undefined' && require.context
  ? require.context('./', true, /\.spec\.ts$/)
  : null;

if (legacyContext) {
  legacyContext.keys().map(legacyContext);
} else {
  const webpackContext = (import.meta as any).webpackContext;
  if (webpackContext) {
    const context = webpackContext('./', { recursive: true, regExp: /\.spec\.ts$/ });
    context.keys().forEach(context);
  }
}
