const fetchCreateArticleCat = (token, data) => {
  const { name, parent_id } = data;
  const address = fetch(`https://lezatkhayati.com/api/posts/cats/create`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, parent_id }),
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
  return address;
};
export default fetchCreateArticleCat;
