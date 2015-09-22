import G11N from 'g11n';

export default ((lang)=> {
  const g11n = new G11N();

  var data = [
    'locales/:locale/msg'
  ];

  g11n.imports(data.map((url) => url.replace(/:locale/, lang)));

  document.documentElement.setAttribute('lang', lang);

  return g11n;
})('en-us');
