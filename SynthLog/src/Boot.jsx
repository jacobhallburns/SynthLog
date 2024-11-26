import { useState } from 'react';
import { Button, Menu, MenuItem, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { core } from '@tauri-apps/api';
import { useNavigate  } from 'react-router-dom';
import './Boot.css';

function Boot() {
   const [anchorEl, setAnchorEl] = useState(null);
   const [dialogOpen, setDialogOpen] = useState(false);
   const [notebookName, setNotebookName] = useState('');
   const navigate = useNavigate();

   // Menu Handlers
   const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
   };

   const handleClose = () => {
      setAnchorEl(null);
   };

   // Dialog Handlers
   const handleDialogOpen = () => {
      setDialogOpen(true);
      handleClose();
   };
   
   const handleDialogClose = () => {
      setDialogOpen(false);
      setNotebookName('');
   }

   const handleCreateNotebook = async () => {
      if (!notebookName.trim()) {
        alert("Please enter a notebook name.");
        return;
      }
    
      try {
        console.log("Invoking create_folder with:", notebookName);
        await core.invoke("create_folder", { folderName: notebookName }); // Ensure the parameter name matches Rust
        console.log("Folder creation successful");
        navigate("/notebook", { state: { notebookName } });
      } catch (error) {
        console.error("Error creating notebook:", error); // Log the full error object
        alert(`Failed to create notebook: ${error}`);
      }
    
      handleDialogClose();
    };

   return (
      <div className="AppBackground">
         <div className="ButtonContainer">
         <div>
            <Button 
               variant="contained"
               onClick={handleClick}
               sx={{
                  backgroundColor: '#28a745', 
                  color: 'white', 
                  '&:hover': {
                      backgroundColor: '#218838', 
                  },
              }}
            >
               Open Notebook
            </Button>

            <Menu
               anchorEl={anchorEl}
               open={Boolean(anchorEl)}
               onClose={handleClose}
               sx={{ '& .MuiPaper-root': { backgroundColor: '#28a745', borderRadius: '8px' } }}
            >
               <MenuItem 
                  onClick={handleDialogOpen} 
                  sx={{color: 'white'}}
               >
                     Create New Notebook
               </MenuItem>
               <MenuItem 
                  onClick={handleClose} 
                  sx={{color: 'white'}}
               >
                     Open Notebook
               </MenuItem>
            </Menu>
            </div>
         </div>

         <Dialog open={dialogOpen} onClose = {handleDialogClose}>
            <DialogTitle>Create New Notebook</DialogTitle>
            <DialogContent>
               <TextField
                  autoFocus
                  margin='dense'
                  label="Notebook Name"
                  fullWidth
                  value={notebookName}
                  onChange={(e) => setNotebookName(e.target.value)}
               />
            </DialogContent>
            <DialogActions>
               <Button onClick={handleDialogClose} color='secondary'>
                  Cancel
               </Button> 
               <Button onClick={handleCreateNotebook} color="primary">
                  Create
               </Button>
            </DialogActions>
         </Dialog>       
      </div>
   );
}

export default Boot;
