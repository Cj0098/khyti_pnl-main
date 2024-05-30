const FetchCreateDir = (token, parent, name) => {
  const address = fetch(
    `https://lezatkhayati.com/api/v2/upload/createDirectory/${name}/${parent}`,
    {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
  return address;
};
export default FetchCreateDir;
