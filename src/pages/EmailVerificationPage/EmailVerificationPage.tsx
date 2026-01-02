import React, { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import "./EmailVerificationPage.css"
import { sendOTP, verifyOTP } from "../../services/UserService/UserService"

const EmailVerificationPage = () => {
  const navigate = useNavigate()
  const email = localStorage.getItem("email") || ""
  const isVerified = localStorage.getItem("verified") === "true"
  const [otpSent, setOtpSent] = useState(false)
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [countdown, setCountdown] = useState(0)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [countdown])

  const handleSendOTP = async () => {
    setOtpSent(true)
    setCountdown(60) // 60 giây
    // TODO: Gọi API gửi OTP
    await sendOTP(email)
  }

  const handleOTPChange = (index: number, value: string) => {
    if (value.length > 1) return

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Tự động chuyển sang ô tiếp theo
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

  const handleConfirm = async () => {
    const otpCode = otp.join("")
    if (otpCode.length === 6) {
      // TODO: Gọi API xác thực OTP
      await verifyOTP(email, otpCode)
      console.log("OTP:", otpCode)
      // Sau khi xác thực thành công, có thể chuyển về trang config hoặc đổi mật khẩu
      navigate("/config_page")
    }
  }

  const handleResendOTP = () => {
    if (countdown === 0) {
      handleSendOTP()
    }
  }

  const handleGoBack = () => {
    navigate("/config_page")
  }

  const handleReturnToAccount = () => {
    navigate("/config_page")
  }

  // Nếu đã xác thực, hiển thị giao diện thành công
  if (isVerified) {
    return (
      <div className="email-verification-page">
        <div className="email-verification-header">
          <button className="back-button" onClick={handleGoBack}>
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="#5baa3b">
              <path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z" />
            </svg>
          </button>
          <h1 className="page-title">Xác thực email</h1>
        </div>

        <div className="email-verification-content">
          <div className="success-icon">
            <div className="success-icon-background">
              <svg xmlns="http://www.w3.org/2000/svg" height="60" viewBox="0 -960 960 960" width="60" fill="#5baa3b">
                <path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm-80-200 240-240-56-56-184 184-80-80-56 56 136 136Z" />
              </svg>
            </div>
          </div>

          <h2 className="success-title">Xác thực thành công!</h2>

          <div className="success-description">
            <p>Email của bạn đã được xác thực thành công.</p>
            <p>Tài khoản của bạn giờ đã an toàn hơn.</p>
          </div>

          <div className="verified-email-card">
            <div className="verified-email-content">
              <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20" fill="#5baa3b">
                <path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm-80-200 240-240-56-56-184 184-80-80-56 56 136 136Z" />
              </svg>
              <div className="verified-email-info">
                <div className="verified-email-label">Email đã được xác thực</div>
                <div className="verified-email-value">{email}</div>
              </div>
            </div>
          </div>

          <button className="return-account-button" onClick={handleReturnToAccount}>
            Quay về Tài khoản
          </button>
        </div>
      </div>
    )
  }

  // Nếu chưa xác thực, hiển thị giao diện OTP
  return (
    <div className="email-verification-page">
      <div className="email-verification-header">
        <button className="back-button" onClick={handleGoBack}>
          <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="#5baa3b">
            <path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z" />
          </svg>
        </button>
        <h1 className="page-title">Xác thực email</h1>
      </div>

      <div className="email-verification-content">
        <div className="verification-icon">
          <div className="icon-background">
            <svg xmlns="http://www.w3.org/2000/svg" height="60" viewBox="0 -960 960 960" width="60" fill="#2563eb">
              <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z" />
            </svg>
          </div>
          <div className="verification-shield">
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="#ffffff">
              <path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm-80-200 240-240-56-56-184 184-80-80-56 56 136 136Z" />
            </svg>
          </div>
        </div>

        <h2 className="verification-title">Xác thực địa chỉ email</h2>
        <p className="verification-description">
          {otpSent
            ? "Nhập mã OTP đã được gửi đến"
            : "Xác thực email để bảo mật tài khoản của bạn"}
        </p>

        <div className="email-display">
          <div className="email-label">Email của bạn:</div>
          <div className="email-value">{email}</div>
        </div>

        {!otpSent ? (
          <button className="send-otp-button" onClick={handleSendOTP}>
            Gửi mã OTP
          </button>
        ) : (
          <>
            <div className="otp-section">
              <label className="otp-label">Mã OTP</label>
              <div className="otp-inputs" onPaste={handlePaste}>
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => {
                      inputRefs.current[index] = el;
                    }}

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
              onClick={handleConfirm}
              disabled={otp.join("").length !== 6}
            >
              Xác nhận
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default EmailVerificationPage
