import * as FileSystem from "expo-file-system";
async function saveImage(uri,fileName) {
    const fileUri = FileSystem.documentDirectory + fileName;
    try {
      await FileSystem.copyAsync({
        from: uri,
        to: fileUri
      });
    } catch (error) {
      console.error('Error saving image:', error);
    }
  }
  

  export default saveImage;