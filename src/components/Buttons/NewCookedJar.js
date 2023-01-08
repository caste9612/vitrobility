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



export default function NewCookedJarButton(props) {
    let pb = props.pb;

    //Dialog handle
    const [open, setOpen] = React.useState(false);
    const [barcodeValue, setBarcodeValue] = React.useState("");

    let substrates = [{key: '', value: '--Choose an option--'}]
    
    if(props.cookedjars !== []){
        props.cookedjars.forEach(el => {
            if(substrates.find(sub => sub.key === el.substrate)) return
            substrates.push({
                key: el.substrate, value: el.substrate
            })
        });
    }

    const [substrate, setSubstrate] = React.useState(substrates[0].value);
    const [preparationDate, setPreparationDate] = React.useState(new Date());

    const Transition = React.forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = async() => {
        console.log(barcodeValue, substrate, preparationDate)

        const records = await pb.collection('substrates').getFullList(200 /* batch size */, {
            sort: '-created',
        })
        
        const relId = records.find(el => el.name === substrate).id;

        const data = {
            "barcode": barcodeValue,
            "substrate": relId,
            "preparationDate": preparationDate
        };
        
        const record = await pb.collection('cookedjars').create(data);
        handleClose()
    }



    //Date Picker Handle
    const [value, setValue] = React.useState(dayjs());

    return (
        <>
        <IconButton color="primary" className='newCookedJar' size="large" onClick={handleClickOpen}>
            <AddCircleIcon className='icon' />
        </IconButton>
        <Dialog open={open} onClose={handleClose} aria-describedby="alert-dialog-slide-description">
            <DialogTitle>{"Nuovo Substrato"}</DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
                {/* Aggiunta di un nuovo substrato. */}
            </DialogContentText>
            <Stack spacing={3}>

                <Box sx={{ minWidth: 200 }}>
                    <TextField id="outlined-basic" label="Barcode" variant="outlined" value={barcodeValue} onChange={(e) => setBarcodeValue(e.target.value)}/>
                    <IconButton aria-label="fingerprint" color="primary" size="large">
                        <QrCodeScannerIcon variant="outlined"/>
                    </IconButton>
                </Box>

                <LocalizationProvider dateAdapter={AdapterDayjs}>

                    <MobileDatePicker
                        label="Date mobile"
                        inputFormat="MM/DD/YYYY"
                        value={preparationDate}
                        onChange={(e) => setPreparationDate(e)}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>

                <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Substrato</InputLabel>
                        <Select labelId="demo-simple-select-label"
                        id="demo-simple-select" label="Substrato" value={substrate} onChange={(e) => setSubstrate(e.target.value)}>
                        {substrates.map((substrate) => (
                                    <MenuItem key={substrate.key} value={substrate.value}> {substrate.value} </MenuItem>
                                ))}
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







