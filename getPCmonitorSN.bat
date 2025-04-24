@echo off
setlocal enabledelayedexpansion
chcp 65001 >nul
REM bat default is ANSI(gbk) set to utf-8


REM 版本号 10.0.XXXXX.YY
for /f "tokens=2 delims=[]" %%a in ('ver') do (
  for /f "tokens=2 delims= " %%b in ("%%a") do (
   set "version_str=%%b"
  )
)
REM echo !version_str!
for /f "tokens=1 delims=. " %%c in ("%version_str%") do (
    set "os_num=%%c"
)
REM echo !os_num!
for /f "tokens=3 delims=. " %%d in ("%version_str%") do (
  set "build_num=%%d"
)

where pwsh >nul 2>nul
if %errorlevel% equ 0 (
    echo "use PowerShell 7(pwsh)"
    set ps=pwsh
    !ps! -Command ^
    "$PCInfo = Get-CimInstance -ClassName Win32_BIOS | Select-Object -ExpandProperty SerialNumber;Write-Host 'PC Serial Number:' $PCInfo; $monitorInfo = Get-CimInstance -Namespace root\wmi -ClassName WmiMonitorID; if ($monitorInfo) { foreach ($monitor in $monitorInfo) { $serialNumber = [System.Text.Encoding]::ASCII.GetString($monitor.SerialNumberID); if ($serialNumber -ne 0 -and $serialNumber -ne 1) { Write-Host 'Monitor Serial Number:' $serialNumber; } } } else { Write-Host 'No monitor information found.'; };"
) else (
  set ps=powershell
  if %os_num%==10 (
    if %build_num% geq 22000 (
      REM Win11
      !ps! -NoProfile -ExecutionPolicy Bypass -Command "$PCInfo = Get-CimInstance -ClassName Win32_BIOS | Select-Object -ExpandProperty SerialNumber;Write-Host 'PC Serial Number:' $PCInfo; $monitorInfo = Get-CimInstance -Namespace root\wmi -ClassName WmiMonitorID; if ($monitorInfo) { foreach ($monitor in $monitorInfo) { $serialNumber = [System.Text.Encoding]::ASCII.GetString($monitor.SerialNumberID); if ($serialNumber -ne 0 -and $serialNumber -ne 1) { Write-Host 'Monitor Serial Number:' $serialNumber; } } } else { Write-Host 'No monitor information found.'; };"
    ) else (
      echo Win 10/Server 不装 PowerShell 7 无法获取显示器 SN
      REM Win10 or Server 2019/2022
      !ps! -NoProfile -ExecutionPolicy Bypass -Command "$PCInfo = Get-CimInstance -ClassName Win32_BIOS | Select-Object -ExpandProperty SerialNumber;Write-Host 'PC Serial Number:' $PCInfo;"
    )
  )
)
pause