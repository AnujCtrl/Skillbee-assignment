import fs from "fs";
import path from "path";
import { generateHTML } from "./index";
import { describe, expect, it } from "@jest/globals";


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
    const outputPath = path.join(__dirname, "test-output.html");

    await generateHTML(data, outputPath);

    const savedHtml = await fs.promises.readFile(outputPath, "utf-8");

    expect(savedHtml).toBeTruthy();
  });
});
