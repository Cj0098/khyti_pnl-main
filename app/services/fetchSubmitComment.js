const FetchSubmitComment = (token, text, parent_id, post_id) => {
  const address = fetch("https://lezatkhayati.com/api/posts/comments/create", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ text, parent_id, post_id }),
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
  return address;
};
export default FetchSubmitComment;
