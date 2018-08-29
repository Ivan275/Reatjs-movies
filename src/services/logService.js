// import Raven from "raven-js";

function init() {
  // Raven.config(
  //   "https://59e4508aef524a8ab6cfa08610a0d1e8@sentry.io/1267796"
  // ).install();
}

function log(error) {
  console.log(error);
  // Raven.captureException(error);
}

export default {
  init,
  log
};
