import eta = require("eta");
import path = require("path");
import fs = require("fs");
import axios from "axios";
import { generateHTML } from "./generateHTML";

describe("generateHTML", () => {
  it("should save the generated HTML to a file", async () => {
    const data = {
      activity: "Explore the nightlife of your city",
      type: "social",
      participants: 1,
      price: 0.1,
      link: "",
      key: "2237769",
      accessibility: 0.32,
    };
    const outputPath = path.join(__dirname, "output/out1.html");

    await generateHTML(1);

    const savedHtml = await fs.promises.readFile(outputPath, "utf-8");

    expect(savedHtml).toBeTruthy();
  });
});
