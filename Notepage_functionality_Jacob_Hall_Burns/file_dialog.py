import tkinter as tk
from tkinter import filedialog

def file_dialog_cmd():
   root = tk.Tk()
   root.withdraw()
   file_path = filedialog.askopenfilename(title="Open File")
   root.destroy()
   return file_path