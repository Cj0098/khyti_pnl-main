const FetchNewMusic = (token, data) => {
  const address = fetch(`https://lezatkhayati.com/api/musics/create`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
  return address;
};
export default FetchNewMusic;
