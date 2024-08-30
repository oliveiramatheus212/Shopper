import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleAIFileManager } from "@google/generative-ai/server";
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

const fileManager = new GoogleAIFileManager(process.env.API_KEY as string);


const base64Image = ''
function base64ToBuffer(base64: string): Buffer {
  const base64Data = base64.replace(/^data:image\/\w+;base64,/, "");
  return Buffer.from(base64Data, 'base64');
}

export async function getImageInfo() {
  try {
    const imageBuffer = base64ToBuffer(base64Image);

    const tempFilePath = path.join(__dirname, 'temp_image.jpg');
    fs.writeFileSync(tempFilePath, imageBuffer);

    const uploadResult = await fileManager.uploadFile(
      tempFilePath,
      {
        mimeType: "image/jpeg",
        displayName: "Jetpack drawing",
      },
    );

    const genAI = new GoogleGenerativeAI(process.env.API_KEY as string);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent([
      "Extract the water meter reading from this image.",
      {
        fileData: {
          fileUri: uploadResult.file.uri,
          mimeType: uploadResult.file.mimeType,
        },
      },
    ]);
    console.log(result.response.text());

    // Clean up temporary file
    fs.unlinkSync(tempFilePath);

  } catch (error) {
    console.error('Error:', error);
  }
}

getImageInfo().catch(console.error);
