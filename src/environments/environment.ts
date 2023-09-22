// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  rulesApi: (lang: string) =>
    `https://cms.crocobet.com/ui/policy/${lang}/categories/promotions/`,
  production: false,
  cmsApi: 'https://cms.crocobet.com',
  testToken: '41280e3a-06b2-4b2d-a188-79dcbc0211fd.oddsapi2',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
