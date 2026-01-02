import React, { useEffect, useState } from "react";
import "./ScheduleDevicePage.css"; // Import file CSS
import { useNavigate, useSearchParams } from "react-router-dom";
import { createSchedule, deleteSchedule, getListSchedule, turnSchedule } from "../../services/ScheduleService/ScheduleService";




// Kiểu dữ liệu cho một lịch tưới nước
interface WateringSchedule {
  id: string; // id cua lich nhe
  startTime: string;
  repeatType: string;
  duration: Number;
  status:boolean;
  daysOfWeek: string[];

}

interface ScheduleItemProps extends WateringSchedule {
  setRefreshFlag: React.Dispatch<React.SetStateAction<number>>; // Thêm vào props
}

// Component cho một mục Lịch tưới cây
const ScheduleItem: React.FC<ScheduleItemProps> = ({
  id,
  startTime,
  repeatType,
  duration,
  daysOfWeek,
  status,
  setRefreshFlag

}) => {
  const scheduleId = id;
  const [searchParams] = useSearchParams()
  const deviceId = searchParams.get("id") || ""
  const handleTurnSchedule = async (deviceId: string, scheduleId: string, status:boolean
  )=>{
    const res = await turnSchedule(deviceId,scheduleId,status)
    console.log(res.statusCode)
    status = res.statusCode ==200?true:false
  }
  const handleDeleteSchedule = async (deviceId: string, scheduleId: string
  )=>{
    const res = await deleteSchedule(deviceId,scheduleId)
    console.log(res.statusCode)
    setRefreshFlag(prev=>prev+1)
  }

  return (
    <div className="schedule-item">
      <div className="time">{startTime}</div>
      {repeatType == "DAYS" ?
        <div className="frequency-amount">
          {daysOfWeek.join(", ")} | {`${(Number(duration)/60).toFixed(1)} phút`}
        </div>
        :
        <div className="frequency-amount">
          {repeatType == "ONE_TIME" ? "Một lần" : "Mỗi ngày"} | {`${(Number(duration)/60).toFixed(1)} phút`}
        </div>
      }

      <div className="controls">
        <label className="switch" >
          <input   type="checkbox" defaultChecked={status} onChange={(e) => { handleTurnSchedule(deviceId, scheduleId,  e.target.checked) }} />
          <span className="slider round" ></span>
        </label>
        <button className="delete-button" >
          <i className="fas fa-trash-alt"></i>{" "}
          {/* Sử dụng FontAwesome icon cho thùng rác */}
          <img src="/Trash_Schedule.png" alt="" onClick={()=>{handleDeleteSchedule(deviceId, scheduleId)}}/>
        </button>
      </div>
    </div>
  );
}


// Component chính
const ScheduleDevicePage: React.FC = () => {
  const [startTime, setStartTime] = useState<string>("")
  const [duration, setDuration] = useState<number>(0);
  const [repeatType, setRepeatType] = useState<string>("")
  const [daysOfWeek, setDaysOfWeek] = useState<string[]>([])
  const [searchParams] = useSearchParams();
  const deviceName = searchParams.get("device-name") || "";
  const id = searchParams.get("id") || "";
  const [refreshFlag, setRefreshFlag] = useState(0);

  const navigate = useNavigate();

  useEffect(() => { console.log(startTime) }, [startTime])
  const handleBack = () => {
    navigate(`/data_device_page?id=${id}&device-name=${deviceName}`)
  }


  // Định nghĩa min/max cho thanh trượt
  const MIN_DURATION = 0;
  const MAX_DURATION = 100;

  const progressPercent = ((duration - MIN_DURATION) / (MAX_DURATION - MIN_DURATION)) * 100;



  const handleDayToggle = (day: string) => {
    setDaysOfWeek((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };


  const handleCreateSchedule = async (startTime: string, repeatType: string, duration: number, daysOfWeek: string[]) => {
    console.log("data lich tuoi", startTime, repeatType, duration, daysOfWeek)
    const res = await createSchedule(id, { startTime, repeatType, duration, daysOfWeek })
    setRefreshFlag(prev => prev + 1)
    if (res) console.log("Tao lich thanh cong", res)
  }

  {/**Dữ liệu mẫu cho danh sách lịch tướitưới */ }
  const [initialSchedules, setInitialSchedules] = useState<WateringSchedule[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getListSchedule(id);
      console.log(res)
      setInitialSchedules(res.data);
    };

    fetchData();
  }, [refreshFlag]);

  const listDays = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

  return (
    <>

      {/** Back container */}
      <div className="back__container">
        <img src="/arrow_back.png" alt="" onClick={handleBack} />
        <h3>
          Thiết bị: <span>{deviceName}</span>
        </h3>
      </div>
      <br />

      {/** Schedule container */}
      <div className="smartsprout-container">
        {/* Main Content */}
        <div className="main-content">
          <div className="card-layout">
            {/* Card 1: Lịch tưới cây */}
            <div className="card schedule-card">
              <h3 className="card-title" style={{fontFamily:'Open Sans', color:"#166534"}}>
                <i className="far fa-clock"></i> Lịch tưới cây
              </h3>
              {initialSchedules.map((schedule) => (
                <ScheduleItem key={schedule.id} {...schedule} setRefreshFlag={setRefreshFlag} />
              ))}
            </div>

            {/* Card 2: Thêm lịch tưới mới */}
            <div className="card add-schedule-card">
              <h3 className="card-title">
                <i className="far fa-calendar-alt"></i> Thêm lịch tưới mới
              </h3>

              {/* Form */}
              <div className="form-group">
                <label style={{color:"#166534"}}>Thời gian</label>
                <input type="time" className="time-input" onChange={(e) => { setStartTime(e.target.value) }} />
              </div>

              <div className="form-group" >
                <label  style={{color:"#166534"}}>Lặp lại</label>
                <div className="repeat-options">
                  <div className="radio-group">

                    <div className="type-repeat-option">
                      <input type="radio" id="daily" name="repeat" onClick={() => { setRepeatType("ONE_TIME") }} />
                      <label htmlFor="daily"  style={{color:"#166534"}}>Bơm 1 lần</label>
                    </div>

                    <div className="type-repeat-option">
                      <input
                        type="radio"
                        id="every"
                        name="repeat"
                        onClick={() => { setRepeatType("EVERYDAY") }}

                      />
                      <label htmlFor="every"  style={{color:"#166534"}}>Hàng ngày</label>
                    </div>

                  </div>

                  <div className="radio-group">

                    <div className="type-repeat-option">
                      <input type="radio" id="daily" name="repeat" onClick={() => { setRepeatType("DAYS") }} />
                      <label htmlFor="daily"  style={{color:"#166534"}}>Bơm nhiều lần</label>
                    </div>
                    <div className="day-selector">

                     
                      {listDays.map((day) => (
                        <button
                          key={day}
                          className={`day-button ${daysOfWeek.includes(day) ? "selected" : ""
                            }`}
                          onClick={() => handleDayToggle(day)}
                        >
                          {day}
                        </button>
                      ))}
                    </div>

                  </div>


                </div>
              </div>

              <div className="form-group water-amount-group">
                <label  style={{color:"#166534"}}>Thời gian bơm:</label>
                <input
                  type="range"
                  min={MIN_DURATION} // Dùng biến MIN_DURATION
                  max={MAX_DURATION} // Dùng biến MAX_DURATION
                  step="1"
                  value={duration}
                  onChange={(e) => setDuration(parseInt(e.target.value))}
                  className="water-slider"
                  // *** Thêm style động để cập nhật biến CSS ***
                  style={
                    {
                      "--slider-progress": `${progressPercent}%`,
                    } as React.CSSProperties
                  }
                />
                <span className="water-amount-value"  style={{color:"#166534"}}>{`${duration} phút`}</span>
              </div>

              <button className="save-button" onClick={() => handleCreateSchedule(startTime, repeatType, duration*60, daysOfWeek)}>Lưu lịch tưới</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ScheduleDevicePage;
