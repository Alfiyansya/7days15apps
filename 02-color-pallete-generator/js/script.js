const generateBtn = document.getElementById("generate-btn");
const paletteContainer = document.querySelector(".palette-container");
const copyBtn = document.querySelector(".copy-btn");

generateBtn.addEventListener('click', generatePalette);

paletteContainer.addEventListener('click', function(e) {
    if(e.target.classList.contains("copy-btn")){
        const hexValue = e.target.previousElementSibling.textContent;
        
        navigator.clipboard
        .writeText(hexValue)
        .then(()=> showCopySuccess(e.target))
        .catch((err) => console.log(err)) ;

    } else if(e.target.classList.contains("color")){
        const hexValue = e.target.nextElementSibling.querySelector(".hex-value").textContent;
        navigator.clipboard
        .writeText(hexValue)
        .then(()=> showCopySuccess(e.target.nexElementSibling.querySelector(".copy-btn")))
        .catch((err) => console.log(err));

    }
});

function showCopySuccess(element) {
    element.classList.remove("far","fa-copy");
    element.classList.add("fas", "fa-check");
    element.style.color = "#4CAF50"; // Green color for success

    setTimeout(() => {
        element.classList.remove("fas", "fa-check");
        element.classList.add("far", "fa-copy");
        element.style.color = ""; // Reset color    
    },1500);
}
function generatePalette() {
    const colors = [];
    for (let i = 0; i < 5; i++){
        colors.push(generateRandomColor());
    }

    updatePaletteDisplay(colors);

}

// generapPalette();

function generateRandomColor() {
    const letter = '0123456789ABCDEF';
    let color = '#';

    for (let i = 0; i < 6; i++) {
        color += letter[Math.floor(Math.random() * 16)];
    }
    return color;
}
function updatePaletteDisplay(colors){
    const colorBox = document.querySelectorAll(".color-box");
    colorBox.forEach((box, index) => {
        const color = colors[index];
        const colorDiv = box.querySelector(".color");
        const hexValue = box.querySelector(".hex-value");

        colorDiv.style.backgroundColor = color;
        hexValue.textContent = color;

    })
}