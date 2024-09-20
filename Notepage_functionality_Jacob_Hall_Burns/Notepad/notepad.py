import os
import tkinter as tk
import tkinter.scrolledtext as scrolledtext
from tkinter import filedialog
from tkinter import messagebox

root = tk.Tk()
root.title("SynthLog")
root.geometry("600x400")

text_box = tk.Text(root, font=("Helvetica", 12))
text_box.pack(fill="both", expand=True)

def open_file():
   file_path = filedialog.askopenfilename(defaultextension=".txt", filetypes=[("Text Files", "*.txt"), ("All Files", ".")])
   if file_path:
      with open(file_path, "r") as file:
         text_box.delete("1.0", tk.END)
         text_box.insert("1.0", file.read())
         
