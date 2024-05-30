const FetchSingleArticle = async (token, id, page) => {
  return await fetch(
    `https://lezatkhayati.com/api/v2/admin/chats/messages/${id}?page=${page}`,
    {
      mode: "cors",
      cache: "no-store",
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};

export default FetchSingleArticle;
