# File-Operator

A system to operate files. You will get an enrty root folder and create file or folder within it.

# get started

```bash
yarn
yarn start
```

# Features

- User Requirements

  - File Operations:
    - [x] When the user accesses for the first time, there will be a root folder. This
          folder cannot be copied, cut, or deleted, but it can be renamed.
    - [x] Users can create new files or folders in any folder. The newly created txt,
          js, ts, and json files should have valid initial content, which is not limited
          (e.g., the initial content of a txt file can be set as &quot;test&quot;). The content of
          other new files is empty.
    - [x] Users can delete files or folders.
    - [x] Users can rename files or folders.
    - [x] Users can copy, cut, and paste files or folders.
    - [x] The state of folders and files created by the user will be restored upon
          their next visit.
    - [x] Search feature with a search bar where users can search for files and
          folders by name.
  - File Browsing:
    - [x] Supports at least the following file types: txt, js, ts, json.
    - [x] txt, js, ts, json, and other text files can be directly viewed on the right side
          of the browser. If there&#39;s syntax highlighting, it&#39;s even better.
    - [x] Other files will not be displayed in the browser.

- Technical Requirements:

  - [x] Use Redux or other equivalent state management frameworks to manage and
        store the state of the file browser.
  - [x] Files are stored in localstorage or indexedb or other local storage methods, so
        that the previous editing progress can be restored the next time it is opened.

- UI Requirements:
  - [x] No hard restriction on the UI, it can look like a simplified code editor (see the
        image below).

# Tech stack
