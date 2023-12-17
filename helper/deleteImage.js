import * as FileSystem from "expo-file-system";

async function deleteImage(fileName) {
    const fileUri = FileSystem.documentDirectory + fileName;
    try {
        await FileSystem.deleteAsync(fileUri);
    } catch (error) {
        console.error('Error deleting image:', error);
    }
}

export default deleteImage;
