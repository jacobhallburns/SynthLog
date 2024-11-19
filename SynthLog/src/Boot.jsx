import { useState } from 'react';
import { Button, Menu, MenuItem, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import synthlogLogo from './assets/SynthLog.png';
import { invoke } from '@tauri-apps/api';
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
         alert('{lease enter a notebook name.');
         return;
      }

      try{
         // Rust Backend
         await invoke('create_folder', {folderName: notebookName});
         // Navigate to the new page w/ notebook name as state
         navigate('/notebook', { state: { notebookName } });
      } catch (error) {
         console.error('Error creating notebook:', error);
         alert('Failed to create notebook.');
      }
      handleDialogClose();
   };

   return (
      <>
         <div>
            <img src={synthlogLogo} alt="SynthLog Logo" className="SynthLogLogo"/>
         </div>
         <div>
            <Button 
               variant="contained"
               onClick={handleClick}
            >
               Open Notebook
            </Button>

            <Menu
               anchorEl={anchorEl}
               open={Boolean(anchorEl)}
               onClose={handleClose}
               sx={{ '& .MuiPaper-root': { backgroundColor: '#2f5994', borderRadius: '8px' } }}
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
      </>
   );
}

export default Boot;