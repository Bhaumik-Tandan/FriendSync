import * as FileSystem from "expo-file-system";

async function fileExists(fileName) {
    const fileUri = FileSystem.documentDirectory + fileName;
    try {
        const fileInfo = await FileSystem.getInfoAsync(fileUri);
        return fileInfo.exists;
    } catch (error) {
        console.error('Error checking file existence:', error);
        return false;
    }
}

export default fileExists;
