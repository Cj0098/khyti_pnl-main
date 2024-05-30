const SubmitArticle = (
  token,
  name,
  content,
  img,
  cat_id,
  tags,
  id,
  gallery,
  publishDate
) => {
  console.log("id", id);
  const address = fetch(
    id == null
      ? "https://lezatkhayati.com/api/posts/create"
      : "https://lezatkhayati.com/api/posts/edit/" + id,
    {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        content,
        img,
        cat_id,
        tags,
        gallery,
        publishDate,
      }),
    }
  )
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
  return address;
};
export default SubmitArticle;
