  //// logo button accordion 
         var acc = document.getElementsByClassName("accordion");
         var i;
         
         for (i = 0; i < acc.length; i++) {
           acc[i].addEventListener("click", function() {
             this.classList.toggle("active");
             var panel = this.nextElementSibling;
             if (panel.style.display === "block") {
               panel.style.display = "none";
             } else {
               panel.style.display = "block";
             }
           });
         }
      </script>
      <script src="https://cdn.lordicon.com/bhenfmcm.js"></script>
      <script>const burger = document.querySelector('.burger');
         const navLinks = document.querySelector('.nav-links');
         
         burger.addEventListener('click', () => {
           navLinks.classList.toggle('nav-active');
           burger.classList.toggle('toggle');
         });
         
         
         document.addEventListener('DOMContentLoaded', () => {
    
         function generateQRCodeWithLogo(qrCodeDataURL, logoDataURL, size) {
         return new Promise((resolve, reject) => {
         const qrCodeImage = new Image();
         qrCodeImage.src = qrCodeDataURL;
         qrCodeImage.crossOrigin = 'Anonymous';
         
         const logoImage = new Image();
         logoImage.src = logoDataURL;
         logoImage.crossOrigin = 'Anonymous';
         
         Promise.all([new Promise((resolve) => qrCodeImage.onload = resolve), new Promise((resolve) => logoImage.onload = resolve)])
             .then(() => {
                 const canvas = document.createElement('canvas');
                 canvas.width = size;
                 canvas.height = size;
                 const ctx = canvas.getContext('2d');
         
                 // Draw QR code
                 ctx.drawImage(qrCodeImage, 0, 0, size, size);
         
                 // Draw logo
                 const logoSize = size * 0.3;
                 const logoPosition = (size - logoSize) / 2;
                 ctx.drawImage(logoImage, logoPosition, logoPosition, logoSize, logoSize);
         
                 // Resolve with final data URL
                 resolve(canvas.toDataURL());
             })
             .catch((error) => {
                 reject(error);
             });
         });
         }
         
         
         
         
         const inputField = document.getElementById('inputField');
         const generateButton = document.getElementById('generateButton');
         const qrCodeContainer = document.getElementById('qrCodeContainer');
         const loadingIcon = document.getElementById('loadingIcon');
         const successMessage = document.getElementById('successMessage');
         const errorMessage = document.getElementById('errorMessage');
         const textInputBtn = document.getElementById('textInputBtn');
         const urlInputBtn = document.getElementById('urlInputBtn');
         const emailInputBtn = document.getElementById('emailInputBtn');
         const saveButton = document.getElementById('saveButton');
         const sizeRange = document.getElementById('sizeRange');
         const dimensions = document.getElementById('dimensions');
         const sizeContainer = document.getElementById('sizeContainer');
         
         const logoInput = document.getElementById('logoInput');
         const logoPreviewContainer = document.getElementById('logoPreviewContainer');
         let logoDataURL = null;
         const savePngButton = document.getElementById('savePngButton');
         const saveSvgButton = document.getElementById('saveSvgButton');
         const vCardBtn = document.getElementById('vCardBtn'); // Add this line
         const nameField = document.getElementById('nameField');
         const emailField = document.getElementById('emailField');
         const phoneField = document.getElementById('phoneField');
         const companyField = document.getElementById('companyField');
         const websiteField = document.getElementById('websiteField');
         const addressField = document.getElementById('addressField');
         const foregroundColorInput = document.getElementById('foreground-color');
         const backgroundColorInput = document.getElementById('background-color');
         
         foregroundColorInput.addEventListener('input', () => {
         generateQRCode();
         });
         
         backgroundColorInput.addEventListener('input', () => {
         generateQRCode();
         });
         
         // ...
         
         foregroundColorInput.addEventListener('input', () => {
         generateQRCode();
         });
         
         backgroundColorInput.addEventListener('input', () => {
         generateQRCode();
         });
         saveSvgButton.addEventListener('click', () => {
         saveQRCode('svg');
         });
         
         textInputBtn.addEventListener('click', () => {
         inputField.style.display = 'block';
         nameField.style.display = 'none';
         emailField.style.display = 'none';
         phoneField.style.display = 'none';
         companyField.style.display = 'none';
         websiteField.style.display = 'none';
         addressField.style.display = 'none';
         inputField.placeholder = 'Enter text...';
         textInputBtn.classList.add('active');
         urlInputBtn.classList.remove('active');
         emailInputBtn.classList.remove('active');
         vCardBtn.classList.remove('active');
         });
         
         vCardBtn.addEventListener('click', () => {
         inputField.style.display = 'none';
         nameField.style.display = 'block';
         emailField.style.display = 'block';
         phoneField.style.display = 'block';
         companyField.style.display = 'block';
         websiteField.style.display = 'block';
         addressField.style.display = 'block';
         vCardBtn.classList.add('active');
         textInputBtn.classList.remove('active');
         urlInputBtn.classList.remove('active');
         emailInputBtn.classList.remove('active');
         });
         
         function saveQRCode(type) {
         const inputValue = inputField.value.trim();
         const foregroundColor = foregroundColorInput.value;
         const backgroundColor = backgroundColorInput.value;
         const size = parseInt(sizeRange.value);
         
         if (inputValue === '') {
         errorMessage.style.display = 'block';
         errorMessage.textContent = 'No QR code generated yet.';
         return;
         }
         
         const options = {
         scale: 20,
         width: size,
         height: size,
         errorCorrectionLevel: 'H',
         color: {
             dark: foregroundColor,
             light: backgroundColor,
         },
         };
         
         if (type === 'svg') {
         // Directly generate SVG QR code
         QRCode.toString(inputValue, { ...options, type: 'svg' })
             .then((svgString) => {
                 const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
                 const url = URL.createObjectURL(blob);
                 const a = document.createElement('a');
                 a.href = url;
                 a.download = 'qrcode.svg';
                 document.body.appendChild(a);
                 a.click();
                 document.body.removeChild(a);
                 URL.revokeObjectURL(url);
         
                 successMessage.style.display = 'block';
                 successMessage.textContent = 'QR code saved successfully!';
             })
             .catch((error) => {
                 errorMessage.style.display = 'block';
                 errorMessage.textContent = 'Error generating QR Code: ' + error;
             });
         } else if (type === 'png') {
         // Generate PNG QR code
         QRCode.toDataURL(inputValue, options)
             .then((qrCodeDataURL) => {
                 if (logoDataURL) {
                     return generateQRCodeWithLogo(qrCodeDataURL, logoDataURL, size);
                 } else {
                     return qrCodeDataURL;
                 }
             })
             .then((finalDataURL) => {
                 const a = document.createElement('a');
                 a.href = finalDataURL;
                 a.download = 'qrcode.png';
                 document.body.appendChild(a);
                 a.click();
                 document.body.removeChild(a);
         
                 successMessage.style.display = 'block';
                 successMessage.textContent = 'QR code saved successfully!';
             })
             .catch((error) => {
                 errorMessage.style.display = 'block';
                 errorMessage.textContent = 'Error generating QR Code: ' + error;
             });
         }
         }
         
         
         
         
         foregroundColorInput.addEventListener('input', () => {
         generateQRCode();
         });
         
         backgroundColorInput.addEventListener('input', () => {
         generateQRCode();
         });
         
         
         
         
         logoInput.addEventListener('change', () => {
         const file = logoInput.files[0];
         if (file) {
         const reader = new FileReader();
         reader.onload = (e) => {
             logoDataURL = e.target.result;
             logoPreviewContainer.innerHTML = `<img src="${logoDataURL}" style="max-width: 100px; max-height: 100px;">`;
             generateQRCode(); // Call generateQRCode after setting logoDataURL
         };
         reader.readAsDataURL(file);
         } else {
         logoDataURL = null;
         logoPreviewContainer.innerHTML = '';
         }
         });
         
         
         sizeRange.addEventListener('input', () => {
         const size = sizeRange.value;
         dimensions.textContent = `${size}x${size}`;
         updateQRCodeSize(size);
         });
         
         
         
         const inputValue = inputField.value.trim();
         
         let dataToEncode;
         
         function isValidEmail(str) {
         const emailPattern = new RegExp(/^\S+@\S+\.\S+$/);
         return emailPattern.test(str);
         }
         function isValidURL(str) {
         const urlPattern = new RegExp(/^(https?:\/\/)?[\w.-]+\.[a-z]{2,}(\/.*)?$/i);
         return urlPattern.test(str);
         }
         
         function generateQRCode() {
         qrCodeContainer.innerHTML = '';
         
         const inputValue = inputField.value.trim();
         const foregroundColor = foregroundColorInput.value;
         const backgroundColor = backgroundColorInput.value;
         
         let dataToEncode = '';
         
         if (textInputBtn.classList.contains('active')) {
         dataToEncode = inputValue;
         } else if (urlInputBtn.classList.contains('active')) {
         if (!isValidURL(inputValue)) {
         errorMessage.style.display = 'block';
         errorMessage.textContent = 'Please enter a valid URL.';
         return;
         }
         dataToEncode = inputValue;
         } else if (emailInputBtn.classList.contains('active')) {
         if (!isValidEmail(inputValue)) {
         errorMessage.style.display = 'block';
         errorMessage.textContent = 'Please enter a valid email address.';
         return;
         }
         dataToEncode = 'mailto:' + inputValue;
         } else if (vCardBtn.classList.contains('active')) {
         const name = nameField.value.trim();
         const email = emailField.value.trim();
         const phone = phoneField.value.trim();
         const company = companyField.value.trim();
         const website = websiteField.value.trim();
         const address = addressField.value.trim();
         
         dataToEncode = `BEGIN:VCARD\nVERSION:3.0\nN:${name}\nEMAIL:${email}\nTEL:${phone}\nORG:${company}\nURL:${website}\nADR:${address}\nEND:VCARD`;
         }
         
         if (dataToEncode === '') {
         errorMessage.style.display = 'block';
         errorMessage.textContent = 'Please enter some text, a URL, or an email address.';
         return;
         }
         
         successMessage.style.display = 'none';
         errorMessage.style.display = 'none';
         loadingIcon.style.display = 'inline-block';
         qrCodeContainer.innerHTML = '';
         
         const scale = 20;
         const size = parseInt(sizeRange.value);
         
         const options = {
         scale: scale,
         width: size,
         height: size,
         errorCorrectionLevel: 'H',
         color: {
         dark: foregroundColor,
         light: backgroundColor,
         },
         };
         
         QRCode.toDataURL(dataToEncode, options)
         .then((qrCodeDataURL) => {
         if (logoDataURL) {
         return generateQRCodeWithLogo(qrCodeDataURL, logoDataURL, size);
         } else {
         qrCodeContainer.innerHTML = '';
         const img = new Image();
         img.src = qrCodeDataURL;
         return qrCodeDataURL;
         }
         })
         .then((finalDataURL) => {
         loadingIcon.style.display = 'none';
         successMessage.style.display = 'block';
         successMessage.textContent = 'QR Code generated successfully!';
         
         const img = new Image();
         img.src = finalDataURL;
         qrCodeContainer.appendChild(img);
         })
         .catch((error) => {
         loadingIcon.style.display = 'none';
         errorMessage.style.display = 'block';
         errorMessage.textContent = 'Error generating QR Code: ' + error;
         });
         
         savePngButton.style.display = 'inline-block';
         saveSvgButton.style.display = 'inline-block';
         }
         
         
         
         generateButton.addEventListener('click', () => {
         // Call the generateQRCode function to generate the QR code with the specified colors
         generateQRCode();
         });
         
         
         
         savePngButton.addEventListener('click', () => {
         saveQRCode('png');
         });
         
         saveSvgButton.addEventListener('click', () => {
         saveQRCode('svg');
         });
         textInputBtn.addEventListener('click', () => {
         inputField.style.display = 'block';
         nameField.style.display = 'none';
         emailField.style.display = 'none';
         phoneField.style.display = 'none';
         companyField.style.display = 'none';
         websiteField.style.display = 'none';
         addressField.style.display = 'none';
         inputField.placeholder = 'Enter text...';
         textInputBtn.classList.add('active');
         urlInputBtn.classList.remove('active');
         emailInputBtn.classList.remove('active');
         vCardBtn.classList.remove('active');
         });
         
         urlInputBtn.addEventListener('click', () => {
         inputField.style.display = 'block';
         nameField.style.display = 'none';
         emailField.style.display = 'none';
         phoneField.style.display = 'none';
         companyField.style.display = 'none';
         websiteField.style.display = 'none';
         addressField.style.display = 'none';
         inputField.placeholder = 'Enter URL...';
         urlInputBtn.classList.add('active');
         textInputBtn.classList.remove('active');
         emailInputBtn.classList.remove('active');
         vCardBtn.classList.remove('active');
         });
         
         emailInputBtn.addEventListener('click', () => {
         inputField.style.display = 'block';
         nameField.style.display = 'none';
         emailField.style.display = 'none';
         phoneField.style.display = 'none';
         companyField.style.display = 'none';
         websiteField.style.display = 'none';
         addressField.style.display = 'none';
         inputField.placeholder = 'Enter email...';
         emailInputBtn.classList.add('active');
         textInputBtn.classList.remove('active');
         urlInputBtn.classList.remove('active');
         vCardBtn.classList.remove('active');
         });
         
         saveButton.addEventListener('click', () => {
         const inputValue = inputField.value.trim();
         
         if (inputValue === '') {
         errorMessage.style.display = 'block';
         errorMessage.textContent = 'No QR code generated yet.';
         return;
         }
         
         // Call the generateQRCode function to generate the QR code with the specified colors
         generateQRCode();
         
         // Save the generated QR code from the qrCodeContainer
         const img = qrCodeContainer.querySelector('img');
         if (img) {
         const dataUrl = img.src;
         const a = document.createElement('a');
         a.href = dataUrl;
         a.download = 'qrcode.png';
         document.body.appendChild(a);
         a.click();
         document.body.removeChild(a);
         
         successMessage.style.display = 'block';
         successMessage.textContent = 'QR code saved successfully!';
         } else {
         errorMessage.style.display = 'block';
         errorMessage.textContent = 'Error generating QR Code.';
         }
         });
         
         
         sizeContainer.style.display = 'block';
         });
         function isValidURL(str) {
         const urlPattern = new RegExp(/^(?:\w+:)?\/\/([^\s.]+\.\S{2}|localhost[:?\d]*)\S*$/);
         return urlPattern.test(str);
         }
         
