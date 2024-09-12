import tkinter
import customtkinter

# System Settings
customtkinter.set_appearance_mode("System")
customtkinter.set_default_color_theme("blue")

# Our app frame
app = customtkinter.CTk()
app.geometry("720x480")
app.title("Note Book")

# Button test
def button_event():
   label.configure(text="Pressed")
# makes button
button = customtkinter.CTkButton(app, text="Button", command=button_event)
button.pack(pady=80)
# makes label when button is pressedS
label = customtkinter.CTkLabel(app, text="")
label.pack(pady=20)


# Run app until closed
app.mainloop()