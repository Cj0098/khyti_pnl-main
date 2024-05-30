const FetchDeleteSlide = (token, id) => {
  const address = fetch(
    `https://lezatkhayati.com/api/admin/slider/delete/${id}`,
    {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
  return address;
};
export default FetchDeleteSlide;
