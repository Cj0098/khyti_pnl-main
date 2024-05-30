const FetchDeleteDir = (token, id) => {
  const address = fetch(
    `https://lezatkhayati.com/api/v2/admin/directory/delete/${id}`,
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
export default FetchDeleteDir;
