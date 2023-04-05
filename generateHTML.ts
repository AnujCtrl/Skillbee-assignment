
import eta = require("eta");
import path = require("path");
import fs = require("fs");
import axios from "axios";

interface Activity {
  activity: string;
  type: string;
  participants: number;
  price: number;
  link: string;
  key: string;
  accessibility: number;
}

async function getActivity(): Promise<Activity> {
  try {
    const response = await axios.get<Activity>(
      "https://www.boredapi.com/api/activity"
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// const data = {
//   activity: "Explore the nightlife of your city",
//   type: "social",
//   participants: 1,
//   price: 0.1,
//   link: "",
//   key: "2237769",
//   accessibility: 0.32,
// };
export async function generateHTML(i: number) {
  const templatePath = path.join(__dirname, 'index.html');
  const template = await fs.promises.readFile(templatePath, 'utf-8');
  const data = await getActivity();
  const uppercaseData: Activity = {
    activity: "",
    type: "",
    participants: 0,
    price: 0,
    link: "",
    key: "",
    accessibility: 0
  };
  for (const key in data) {
    const value = data[key];
    uppercaseData[key] =
      typeof value === "string" ? value.toUpperCase() : String(value);
  }
  console.log(uppercaseData);

  const rendered = eta.render(template, uppercaseData);
  const outputFilePath = path.join(__dirname,"output", `${i}.html`);
  await fs.promises.writeFile(outputFilePath, rendered);

  console.log('HTML file generated:', outputFilePath);
}


for (const i of Array(10)) {
  generateHTML(i);
}