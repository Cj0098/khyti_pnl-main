const FetchDirFiles = async (token, id, page) => {
  console.log("got token", token);

  return await fetch(
    `https://lezatkhayati.com/api/upload/directory/files/${id}?page=${page}`,
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

export default FetchDirFiles;
