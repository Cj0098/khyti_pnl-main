const fetchSearchFile = async (token, term) => {
  return await fetch(`https://lezatkhayati.com/api/upload/search/${term}`, {
    mode: "cors",
    cache: "no-store",
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};

export default fetchSearchFile;
