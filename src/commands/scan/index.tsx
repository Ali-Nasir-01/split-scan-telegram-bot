// commands/scan.ts
import botApi from "../../services/telegramref";
import openai from "../../services/openai";

export function registerScanCommand() {
  const waitingForImage = new Set<number>();

  botApi.command("scan", (ctx) => {
    ctx.reply("Okay, send your image.");
    waitingForImage.add(ctx.chat.id);
  });

  botApi.on("photo", async (ctx) => {
    if (!waitingForImage.has(ctx.chat.id)) return;

    waitingForImage.delete(ctx.chat.id);

    const photo = ctx.message.photo.pop();
    const fileId = photo?.file_id;

    if (!fileId) {
      ctx.reply("No photo found.");
      return;
    }

    const fileLink = await ctx.telegram.getFileLink(fileId);

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "Extract all text from this image and return it clearly.",
              },
              { type: "image_url", image_url: { url: fileLink.href } },
            ],
          },
        ],
      });

      const extractedText =
        response.choices[0].message?.content || "No text found.";
      ctx.reply(`Extracted Text:\n${extractedText}`);
    } catch (error) {
      console.error("Error calling OpenAI API:", error);
      ctx.reply("Failed to extract text from the image.");
    }
  });
}
