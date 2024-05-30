const FetchArticles = async (token, page) => {
  console.log("got token", token);

  return await fetch("https://lezatkhayati.com/api/v2/posts?page=" + page, {
    method: "post",
    mode: "cors",
    cache: "no-store",
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};

export default FetchArticles;
