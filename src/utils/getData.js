const API = process.env.API; //En vez de poner la url completa ponemos la variable de entorno que hemos creado en .env, y así estamos protegiendo nuestro código.

const getData = async (id) => {
  const apiURl = id ? `${API}${id}` : API;
  try {
    const response = await fetch(apiURl);
    const data = await response.json();
    return data.results[0];
  } catch (error) {
    console.log('Fetch Error', error);
  };
};

export default getData;