/** @module httpClient */

/**
 * ### basic client untuk request ke `server`
 * @param {string} endpoint target / url endpoint
 * @param {Object} json input data 
 * @param {RequestInit} options tambahan opsi [request](http://localhost)
 * @returns {Promise<any>} hasil request
 */
async function client(endpoint, json, { method, body, ...customConf } = {}) {
  let headers;
  if (json) {
    headers = { 'Content-Type': 'application/json' };
  }

  const config = {
    method,
    ...customConf,
    headers: {
      ...headers,
      ...customConf.headers,
    },
  };

  if (body) {
    if (json) {
      config.body = JSON.stringify(body);
    } else {
      const formData = new FormData();
      for (const name in body) {
        formData.append(name, body[name]);
      }
      config.body = formData;
    }
  }

  let data;
  try {
    console.log(endpoint);
    const response = await window.fetch(endpoint, config);
    data = await response.json();
    if (!response.ok) {
      throw new Error(data.statusText);
    }

    return data;
  } catch (err) {
    return Promise.reject(err.message || data);
  }
}

/**
 * request dengan method GET
 * @param {string} endpoint target / url endpoint
 * @param {RequestInit} options tambahan opsi request
 */
client.get = (endpoint, customConf = {}) => {
  return client(endpoint, true, { method: 'GET', ...customConf });
};

/**
 * request dengan method POST
 * @param {string} endpoint target / url endpoint
 * @param {Object} body konten dari request
 * @param {Object} json input data 
 * @param {RequestInit} options tambahan opsi request
 */
client.post = (endpoint, body, json, customConf = {}) => {
  return client(endpoint, json, { method: 'POST', body, ...customConf });
};

/**
 * request dengan method PUT
 * @param {string} endpoint target / url endpoint
 * @param {Object} body konten dari request
 * @param {Object} json input data 
 * @param {RequestInit} options tambahan opsi request
 */
client.put = (endpoint, body, json, customConf = {}) => {
  return client(endpoint, json, { method: 'PUT', body, ...customConf });
};

/**
 * request dengan method DELETE
 * @param {string} endpoint target / url endpoint
 * @param {Object} body konten dari request
 * @param {Object} json input data 
 * @param {RequestInit} options tambahan opsi request
 */
client.del = (endpoint, body, json, customConf = {}) => {
  return client(endpoint, json, { method: 'DELETE', body, ...customConf });
};

module.exports = { client };
