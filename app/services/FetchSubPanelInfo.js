const FetchSubPanelInfo = (page) => {
  const address = fetch(`https://lezatkhayati.com/api/sub/info`, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
  return address;
};
export default FetchSubPanelInfo;
