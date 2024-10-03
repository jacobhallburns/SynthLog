import tkinter
from tkinter import simpledialog, Menu
import customtkinter
from CTkMenuBar import *


folders = []

def new_folder(menu):
    folderName = simpledialog.askstring("Folder", "Choose name for new Folder:")
    if folderName:
        folders.append(folderName)

        foldbutton = menu.add_cascade(folderName)
        dropdown = CustomDropdownMenu(widget=foldbutton)
        dropdown.add_option(option="New Note", command=lambda: add_note(dropdown))

def add_note(dropdown):
    noteName = simpledialog.askstring("Note", "Choose name for new Note:")
    if noteName:
        dropdown.add_option(option=noteName)