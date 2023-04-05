
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
export async function generateHTML() {
  const templatePath = path.join(__dirname, "index.html");
  const template = await fs.promises.readFile(templatePath, "utf-8");
  const data = await getActivity();
  console.log(data);

  const rendered = eta.render(template, data);
  await fs.promises.writeFile(
    __dirname + data.activity.replace(/\s+/g, "")+".html",
    rendered
  );
}

