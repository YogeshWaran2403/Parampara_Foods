# Parampara Foods - Quick Start Guide

## 🚀 Quick Start

### One-Click Setup
```bash
# Method 1: Command Line
scripts\start.bat

# Method 2: Cursor Integration
Ctrl+Shift+P → "Tasks: Run Task" → "Start All Services"

# Method 3: Keyboard Shortcut
Ctrl+Shift+S
```
**This script will:**
- Stop any existing processes
- Start backend on port 8080 (mobile accessible)
- Start frontend on port 3000 (mobile accessible)
- Show all access URLs
- Open frontend QR code in browser automatically

## 📋 Available Scripts

### 🚀 **Main Scripts**
```bash
# Start both frontend and backend (shows frontend QR in browser)
scripts\start.bat                    # OR Ctrl+Shift+S

# Backend Development (stop, edit, restart - no seeding)
scripts\backend-dev.bat              # OR Ctrl+Shift+B

# Reset Database (drop + recreate + seed fresh data)
scripts\reset.bat                    # OR Ctrl+Shift+R

# Stop All Services
scripts\stop.bat                     # OR Ctrl+Shift+X

# Show QR Codes for Mobile Access
scripts\show-qr.bat                  # OR Ctrl+Shift+Q
```

### 🎯 **Cursor Integration**
- **Command Palette**: `Ctrl+Shift+P` → "Tasks: Run Task"
- **Keyboard Shortcuts**: See shortcuts above
- **Debug Panel**: `Ctrl+Shift+D` → Select configuration
- **Terminal Menu**: Terminal → Run Task

## 🔄 Development Workflow

### 🎯 **Simple Development Flow:**

#### **First Time Setup:**
```bash
scripts\start.bat
```
- Starts both frontend and backend
- Opens frontend QR code in browser automatically
- Database seeds only if empty

#### **Frontend Development:**
```bash
# Start once, then just edit files - hot reload works automatically!
# NO need to stop/restart frontend for changes
```

#### **Backend Development:**
```bash
scripts\backend-dev.bat
```
- Stops backend
- Edit your backend code
- Restarts backend (no seeding unless database empty)

#### **Reset Database:**
```bash
scripts\reset.bat
```
- Drops database completely
- Recreates fresh database
- Seeds with fresh data

#### **Stop Everything:**
```bash
scripts\stop.bat
```

### ✅ **Key Points:**
- **Frontend**: Start once, hot reload works - NO restart needed for edits!
- **Backend**: Stop → Edit → Run (no seeding unless database empty)
- **Database**: Smart seeding - only runs if database is empty
- **Mobile**: Frontend QR code opens automatically in browser with `start.bat`

## 📱 Access URLs

### Local Access
- **Frontend**: `http://localhost:3000`
- **Backend**: `http://localhost:8080`
- **Swagger**: `http://localhost:8080/swagger`

### Mobile Access (Auto-Detected)
- **Frontend**: `http://[YOUR_IP]:3000` (IP auto-detected by scripts)
- **Backend**: `http://[YOUR_IP]:8080` (IP auto-detected by scripts)
- **Note**: IP address changes with network - scripts auto-detect it

### 🔍 How IP Detection Works
The scripts automatically detect your current network IP address using `ipconfig`. This works on:
- **Home networks**: Usually `192.168.1.x` or `192.168.0.x`
- **Office networks**: Usually `10.x.x.x` or `172.16.x.x`
- **Mobile hotspots**: Usually `192.168.43.x` or `192.168.137.x`
- **Any network**: Scripts adapt automatically

### 📱 Easy Mobile Access with QR Codes
```bash
# Show QR codes for easy mobile access
scripts\show-qr.bat
```
**Benefits:**
- ✅ **No typing needed** - Just scan QR code with phone camera
- ✅ **Auto-detects IP** - Works on any network
- ✅ **Frontend focused** - Perfect for mobile app testing
- ✅ **User-friendly** - Perfect for demos and testing

## 🔑 Test Credentials
- **Admin**: `admin@parampara.com` / `Admin123!`
- **User**: `user@parampara.com` / `User123!`

## 🚨 Troubleshooting

### Port Issues:
```bash
scripts\stop.bat
scripts\start.bat
```

### Backend Not Starting:
1. Run `scripts\stop.bat`
2. Run `scripts\start.bat`

### Frontend Not Starting:
1. Run `scripts\stop.bat`
2. Run `scripts\start.bat`

## 📊 Project Status
- ✅ **Frontend**: React + TypeScript + Vite
- ✅ **Backend**: ASP.NET Core 8 + SQL Server
- ✅ **Mobile Access**: Both services accessible on network
- ✅ **Database**: Auto-seeded with sample data
- ✅ **Authentication**: JWT + Role-based access

---
**Remember**: Always use the scripts for consistent setup!