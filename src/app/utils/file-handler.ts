// Helper Function: Processes the file and returns the preview URL
export const getImagePreview = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            if (reader.result) {
                resolve(reader.result as string);
            } else {
                reject(new Error("Failed to read file."));
            }
        };
        reader.readAsDataURL(file);
    });
};


export const changeFile = async (event: React.ChangeEvent<HTMLInputElement>): Promise<{ file: File; previewUrl: string } | null> => {
    const file = event.target.files?.[0];
    if (!file) return null;

    try {
        const previewUrl = await getImagePreview(file); // Get the preview URL
        return { file, previewUrl }; // Return both the file and preview URL
    } catch (error) {
        console.error("Error generating preview:", error);
        return null;
    }
};

