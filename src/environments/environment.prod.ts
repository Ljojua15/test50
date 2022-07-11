export const environment = {
  production: true,
  cmsApi: 'https://cms.crocobet.com',
  testToken: '',
  rulesApi: (lang: string) =>
    `https://cms.crocobet.com/ui/policy/${lang}/categories/promotions/`,
  filePath: 'summer-raffle/',
};
