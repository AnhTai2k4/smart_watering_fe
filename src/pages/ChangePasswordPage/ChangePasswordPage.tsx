import React, { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import "./ChangePasswordPage.css"
import { sendOTP, verifyOTP, changePassword } from "../../services/UserService/UserService"

type Step = "sendOTP" | "verifyOTP" | "changePassword"

const ChangePasswordPage = () => {
  const navigate = useNavigate()
  const email = localStorage.getItem("email") || ""
  const isVerified = localStorage.getItem("verified") === "true"
  const [step, setStep] = useState<Step>("sendOTP")
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [countdown, setCountdown] = useState(0)
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [countdown])

  const handleSendOTP = async () => {
    try {
      setLoading(true)
      await sendOTP(email)
      setStep("verifyOTP")
      setCountdown(60)
    } catch (error) {
      console.error("Lỗi khi gửi OTP:", error)
      alert("Có lỗi xảy ra khi gửi OTP")
    } finally {
      setLoading(false)
    }
  }

  const handleOTPChange = (index: number, value: string) => {
    if (value.length > 1) return
    
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleOTPKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text").slice(0, 6)
    const newOtp = [...otp]
    for (let i = 0; i < pastedData.length; i++) {
      if (/^\d$/.test(pastedData[i])) {
        newOtp[i] = pastedData[i]
      }
    }
    setOtp(newOtp)
    const nextIndex = Math.min(pastedData.length, 5)
    inputRefs.current[nextIndex]?.focus()
  }

  const handleVerifyOTP = async () => {
    const otpCode = otp.join("")
    if (otpCode.length !== 6) {
      alert("Vui lòng nhập đầy đủ 6 số OTP")
      return
    }

    try {
      setLoading(true)
      await verifyOTP(email, otpCode)
      setStep("changePassword")
    } catch (error) {
      console.error("Lỗi khi xác thực OTP:", error)
      alert("Mã OTP không đúng. Vui lòng thử lại.")
    } finally {
      setLoading(false)
    }
  }

  const handleResendOTP = () => {
    if (countdown === 0) {
      handleSendOTP()
    }
  }

  const handleChangePassword = async () => {
    if (!newPassword || !confirmPassword) {
      alert("Vui lòng nhập đầy đủ thông tin")
      return
    }

    if (newPassword.length < 8) {
      alert("Mật khẩu phải có ít nhất 8 ký tự")
      return
    }

    if (newPassword !== confirmPassword) {
      alert("Mật khẩu mới và xác nhận mật khẩu không khớp")
      return
    }

    const otpCode = otp.join("")
    if (!otpCode) {
      alert("Vui lòng xác thực OTP trước")
      return
    }

    try {
      setLoading(true)
      await changePassword(email, newPassword, confirmPassword, otpCode)
      alert("Đổi mật khẩu thành công!")
      navigate("/config_page")
    } catch (error: any) {
      console.error("Lỗi khi đổi mật khẩu:", error)
      alert(error.response?.data?.message || "Có lỗi xảy ra khi đổi mật khẩu")
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyEmail = () => {
    navigate("/email_verification_page")
  }

  const handleGoBack = () => {
    if (step === "sendOTP") {
      navigate("/config_page")
    } else if (step === "verifyOTP") {
      setStep("sendOTP")
      setOtp(["", "", "", "", "", ""])
    } else {
      setStep("verifyOTP")
    }
  }

  // Nếu chưa xác thực, hiển thị giao diện yêu cầu xác thực
  if (!isVerified) {
    return (
      <div className="change-password-page">
        <div className="change-password-header">
          <button className="back-button" onClick={handleGoBack}>
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="#5baa3b">
              <path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z"/>
            </svg>
          </button>
          <h1 className="page-title">Đổi mật khẩu</h1>
        </div>

        <div className="change-password-content">
          <div className="warning-icon">
            <svg xmlns="http://www.w3.org/2000/svg" height="60" viewBox="0 -960 960 960" width="60" fill="#f97316">
              <path d="M480-280q17 0 28.5-11.5T520-320q0-17-11.5-28.5T480-360q-17 0-28.5 11.5T440-320q0 17 11.5 28.5T480-280Zm-40-160h80v-240h-80v240Zm40 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/>
            </svg>
          </div>

          <h2 className="warning-title">Tài khoản chưa xác thực</h2>
          <p className="warning-message">Vui lòng xác thực email để tiếp tục đổi mật khẩu</p>

          <div className="email-card">
            <div className="email-label">Email của bạn:</div>
            <div className="email-value">{email}</div>
            <div className="email-status">
              <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 -960 960 960" width="16" fill="#f97316">
                <path d="M480-280q17 0 28.5-11.5T520-320q0-17-11.5-28.5T480-360q-17 0-28.5 11.5T440-320q0 17 11.5 28.5T480-280Zm-40-160h80v-240h-80v240Zm40 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/>
              </svg>
              <span>Chưa được xác thực</span>
            </div>
          </div>

          <button className="verify-email-button" onClick={handleVerifyEmail}>
            <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20" fill="#ffffff">
              <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z"/>
            </svg>
            <span>Xác thực email ngay</span>
          </button>

          <button className="go-back-button" onClick={handleGoBack}>
            Quay lại
          </button>
        </div>
      </div>
    )
  }

  // Nếu đã xác thực, hiển thị flow đổi mật khẩu
  return (
    <div className="change-password-page">
      <div className="change-password-header">
        <button className="back-button" onClick={handleGoBack}>
          <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="#5baa3b">
            <path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z"/>
          </svg>
        </button>
        <h1 className="page-title">Đổi mật khẩu</h1>
      </div>

      <div className="change-password-content">
        {step === "sendOTP" && (
          <>
            <div className="otp-icon">
              <div className="otp-icon-background">
                <svg xmlns="http://www.w3.org/2000/svg" height="60" viewBox="0 -960 960 960" width="60" fill="#5baa3b">
                  <path d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm0-480h480v400H240v-400Zm240 360q33 0 56.5-23.5T560-320q0-33-23.5-56.5T480-400q-33 0-56.5 23.5T400-320q0 33 23.5 56.5T480-240ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80Z"/>
                </svg>
              </div>
            </div>

            <h2 className="otp-title">Xác thực OTP</h2>

            <button 
              className="send-otp-button" 
              onClick={handleSendOTP}
              disabled={loading}
            >
              {loading ? "Đang gửi..." : "Gửi mã OTP"}
            </button>
          </>
        )}

        {step === "verifyOTP" && (
          <>
            <div className="otp-icon">
              <div className="otp-icon-background">
                <svg xmlns="http://www.w3.org/2000/svg" height="60" viewBox="0 -960 960 960" width="60" fill="#5baa3b">
                  <path d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm0-480h480v400H240v-400Zm240 360q33 0 56.5-23.5T560-320q0-33-23.5-56.5T480-400q-33 0-56.5 23.5T400-320q0 33 23.5 56.5T480-240ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80Z"/>
                </svg>
              </div>
            </div>

            <h2 className="otp-title">Xác thực OTP</h2>
            <p className="otp-description">Nhập mã OTP đã được gửi đến</p>
            <p className="otp-email">{email}</p>

            <div className="otp-section">
              <label className="otp-label">Mã OTP</label>
              <div className="otp-inputs" onPaste={handlePaste}>
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOTPChange(index, e.target.value)}
                    onKeyDown={(e) => handleOTPKeyDown(index, e)}
                    className="otp-input"
                  />
                ))}
              </div>
              <div className="resend-otp">
                {countdown > 0 ? (
                  <span>Gửi lại mã sau {countdown}s</span>
                ) : (
                  <button className="resend-button" onClick={handleResendOTP}>
                    Gửi lại mã
                  </button>
                )}
              </div>
            </div>

            <button 
              className={`confirm-button ${otp.join("").length === 6 ? "confirm-button--active" : ""}`}
              onClick={handleVerifyOTP}
              disabled={otp.join("").length !== 6 || loading}
            >
              {loading ? "Đang xác thực..." : "Xác nhận"}
            </button>
          </>
        )}

        {step === "changePassword" && (
          <>
            <div className="key-icon">
              <div className="key-icon-background">
                <svg xmlns="http://www.w3.org/2000/svg" height="60" viewBox="0 -960 960 960" width="60" fill="#5baa3b">
                  <path d="M280-400q-33 0-56.5-23.5T200-480q0-33 23.5-56.5T280-560q33 0 56.5 23.5T360-480q0 33-23.5 56.5T280-400Zm0 160q-100 0-170-70T40-480q0-100 70-170t170-70q77 0 139 44t87 116h314l120 120-180 180-82-82-68 68-68-68 68-68h-48v-80h-80v80h-48q-20 72-79 116t-139 44Zm0-80q66 0 113-47t47-113q0-66-47-113t-113-47q-66 0-113 47t-47 113q0 66 47 113t113 47Z"/>
                </svg>
              </div>
            </div>

            <h2 className="password-title">Mật khẩu mới</h2>
            <p className="password-description">Tạo mật khẩu mới cho tài khoản của bạn</p>

            <div className="password-form">
              <label className="form-label">Mật khẩu mới</label>
              <div className="password-input-wrapper">
                <input 
                  type={showPassword ? "text" : "password"} 
                  className="form-input" 
                  placeholder="Nhập mật khẩu mới"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <button 
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20" fill="#6b7280">
                      <path d="M480-320q75 0 127.5-52.5T660-500q0-7-1-14.5t-3-13.5l104 104q47 35 91 80t91 95l-44 44-91-81q-51 19-104 25t-109 6q-137 0-248-76.5T131-324q-20-35-35.5-68.5T80-460l44-44q26 11 54 27t58 33q14-28 38-52t52-38L480-600v80q0 8 1.5 14.5t3.5 13.5l104-104q-47-35-91-80t-91-95l44-44q91 81 104 25t109 6q8 0 15.5.5t14.5 1.5l-104 104q7 2 14.5 3t13.5 1q75 0 127.5 52.5T660-500q0 7-1 14.5t-3 13.5l-104-104q-14-28-38-52t-52-38l-82-82 44-44q91 81 91 95l-44 44-91-81q-51-19-104-25t-109-6q-8 0-15.5-.5T480-640v80q0 8-1.5 14.5t-3.5 13.5l-104 104q47 35 91 80t91 95l-44 44q-91-81-91-95Z"/>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20" fill="#6b7280">
                      <path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-80q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29Zm0 240q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z"/>
                    </svg>
                  )}
                </button>
              </div>
              <p className="password-hint">Mật khẩu phải có ít nhất 8 ký tự</p>

              <label className="form-label">Nhập lại mật khẩu mới</label>
              <div className="password-input-wrapper">
                <input 
                  type={showConfirmPassword ? "text" : "password"} 
                  className="form-input" 
                  placeholder="Nhập lại mật khẩu mới"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button 
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20" fill="#6b7280">
                      <path d="M480-320q75 0 127.5-52.5T660-500q0-7-1-14.5t-3-13.5l104 104q47 35 91 80t91 95l-44 44-91-81q-51 19-104 25t-109 6q-137 0-248-76.5T131-324q-20-35-35.5-68.5T80-460l44-44q26 11 54 27t58 33q14-28 38-52t52-38L480-600v80q0 8 1.5 14.5t3.5 13.5l104-104q-47-35-91-80t-91-95l44-44q91 81 104 25t109 6q8 0 15.5.5t14.5 1.5l-104 104q7 2 14.5 3t13.5 1q75 0 127.5 52.5T660-500q0 7-1 14.5t-3 13.5l-104-104q-14-28-38-52t-52-38l-82-82 44-44q91 81 91 95l-44 44-91-81q-51-19-104-25t-109-6q-8 0-15.5-.5T480-640v80q0 8-1.5 14.5t-3.5 13.5l-104 104q47 35 91 80t91 95l-44 44q-91-81-91-95Z"/>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20" fill="#6b7280">
                      <path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-80q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29Zm0 240q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z"/>
                    </svg>
                  )}
                </button>
              </div>

              <button 
                className="submit-button" 
                onClick={handleChangePassword}
                disabled={loading}
              >
                {loading ? "Đang đổi mật khẩu..." : "Đổi mật khẩu"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default ChangePasswordPage
