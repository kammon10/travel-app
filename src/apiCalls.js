/* eslint-disable max-len */
const fetchData = (extension) => {
  return fetch(`http://localhost:3001/api/v1/${extension}`)
    .then(response => response.json())
    .catch(err => console.log(err))
}

const postData = (data, url) => {
  console.log(data)
  return fetch(`http://localhost:3001/api/v1/${url}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),

  })
    .then(response => console.log(`Trip ${data.id} has been successfuly posted`))
    .catch(err => console.log(err));
};

export {fetchData, postData};