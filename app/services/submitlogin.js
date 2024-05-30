const SubmitLogin = (num) => {
  const address = fetch("https://lezatkhayati.com/api/admin/sendsms", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ phone: num }),
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
  return address;
};
export default SubmitLogin;
