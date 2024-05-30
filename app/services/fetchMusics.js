const FetchMusics = async (page) => {
  return await fetch(
    `https://lezatkhayati.com/api/v2/musics/archive?page=${page}`,
    {
      method: "post",
      mode: "cors",
      cache: "no-store",
    }
  )
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};

export default FetchMusics;
