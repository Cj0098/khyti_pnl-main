const FetchSingleArticle = async (token, id) => {
  console.log("got token", token);

  return await fetch(`https://lezatkhayati.com/api/posts/single/${id}`, {
    mode: "cors",
    cache: "no-store",
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};

export default FetchSingleArticle;
