// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  rulesApi: (lang: string) =>
    `https://cms.crocobet.com/ui/policy/${lang}/categories/promotions/`,
  production: false,
  cmsApi: 'https://cms.crocobet.com/',
  testToken: '21be0594-d006-4f12-ab2c-b9e9945cbdc1.oddsapi1', //'49acf42d-acce-4cee-8d54-8c1a89492e7b.oddsapi2',
  filePath: '',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
