import * as React from 'react';
import Link from '@mui/material/Link';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Axios from 'axios';
import { Navigate, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSlotProps } from '@mui/base';
import { Dayjs } from 'dayjs';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Logo from '../Logo.png';
import EventIcon from '@mui/icons-material/Event';

function preventDefault(event) {
    event.preventDefault();
}

export default function Orders(props) {
    const box = [];
    const { state } = useLocation();
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [numReservableItems, setNumReservableItems] = useState([]);
    const [nameArray, setNameArray] = useState([]);
    const [minArray, setMinArray] = useState([]);
    const [maxArray, setMaxArray] = useState([]);
    const [availableArray, setAvailableArray] = useState([]);
    const [priceArray, setPriceArray] = useState([]);
    const [total, setTotal] = useState(0);
    const [numPeople, setNumPeople] = useState([]);
    const [maxNumPeople, setMaxNumPeople] = useState([]);
    const [availableNumPeople, setAvailableNumPeople] = useState([]);
    const [numArray, setNumArray] = useState([]);
    const [reservationID, setReservationID] = useState(null);
    const businessName = state.businessName;
    const navigate = useNavigate();
    const [currentDate, setCurrentDate] = useState(null);
    const [openTime, setOpenTime] = useState(Dayjs | null);
    const [closeTime, setCloseTime] = useState(Dayjs | null);
    const [closed, setClosed] = useState('');
    const [MAXSTRING, setMAXSTRING] = useState(null);
    
    useEffect(() => {
        insertValues();
    }, [])

    function updateMaxString(availableNumPeople, nameArray, availableArray) {
        var string = `Max Party Size: ${availableNumPeople}`

        for (let i = 0; i < nameArray.length; i++) {
            string += `, Max ${nameArray[i]}: ${availableArray[i]}`; 
        }

        setMAXSTRING(string);
    }

    function timeDiff(start, end) {
        var arg1 = new Date(start);
        var arg2 = new Date(end);
        arg1.setDate((new Date(currentDate)).getDate());
        arg2.setDate((new Date(currentDate)).getDate());
        return arg1.getTime() - arg2.getTime();
    }

    function getConcurrent(date, start, end, maxNumPeople, maxArray, nameArray) {
        if (date == null || maxArray == null) {
            return;
        }
        var stringdate = "";
        console.log(new String(date));
        if (date.$M) {
            var valArr = (new String(date)).split(" ");
            if (date.$M + 1 < 10) {
                stringdate = `${date.$y}-0${date.$M + 1}-${valArr[1]}`
            } else {
                stringdate = `${date.$y}-${date.$M + 1}-${valArr[1]}`
            }
        } else if (new String(date).includes("00:00:00")) {
            var valArr = (new String(date)).split(" ");
            if (new Date(date).getMonth() + 1 < 10) {
                stringdate = `${new Date(date).getFullYear()}-0${new Date(date).getMonth() + 1}-${valArr[2]}`
            } else {
                stringdate = `${new Date(date).getFullYear()}-${new Date(date).getMonth() + 1}-${valArr[2]}`
            }
            console.log(stringdate)
        } else {
            var day = date;
            if (new String(date).includes("T")) {
                day = new Date(date);
            } else if (new String(date).includes("00:00:00")) {
                new Date(`${date}T00:00`);
            }
            if (day.getMonth() + 1 < 10) {
                stringdate = `${day.getYear()}-0${day.getMonth() + 1}-`
            } else {
                stringdate = `${day.getFullYear()}-${day.getMonth() + 1}-`
            }
            if (parseInt(day.getDay()) < 10) {
                stringdate = stringdate.concat(`0${day.getDay()}`);
            } else {
                stringdate = stringdate.concat(`${day.getDay()}`);
            }
        }
        Axios.post("http://localhost:3001/api/getMaxAvailable", {
            businessName: businessName,
            date: stringdate
        }).then((result) => {
            if (result.data.err) {
                console.log("There are no reservations that day.");
                setAvailableArray(maxArray);
                setAvailableNumPeople(maxNumPeople);
                updateMaxString(maxNumPeople, nameArray, maxArray);
            } else {
                let people = parseInt(maxNumPeople);
                let available = [...maxArray];
                result = result.data.result;
                for (let i = 0; i < result.length; i++) {
                    if (result[i].isReserved && result[i].ID != reservationID) {
                        if (timeDiff(start, result[i].endTime) > 0 || 
                        timeDiff(end, result[i].startTime) > 0) {
                            var numReservable = result[i].numReservable.split(";");
                            for (let j = 0; j < numReservable.length; j++) {
                                available[j] = available[j] - numReservable[j];
                            }
                            people = people - result[i].numPeople;
                        }
                    }
                }
                setAvailableArray(available);
                setAvailableNumPeople(parseInt(people));
                updateMaxString(people, nameArray, available);
            }
        })
    }

    function calculateTotal(num) {
        var tot = 0;
        for (let i = 0; i < numReservableItems; i++) {
            if (num[i]) {
                tot = tot + parseFloat(priceArray[i]) * num[i];
            }
        }
        setTotal(tot.toFixed(2));
    }

    function insertValues() {
        let ReservedItems = "";
        let maxs = "";
        let maxPeople = 0;
        Axios.post("http://localhost:3001/api/getFacilitysData", {
            businessName: businessName
        }).then((result) => {
            if (result.data.err) {
                alert("Facility data missing!");
            } else {
                // UPDATE NUM OF RESERVABLES
                if (!result.data.result[0].numReservable) {
                    setNumReservableItems(1);
                } else {
                    setNumReservableItems(parseInt(result.data.result[0].numReservable));
    
                    // UPDATE NUM OF RESERVABLES
                    maxPeople = result.data.result[0].numPeople;
                    setMaxNumPeople(maxPeople);
                    setAvailableNumPeople(maxPeople);
    
                    // UPDATE NAMES
                    ReservedItems = String(result.data.result[0].reservableItem).split(";");
                    setNameArray(ReservedItems);
                    
                    // UPDATE PRICES
                    let prices = String(result.data.result[0].prices).split(";");
                    setPriceArray(prices);
    
                    // UPDATE MAXIMUMS
                    maxs = String(result.data.result[0].maxs).split(";");
                    setMaxArray(maxs);
                    setAvailableArray(maxs);
    
                    updateMaxString(maxPeople, ReservedItems, maxs)
    
                    // UPDATE MINIMUMS
                    let mins = String(result.data.result[0].mins).split(";");
                    setMinArray(mins);
    
                    let Sun = result.data.result[0].Sun;
                    let Mon = result.data.result[0].Mon;
                    let Tues = result.data.result[0].Tues;
                    let Wed = result.data.result[0].Wed;
                    let Thurs = result.data.result[0].Thurs;
                    let Fri = result.data.result[0].Fri;
                    let Sat = result.data.result[0].Sat;
                    let full = `${Sun};${Mon};${Tues};${Wed};${Thurs};${Fri};${Sat}`;
                    let val = full.split(';');
                    let closed = [];
                    let open = [];
                    let close = [];
                    for (let i = 0; i < 14; i++) {
                        if (i % 2 === 0) {
                            if (val[i] === 'null') {
                                closed.push(1);
                                open.push(currentDate);
                            } else {
                                closed.push(0);
                                open.push(val[i]);
                            }
                        } else {
                            if (val[i] === 'null') {
                                close.push(currentDate);
                            } else {
                                close.push(val[i]);
                            }
                        }
                    }
                    setClosed(closed);
                    setOpenTime(open);
                    setCloseTime(close);
                }
            }
        })
        if (state.ID) {
            setReservationID(state.ID);
            // getNumArray
            Axios.post("http://localhost:3001/api/getReservation", {
                ID: state.ID
            }).then((result) => {
                // UPDATE numValues
                let numValues = String(result.data.result[0].numReservable).split(";");
                setNumArray(numValues);
                setNumPeople(result.data.result[0].numPeople);
                setStartTime(result.data.result[0].startTime);
                var date = new Date(`${result.data.result[0].reservationDate}T00:00`);
                setEndTime(result.data.result[0].endTime);
                setCurrentDate(date);
                getConcurrent(date,
                    result.data.result[0].startTime, result.data.result[0].endTime, 
                    maxPeople, maxs, ReservedItems)
            })
        } else {
            getConcurrent(null, null, null, null, maxPeople, maxs, ReservedItems)
        }
    }

    function makeBox(max) {
        for (let element = 1; element <= numReservableItems; element++) {
            // Then the code pushes each time it loops to the empty array I initiated.
            // alert(minArray[element - 1]);
            box.push(
                <Grid container spacing={2}>
                    <Grid  item xs={12} sm={6}>
                    <TextField
                        required
                        fullWidth
                        name={'Reserved' + element}
                        label={'Reserved ' + element}
                        type={element}
                        id={element}
                        value={nameArray[element - 1]}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    </Grid>
                    <Grid  item xs={12} sm={3}>
                    <TextField
                        required
                        fullWidth
                        name={'Price' + element}
                        label={'Price ' + element}
                        id={element}
                        value={`$${priceArray[element - 1]}`}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    </Grid>
                    <Grid  item xs={12} sm={3}>
                    <TextField
                        required
                        fullWidth
                        name={'Value' + element}
                        label={'# of Units '}
                        type="number"
                        id={element}
                        InputProps={{ inputProps: { min: minArray[element - 1], max: max[element - 1], step: 1 } }}
                        value={numArray[element - 1]}
                        onChange={(newValue) => { 
                            let newArr = [...numArray];
                            newArr[parseInt(newValue.target.id) - 1] = newValue.target.value;
                            setNumArray(newArr);
                            calculateTotal(newArr);
                        }}
                    />
                    </Grid>
                </Grid>
            );
            }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (closed[new Date(currentDate).getDay()]) {
            alert(`${businessName} is closed on ${new Date(currentDate).getDate()}.`);
            return;
        }
        let tot = 0;
        for (let i = 0; i < numReservableItems; i++) {
            tot = tot + numArray[i];
        }
        if (tot === 0) {
            alert('Need to reserve at least one item');
            return;
        }
        const data = new FormData(event.currentTarget);
        let ReservedItems = "";
        for (let element = 0; element < numReservableItems; element++) {
            if (ReservedItems === "") {
                ReservedItems = ReservedItems.concat(nameArray[element]);
            } else {
                ReservedItems = ReservedItems.concat(";", nameArray[element]);
            }
        }
        let prices = "";
        for (let element = 0; element < numReservableItems; element++) {
            if (prices === "") {
                prices = prices.concat(priceArray[element]);
            } else {
                prices = prices.concat(";", priceArray[element]);
            }
        }
        let numReserved = "";
        for (let element = 0; element < numReservableItems; element++) {
            if (numReserved === "") {
                numReserved = numReserved.concat(numArray[element]);
            } else {
                numReserved = numReserved.concat(";", numArray[element]);
            }
        }
        if (!reservationID) {
            Axios.post("http://localhost:3001/api/createReservation", {
                businessName: businessName,
                reservationDate: currentDate,
                reservable: ReservedItems,
                price: prices,
                startTime: startTime,
                endTime: endTime,
                reservedBy: state.username,
                numPeople: data.get('numPeople'),
                numReservable: numReserved,
                
            }).then((result) => {
                setReservationID(result.data.id);
                alert(`Your reservation has been saved!\nAn confirmation email has been sent to you containing your Reservation ID and reservation details.`);
            })
        } else{
            // UPDATE RESERVATION INSTEAD
            Axios.post("http://localhost:3001/api/updateReservation", {
                ID: reservationID,
                businessName: businessName,
                reservationDate: currentDate,
                reservable: ReservedItems,
                price: prices,
                startTime: startTime,
                endTime: endTime,
                reservedBy: state.username,
                numPeople: data.get('numPeople'),

                numReservable: numReserved
            }).then((result) => {
                alert(`Your reservation has been updated!\nAn confirmation email has been sent to you containing your Reservation ID and updated reservation details.`);
            })
        }
    }

    if (MAXSTRING) {
    return (
        <React.Fragment>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                    <EventIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    {businessName} Reservation Request Form
                </Typography>
                <Typography style={{color:"#98622E"}} component="h5" variant="h8">
                    * Prices are assigned per unit of reservable item.
                </Typography>
                <Typography style={{color:"#98622E"}} component="h5" variant="h8">
                    * Remaining reservable units are:
                </Typography>
                <Typography style={{color:"#98402E"}} component="h5" variant="h10">
                    {MAXSTRING}
                </Typography>
                <Typography component="p" variant="p">
                    Reservation ID: {reservationID}
                </Typography>
                <Box component="form" validate="true" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="business"
                                fullWidth
                                id="business"
                                label="Business"
                                defaultValue={businessName}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    id="reservationDate"
                                    label="Select Date"
                                    validate="true"
                                    value={currentDate}
                                    onChange={(newValue) => { setCurrentDate(newValue); 
                                        getConcurrent(newValue, startTime, endTime, maxNumPeople, maxArray, nameArray) }}
                                    renderInput={(params) => <TextField {...params}/>}
                                    shouldDisableDate={(date) => {
                                        if (closed[new Date(date).getDay()]) {
                                            return true;
                                        }
                                        return false;
                                    }}
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <TimePicker
                                    label="Start Time"
                                    value={startTime}
                                    fullWidth
                                    onChange={(newValue) => { setStartTime(newValue);
                                        getConcurrent(currentDate, newValue, endTime, maxNumPeople, maxArray, nameArray) }}
                                    renderInput={(params) => <TextField {...params} required/>}
                                    shouldDisableTime={(timeValue, clockType) => {
                                        const openHour = new Date((openTime[new Date(currentDate).getDay()])).getHours()
                                        const openMinute = new Date((openTime[new Date(currentDate).getDay()])).getMinutes()
                                        const closeHour = new Date((closeTime[new Date(currentDate).getDay()])).getHours()
                                        const closeMinute = new Date((closeTime[new Date(currentDate).getDay()])).getMinutes()
                                    if ((clockType === 'hours' && timeValue < openHour) || (clockType === 'hours' && timeValue >= closeHour && closeMinute === 0) || 
                                        (clockType === 'hours' && timeValue > closeHour && closeMinute > 0)) {
                                            return true;
                                        }
                                    if (((new Date(startTime).getHours()) === openHour && clockType === 'minutes' && timeValue < openMinute)
                                        || ((new Date(startTime).getHours()) === closeHour && clockType === 'minutes' && timeValue >= closeMinute)) {
                                            return true;
                                        }
                                    if (clockType === 'minutes' && timeValue % 5) {
                                            return true;
                                        }
                                    return false;
                                    }}
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <TimePicker
                                    label="End Time"
                                    value={endTime}
                                    fullWidth
                                    onChange={(newValue) => { setEndTime(newValue); 
                                        getConcurrent(currentDate, startTime, newValue, maxNumPeople, maxArray, nameArray) }}
                                    renderInput={(params) => <TextField {...params} required />}
                                    shouldDisableTime={(timeValue, clockType) => {
                                        const openHour = new Date((openTime[new Date(currentDate).getDay()])).getHours()
                                        const openMinute = new Date((openTime[new Date(currentDate).getDay()])).getMinutes()
                                        const closeHour = new Date((closeTime[new Date(currentDate).getDay()])).getHours()
                                        const closeMinute = new Date((closeTime[new Date(currentDate).getDay()])).getMinutes()
                                    if ((clockType === 'hours' && timeValue < openHour) || (clockType === 'hours' && timeValue === openHour && openMinute === 0) || 
                                        (clockType === 'hours' && timeValue > closeHour)) {
                                            return true;
                                        }
                                    if ((clockType === 'minutes' && (new Date(endTime).getHours()) === openHour && timeValue <= openMinute)
                                        || ((new Date(endTime).getHours()) === closeHour && clockType === 'minutes' && timeValue > closeMinute)) {
                                            return true;
                                        }
                                    if ((clockType === 'hours' && timeValue < (new Date(startTime).getHours()))
                                        || ((new Date(startTime).getHours()) === (new Date(endTime).getHours()) && 
                                            clockType === 'minutes' && timeValue <= (new Date(startTime).getMinutes()) )) {
                                            return true;
                                        }
                                    if (clockType === 'minutes' && timeValue % 5) {
                                            return true;
                                        }
                                    return false;
                                    }}
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                                <TextField
                                    required
                                    fullWidth
                                    name="numPeople"
                                    label="Party Size"
                                    type="number"
                                    id="numPeople"
                                    InputProps={{ inputProps: { max: availableNumPeople,  min: 1, step: 1 } }}
                                    value={numPeople}
                                    onChange={(newValue) => { 
                                        setNumPeople(parseInt(newValue.target.value));
                                        getConcurrent(currentDate, startTime, endTime, maxNumPeople, maxArray, nameArray);
                                    }}
                                />
                            </Grid>
                        {/* And here I render the box array */}
                            {/* There is going to be a max of 10 items */}
                            {makeBox(availableArray)}
                            <Grid item xs={12} sm={6}>
                                {box[0]}
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                {box[1]}
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                {box[2]}
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                {box[3]}
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                {box[4]}
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                {box[5]}
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                {box[6]}
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                {box[7]}
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                {box[8]}
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                {box[9]}
                            </Grid>
                    </Grid>
                    <Typography component="p" variant="p">
                        Total: ${total}
                    </Typography>
                    <Button
                        type="submit"
                        disabled={ priceArray[0] ? false : true}
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Save
                    </Button>
                </Box>
            </Box>
        </React.Fragment>
    );
    }
}