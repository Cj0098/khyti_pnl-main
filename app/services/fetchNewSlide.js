const FetchNewSlide = (token, data) => {
  const { name, url, img } = data;
  const address = fetch(`https://lezatkhayati.com/api/admin/slider/create`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, url, img }),
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
  return address;
};
export default FetchNewSlide;
