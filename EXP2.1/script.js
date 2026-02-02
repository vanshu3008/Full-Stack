const textInput = document.getElementById("textInput");
const counter = document.getElementById("counter");
const maxLimit = 150;

textInput.addEventListener("input", () => {
    counter.textContent = `${textInput.value.length}/${maxLimit}`;
});
