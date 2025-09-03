#!/bin/bash
# FAA.zone™ SCROLL BACKEND STARTUP SCRIPT

echo "🚀 Starting FAA.zone™ Python Scroll Backend..."
echo "🧬 VaultMesh integration with cryptographic validation"
echo "📜 ClaimRoot licensing and TreatySync processing"

# Kill any existing Python backend processes
pkill -f "python3 main.py"

# Start Python FastAPI backend on port 3000
python3 main.py &
PYTHON_PID=$!

echo "✅ Python Scroll Backend started on port 3000 (PID: $PYTHON_PID)"
echo "🌍 VOORWAARD MARS planetary motion protocol active"
echo "🔗 Backend endpoints:"
echo "   - http://localhost:3000/api/treaty-sync/intake"
echo "   - http://localhost:3000/api/claimroot/generate"
echo "   - http://localhost:3000/api/vaultmesh/status"
echo "   - http://localhost:3000/api/scroll/pulse"

# Keep script running
wait $PYTHON_PID