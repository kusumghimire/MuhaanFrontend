async function loginUser(credentials) {
  return fetch("https://muhaan.enterprisesgravity.com/dashboard/login/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json ",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

//    This is for main category

async function CategoryCreate() {
  fetch("https://muhaan.enterprisesgravity.com/dashboard/category/create/", {
    headers: {
      "Content-Type": "application/json ",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  })
    .then((resp) => resp.json())
    .then((resp) => {
      setData(resp);
      console.log(resp);
    });
}

async function MainCategoryList() {
  fetch("https://muhaan.enterprisesgravity.com/dashboard/category/", {
    headers: {
      "Content-Type": "application/json ",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  })
    .then((resp) => resp.json())
    .then((resp) => {
      setData(resp);
      console.log(resp);
    });
}

// async function SubCategoryList() {
//   fetch("https://muhaan.enterprisesgravity.com/dashboard/category/", {
//     headers: {
//       "Content-Type": "application/json ",
//       Accept: "application/json",
//       "Access-Control-Allow-Origin": "*",
//     },
//   })
//     .then((resp) => resp.json())
//     .then((resp) => {
//       setData(resp);
//       console.log(resp);
//     });
// }


