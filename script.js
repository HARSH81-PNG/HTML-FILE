const qrText = document.getElementById("qrText");
const generateBtn = document.getElementById("generateBtn");
const qrCode = document.getElementById("qrCode");
const downloadBtn = document.getElementById("downloadBtn");
const clearBtn = document.getElementById("clearBtn");

let qrImage = null;

// Generate QR Code
generateBtn.addEventListener("click", function () {
    

    const text = qrText.value.trim();

    if (text === "") {
        alert("Please enter some text or a URL!");
        return;
    }

    qrCode.innerHTML = "";
    downloadBtn.hidden = true;
    qrImage = null;

    const image = document.createElement("img");

    image.alt = "Generated QR Code";
    image.width = 220;
    image.height = 220;

    image.onload = function () {
        qrCode.appendChild(image);
        qrImage = image;
        downloadBtn.hidden = false;
    };

    image.onerror = function () {
        qrCode.innerHTML = "";
        alert("QR code generate nahi hua. Internet connection check karo.");
    };

    const encodedText = encodeURIComponent(text);

    image.src =
        "https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=" +
        encodedText;
});
// Generate QR Code using Enter Key
qrText.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        generateBtn.click();
    }
});

// Download QR Code
downloadBtn.addEventListener("click", function () {

    if (!qrImage) {
        alert("Please generate a QR code first!");
        return;
    }

    const link = document.createElement("a");
    link.href = qrImage.src;
    link.download = "my-qr-code.png";

    document.body.appendChild(link);
    link.click();
    link.remove();
});

// Clear All
clearBtn.addEventListener("click", function () {

    qrText.value = "";
    qrCode.innerHTML = "";
    qrImage = null;
    downloadBtn.hidden = true;

});