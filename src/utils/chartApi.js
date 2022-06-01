const baseUrl = "/";

class ChartApi {
  getData () {
    return fetch(baseUrl+'data', {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => data);
  };

}

const chartApi = new ChartApi();
export default chartApi;
  