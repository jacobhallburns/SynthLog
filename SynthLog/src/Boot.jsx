import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import synthlogLogo from './assets/SynthLog.png'
import './Boot.css'
import { useState } from 'react';

function Boot() {
   const [anchorEl, setAnchorEl] = useState(null);

   const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
   };
   const handleClose = () => {
      setAnchorEl(null);
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
                  onClick={handleClose} 
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
      </>
   )
}

export default Boot