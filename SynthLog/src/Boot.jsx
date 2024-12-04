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
   
   const handleDialogClose = () => {
      setDialogOpen(false);
      setNotebookName('');
   }
   const handleSketchpad = () => {
      navigate("/Sketchpad")
   }
   const handleNotebook = async () => {
      navigate("/Notebook")
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
               Create
            </Button>

            <Menu
               anchorEl={anchorEl}
               open={Boolean(anchorEl)}
               onClose={handleClose}
               sx={{ '& .MuiPaper-root': { backgroundColor: '#28a745', borderRadius: '8px' } }}
            >
               <MenuItem 
                  onClick={handleNotebook} 
                  sx={{color: 'white'}}
               >
                     Notebook
               </MenuItem>
               <MenuItem 
                  onClick={handleSketchpad} 
                  sx={{color: 'white'}}
               >
                     Sketchpad
               </MenuItem>
            </Menu>
            </div>
         </div>

            
      </div>
   );
}

export default Boot;
