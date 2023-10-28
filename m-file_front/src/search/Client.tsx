import React, { useState } from "react";
import "./search.css";
import axios from "axios";

const Client = ({ text, URL, type }) => {
  const [searchQuery, setsearchQuery] = useState("");
  const [res, setres] = useState([]);
  const [notFound, setnotFound] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const search = async () => {
    setres([]);
    setnotFound("");
    console.log(searchQuery);
    const response = await axios.get(URL + `?property=${searchQuery}`);
    if (response.status === 200) {
      console.log(response.data.Items);
      if (response.data.Items.length > 0) {
        setres(response.data.Items);
      } else {
        setnotFound("No items found");
      }
    } else {
      console.log(response);
    }
  };
  const upload = async () => {
    setres([]);
    setnotFound("");
    const formData = new FormData();
    formData.append("file", selectedFile || "");

    axios
      .post(URL, formData)
      .then((response) => {
        // Handle the response from the API
        if(response.status === 200) {
        setres(response.data);
        }else{
          setnotFound('error'+response.status)
        }
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
      });
  };
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  return (
    <div>
      <div className="container">
        <h2>{text}</h2>
        <div className="searchBox">
          {type === "text" ? (
            <input
              className="searchInput"
              type={type}
              name=""
              placeholder="Search"
              onChange={(e) => setsearchQuery(e.target.value)}
            />
          ) : (
            <input
              className="searchInput"
              type={type}
              name=""
              placeholder="Search"
              onChange={(e) => handleFileChange(e)}
            />
          )}

          {type === "text" ? (
            <button className="searchButton" onClick={search}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="100"
                height="100"
                viewBox="0 0 128 128"
              >
                <path d="M 52.349609 14.400391 C 42.624609 14.400391 32.9 18.1 25.5 25.5 C 10.7 40.3 10.7 64.399219 25.5 79.199219 C 32.9 86.599219 42.600391 90.300781 52.400391 90.300781 C 62.200391 90.300781 71.900781 86.599219 79.300781 79.199219 C 94.000781 64.399219 93.999219 40.3 79.199219 25.5 C 71.799219 18.1 62.074609 14.400391 52.349609 14.400391 z M 52.300781 20.300781 C 60.500781 20.300781 68.700391 23.399219 74.900391 29.699219 C 87.400391 42.199219 87.4 62.5 75 75 C 62.5 87.5 42.199219 87.5 29.699219 75 C 17.199219 62.5 17.199219 42.199219 29.699219 29.699219 C 35.899219 23.499219 44.100781 20.300781 52.300781 20.300781 z M 52.300781 26.300781 C 45.400781 26.300781 38.9 29 34 34 C 29.3 38.7 26.700391 44.800391 26.400391 51.400391 C 26.300391 53.100391 27.600781 54.4 29.300781 54.5 L 29.400391 54.5 C 31.000391 54.5 32.300391 53.199609 32.400391 51.599609 C 32.600391 46.499609 34.699219 41.799219 38.199219 38.199219 C 41.999219 34.399219 47.000781 32.300781 52.300781 32.300781 C 54.000781 32.300781 55.300781 31.000781 55.300781 29.300781 C 55.300781 27.600781 54.000781 26.300781 52.300781 26.300781 z M 35 64 A 3 3 0 0 0 32 67 A 3 3 0 0 0 35 70 A 3 3 0 0 0 38 67 A 3 3 0 0 0 35 64 z M 83.363281 80.5 C 82.600781 80.5 81.850781 80.800391 81.300781 81.400391 C 80.100781 82.600391 80.100781 84.499609 81.300781 85.599609 L 83.800781 88.099609 C 83.200781 89.299609 82.900391 90.6 82.900391 92 C 82.900391 94.4 83.8 96.700391 85.5 98.400391 L 98.300781 111 C 100.10078 112.8 102.39922 113.69922 104.69922 113.69922 C 106.99922 113.69922 109.29961 112.79961 111.09961 111.09961 C 114.59961 107.59961 114.59961 101.90039 111.09961 98.400391 L 98.300781 85.599609 C 96.600781 83.899609 94.300391 83 91.900391 83 C 90.500391 83 89.2 83.300391 88 83.900391 L 85.5 81.400391 C 84.9 80.800391 84.125781 80.5 83.363281 80.5 z M 91.900391 88.900391 C 92.700391 88.900391 93.5 89.200781 94 89.800781 L 106.69922 102.5 C 107.89922 103.7 107.89922 105.59922 106.69922 106.69922 C 105.49922 107.89922 103.6 107.89922 102.5 106.69922 L 89.800781 94.099609 C 89.200781 93.499609 88.900391 92.700391 88.900391 91.900391 C 88.900391 91.100391 89.200781 90.300781 89.800781 89.800781 C 90.400781 89.200781 91.100391 88.900391 91.900391 88.900391 z"></path>
              </svg>
            </button>
          ) : (
            <button className="searchButton" onClick={upload}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-cloud-upload-fill"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 0a5.53 5.53 0 0 0-3.594 1.342c-.766.66-1.321 1.52-1.464 2.383C1.266 4.095 0 5.555 0 7.318 0 9.366 1.708 11 3.781 11H7.5V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11h4.188C14.502 11 16 9.57 16 7.773c0-1.636-1.242-2.969-2.834-3.194C12.923 1.999 10.69 0 8 0zm-.5 14.5V11h1v3.5a.5.5 0 0 1-1 0z"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
      <div>
        {notFound && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "20px",
              alignItems: "center",
            }}
          >
            <button
              style={{ height: "20px" }}
              onClick={() => {
                setres([]);
                setnotFound("");
              }}
            >
              X
            </button>
            <p style={{ color: "red" }}>{notFound}</p>
          </div>
        )}
        {res ? (
          Array.isArray(res) ? (
            <div>
              {res.map((item) => (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "20px",
                  }}
                >
                  <button
                    style={{ height: "20px" }}
                    onClick={() => {
                      setres([]);
                      setnotFound("");
                    }}
                  >
                    X
                  </button>
                  <div key={item.id}>
                    <pre style={{color:"white"}}>{JSON.stringify(res, null, 2)}</pre>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
            <p style={{color:"green"}}>Uploaded successfully</p>
            <pre >{JSON.stringify(res, null, 2)}</pre>
            </>
            
          )
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
};

export default Client;
