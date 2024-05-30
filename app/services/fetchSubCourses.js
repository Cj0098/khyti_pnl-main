const FetchSubCourse = async (page, uid) => {
  return await fetch(
    `https://lezatkhayati.com/api/sub/products?page=${page}${
      uid && "&uid=" + uid
    }`,
    {
      method: "get",
      mode: "cors",
      cache: "no-store",
    }
  )
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};

export default FetchSubCourse;
