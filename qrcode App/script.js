// Initialize the QR code count
let qrCodeCount = 1720;

// Function to update the QR code count display
function updateQrCodeCount() {
    const qrCodeCountElement = document.getElementById('qr-code-count');
    if (qrCodeCountElement) {
        qrCodeCountElement.textContent = `QR Codes Generated: ${qrCodeCount}`;
        qrCodeCountElement.style.display = 'block'; // Show the count
    }
}

// Function to generate QR code with business name
async function generateQRCode() {
    // Disable user scaling
    document.documentElement.style.touchAction = 'none';

    const businessName = document.getElementById('business-name').value;
    const link = document.getElementById('link').value;
    const color = document.getElementById('color').value;
    const size = document.getElementById('size').value;
    const margin = document.getElementById('margin').value;

    if (!businessName || !link) {
        alert('Please enter a valid business name and link.');
        return;
    }

    try {
        // Generate the QR code
        const qrCodeContainer = document.getElementById('qr-code');
        qrCodeContainer.innerHTML = '';

        // Show the "Call to Action" text above the QR code
        const callToAction = document.createElement('div');
        callToAction.style.textAlign = 'center';

        const callToActionText = document.createElement('div');
        callToActionText.innerHTML = `Thanks to <a href="https://eyiycestudios.com">Eyiycestudios.com</a>,<br>YOU CAN SCAN ME TO CONNECT with ${businessName}.`;
        callToActionText.style.fontWeight = 'bold';
        callToActionText.style.color = color; // Inherit the color from the chosen QR code
        callToActionText.style.width = '100%'; // Ensure the text doesn't extend beyond QR code boundaries
        callToActionText.style.padding = '10px'; // Add padding to create space around the text
        callToAction.appendChild(callToActionText);

        qrCodeContainer.appendChild(callToAction);

        // Increment the QR code count
        qrCodeCount++;
        updateQrCodeCount();

        const qrCode = new QRCode(qrCodeContainer, {
            text: link,
            width: size,
            height: size,
            colorDark: color,
            colorLight: '#ffffff',
            correctLevel: QRCode.CorrectLevel.H,
            margin: margin,
        });

        // Render the QR code with "Call to Action" as an image using html2canvas
        const canvas = await html2canvas(qrCodeContainer);

        // Show the download button
        const downloadButton = document.getElementById('download-button');
        downloadButton.style.display = 'block';

        // Trigger download of the canvas as an image when the button is clicked
        downloadButton.addEventListener('click', () => {
            const downloadLink = document.createElement('a');
            downloadLink.href = canvas.toDataURL('image/png');
            downloadLink.download = 'qr_code.png';
            downloadLink.click();
        });
    } catch (error) {
        console.error('Error generating QR code:', error);
        alert('An error occurred while generating the QR code.');
    } finally {
        // Enable user scaling after generating the QR code
        document.documentElement.style.touchAction = '';
    }
}

// Event listener for the generate button
const generateButton = document.getElementById('generate-button');
generateButton.addEventListener('click', generateQRCode);
