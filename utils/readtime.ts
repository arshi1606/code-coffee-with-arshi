import readingTime from "reading-time";

function toPlainText(content: any[]) {
  if (!content) return "";
  if (typeof content === "string") return content;
  if (Array.isArray(content)) {
    return content.map(block => {
      if (block._type !== "block" || !block.children) return "";
      return block.children.map((child: { text: any; }) => child.text).join("");
    }).join("\n\n");
  }
  return "";
}

export function getReadingTime(content: any[]) {
  const plainText = toPlainText(content);
  return plainText ? readingTime(plainText).text : "Unknown read time";
}