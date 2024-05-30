const FetchSubUsers = (page) => {
  const address = fetch(`https://lezatkhayati.com/api/sub/users?page=${page}`, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
  return address;
};
export default FetchSubUsers;
