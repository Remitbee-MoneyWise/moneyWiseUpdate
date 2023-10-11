import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { updateProfile } from "../apiLayers/profile";
import MapPicker from "react-google-map-picker";
import { setKey, fromAddress, fromLatLng } from "react-geocode";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs, { Dayjs } from "dayjs";
import {
  Card,
  CardContent,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import axios from "axios";

const defaultTheme = createTheme();

type CreateShipmentFormValues = {
  senderName: string;
  senderAddress: string;
  recipientName: string;
  recipientAddress: string;
  description: string;
};

export default function Profile() {
  const [values, setValues] = React.useState<CreateShipmentFormValues>({
    senderName: "",
    senderAddress: "",
    recipientName: "",
    recipientAddress: "",
    description: "",
  });

  const [address, setAddress] = React.useState<string>("");

  const DefaultLocation = { lat: 10, lng: 106 };
  const DefaultZoom = 10;
  const [location, setLocation] = React.useState(DefaultLocation);
  const [zoom, setZoom] = React.useState(DefaultZoom);
  const [time1, setTime1] = React.useState<Dayjs | null>(
    dayjs("2022-04-17T15:30")
  );
  const [time2, setTime2] = React.useState<Dayjs | null>(
    dayjs("2022-04-17T15:30")
  );
  type Currency = {
    currency_name: string;
    iso: string;
    is_obsolete: boolean;
  };
  const [currencies, setCurrencies] = React.useState<Currency[]>([]);
  const [selectedCurrencies, setSelectedCurrencies] = React.useState<string[]>(
    []
  );

  setKey("AIzaSyD_6yH-KwGXniV7oQPVangfCjx-veNl3a0");
  function handleChangeLocation(lat: number, lng: number) {
    setLocation({ lat: lat, lng: lng });
    fromLatLng(lat, lng)
      .then(({ results }) => {
        // const { lat, lng } = results[0].geometry.location;
        setAddress(`${results[0].formatted_address}`);
      })
      .catch(console.error);
  }

  function handleChangeZoom(newZoom: number) {
    setZoom(newZoom);
  }

  React.useEffect(() => {
    if (navigator.geolocation) {
      // Call getCurrentPosition with success and failure callbacks
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        fromLatLng(position.coords.latitude, position.coords.longitude)
          .then(({ results }) => {
            // const { lat, lng } = results[0].geometry.location;
            setAddress(`${results[0].formatted_address}`);
          })
          .catch(console.error);
      });
    } else {
      alert("Sorry, your browser does not support geolocation services.");
    }
  }, []);

  const handleChange = (eName: any, eValue: any) => {
    const name = eName;
    const value = eValue;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  React.useEffect(() => {
    const instance = axios.create({
      auth: {
        username: "infozenit28348152",
        password: "nfabehsuhv9kif5ji7c744dlou",
      },
    });

    instance
      .get("https://xecdapi.xe.com/v1/currencies")
      .then((response) => {
        setCurrencies(response.data.currencies);
        console.log("Currencies ", currencies);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  const handleCurrencyChange = (event: SelectChangeEvent<string[]>) => {
    setSelectedCurrencies(event.target.value as string[]);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Validate the form fields

    try {
      const user = await updateProfile(values);
      if (user.status == 200) {
        toast.success("Shipment successfully created");
        setValues({
          senderName: "",
          senderAddress: "",
          recipientName: "",
          recipientAddress: "",
          description: "",
        });
      }
    } catch (error) {
      toast.error("Error Occured while creating shipment");
      setValues({
        senderName: "",
        senderAddress: "",
        recipientName: "",
        recipientAddress: "",
        description: "",
      });
    }
  };
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h4"
            color="black"
            style={{ textDecoration: "none" }}
            sx={{ flexGrow: 1 }}
          >
            Profile
          </Typography>
          <Box
            component="form"
            noValidate
            sx={{
              "& .MuiTextField-root": { m: 1, width: "35ch" },
            }}
          >
            <TextField
              disabled
              id="outlined-disabled"
              label="Store Name"
              defaultValue="Perera Exchanges"
            />
            <TextField
              disabled
              id="outlined-disabled"
              label="Email"
              defaultValue="perera23@gmail.com"
            />
            <TextField
              disabled
              id="outlined-disabled"
              label="Latitute :"
              value={location.lat}
            />
            <TextField
              disabled
              id="outlined-disabled"
              label="Longitute :"
              value={location.lng}
            />
            <TextField
              disabled
              id="outlined-disabled"
              label="Zoom"
              value={zoom}
            />
            <TextField
              label="Address"
              name="address"
              multiline
              fullWidth
              value={address}
              rows={2}
            />
            <MapPicker
              defaultLocation={location}
              zoom={zoom}
              //   mapTypeId="roadmap"
              style={{ height: "400px" }}
              onChangeLocation={handleChangeLocation}
              onChangeZoom={handleChangeZoom}
              apiKey="AIzaSyD_6yH-KwGXniV7oQPVangfCjx-veNl3a0"
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["TimePicker"]}>
                <TimePicker
                  label="Open Time"
                  value={time1}
                  onChange={(newValue) => setTime1(newValue)}
                />
              </DemoContainer>
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["TimePicker"]}>
                <TimePicker
                  label="Close Time"
                  value={time2}
                  onChange={(newValue) => setTime2(newValue)}
                />
              </DemoContainer>
            </LocalizationProvider>
            <InputLabel id="demo-simple-select-label">Age</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Age"
              fullWidth
              multiple // Enable multiple selection
              onChange={handleCurrencyChange}
              value={selectedCurrencies} // Use the state variable for selected values
            >
              {currencies.map((currency) => (
                <MenuItem key={currency.iso} value={currency.iso}>
                  {currency.iso} - {currency.currency_name}
                </MenuItem>
              ))}
            </Select>
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Selected Currency
                </Typography>

                <ul>
                  {selectedCurrencies.map((currency) => (
                    <li key={currency}>{currency}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Update
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
