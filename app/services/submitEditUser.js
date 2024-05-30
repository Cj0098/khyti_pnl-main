const SubmitEditUser = (token, data, id) => {
  const address = fetch(`https://lezatkhayati.com/api/admin/user/edit/${id}`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name: data.name, phone: data.phone }),
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
  return address;
};
export default SubmitEditUser;
