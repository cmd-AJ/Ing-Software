import { google } from 'googleapis';
import fs from 'fs';
import path from 'path'

import stream from 'stream'

// Desarrollo local: si LOCAL_UPLOADS_DIR está definido, las imágenes se guardan en disco en vez de Google Drive.
const localUploadsDir = process.env.LOCAL_UPLOADS_DIR

function saveLocalFile(fileId, picturename, basedon64) {
  const fileExtension = picturename.split('.').pop().toLowerCase();
  if (!['png', 'jpg', 'jpeg'].includes(fileExtension)) {
    throw new Error('Unsupported file type. Only .png and .jpg/.jpeg are allowed.');
  }
  fs.mkdirSync(localUploadsDir, { recursive: true });
  const base64Image = basedon64.replace(/^data:image\/\w+;base64,/, '');
  fs.writeFileSync(path.join(localUploadsDir, fileId), Buffer.from(base64Image, 'base64'));
  return fileId;
}


export async function uploadFile(picturename, basedon64) {
  if (localUploadsDir) {
    return saveLocalFile(Date.now() + '-' + Math.random().toString(36).slice(2, 8), picturename, basedon64);
  }

  // Load the service account key JSON file
  const auth = new google.auth.GoogleAuth({
    keyFile: './contratogtgg.json', // Replace with your service account key file
    scopes: ['https://www.googleapis.com/auth/drive.file'], // Scope for file uploads
  });

  const drive = google.drive({ version: 'v3', auth });

  // Determine the MIME type and file extension based on the provided name
  let mimeType;
  const fileExtension = picturename.split('.').pop().toLowerCase();

  if (fileExtension === 'png') {
    mimeType = 'image/png';
  } else if (fileExtension === 'jpg' || fileExtension === 'jpeg') {
    mimeType = 'image/jpeg';
  } else {
    console.log(fileExtension)
    throw new Error('Unsupported file type. Only .png and .jpg/.jpeg are allowed.');
  }

  // Metadata for the file
  const fileMetadata = {
    name: picturename, // Use the provided name directly
    parents: ['16C48SpP8swbbI05L29UeoKW6tYzopzMc'], // Replace with the folder ID if needed
  };

  // Remove the data URL prefix if it exists and convert the base64 data to a buffer
  const base64Image = basedon64.replace(/^data:image\/\w+;base64,/, '');
  const bufferStream = new stream.PassThrough();
  bufferStream.end(Buffer.from(base64Image, 'base64'));

  // Media object with the file content
  const media = {
    mimeType: mimeType, // Set the MIME type dynamically
    body: bufferStream, // Stream the buffer directly
  };

  try {
    // Upload the file
    const response = await drive.files.create({
      requestBody: fileMetadata,
      media: media,
      fields: 'id', // Request to return the file ID of the uploaded file
    });

    console.log(`File uploaded successfully! File ID: ${response.data.id}`);
    return response.data.id; // Return the file ID
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
}


export async function getImageFromDrive(fileId) {
  if (localUploadsDir) {
    const filePath = path.join(localUploadsDir, path.basename(fileId));
    if (!fs.existsSync(filePath)) {
      throw new Error('Image not found: ' + fileId);
    }
    return fs.createReadStream(filePath);
  }

  const auth = new google.auth.GoogleAuth({
    keyFile: './contratogtgg.json', // Replace with your service account key file
    scopes: ['https://www.googleapis.com/auth/drive.file'], // Scope for file uploads
  });

  const drive = google.drive({ version: 'v3', auth });
  const response = await drive.files.get(
    { fileId, alt: 'media' },
    { responseType: 'stream' }
  );

  return response.data;
}



export async function updatePhoto( picturename ,fileId, base64Data) {
  if (localUploadsDir) {
    return saveLocalFile(path.basename(fileId), picturename, base64Data);
  }

  const auth = new google.auth.GoogleAuth({
    keyFile: './contratogtgg.json', // Replace with your service account key file
    scopes: ['https://www.googleapis.com/auth/drive.file'], // Scope for file uploads
  });

   const drive = google.drive({ version: 'v3', auth });


  // Determine the MIME type based on the file extension
  let mimeType;
  const fileExtension = picturename.split('.').pop().toLowerCase();

  if (fileExtension === 'png') {
    mimeType = 'image/png';
  } else if (fileExtension === 'jpg' || fileExtension === 'jpeg') {
    mimeType = 'image/jpeg';
  } else {
    throw new Error('Unsupported file type. Only .png and .jpg/.jpeg are allowed.');
  }


  // Remove the data URL prefix if it exists and convert the base64 data to a buffer
  const base64Image = base64Data.replace(/^data:image\/\w+;base64,/, '');
  const bufferStream = new stream.PassThrough();
  bufferStream.end(Buffer.from(base64Image, 'base64'));

  // Media object with the file content
  const media = {
    mimeType: mimeType, // Set the MIME type dynamically
    body: bufferStream, // Stream the buffer directly
  };

  try {
    // Upload the file
    const response = await drive.files.update({
      fileId: fileId, // ID of the file you want to update
      media: media,
      fields: 'id', // Request to return the file ID of the updated file
    });

    console.log(`File uploaded successfully! File ID: ${response.data.id}`);
    return response.data.id; // Return the file ID
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
}
