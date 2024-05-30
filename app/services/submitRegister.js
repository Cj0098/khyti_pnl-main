const SubmitRegister = (token, data) => {
  const address = fetch("https://lezatkhayati.com/api/admin/adduser", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: data.name,
      phone: data.phone,
      address: data.address,
      gender: data.gender,
      postal_code: data.postal_code,
      birthday: data.birthday,
      postal_code: data.postal_code,
      city: data.city,
      refer: "admin",
      postal_code: " ",
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
  return address;
};
export default SubmitRegister;
