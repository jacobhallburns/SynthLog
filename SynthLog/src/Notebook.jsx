import React, { useState, useEffect } from 'react';
import { readDir, readTextFile, writeTextFile } from '@tauri-apps/plugin-fs';
import { open } from '@tauri-apps/plugin-dialog';
import { useNavigate } from 'react-router-dom';

function Notebook() {
  const [files, setFiles] = useState([]);
  const [filteredFiles, setFilteredFiles] = useState([]);
  const [currentFile, setCurrentFile] = useState('');
  const [content, setContent] = useState('');
  const [notesDir, setNotesDir] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // Let the user select a directory for notes using the dialog plugin
  const chooseNotesDirectory = async () => {
    try {
      const selectedDir = await open({
        directory: true,
        multiple: false,
        title: 'Select a directory to save your notes',
      });
      if (selectedDir) {
        setNotesDir(selectedDir);
        await loadFiles(selectedDir);
      }
    } catch (error) {
      console.error('Error selecting notes directory:', error);
    }
  };

  // Load files from the selected directory using the fs plugin
  const loadFiles = async (dir) => {
    try {
      const entries = await readDir(dir, { recursive: false }); // calls to the list_files command in main.rs
      const fileNames = entries.map((entry) => entry.name);
      setFiles(fileNames); // Extract file names
      setFilteredFiles(fileNames); // Initialize filtered list
    } catch (error) {
      console.error('Error reading directory:', error);
    }
  };

  // Open a specific file and load its content into the editor
  const openFile = async (fileName) => {
    try {
      const filePath = `${notesDir}/${fileName}`;
      const fileContent = await readTextFile(filePath);
      setCurrentFile(filePath);
      setContent(fileContent);
    } catch (error) {
      console.error('Error reading file:', error);
    }
  };

  // Create a new file and open it in the editor
  const createNewFile = async () => {
    const newFileName = prompt('Enter a name for the new note:');
    if (!newFileName) {
      alert('Creation canceled: no name provided.');
      return;
    }
    const filePath = `${notesDir}/${newFileName}.txt`;
    try {
      await writeTextFile(filePath, ''); // Create an empty file
      setFiles((prevFiles) => [...prevFiles, `${newFileName}.txt`]);
      setFilteredFiles((prevFiles) => [...prevFiles, `${newFileName}.txt`]);
      openFile(`${newFileName}.txt`); // Automatically open the new file
    } catch (error) {
      console.error('Error creating file:', error);
    }
  };

  // Save the current file or prompt for a new one
  const saveFile = async () => {
    try {
      if (!currentFile) {
        alert('No file is currently open.');
        return;
      }
      await writeTextFile(currentFile, content); // Save the content to the current file
      alert('File saved successfully!');
    } catch (error) {
      console.error('Error saving file:', error);
    }
  };

  // Filter files based on search query
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredFiles(files.filter((file) => file.toLowerCase().includes(query)));
  };

  useEffect(() => {
    if (!notesDir) {
      chooseNotesDirectory();
    }
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Notebook</h1>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <button onClick={() => navigate(-1)}>Back</button>
        <button onClick={chooseNotesDirectory}>Change Directory</button>
      </div>
      {notesDir ? (
        <div style={{ display: 'flex' }}>
          {/* Sidebar with scrollable file list */}
          <div
            style={{
              width: '250px',
              height: '400px',
              overflowY: 'scroll',
              border: '1px solid #ccc',
              padding: '10px',
              marginRight: '20px',
            }}
          >
            <h2>Files</h2>
            <button
              onClick={createNewFile}
              style={{ marginBottom: '10px', width: '100%' }}
            >
              + New File
            </button>
            <input
              type="text"
              placeholder="Search files..."
              value={searchQuery}
              onChange={handleSearch}
              style={{ marginBottom: '10px', width: '100%', padding: '5px' }}
            />
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              {filteredFiles.map((file, index) => (
                <li
                  key={index}
                  onClick={() => openFile(file)}
                  style={{
                    padding: '5px',
                    cursor: 'pointer',
                    borderBottom: '1px solid #ddd',
                  }}
                >
                  {file}
                </li>
              ))}
            </ul>
          </div>

          {/* Editor Section */}
          <div>
            <h2>Editor</h2>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows="20"
              cols="50"
              style={{ width: '100%', height: '350px' }}
            />
            <button onClick={saveFile} style={{ marginTop: '10px' }}>
              Save
            </button>
          </div>
        </div>
      ) : (
        <div>
          <p>Please select a directory to save your notes.</p>
        </div>
      )}
    </div>
  );
}

export default Notebook;
