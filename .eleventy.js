const del = require("del").sync;

module.exports = (eleventyConfig) => {
  // Delete the output directory before building...
  del("./www");

  eleventyConfig.setUseGitIgnore(false);

  return {
    dir: {
      input: "src",
      output: "www",
    },
  };
};
