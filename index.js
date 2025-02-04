import inquirer from 'inquirer';
import sillyname from 'sillyname';
import { randomSuperhero } from 'superheroes'; 
import qr from 'qr-image';
import fs from 'fs';

inquirer.prompt([
    {
        type: 'input',
        name: 'AUDREY',
        message: 'What is your name?'
    }
]).then((answers) => {
    const AUDREY = answers.AUDREY;  
    const SillyN = sillyname();  

    // Use randomSuperhero to get a random superhero name
    const SuperHN = randomSuperhero();

    console.log(`Hello ${AUDREY}`);
    console.log(`Your villain name will be ${SillyN}`);
    console.log(`and your superhero name will be ${SuperHN}`);
    console.log("QR codes are generated");
    console.log("Text file updated");

    // Generate QR codes
    generateQRCode(AUDREY, 'Audrey.png');
    generateQRCode(SillyN, 'SillyN.png');
    generateQRCode(SuperHN, 'SuperHN.png');

    // Save names to a text file
    const textContent = `Name: ${AUDREY}\nVillain Name: ${SillyN}\nSuperhero Name: ${SuperHN}\n`;
    fs.writeFile('myhero.txt', textContent, (err) => {
        if (err) {
            console.error('Error writing to file:', err);
        } else {
            console.log('Names saved to myhero.txt ');
        }
    });
}).catch((error) => {
    if (error.isTtyError) {
        console.log("Prompt couldn't be rendered in the current environment.");
    } else {
        console.error("Something went wrong:", error);
    }
});

// Function to generate QR code
function generateQRCode(text, filename) {
    const qr_svg = qr.image(text, { type: 'png' });
    qr_svg.pipe(fs.createWriteStream(filename));
}