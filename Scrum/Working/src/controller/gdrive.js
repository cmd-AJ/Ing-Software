import { google } from 'googleapis';
import fs from 'fs';




async function uploadFile(picturename) {
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
        throw new Error('Unsupported file type. Only .png and .jpg/.jpeg are allowed.');
    }

    // Metadata for the file
    const fileMetadata = {
        name: picturename, // Use the provided name directly
        parents: ['16C48SpP8swbbI05L29UeoKW6tYzopzMc'], // Optional: replace with a folder ID to upload the file to a specific folder
    };

    // Media object with the file content
    const media = {
        mimeType: mimeType, // Set the MIME type dynamically
        body: fs.createReadStream(`./${picturename}`), // Use the provided file name to read the correct file
    };

    try {
        // Upload the file
        const response = await drive.files.create({
            resource: fileMetadata,
            media: media,
            fields: 'id', // Request to return the file ID of the uploaded file
        });

        return response.data.id; // Return the file ID
    } catch (error) {
        console.error('Error uploading file:', error);
        throw error; // Optional: rethrow the error if you want to handle it outside
    }
}


// uploadFile('JB1.png')
//     .then(fileId => {
//         console.log('Uploaded file ID:', fileId);
//     })
//     .catch(error => {
//         console.error('Failed to upload file:', error);
//     });
  

async function downloadImage(fileId) {
  const auth = new google.auth.GoogleAuth({
    keyFile: './contratogtgg.json',
    scopes: ['https://www.googleapis.com/auth/drive.readonly'],
  });

  const drive = google.drive({ version: 'v3', auth });

  return new Promise((resolve, reject) => { // Return a new Promise
    try {
      drive.files.get({
        fileId: fileId,
        alt: 'media', // Request the media
      }, { responseType: 'stream' })
      .then(response => {
        const chunks = []; // Array to hold the data chunks

        response.data.on('data', (chunk) => {
          chunks.push(chunk); // Push each chunk into the array
        });

        response.data.on('end', () => {
          // Concatenate all the chunks into a single Buffer
          const buffer = Buffer.concat(chunks);
          
          // Convert Buffer to Base64
          const base64 = buffer.toString('base64');

          // Create the data URL
          const dataUrl = `data:image/jpeg;base64,${base64}`; // Change the MIME type if necessary
          resolve(dataUrl); // Resolve the Promise with the data URL
        });

        response.data.on('error', (err) => {
          reject(new Error('Error downloading file: ' + err.message)); // Reject the Promise on error
        });
      }).catch(error => {
        reject(new Error('Error downloading image: ' + error.message)); // Catch and reject if drive.files.get fails
      });
    } catch (error) {
      reject(new Error('Error downloading image: ' + error.message)); // Catch and reject for any unexpected errors
    }
  });
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