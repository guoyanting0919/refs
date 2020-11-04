import req from "./https";

// 全域 api 掛載於 Vue.prototype
// 使用方式 this.$api
// api 命名原則 首字大寫爾後駝峰
const api = {
  GoogleTokenCheck(params) {
    return req("post", `ActivityTbls/CheckGoogleToken`, params);
  },

  SubmitForm(params) {
    return req("post", `ActivityTbls/Update`, params);
  },

  GetActContent(params) {
    return req("get", `ActContent/Get`, params);
  },
};

export default api;
