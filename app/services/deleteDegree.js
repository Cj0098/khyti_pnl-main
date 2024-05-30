const deleteDegree = (token, id) => {
  const address = fetch(`https://lezatkhayati.com/api/degree/delete/${id}`, {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
  return address;
};
export default deleteDegree;
