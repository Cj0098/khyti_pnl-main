const FetchCourses = async (token) => {
  console.log("got token", token);

  return await fetch("https://lezatkhayati.com/api/upload/directories", {
    method: "post",
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

export default FetchCourses;
