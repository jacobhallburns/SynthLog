// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::fs;
use std::io::Write;
use tauri::command;
use tauri_plugin_fs::init;

#[command]
fn create_file(file_path: String) -> Result<(), String> {
    fs::File::create(&file_path).map_err(|e| e.to_string())?;
    Ok(())
}

#[command]
fn read_file(file_path: String) -> Result<String, String> {
    fs::read_to_string(&file_path).map_err(|e| e.to_string())
}

#[command]
fn write_file(file_path: String, content: String) -> Result<(), String> {
    let mut file = fs::File::create(&file_path).map_err(|e| e.to_string())?;
    file.write_all(content.as_bytes())
        .map_err(|e| e.to_string())
}

#[command]
fn list_files(dir_path: String) -> Result<Vec<String>, String> {
    let paths = fs::read_dir(dir_path).map_err(|e| e.to_string())?;
    let mut files = vec![];
    for path in paths {
        files.push(
            path.map_err(|e| e.to_string())?
                .path()
                .display()
                .to_string(),
        );
    }
    Ok(files)
}

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_fs::init())
        .invoke_handler(tauri::generate_handler![
            create_file,
            read_file,
            write_file,
            list_files
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
