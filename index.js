// hljs.configure({
//     noHighlightRe: /^do-not-highlightme$/i,
//     languageDetectRe: /\bgrammar-([\w-]+)\b/i, // for `grammar-swift` style CSS naming
//     classPrefix: ''     // don't append class prefix
//                         // … other options aren't changed
// });
document.getElementById("button-parse").addEventListener("click", hl)
document.getElementById("textarea").focus()

// copy event
document.getElementById("button-copy").addEventListener("click", copyCode)
document.getElementById('textarea').addEventListener('change', function () {
    hl()
    copyCode()
})
document.getElementById("textarea").addEventListener("focusout", function () {
    hl()
    copyCode()
})

function copyCode() {
    var codeEle = document.getElementById('mycode');
    const selection = window.getSelection();
    // Save the current selection
    const currentRange = selection.rangeCount === 0
        ? null : selection.getRangeAt(0);

    // Select the text content of code element
    const range = document.createRange();
    range.selectNodeContents(codeEle);
    selection.removeAllRanges();
    selection.addRange(range);

    // Copy to the clipboard
    try {
        document.execCommand('copy');
        document.getElementById("copiedNotice").innerHTML = 'Copied';
    } catch (err) {
        // Unable to copy
        document.getElementById("copiedNotice").innerHTML = 'Copy';
    } finally {
        // Restore the previous selection
        selection.removeAllRanges();
        currentRange && selection.addRange(currentRange);
    }
}
        document.addEventListener('DOMContentLoaded', (event) => {
            hl()
            copyCode()
});


function hl() {
    var code = document.getElementById("textarea").value
    console.log(code)
    // escape html https://stackoverflow.com/a/45285331
    code = code.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
    var codeEle = document.getElementById('mycode');
    // codeEle.appendChild(document.createTextNode(code))
    codeEle.style.whiteSpace = "pre"
    codeEle.innerHTML = code
    hljs.highlightElement(codeEle);
}