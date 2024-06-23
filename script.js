window.onload = loadNotes;

function addNote() {
    var noteInput = document.getElementById("noteInput");
    var noteText = noteInput.value.trim();
    if (noteText !== "") {
        var noteList = document.getElementById("noteList");
        var listItem = document.createElement("li");
        listItem.className = "noteItem";
        
        // Title (extracted from first line of note)
        var noteLines = noteText.split('\n');
        var noteTitle = noteLines[0].trim();
        var noteContent = noteLines.slice(1).join('\n').trim();

        // Checkbox
        var checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "checkbox"; // Apply checkbox class
        listItem.appendChild(checkbox);
        
        // Note title
        var titleNode = document.createElement("h3");
        titleNode.textContent = noteTitle;
        listItem.appendChild(titleNode);

        // Note text
        var noteTextNode = document.createElement("p");
        noteTextNode.textContent = noteContent;
        listItem.appendChild(noteTextNode);

        // Timestamp
        var timestamp = new Date().toLocaleString();
        var timestampNode = document.createElement("span");
        timestampNode.textContent = timestamp;
        timestampNode.className = "timestamp"; // Apply timestamp class
        listItem.appendChild(timestampNode);

        // Edit button
        var editButton = document.createElement("button");
        editButton.textContent = "Редагувати";
        editButton.className = "editButton"; // Apply editButton class
        editButton.onclick = function() {
            editNoteItem(listItem);
        };
        listItem.appendChild(editButton);

        // Delete button
        var deleteButton = document.createElement("button");
        deleteButton.textContent = "Видалити";
        deleteButton.className = "deleteButton"; // Apply deleteButton class
        deleteButton.onclick = function() {
            listItem.remove();
            saveNotes();
        };
        listItem.appendChild(deleteButton);
        
        noteList.appendChild(listItem);
        noteInput.value = "";
        saveNotes();
    } else {
        alert("Будь ласка, введіть текст нотатки!");
    }
}



function deleteCheckedNotes() {
    var noteList = document.getElementById("noteList");
    var checkedItems = noteList.querySelectorAll('input[type="checkbox"]:checked');
    checkedItems.forEach(function(item) {
        item.parentNode.remove();
    });
    saveNotes();
}

function editNoteItem(item) {
    var newTitle = prompt("Введіть новий текст для нотатки:", item.querySelector('h3').textContent);
    if (newTitle !== null && newTitle !== "" ) {
        item.querySelector('h3').textContent = newTitle;
        saveNotes();
    }
}

function archiveNoteItem(item) {
    item.classList.toggle('archived');
    saveNotes();
}

function deleteArchivedNotes() {
    var noteList = document.getElementById("noteList");
    var archivedItems = noteList.querySelectorAll('.archived');
    archivedItems.forEach(function(item) {
        item.remove();
    });
    saveNotes();
}

function saveNotes() {
    var noteList = document.getElementById("noteList");
    var notes = [];
    noteList.querySelectorAll('.noteItem').forEach(function(item) {
        var note = {
            title: item.querySelector('h3').textContent,
            content: item.querySelector('p').textContent,
            timestamp: item.querySelector('span').textContent
        };
        notes.push(note);
    });
    localStorage.setItem('notes', JSON.stringify(notes));
}

function loadNotes() {
    var noteList = document.getElementById("noteList");
    var notes = JSON.parse(localStorage.getItem('notes'));
    if (notes) {
        notes.forEach(function(note) {
            var listItem = document.createElement("li");
            listItem.className = "noteItem";
            
            var titleNode = document.createElement("h3");
            titleNode.textContent = note.title;
            listItem.appendChild(titleNode);

            var noteTextNode = document.createElement("p");
            noteTextNode.textContent = note.content;
            listItem.appendChild(noteTextNode);

            var timestampNode = document.createElement("span");
            timestampNode.textContent = note.timestamp;
            listItem.appendChild(timestampNode);

            var editButton = document.createElement("button");
            editButton.textContent = "Редагувати";
            editButton.onclick = function() {
                editNoteItem(listItem);
            };
            listItem.appendChild(editButton);

            listItem.addEventListener('dblclick', function() {
                archiveNoteItem(listItem);
            });

            noteList.appendChild(listItem);
        });
    }
}
function deleteAllNotes() {
    var noteList = document.getElementById("noteList");
    // Видалення всіх елементів списку нотаток
    while (noteList.firstChild) {
        noteList.removeChild(noteList.firstChild);
    }
    // Очистка localStorage
    localStorage.removeItem('notes');
}

