# File-Operator

A system to operate files. You will get an enrty root folder and create file or folder within it.

# Browse tree

# Add file/ folder

# Rename file/folder

# Delete file/ folder

# Undo

# Redo

# technical stack

## @reduxjs/toolkit

redux

## store2

To access localStorage in a friendly feature-filled way.

# Requirements

- User Requirements

  - File Operations:
    - When the user accesses for the first time, there will be a root folder. This
      folder cannot be copied, cut, or deleted, but it can be renamed.
    - Users can create new files or folders in any folder. The newly created txt,
      js, ts, and json files should have valid initial content, which is not limited
      (e.g., the initial content of a txt file can be set as &quot;test&quot;). The content of
      other new files is empty.
    - Users can delete files or folders.
    - Users can rename files or folders.
    - Users can copy, cut, and paste files or folders.
    - The state of folders and files created by the user will be restored upon
      their next visit.
    - Search feature with a search bar where users can search for files and
      folders by name.
  - File Browsing:
    - Supports at least the following file types: txt, js, ts, json.
    - txt, js, ts, json, and other text files can be directly viewed on the right side
      of the browser. If there&#39;s syntax highlighting, it&#39;s even better.
    - Other files will not be displayed in the browser.

- Technical Requirements:

  - Use Redux or other equivalent state management frameworks to manage and
    store the state of the file browser.
  - Files are stored in localstorage or indexedb or other local storage methods, so
    that the previous editing progress can be restored the next time it is opened.

- UI Requirements:
  - No hard restriction on the UI, it can look like a simplified code editor (see the
    image below).
