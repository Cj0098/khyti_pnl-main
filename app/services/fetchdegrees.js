const FetchDegrees = async (token, id) => {
  console.log("got token", token);

  return await fetch(`https://lezatkhayati.com/api/auth/degrees/${id}`, {
    mode: "cors",
    cache: "no-store",
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};

export default FetchDegrees;
