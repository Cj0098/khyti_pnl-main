const FetchCreateSubCourse = (token, data) => {
  const url = "https://lezatkhayati.com/api/sub/products/create";
  const { id, name, thumbnail, des, trailer, price, courses } = data;
  const address = fetch(url, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      id,
      name,
      des,
      thumbnail: thumbnail.substr(42),
      trailer: trailer !== null ? trailer.substr(42) : null,
      price,
      courses,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
  return address;
};
export default FetchCreateSubCourse;
