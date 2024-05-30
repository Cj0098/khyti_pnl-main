const FetchCreateCourse = (
  token,
  name,
  isPricy,
  teacher,
  poster,
  ispin,
  description,
  excerpt,
  gradient,
  price,
  img,
  sections,
  id
) => {
  const url =
    id !== null
      ? "https://lezatkhayati.com/api/courses/edit/" + id
      : "https://lezatkhayati.com/api/courses/create";
  const type = isPricy ? "pricy" : "free";
  const address = fetch(url, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name,
      type,
      teacher,
      poster,
      ispin,
      description,
      excerpt,
      gradient,
      price,
      img,
      sections,
      id,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
  return address;
};
export default FetchCreateCourse;
