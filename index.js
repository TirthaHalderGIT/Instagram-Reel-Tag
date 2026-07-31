
let myReels;

try {
    myReels = JSON.parse(localStorage.getItem("myReels")) || [];
} catch {
    myReels = [];
}

const reelInputEl = document.getElementById("reel-input-el");
const tagInputEl = document.getElementById("tag-input-el");
const inputBtn = document.getElementById("input-btn");
const showBtn = document.getElementById("show-btn");
const ulEl = document.getElementById("ul-El");

const searchInputEl = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const tabBtn = document.getElementById("tab-btn");

const menuBtn = document.getElementById("menu-btn");
const menuDropdown = document.getElementById("menu-dropdown");

const exportBtn = document.getElementById("export-btn");
const importBtn = document.getElementById("import-btn");
const importFile = document.getElementById("import-file");
const deleteAllBtn = document.getElementById("delete-all-btn");

// menuBtn.addEventListener("click", function (e) {

//     e.stopPropagation();

//     menuDropdown.classList.toggle("hidden");

// });

menuBtn.addEventListener("click", function () {
    menuDropdown.classList.toggle("hidden");
});

document.addEventListener("click", function (e) {

    if (
        !menuBtn.contains(e.target) &&
        !menuDropdown.contains(e.target)
    ) {
        menuDropdown.classList.add("hidden");
    }

});

exportBtn.addEventListener("click", function () {

    const data = JSON.stringify(myReels, null, 4);

    const blob = new Blob([data], {
        type: "application/json"
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "InstagramReelsBackup.json";

    a.click();

    URL.revokeObjectURL(url);
});

importFile.addEventListener("change", function () {

    const file = importFile.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (event) {

        try {

            const importedReels = JSON.parse(event.target.result);

            let importedCount = 0;

            for (let reel of importedReels) {

                const exists = myReels.some(item =>
                    item.tag === reel.tag
                );

                if (!exists) {
                    myReels.push(reel);
                    importedCount++;
                }
            }

            saveToLocalStorage();

            renderReels(myReels);

            alert(`${importedCount} reel(s) imported successfully.`);

        } catch {

            alert("Invalid backup file.");

        }

        importFile.value = "";
    };

    reader.readAsText(file);

});

importBtn.addEventListener("click", function () {
    importFile.click();
});

deleteAllBtn.addEventListener("click", function () {

    const confirmed = confirm(
        "Are you sure you want to delete all saved reels?\n\nThis action cannot be undone."
    );

    if (!confirmed) return;

    myReels = [];

    saveToLocalStorage();

    renderReels(myReels);

    menuDropdown.classList.add("hidden");

    alert("All saved reels have been deleted.");

});

function saveToLocalStorage() {
    localStorage.setItem("myReels", JSON.stringify(myReels));
}

function renderReels(reels) {
    ulEl.innerHTML = "";

    if (reels.length === 0) {
        ulEl.innerHTML = "<li>No reels found.</li>";
        return;
    }

    for (let reel of reels) {
        ulEl.innerHTML += `
            <li>
                <a href="${reel.link}" target="_blank">
                    ${reel.tag.toUpperCase()}
                </a>
            </li>
        `;
    }
}

inputBtn.addEventListener("click", function () {

    let tag = tagInputEl.value.trim().toLowerCase();
    let link = reelInputEl.value.trim();

    if (tag === "" || link === "") {
        alert("Please fill in both fields.");
        return;
    }

    if (myReels.some(item => item.tag === tag)) {
        alert("This tag already exists!");
        return;
    }

    // Validate URL
    try {
        new URL(link);
    } catch {
        alert("Please enter a valid URL.");
        return;
    }

    myReels.push({
        tag,
        link
    });

    saveToLocalStorage();

    reelInputEl.value = "";
    tagInputEl.value = "";
    ulEl.textContent = "";

    //renderReels(myReels);
});

tabBtn.addEventListener("click", function () {
    const tabs = chrome.tabs.query({
        active: true,
        currentWindow: true
    },function(tabs){
        reelInputEl.value = tabs[0].url;
    });
});

showBtn.addEventListener("click", function () {
    myReels = JSON.parse(localStorage.getItem("myReels")) || [];
    renderReels(myReels);
});

searchBtn.addEventListener("click", function () {

    myReels = JSON.parse(localStorage.getItem("myReels")) || [];

    let searchWords = searchInputEl.value
        .trim()
        .toLowerCase()
        .split(/\s+/)
        .filter(word => word.length > 0);

    if (searchWords.length === 0) {
        searchInputEl.value = "";
        ulEl.innerHTML = "<li>No tag entered.</li>";
        return;
    }
    
    let results = myReels.filter(reel =>
        searchWords.every(word => reel.tag.includes(word))
    );
    searchInputEl.value = ""
    renderReels(results);
});

// Automatically display saved reels when the page loads
//renderReels(myReels);



//TRYMINE

// //let myReels = []
// let myReels = JSON.parse(localStorage.getItem("myReels")) || [];
// const reelInputEl = document.getElementById("reel-input-el")
// const tagInputEl = document.getElementById("tag-input-el")
// const inputBtn = document.getElementById("input-btn")
// const showBtn = document.getElementById("show-btn")
// const ulEl = document.getElementById("ul-El")
// const searchInputEl = document.getElementById("search-input");
// const searchBtn = document.getElementById("search-btn");
// let newSaved = false
// let clickedSave = false


// function renderReels(reels) {
//     ulEl.innerHTML = "";

//     if (reels.length === 0) {
//         ulEl.innerHTML = "<li>No reels found.</li>";
//         return;
//     }

//     for (let reel of reels) {
//         ulEl.innerHTML += `
//             <li>
//                 <a href="${reel.link}" target="_blank">
//                     ${reel.tag.toUpperCase()}
//                 </a>
//             </li>
//         `;
//     }
// }

// inputBtn.addEventListener("click", function() {
//     //let obj = {tag: tagInputEl.value, link: reelInputEl.value};
//     let tag = tagInputEl.value.trim().toLowerCase();
//     let reel = reelInputEl.value.trim();
//     if (myReels.some(reel => reel.tag === tag)) {
//         alert("This tag already exists!");
//         return;
//     }
//     if (tagInputEl.value !== "" || reelInputEl.value !==""){
//         //myReels.push(tagInputEl.value + " : " + reelInputEl.value)
//         myReels.push({
//             tag: tag,
//             link: reel
//         });
//     }
//     localStorage.setItem("myReels", JSON.stringify(myReels))
//     console.log(myReels)
//     newSaved = true
//     reelInputEl.value = ""
//     tagInputEl.value = ""
//     ulEl.textContent = ""
// })


// // showBtn.addEventListener("click", function () {
// //     ulEl.innerHTML = "";

// //     for (let reel of myReels) {
// //         ulEl.innerHTML += `
// //             <li>
// //                 <a href="${reel.link}" target="_blank">
// //                     ${reel.tag.toUpperCase()}
// //                 </a>
// //             </li>
// //         `;
// //     }

// //     newSaved = false;
// //     clickedSave = true;
// // });

// showBtn.addEventListener("click", function () {
//     myReels = JSON.parse(localStorage.getItem("myReels")) || [];
//     renderReels(myReels);
// });

// // searchBtn.addEventListener("click", function () {
// //     let searchText = searchInputEl.value.trim().toLowerCase();
// //     let searchWords = searchText.split(/\s+/);

// //     ulEl.innerHTML = "";

// //     // let results = myReels.filter(reel =>
// //     //     reel.tag.includes(searchText)
// //     // );
// //     let results = myReels.filter(reel =>
// //         searchWords.every(word => reel.tag.includes(word))
// //     );

// //     if (results.length === 0) {
// //         ulEl.innerHTML = "<li>No reels found.</li>";
// //         return;
// //     }

// //     for (let reel of results) {
// //         ulEl.innerHTML += `
// //             <li>
// //                 <a href="${reel.link}" target="_blank">
// //                     ${reel.tag.toUpperCase()}
// //                 </a>
// //             </li>
// //         `;
// //     }
// // });

// searchBtn.addEventListener("click", function () {

//     myReels = JSON.parse(localStorage.getItem("myReels")) || [];

//     let searchWords = searchInputEl.value
//         .trim()
//         .toLowerCase()
//         .split(/\s+/)
//         .filter(word => word.length > 0);

//     let results = myReels.filter(reel =>
//         searchWords.every(word => reel.tag.includes(word))
//     );

//     renderReels(results);
// });
