import axios from "axios";

const token= JSON.parse(localStorage.getItem('token'));
console.log(token);
export default axios.create({
  baseURL: "https://muhaan.enterprisesgravity.com/dashboard",
  headers: {
    // "Authorization":`Token 7644fe2df45b1e279c396e77e2bc83534f87d79e`,    
    "Authorization":`Token ${token}`,    
    "Content-type": "application/json",
    "Accept": "application/json",    
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,OPTIONS,POST,PUT"
  }
});


// async function loginUser(credentials) {
//   return fetch("https://muhaan.enterprisesgravity.com/dashboard/login/", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json ",
//       Accept: "application/json",
//       "Access-Control-Allow-Origin": "*",
//     },
//     body: JSON.stringify(credentials),
//   }).then((data) => data.json());
// }

// //    This is for main category

// async function CategoryCreate() {
//   fetch("https://muhaan.enterprisesgravity.com/dashboard/category/create/", {
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

// async function MainCategoryList() {
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


