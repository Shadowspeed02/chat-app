# Chat App Development Server Starter
# PowerShell script to start both client and server

Write-Host "Starting Chat App Development Servers..." -ForegroundColor Green
Write-Host ""

# Start the server in a new window
Write-Host "Starting Server on port 5000..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd server; npm run server" -WindowStyle Normal

# Wait a moment for the server to start
Start-Sleep -Seconds 2

# Start the client in a new window
Write-Host "Starting Client on port 3000..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd client; npm run dev" -WindowStyle Normal

Write-Host ""
Write-Host "Both servers are starting..." -ForegroundColor Green
Write-Host "Server: http://localhost:5000" -ForegroundColor Cyan
Write-Host "Client: http://localhost:3000" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press any key to close this window..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
