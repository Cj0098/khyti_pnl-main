const ActiveCourse = async (token, id, cid) => {
  console.log("got token", token);

  return await fetch(
    `https://lezatkhayati.com/api/courses/buy/manual/${cid}/${id}`,
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

export default ActiveCourse;
