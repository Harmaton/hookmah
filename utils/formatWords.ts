 const formatWords = (words: string) => {
    // Remove all characters that are not word characters or asterisks
    let cleanedText = words.replace(/[^\w*\s]/g, "");
    // Remove occurrences of "**" and "**\n\n**"
    cleanedText = cleanedText.replace(/\*\*|\*\*\n\n\*\*/g, "");
    // Replace consecutive newline characters with a single space
    cleanedText = cleanedText.replace(/\n+/g, " ");
    // Replace consecutive spaces with a single space
    cleanedText = cleanedText.replace(/\s+/g, " ");
    return cleanedText.trim(); // Trim leading/trailing spaces
  }

  export default formatWords