import G11N from 'g11n';
var langConfig = require('json!../../locales/config.json')

export default ((lang)=> {
  const g11n = new G11N();

  var data = [
    'locales/:locale/delete',
    'locales/:locale/editor',
    'locales/:locale/general',
    'locales/:locale/msg',
    'locales/:locale/pageTitle',
    'locales/:locale/search'
  ];

  g11n.imports(data.map((url) => url.replace(/:locale/, lang)));

  document.documentElement.setAttribute('lang', lang);

  return g11n;
})(langConfig.lang);
