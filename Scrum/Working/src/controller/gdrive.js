import { google } from 'googleapis';
import fs from 'fs';
import path from 'path'

import stream from 'stream'


export async function uploadFile(picturename, basedon64) {
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



// const base64String = 'data:image/png;base64,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'; // Replace with your actual base64 encoded data
// const fileName = 'example.png'; // The name of the file to be uploaded

// uploadFile(fileName, base64String)
//   .then(fileId => {
//     console.log('Uploaded file ID:', fileId);
//   })
//   .catch(error => {
//     console.error('Upload failed:', error);
//   });

// uploadFile('JB1.png')
//     .then(fileId => {
//         console.log('Uploaded file ID:', fileId);
//     })
//     .catch(error => {
//         console.error('Failed to upload file:', error);
//     });


// Function to download the image from Google Drive
export async function getImageFromDrive(fileId) {

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



//RETORNA EL MEJOR CARRO DE TODOS EL DELOREAN

// (async () => {
//     const fileId = '1fOFKg6vZwU847piUPJ2j1SO7xND2IggW'; // Replace with your actual file ID
//     try {
//       const dataUrl = await downloadImage(fileId);
//       console.log(dataUrl); // Logs the Base64 data URL
//     } catch (error) {
//       console.error(error.message); // Handle any errors
//     }
//   })();



export async function updatePhoto( picturename ,fileId, base64Data) {

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

// Call the function with your file ID and path to the new photo
// updatePhoto( 'juez.png', '1fOFKg6vZwU847piUPJ2j1SO7xND2IggW', base64String);