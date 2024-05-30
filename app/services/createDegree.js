const CreateDegree = (token, uid, degData) => {
  const { name, degree_id, url } = degData;
  const address = fetch(`https://lezatkhayati.com/api/auth/degrees/create`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ user_id: uid, name, degree_id, url }),
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
  return address;
};
export default CreateDegree;
