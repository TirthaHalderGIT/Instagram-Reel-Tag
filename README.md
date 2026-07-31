# Instagram Reel Tag

A lightweight Chrome Extension that lets you save Instagram Reels with custom tags, making it easy to organize, search, and revisit your favorite reels anytime.

## Features

- 🔖 Save the current Instagram Reel with a custom tag
- 🔍 Search reels using one or multiple tag keywords
- 📂 Display all saved reels
- 💾 Export your saved reels as a JSON backup
- 📥 Import previously exported backups
- 🚫 Automatically skips duplicate tags during import
- 🗑 Delete all saved reels with confirmation
- 💾 Data is stored locally using the browser's Local Storage
- 🎨 Clean and modern popup interface with a three-dot options menu

---

## Screenshots

> Add screenshots of your extension here.

Example:

```
/screenshots/home.png
/screenshots/menu.png
/screenshots/search.png
```

---

## Installation

1. Clone this repository.

```bash
git clone https://github.com/<your-username>/Instagram-Reel-Tag.git
```

or download it as a ZIP.

2. Open Chrome and navigate to:

```
chrome://extensions
```

3. Enable **Developer Mode**.

4. Click **Load unpacked**.

5. Select the project folder.

6. Pin the extension from the Extensions menu.

---

## How to Use

### Save a Reel

- Open an Instagram Reel.
- Click **Save Tab** to automatically capture the current Reel URL.
- Enter a custom tag.
- Click **Save**.

### View Saved Reels

Click **Show Saved** to display every saved reel.

### Search

Enter one or more words in the search box.

Example:

```
football messi
```

will match tags like:

- football messi
- messi football edits
- best football goals messi

### Export

Open the **⋮** menu and select **Export**.

Your saved reels will be downloaded as a JSON file.

### Import

Open the **⋮** menu and select **Import**.

Choose a previously exported JSON file.

- Existing reels remain intact.
- New reels are added.
- Duplicate tags are skipped automatically.

### Delete All

Open the **⋮** menu and choose **Delete All** to clear all saved reels.

---

## Tech Stack

- HTML5
- CSS3
- JavaScript (ES6)
- Chrome Extension Manifest V3
- Local Storage API

---

## Project Structure

```
Instagram-Reel-Tag/
│
├── manifest.json
├── index.html
├── index.css
├── index.js
├── icon.png
└── README.md
```

---

## Storage Format

The extension stores reels as JSON objects.

Example:

```json
[
    {
        "tag": "football edits",
        "link": "https://www.instagram.com/reel/xxxxxxxx/"
    },
    {
        "tag": "travel paris",
        "link": "https://www.instagram.com/reel/yyyyyyyy/"
    }
]
```

---

## Future Improvements

- ⭐ Favorite reels
- 📝 Edit existing tags
- 🗂 Categories or folders
- ☁ Cloud synchronization
- 📸 Thumbnail previews
- 📊 Sorting options
- 🌙 Dark/Light mode
- 🔗 Detect Instagram Reels automatically

---

## Author

**Tirtha Halder**

GitHub: https://github.com/<your-username>

---

## License

This project is licensed under the MIT License.

© Tirtha Halder
