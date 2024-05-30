const SubmitCode = (phone, code) => {
  const address = fetch("https://lezatkhayati.com/api/admin/sendcode", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ code: code, phone: phone }),
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
  return address;
};
export default SubmitCode;
