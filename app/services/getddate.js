const GetDate = () => {
  return fetch("https://lezatkhayati.com/api/date")
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};

export default GetDate;
