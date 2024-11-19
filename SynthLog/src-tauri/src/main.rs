// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use std::fs;
#[tauri::command]
fn create_folder(folder_name: String) -> Result<(), String> {
  let base_path = "./notebooks";
  let folder_path = format!("{}{}", base_path, folder_name);

  if let Err(e) = fs::create_dir_all(&folder_path) {
    return Err(format!("Failed to create folder: {}", e));
  }
  Ok(())
}

fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![create_folder])
    .run(tauri::generate_context!())
    .expect("error while running Tauri application")
  // app_lib::run();
}
