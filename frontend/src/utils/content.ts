
export function sanitizeContent(htmlContent: string) {
    // Parse the HTML and strip tags
    console.log("BlogCard: sanitizeContent Function called");


    // Create a temporary DOM element to extract text content
    const tempElement = document.createElement('div');
    tempElement.innerHTML = htmlContent;
    const textContent = tempElement.textContent || tempElement.innerText || '';

    // Remove newlines and truncate text
    const cleanText = textContent.slice(0, 100);
    return cleanText;
}