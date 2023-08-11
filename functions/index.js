// const functions = require("firebase-functions");
const { onRequest } = require("firebase-functions/v2/https");
const { Nuxt } = require("nuxt-start");

const nuxtConfig = require("./nuxt.config.js");

const config = {
  ...nuxtConfig,
  dev: false,
  buildDir: "nuxt",
};
const nuxt = new Nuxt(config);

exports.ssrapp = onRequest(async (req, res) => {
  console.log("!!ssrapp 실행됨!!:", res);
  await nuxt.ready();
  nuxt.render(req, res);
});
