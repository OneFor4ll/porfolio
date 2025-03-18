"use client"

import React, { useState, useEffect, useRef } from "react"
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
  Stack,
  ToggleButtonGroup,
  ToggleButton,
  useMediaQuery,
  useTheme,
} from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import Clock from "react-clock"
import "react-clock/dist/Clock.css"
import MusicNoteIcon from "@mui/icons-material/MusicNote"
import { motion, AnimatePresence } from "framer-motion"
import { useLanguage } from "./LanguageContext"
import { translations } from "@/libs/components/theme/app/translations"

interface Alarm {
  id: number
  time: string
  enabled: boolean
  note: string
  days: string[]
  isSnoozed?: boolean
}

const AlarmPage: React.FC = () => {
  const [alarmTime, setAlarmTime] = useState("")
  const [alarmNote, setAlarmNote] = useState("")
  const [selectedDays, setSelectedDays] = useState<string[]>([])
  const [alarms, setAlarms] = useState<Alarm[]>([])
  const [currentTime, setCurrentTime] = useState(new Date())
  const [editingAlarmId, setEditingAlarmId] = useState<number | null>(null)
  const [alarmMusic, setAlarmMusic] = useState<File | null>(null)
  const [activeAlarm, setActiveAlarm] = useState<Alarm | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [snoozeMessage, setSnoozeMessage] = useState<string | null>(null)

  const theme = useTheme()
  const isTablet = useMediaQuery(theme.breakpoints.only("sm"))
  const isMobile = useMediaQuery(theme.breakpoints.only("xs"))
  const { language } = useLanguage()

  const t = translations[language] || translations.en
  const DAYS_OF_WEEK = t.alarmPage.daysOfWeek || ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

  useEffect(() => {
    if (snoozeMessage) {
      const timer = setTimeout(() => {
        setSnoozeMessage(null)
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [snoozeMessage])

  const handleMusicUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type.startsWith("audio")) {
      setAlarmMusic(file)
    }
  }

  const playMusic = (audioUrl: string) => {
    if (audioRef.current) {
      audioRef.current.src = audioUrl
      audioRef.current.loop = false
      audioRef.current.play()
    }
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const formattedTime = currentTime.toLocaleTimeString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  })

  const currentDay = DAYS_OF_WEEK[new Date().getDay() - 1] || "Sun"

  useEffect(() => {
    const checkAlarm = setInterval(() => {
      alarms.forEach((alarm) => {
        if (
          alarm.enabled &&
          alarm.time === formattedTime &&
          (alarm.days.includes("All") || alarm.days.includes(currentDay))
        ) {
          if (!activeAlarm) {
            setActiveAlarm(alarm)

            if (alarmMusic) {
              const audioUrl = URL.createObjectURL(alarmMusic)
              playMusic(audioUrl)
            }

            if (alarm.isSnoozed) {
              setAlarms((prevAlarms) => prevAlarms.filter((a) => a.id !== alarm.id))
            }
          }
        }
      })
    }, 1000)

    return () => clearInterval(checkAlarm)
  }, [alarms, formattedTime, currentDay, alarmMusic, activeAlarm])

  const handleSetAlarm = () => {
    if (alarmTime && selectedDays.length > 0) {
      const updatedDays = selectedDays.length === DAYS_OF_WEEK.length ? ["All"] : selectedDays

      if (editingAlarmId !== null) {
        setAlarms((prevAlarms) =>
          prevAlarms.map((alarm) =>
            alarm.id === editingAlarmId ? { ...alarm, time: alarmTime, note: alarmNote, days: updatedDays } : alarm
          )
        )
        setEditingAlarmId(null)
      } else {
        const newAlarm: Alarm = {
          id: Date.now(),
          time: alarmTime,
          enabled: true,
          note: alarmNote,
          days: updatedDays,
        }
        setAlarms([...alarms, newAlarm])
      }

      setAlarmTime("")
      setAlarmNote("")
      setSelectedDays([])
    }
  }

  const toggleAlarm = (id: number) => {
    setAlarms((prevAlarms) =>
      prevAlarms.map((alarm) => (alarm.id === id ? { ...alarm, enabled: !alarm.enabled } : alarm))
    )
  }

  const handleDeleteAlarm = (id: number) => {
    setAlarms(alarms.filter((alarm) => alarm.id !== id))
    handleCancelEdit()
  }

  const handleEditAlarm = (alarm: Alarm) => {
    setAlarmTime(alarm.time)
    setAlarmNote(alarm.note)
    setSelectedDays(alarm.days)
    setEditingAlarmId(alarm.id)
  }

  const handleCancelEdit = () => {
    setAlarmTime("")
    setAlarmNote("")
    setSelectedDays([])
    setEditingAlarmId(null)
  }

  const handleDayChange = (event: React.MouseEvent<HTMLElement>, newDays: string[]) => {
    if (newDays.includes("All")) {
      setSelectedDays(selectedDays.length === DAYS_OF_WEEK.length ? [] : ["All"])
    } else {
      setSelectedDays(newDays)
    }
  }

  const handleTurnOff = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }

    if (activeAlarm) {
      setAlarms((prevAlarms) =>
        prevAlarms.map((alarm) =>
          alarm.id === activeAlarm.id ? { ...alarm, enabled: false } : alarm
        )
      )
    }

    setActiveAlarm(null)
  }

  const handleLater = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }

    if (activeAlarm) {
      setAlarms((prevAlarms) =>
        prevAlarms.map((alarm) =>
          alarm.id === activeAlarm.id ? { ...alarm, enabled: false } : alarm
        )
      )

      const snoozeTime = new Date()
      snoozeTime.setMinutes(snoozeTime.getMinutes() + 5)
      const snoozeFormatted = snoozeTime.toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
      })

      const newAlarm: Alarm = {
        id: Date.now(),
        time: snoozeFormatted,
        enabled: true,
        note: `${t.alarmPage.snoozeMessage}`,
        days: activeAlarm.days,
        isSnoozed: true,
      }

      setAlarms((prevAlarms) => [...prevAlarms, newAlarm])

      setSnoozeMessage(`${t.alarmPage.snoozeMessage} ${snoozeFormatted}`)
      setTimeout(() => {
        setSnoozeMessage(null)
      }, 5 * 60 * 1000)
    }

    setActiveAlarm(null)
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="90vh"
      gap={isMobile ? 8 : isTablet ? 5 : 10}
      px={isMobile ? 5 : 4}
      flexDirection={isMobile ? "column" : "row"}
      sx={{ paddingTop: isMobile ? 3 : 0 }}
    >
      <Box sx={{
        maxHeight: "300px",
        overflowY: "auto",
        width: isMobile ? "100%" : "300px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        p: 1
      }}>
        <Typography variant="h6" textAlign="center">{t.alarmPage.savedAlarms}</Typography>
        {alarms.length > 0 ? (
          <List>
            {alarms.map((alarm) => (
              <ListItem
                key={alarm.id}
                sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}
                onClick={(e) => {
                  if ((e.target as HTMLElement).closest(".alarm-action")) return
                  handleEditAlarm(alarm)
                }}
              >
                <ListItemText
                  primary={`Alarm at ${alarm.time}`}
                  secondary={
                    <>
                      {alarm.days.includes("All") ? t.alarmPage.allDays : alarm.days.join(", ")}
                      <br />
                      {alarm.note}
                    </>
                  }
                />
                <Box display="flex" alignItems="center" gap={1} className="alarm-action">
                  <Switch
                    checked={alarm.enabled}
                    onChange={() => toggleAlarm(alarm.id)}
                    className="alarm-action"
                  />
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleDeleteAlarm(alarm.id)}
                    className="alarm-action"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography color="gray" textAlign="center">{t.alarmPage.noAlarmsSet}</Typography>
        )}
      </Box>

      <Box textAlign="center" display="flex" flexDirection="column" alignItems="center">
        <Box
          sx={{
            border: `2px solid ${theme.palette.mode === 'dark' ? '#fff' : '#000'}`,
            borderRadius: '50%',
            padding: '10px',
            backgroundColor: theme.palette.mode === 'dark' ? '#333' : '#fff',
          }}
        >
          <Clock
            value={currentTime}
            size={isMobile ? 150 : 150}
            renderNumbers
          />
        </Box>
        <Typography variant="h4" sx={{ fontWeight: "bold", mt: 2 }}>
          {formattedTime}
        </Typography>
      </Box>

      <Box display="flex" flexDirection="column" alignItems="center" gap={2} sx={{ maxWidth: isMobile ? "100%" : "300px" }}>
        <TextField
          label={t.alarmPage.selectTime}
          type="time"
          value={alarmTime}
          onChange={(e) => setAlarmTime(e.target.value)}
          InputLabelProps={{ shrink: true }}
          inputProps={{ step: 60 }}
          fullWidth
        />
        <TextField
          label={t.alarmPage.alarmNote}
          type="text"
          value={alarmNote}
          onChange={(e) => setAlarmNote(e.target.value)}
          fullWidth
        />

        <Typography variant="subtitle1" sx={{ mt: 1 }}>
          {t.alarmPage.selectMusic}
        </Typography>
        <Box display="flex" alignItems="center" gap={1}>
          <IconButton component="label">
            <MusicNoteIcon />
            <input
              type="file"
              accept="audio/*"
              onChange={handleMusicUpload}
              style={{ display: "none" }}
            />
          </IconButton>
          <Typography>{alarmMusic ? t.alarmPage.musicSelected : t.alarmPage.noMusicSelected}</Typography>
        </Box>

        <Typography variant="subtitle1" sx={{ mt: 1 }}>
          {t.alarmPage.repeatOn}
        </Typography>
        <ToggleButtonGroup
          value={selectedDays}
          onChange={handleDayChange}
          aria-label="day selection"
          sx={{ flexWrap: "wrap", justifyContent: "center", gap: 1 }}
        >
          <ToggleButton value="All">{t.alarmPage.buttonday}</ToggleButton>
          {DAYS_OF_WEEK.map((day) => (
            <ToggleButton key={day} value={day} aria-label={day}>
              {day}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>

        <Stack direction="row" spacing={2} sx={{ mt: 2, paddingBottom: isMobile ? 5 : 0 }}>
          <Button variant="contained" color="primary" onClick={handleSetAlarm}>
            {editingAlarmId !== null ? t.alarmPage.updateAlarm : t.alarmPage.setAlarm}
          </Button>
          {editingAlarmId !== null && (
            <Button variant="outlined" color="secondary" onClick={handleCancelEdit}>
              {t.alarmPage.cancel}
            </Button>
          )}
        </Stack>
      </Box>

      {snoozeMessage && (
        <Box
          sx={{
            position: "fixed",
            bottom: 20,
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            color: "#fff",
            padding: "10px 20px",
            borderRadius: "8px",
            zIndex: 10000,
            animation: "fadeInOut 5s ease-in-out",
            "@keyframes fadeInOut": {
              "0%": { opacity: 0 },
              "10%": { opacity: 1 },
              "90%": { opacity: 1 },
              "100%": { opacity: 0 },
            },
          }}
        >
          <Typography variant="body1">{snoozeMessage}</Typography>
        </Box>
      )}

      <AnimatePresence>
        {activeAlarm && (
          <Box
            sx={{
              position: "fixed",
              top: "0",
              left: "0",
              right: "0",
              bottom: "0",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              zIndex: 9999,
            }}
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              style={{
                backgroundColor: theme.palette.background.paper,
                padding: "20px",
                borderRadius: "8px",
                textAlign: "center",
                width: "300px",
                boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
              }}
            >
              <Typography variant="h6">{`${t.alarmPage.alarmRinging} ${activeAlarm.time}`}</Typography>
              <Typography variant="body1">{activeAlarm.note}</Typography>
              <Stack direction="row" spacing={2} sx={{ mt: 2, justifyContent: "center" }}>
                <Button variant="contained" color="error" onClick={handleTurnOff}>
                  {t.alarmPage.turnOff}
                </Button>
                <Button variant="outlined" color="primary" onClick={handleLater}>
                  {t.alarmPage.later}
                </Button>
              </Stack>
            </motion.div>
          </Box>
        )}
      </AnimatePresence>
      <audio ref={audioRef} />
    </Box>
  )
}

export default AlarmPage