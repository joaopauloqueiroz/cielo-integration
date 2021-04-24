const header = 'Basic NTczOGMyZGYtYzY2Ni00Y2NmLWFjYTItOTFiOGE4YTA2ODk3OnV4Zk12czVFY2lVR3hoK3N6WHcweDZKaXBNNTBUZTd6SXdQdjhFVXNBdWs9';
const axios = require('axios');

async function getAuth() {
  try {
    const response = await axios.post('https://cieloecommerce.cielo.com.br/api/public/v2/token', {}, { headers: {
    Authorization: header
  }})
  return response.data;
  } catch (error) {
    console.log(error)
  }
}

async function generateAuth() {
  const auth = await getAuth()
  return auth;
}


async function createLink(order, token) {

  try {
    const response = await axios.post('https://cieloecommerce.cielo.com.br/api/public/v1/products/', order, { headers: { Authorization: `Bearer ${token}` } } );
    return response.data;
  } catch (error) {
    console.log(error);
  }

}

module.exports = { generateAuth, createLink }