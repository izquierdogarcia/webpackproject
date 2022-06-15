import Template from '@templates/Template.js'; //empiezan por arroba porque estamos utilizando un alias que hemos establecido en webpack.config

//Añadir los estilos
import '@styles/main.css';

//Añadimos el archivo de stylus
import '@styles/vars.styl'


(async function App() {
  const main = null || document.getElementById('main');
  main.innerHTML = await Template();
})();
