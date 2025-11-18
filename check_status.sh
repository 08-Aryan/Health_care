#!/bin/bash

echo "==========================================="
echo "Healthcare Wellness Portal - Status Check"
echo "==========================================="
echo ""

# Check if backend is running
echo "1. Checking Backend on Port 5000..."
if curl -s http://localhost:5000/api/public/articles > /dev/null 2>&1; then
    echo "   Backend is running on http://localhost:5000"
else
    echo "   Backend is NOT running"
fi
echo ""

# Check if frontend is running
echo "2. Checking Frontend on Ports 5173 or 5174..."
if curl -s http://localhost:5173 > /dev/null 2>&1; then
    echo "   Frontend is running on http://localhost:5173"
elif curl -s http://localhost:5174 > /dev/null 2>&1; then
    echo "   Frontend is running on http://localhost:5174"
else
    echo "   Frontend is NOT running"
fi
echo ""

echo "==========================================="
echo "To start the servers:"
echo ""
echo "Backend:  cd backend && npm run dev"
echo "Frontend: cd frontend && npm run dev"
echo "==========================================="
