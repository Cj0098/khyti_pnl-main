const FetchDeleteCourse = (token, id) => {
  const address = fetch(`https://lezatkhayati.com/api/courses/delete/${id}`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
  return address;
};
export default FetchDeleteCourse;
