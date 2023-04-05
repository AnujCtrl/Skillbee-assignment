
import eta from "eta";
import fs from "fs";
import path from "path";

interface Activity {
  activity: string;
  type: string;
  participants: number;
  price: number;
  link: string;
  key: string;
  accessibility: number;
}

fetch("https://www.boredapi.com/api/activity")
  .then((response) => response.json())
  .then((data: Activity) => {
    // Log the retrieved data to the console
    console.log(data);
  })
  .catch((error) => {
    // Handle any errors that occur
    console.error(error);
  });

const data = {
  activity: "Explore the nightlife of your city",
  type: "social",
  participants: 1,
  price: 0.1,
  link: "",
  key: "2237769",
  accessibility: 0.32,
};
export async function generateHTML(data, outputPath) {
  const templatePath = path.join(__dirname, "index.html");
  const template = await fs.promises.readFile(templatePath, "utf-8");
  console.log(data);

  const rendered = eta.render(template, { data });
  await fs.promises.writeFile(outputPath, rendered);
}

