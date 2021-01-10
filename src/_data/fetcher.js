const path = require("path");

const axios = require("axios");
const { stripIndents } = require("common-tags");
const fse = require("fs-extra");

module.exports = async () => {
  const res = await axios.get("https://haveibeenpwned.com/api/v3/breaches");
  const breaches = res.data.slice(0, 10);

  for (const breach of breaches) {
    const outFile = path.join(__dirname, "..", "breaches", `${breach.Name}.liquid`);
    const template = stripIndents`
      ---
      title: ${breach.Title}
      domain: ${breach.Domain}
      breachDate: ${breach.BreachDate}
      addedDate: ${breach.AddedDate}
      pwnCount: ${breach.PwnCount}
      layout: layouts/breach.liquid
      permalink: "/breaches/{{ '${breach.Name}' | slug }}/"
      ---

      <section class="breach__info">
        ${breach.Description}
      </section>
    `;
    await fse.writeFile(outFile, template);
  }
  return [];
};
