const FetchTopSlider = async (token) => {
  console.log("got token", token);

  return await fetch(`https://lezatkhayati.com/api/theme/TopRightSlider`, {
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

export default FetchTopSlider;
