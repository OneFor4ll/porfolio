"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Switch,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

interface Alarm {
  time: string;
  enabled: boolean;
}

const AlarmPage: React.FC = () => {
  const [alarmTime, setAlarmTime] = useState("");
  const [alarms, setAlarms] = useState<Alarm[]>([]);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString("en-US", { hour12: false }).slice(0, 5));

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString("en-US", { hour12: false }).slice(0, 5));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const checkAlarm = setInterval(() => {
      alarms.forEach((alarm) => {
        if (alarm.enabled && alarm.time === currentTime) {
          alert(`⏰ Alarm for ${alarm.time}!`);
          setAlarms((prevAlarms) => prevAlarms.filter((a) => a.time !== alarm.time))
        }
      });
    }, 1000);

    return () => clearInterval(checkAlarm);
  }, [alarms, currentTime]);

  const handleSetAlarm = () => {
    if (alarmTime && !alarms.some((alarm) => alarm.time === alarmTime)) {
      setAlarms([...alarms, { time: alarmTime, enabled: true }]);
      setAlarmTime("");
    }
  };

  const toggleAlarm = (time: string) => {
    setAlarms((prevAlarms) =>
      prevAlarms.map((alarm) => (alarm.time === time ? { ...alarm, enabled: !alarm.enabled } : alarm))
    );
  };

  const handleDeleteAlarm = (time: string) => {
    setAlarms(alarms.filter((alarm) => alarm.time !== time));
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="90vh" gap={30} px={4}>
      <Box>
        <Typography variant="h6">Saved Alarms</Typography>
        {alarms.length > 0 ? (
          <List>
            {alarms.map((alarm, index) => (
              <ListItem
                key={index}
                sx={{ display: "grid" }}
              >
                <ListItemText primary={`Alarm at ${alarm.time}`} />
                <Box display="flex" alignItems="center" gap={1}>
                  <Switch checked={alarm.enabled} onChange={() => toggleAlarm(alarm.time)} />
                  <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteAlarm(alarm.time)}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography color="gray">No alarms set</Typography>
        )}
      </Box>

      <Divider orientation="vertical" flexItem />

      <Box textAlign="center">
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          {currentTime}
        </Typography>
      </Box>

      <Divider orientation="vertical" flexItem />

      <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
        <TextField
          label="Select Time"
          type="time"
          value={alarmTime}
          onChange={(e) => setAlarmTime(e.target.value)}
          InputLabelProps={{ shrink: true }}
          inputProps={{ step: 60 }}
        />
        <Button variant="contained" color="primary" onClick={handleSetAlarm}>
          Set Alarm
        </Button>
      </Box>
    </Box>
  );
};

export default AlarmPage;
