import tkinter
from tkinter import filedialog

def file_dialog_cmd():
   root = tkinter.Tk()
   root.withdraw()
   file_path = filedialog.askopenfilename(title="Open File")
   root.destroy()
   return file_path