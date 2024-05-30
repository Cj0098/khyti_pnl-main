const FetchSubHandleAccess = (token, data) => {
  const { product_id, user_id } = data;
  const address = fetch(
    `https://lezatkhayati.com/api/sub/products/handleAccess`,
    {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ product_id, user_id }),
    }
  )
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
  return address;
};
export default FetchSubHandleAccess;
