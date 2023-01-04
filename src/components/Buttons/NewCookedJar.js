import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import './NewCookedJar.css'

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Stack from '@mui/material/Stack';


import TextField from '@mui/material/TextField';

import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from 'dayjs';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';



export default function NewCookedJarButton() {

    //Dialog handle
    const [open, setOpen] = React.useState(false)

    const Transition = React.forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {

    }

    //Date Picker Handle
    const [value, setValue] = React.useState(dayjs());

    const handleDateChange = (newValue) => {
      setValue(newValue);
    };

    //Substrate selection handle
    const [age, setAge] = React.useState('');

    const handleSubstrateChange = (event) => {
      setAge(event.target.value);
    };

    return (
        <>
        <IconButton color="primary" className='newCookedJar' size="large" onClick={handleClickOpen}>
            <AddCircleIcon className='icon' />
        </IconButton>
        <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle>{"Nuovo Substrato"}</DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
                {/* Aggiunta di un nuovo substrato. */}
            </DialogContentText>
            <Stack spacing={3}>

                <Box sx={{ minWidth: 120 }}>
                    <TextField id="outlined-basic" label="Barcode" variant="outlined" />
                    <IconButton aria-label="fingerprint" color="primary" size="large">
                        <QrCodeScannerIcon variant="outlined"/>
                    </IconButton>
                </Box>

                <LocalizationProvider dateAdapter={AdapterDayjs}>

                    <MobileDatePicker
                    label="Date mobile"
                    inputFormat="MM/DD/YYYY"
                    value={value}
                    onChange={handleDateChange}
                    renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>

                <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Substrato</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={age}
                        label="Substrato"
                        onChange={handleSubstrateChange}
                        >
                        <MenuItem value={1}>N1</MenuItem>
                        <MenuItem value={2}>N2</MenuItem>
                        <MenuItem value={3}>N3</MenuItem>
                        <MenuItem value={4}>N4</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </Stack>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSave}>Save</Button>
            </DialogActions>
        </Dialog>
        </>
    );
  }







