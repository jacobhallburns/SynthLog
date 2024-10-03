import tkinter
import customtkinter
from CTkMenuBar import *
from folder_funct import new_folder

# System Settings
customtkinter.set_appearance_mode("System")
customtkinter.set_default_color_theme("blue")
# Our app frame
app = customtkinter.CTk()
app.geometry("720x480")
app.title("SynthLog")
# tool bar
menu = CTkTitleMenu(app, x_offset=130)
app.menu = menu
button_1 = menu.add_cascade("Folder")
button_2 = menu.add_cascade("File")
# File Dropdown for File
dropdown2 = CustomDropdownMenu(widget=button_2)
dropdown2.add_option(option="New")
dropdown2.add_separator()
dropdown2.add_option(option="Open")
dropdown2.add_separator()
sub_menu1 = dropdown2.add_submenu("Save")
sub_menu1.add_option(option="Save")
sub_menu1.add_option(option="Save As...")
sub_menu1.add_option(option="Save As A Copy...")
dropdown2.add_separator()
sub_menu2 = dropdown2.add_submenu("Export As")
sub_menu2.add_option(option=".TXT")
sub_menu2.add_option(option=".PDF")

# Dropdown for Folder
dropdown = CustomDropdownMenu(widget=button_1)
dropdown.add_option(option="New", command=lambda: new_folder(menu))
dropdown.add_separator()
dropdown.add_option(option="Open")

# Run app until closed
app.mainloop()
