const FetchCourses = async (token, page) => {
  console.log("got token", token);

  return await fetch(
    "https://lezatkhayati.com/api/v2/upload/files?page=" + page,
    {
      mode: "cors",
      cache: "no-store",
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};

export default FetchCourses;
