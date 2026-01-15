import React, { useEffect, useMemo, useState } from "react"
import "./ScheduleGroupPage.css"
import { useNavigate, useSearchParams } from "react-router-dom"
import {
  createScheduleGroup,
  deleteScheduleGroup,
  getGroupById,
  getListScheduleGroup,
  getHistoryPumpGroup,
  pumpGroup,
  triggerScheduleGroup,
} from "../../services/GroupService/GroupService"

interface WateringSchedule {
  id: string
  startTime: string
  repeatType: string
  duration: number
  status: boolean
  daysOfWeek: string[]
}

const ScheduleGroupPage: React.FC = () => {
  const [searchParams] = useSearchParams()
  const groupId = searchParams.get("groupId") || ""
  const groupName = searchParams.get("groupName") || ""
  const navigate = useNavigate()

  // Pump now
  const [water, setWater] = useState<number>(0)
  const MIN_DURATION = 0
  const MAX_DURATION = 100
  const progressPercent = useMemo(
    () => ((water - MIN_DURATION) / (MAX_DURATION - MIN_DURATION)) * 100,
    [water],
  )
  const [pumping, setPumping] = useState(false)

  // Schedule
  const [startTime, setStartTime] = useState<string>("")
  const [duration, setDuration] = useState<number>(0)
  const [repeatType, setRepeatType] = useState<string>("")
  const [daysOfWeek, setDaysOfWeek] = useState<string[]>([])
  const [refreshFlag, setRefreshFlag] = useState(0)
  const [schedules, setSchedules] = useState<WateringSchedule[]>([])
  const [historyPump, setHistoryPump] = useState<any[]>([])

  useEffect(() => {
    const fetchSchedules = async () => {
      if (!groupId) return
      const res = await getListScheduleGroup(groupId)
      setSchedules(res?.data || [])
    }
    const fetchHistory = async () => {
      if (!groupId) return
      const res = await getHistoryPumpGroup(groupId)
      setHistoryPump(res?.data || [])
    }
    const fetchWatering = async () => {
      if (!groupId) return
      const res = await getGroupById(groupId)
      setPumping(res?.data.watering || false)
    }
    fetchSchedules()
    fetchHistory()
    fetchWatering()
  }, [groupId, refreshFlag])

  const handlePump = async (action: "START" | "STOP") => {
    try {
      if (!groupId) return
      setPumping(action === "START")
      await pumpGroup(groupId, action, water*60)
      if (action === "STOP") setWater(0)
      // Refresh lịch sử bơm sau khi bơm thành công
      const res = await getHistoryPumpGroup(groupId)
      setHistoryPump(res?.data || [])
    } catch (error) {
      console.error("Pump group error", error)
      setPumping(false)
    }
  }

  const handleDayToggle = (day: string) => {
    setDaysOfWeek((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day],
    )
  }

  const handleCreateSchedule = async () => {
    if (!groupId) return
    await createScheduleGroup(groupId, startTime, duration*60, repeatType, daysOfWeek)
    setRefreshFlag((p) => p + 1)
  }

  const handleTurnSchedule = async (scheduleId: string, groupId:string, status: boolean) => {
    if (!groupId) return
    await triggerScheduleGroup(groupId, scheduleId, status)
    setRefreshFlag((p) => p + 1)
  }

  const handleDeleteSchedule = async (scheduleId: string) => {
    if (!groupId) return
    await deleteScheduleGroup(groupId, scheduleId)
    setRefreshFlag((p) => p + 1)
  }

  const listDays = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"]

  const goBack = () => {
    navigate(`/data_group_page?id=${groupId}`)
  }

  return (
    <div className="schedule-group-page">
      <div className="back__container">
        <img src="/arrow_back.png" alt="Quay lại" onClick={goBack} />
        <h3>
          Nhóm: <span>{groupName}</span>
        </h3>
      </div>

      <div className="sg-layout">
        <div className="sg-card pump-card">
          <div className="pump-layout">
            <div className="pump-left">
              <div className="pump-header">
                <img src="/may_bom.png" alt="May bom" />
                <div>
                  <h3>Bơm ngay</h3>
                  <p>Điều khiển bơm đồng thời cho toàn nhóm</p>
                </div>
              </div>

              <div className="pump-slider">
                <input
                  type="range"
                  value={water}
                  min={MIN_DURATION}
                  max={MAX_DURATION}
                  onChange={(e) => setWater(Number(e.target.value))}
                  className="water-slider"
                  style={
                    {
                      "--slider-progress": `${progressPercent}%`,
                    } as React.CSSProperties
                  }
                />
                <h3>{water}p</h3>
              </div>

              <div className="pump-actions">
                {pumping ? (
                  <button className="stop-btn" onClick={() => handlePump("STOP")}>
                    Dừng bơm
                  </button>
                ) : (
                  <button className="primary-btn" onClick={() => handlePump("START")}>
                    Bơm ngay
                  </button>
                )}
              </div>
            </div>

            <div className="pump-divider" />

            <div className="pump-history">
              <h3 className="pump-history__title">Lịch sử bơm</h3>
              <div className="pump-history__table-container">
                {historyPump.length === 0 ? (
                  <p className="empty-text">Chưa có lịch sử</p>
                ) : (
                  <table className="my-table">
                    <thead>
                      <tr>
                        <th>Thời điểm</th>
                        <th>Thời gian bơm</th>
                        <th>Vị trí</th>
                      </tr>
                    </thead>
                    <tbody>
                      {historyPump.map((item: any, idx: number) => (
                        <tr key={idx}>
                          <td>{item.startTime ? new Date(item.startTime).toLocaleString() : "--"}</td>
                          <td>{item.duration ? `${(item.duration/60).toFixed(1)} phút` : "--"}</td>
                          <td>Nhóm</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="sg-card schedule-card">
          <h3>Hẹn lịch bơm</h3>
          <div className="schedule-grid">
            <div className="schedule-form">
              <div className="form-group">
                <label>Thời gian</label>
                <input type="time" className="time-input" onChange={(e) => setStartTime(e.target.value)} />
              </div>

              <div className="form-group">
                <label>Lặp lại</label>
                <div className="repeat-options">
                  <label className="radio-option">
                    <input type="radio" name="repeat" onClick={() => setRepeatType("ONE_TIME")} />
                    Bơm 1 lần
                  </label>
                  <label className="radio-option">
                    <input type="radio" name="repeat" onClick={() => setRepeatType("EVERYDAY")} />
                    Hàng ngày
                  </label>
                  <label className="radio-option">
                    <input type="radio" name="repeat" onClick={() => setRepeatType("DAYS")} />
                    Bơm nhiều lần
                  </label>
                </div>
                {repeatType === "DAYS" && (
                  <div className="day-selector">
                    {listDays.map((day) => (
                      <button
                        key={day}
                        className={`day-button ${daysOfWeek.includes(day) ? "selected" : ""}`}
                        onClick={() => handleDayToggle(day)}
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="form-group water-amount-group">
                <label>Thời gian bơm:</label>
                <input
                  type="range"
                  min={MIN_DURATION}
                  max={MAX_DURATION}
                  step="1"
                  value={duration}
                  onChange={(e) => setDuration(parseInt(e.target.value))}
                  className="water-slider"
                  style={
                    {
                      "--slider-progress": `${((duration - MIN_DURATION) / (MAX_DURATION - MIN_DURATION)) * 100}%`,
                    } as React.CSSProperties
                  }
                />
                <span className="water-amount-value">{`${duration} phút`}</span>
              </div>

              <button className="primary-btn" onClick={handleCreateSchedule}>
                Lưu lịch bơm
              </button>
            </div>

            <div className="schedule-divider" />

            <div className="schedule-list">
              <h4>Lịch đã tạo</h4>
              {schedules.map((schedule) => (
                <div className="schedule-item" key={schedule.id}>
                  <div className="schedule-info">
                    <div className="time">{schedule.startTime}</div>
                    <div className="desc">
                      {schedule.repeatType === "DAYS"
                        ? `${schedule.daysOfWeek.join(", ")} | ${(schedule.duration/60).toFixed(1)} phút`
                        : `${schedule.repeatType === "ONE_TIME" ? "Một lần" : "Mỗi ngày"} | ${(schedule.duration/60).toFixed(1)} phút`}
                    </div>
                  </div>
                  <div className="controls">
                    <label className="switch">
                      <input
                        type="checkbox"
                        defaultChecked={schedule.status}
                        onChange={(e) => handleTurnSchedule(schedule.id, groupId, e.target.checked)}
                      />
                      <span className="slider round"></span>
                    </label>
                    <button className="delete-button" onClick={() => handleDeleteSchedule(schedule.id)}>
                      <img src="/Trash_Schedule.png" alt="delete" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ScheduleGroupPage
