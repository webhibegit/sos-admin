import Axios from "axios";
import { reactLocalStorage } from "reactjs-localstorage";

// export const BASE_URL = "http://35.154.235.57:4040/api/v1/user/";
export const BASE_URL = "https://api.sosideas.in/api/v1/admin/";
export const IMAGE_URL = "https://api.sosideas.in/";

async function requestData(url, method, params = {}) {
  let token = "";
  let user = reactLocalStorage.getObject("userDataSos");
  if (user && user != null && Object.keys(user).length > 0) {
    token = user.token;
  }
  let apiUrl = BASE_URL + url;
  var myHeaders = new Headers();
  if (token != "") {
    myHeaders.append("authorization", token);
  }
  myHeaders.append("userType", "Admin");
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Access-Control-Allow-Origin", "*");
  var raw = JSON.stringify(params);

  var requestOptions = {};
  if (method == "POST") {
    requestOptions = {
      method: method,
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
  } else if (method == "PUT") {
    requestOptions = {
      method: method,
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
  } else {
    requestOptions = {
      method: method,
      headers: myHeaders,
      // body: raw,
      redirect: "follow",
    };
  }
  // console.log('apiUrl, requestOptions', apiUrl, requestOptions)
  return await fetch(apiUrl, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      // console.log(result);
      return result;
    })
    .catch((error) => console.log("error", error));
}

async function fileUplode(
  url,
  method,
  file,
  object_get = {},
  tokenCustom = null
) {
  let token = "";
  let user = reactLocalStorage.getObject("userDataSos");
  if (user && user != null && Object.keys(user).length > 0) {
    token = user.token;
  }
  // let bash_url = "http://13.127.101.102:5011/api/v1/";
  let apiUrl = BASE_URL + url;
  // let data = new FormData();
  // data.append("image", file);
  // Object.keys(object_get).forEach(function (key) {
  //   let ddd = object_get[key];
  //   data.append(key, ddd);
  // });
  if (token != "") {
    var toooo = token;
  }
  //  console.log("tokenn",toooo);
  let headers = {
    // 'Accept': 'application/json',
    // "Content-Type": "multipart/form-data",
    // "Access-Control-Allow-Origin": "http://13.127.101.102:5008",
    authorization: toooo,
    userType: "Admin",
    // 'Authorization': 'Bearer ' + login_status,
  };

  // Display the key/value pairs
  // for (var pair of file.entries()) {
  //   console.log(pair[0] + ", " + pair[1]);
  // }

  return await fetch(apiUrl, {
    method: method,
    body: file,
    redirect: "follow",
    headers: headers,
  })
    .then((response) => {
      // console.log("responseee", response, headers);
      return response.json();
    })
    .then(
      (result) => {
        // console.log(result);
        return result;
      },
      (error) => {
        return error;
      }
    );
}

async function newFileUpload(file) {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInBob25lTm8iOiI3MDAzNzQ2MjcwIiwicGFzc3dvcmQiOiIxMjMiLCJpYXQiOjE2OTU3MTMxODJ9.8h3YfuhPNi_ZsVa-l40neq7GT3PCOpzZrvfk43SYWas");
  myHeaders.append("userType", "Admin");

  var formdata = new FormData();
  formdata.append("image", file.files[0], "workimageUploadsLOGO.png");

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formdata,
    redirect: 'follow'
  };
  fetch("https://api.sosideas.in/api/v1/admin/work-image-upload", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}


const getOriginalname = async (data, extn) => {
  let arr = data.split("/");
  let lent = Number(arr.length - 1);
  // console.log("arr[lent]", extn)
  if (!arr[lent].match(/.(jpg|jpeg|png|gif|pdf|csv|plainText|zip)$/i)) {
    return arr[lent] + "." + extn.substring(extn.lastIndexOf("/") + 1);
  } else {
    return arr[lent];
  }
};


async function OcrFileUplode(
  url = "POST",
  method,
  file,
  object_get = {},
  tokenCustom = null
) {
  let token = "";
  let user = reactLocalStorage.getObject("userData");
  // if (user && user != null && Object.keys(user).length > 0) {
  //   token = user.token;
  // }
  // let bash_url = "http://13.127.101.102:5011/api/v1/";
  let apiUrl = "https://api.fisibility.com/api/v1/receipt";
  // let data = new FormData();
  // data.append("image", file);
  // Object.keys(object_get).forEach(function (key) {
  //   let ddd = object_get[key];
  //   data.append(key, ddd);
  // });
  if (token != "") {
    var toooo = token;
  }
  //  console.log("tokenn",toooo);
  let headers = {
    // 'Accept': 'application/json',
    // "Content-Type": "multipart/form-data",
    // "Access-Control-Allow-Origin": "http://13.127.101.102:5008",
    authorization: toooo,
    userType: "User",
    // 'Authorization': 'Bearer ' + login_status,
  };

  // Display the key/value pairs
  // for (var pair of file.entries()) {
  //   console.log(pair[0] + ", " + pair[1]);
  // }

  return await fetch(apiUrl, {
    method: method,
    body: file,
    redirect: "follow",
    headers: headers,
  })
    .then((response) => {
      // console.log("responseee", response, headers);
      return response.json();
    })
    .then(
      (result) => {
        // console.log(result);
        return result;
      },
      (error) => {
        return error;
      }
    );
}

export default {
  requestData,
  fileUplode,
  newFileUpload,
  // get,
  // post,
  // put,
  // // delete,
  // upload,
};