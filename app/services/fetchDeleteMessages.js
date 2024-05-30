const FetchDeleteMessages = (token, ids) => {
  const address = fetch(
    `https://lezatkhayati.com/api/v2/admin/chats/messages/delete`,
    {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ids }),
    }
  )
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
  return address;
};
export default FetchDeleteMessages;
