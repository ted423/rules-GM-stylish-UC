@echo off
setlocal enabledelayedexpansion
chcp 65001 >nul
REM bat default is ANSI(gbk) set to utf-8

echo 脚本很可能需要管理员权限才能获取显示器SN

where pwsh >nul 2>nul
if %errorlevel% equ 0 (
    echo "use PowerShell 7(pwsh)"
    set ps=pwsh
    !ps! -Command ^
    "$PCInfo = Get-CimInstance -ClassName Win32_BIOS | Select-Object -ExpandProperty SerialNumber;Write-Host 'PC Serial Number:' $PCInfo; $monitorInfo = Get-CimInstance -Namespace root\wmi -ClassName WmiMonitorID; if ($monitorInfo) { foreach ($monitor in $monitorInfo) { $serialNumber = [System.Text.Encoding]::ASCII.GetString($monitor.SerialNumberID); if ($serialNumber -ne 0 -and $serialNumber -ne 1) { Write-Host 'Monitor Serial Number:' $serialNumber; } } } else { Write-Host 'No monitor information found.'; };"
) else (
  set ps=powershell
  !ps! -NoProfile -ExecutionPolicy Bypass -Command "$PCInfo = Get-CimInstance -ClassName Win32_BIOS | Select-Object -ExpandProperty SerialNumber;Write-Host 'PC Serial Number:' $PCInfo; $monitorInfo = Get-CimInstance -Namespace root\wmi -ClassName WmiMonitorID; if ($monitorInfo) { foreach ($monitor in $monitorInfo) { $serialNumber = [System.Text.Encoding]::ASCII.GetString($monitor.SerialNumberID); if ($serialNumber -ne 0 -and $serialNumber -ne 1) { Write-Host 'Monitor Serial Number:' $serialNumber; } } } else { Write-Host 'No monitor information found.'; };"
)
pause