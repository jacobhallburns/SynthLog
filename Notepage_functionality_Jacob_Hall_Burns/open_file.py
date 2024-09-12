import tkinter
from tkinter import filedialog
import file_dialog

def open_file_cmd():
   file = file_dialog.file_dialog_cmd()
   print(file)