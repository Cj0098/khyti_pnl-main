const FetchPostCats = async () => {
  return await fetch("https://lezatkhayati.com/api/posts/cats/list/all", {
    mode: "cors",
    cache: "no-store",
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};

export default FetchPostCats;
