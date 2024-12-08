#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Array of IPs to test
ips=(
    "139.59.136.192"
    "46.202.155.11"
    "146.59.147.12"
    "76.76.21.21"
)

echo "Starting detailed network latency test..."
echo "Testing each IP with 20 pings..."
echo "=================================="

for ip in "${ips[@]}"; do
    echo -e "${YELLOW}Testing $ip${NC}"
    result=$(ping -c 20 $ip)
    
    # Extract statistics
    stats=$(echo "$result" | tail -1)
    loss=$(echo "$result" | grep -oP '\d+(?=% packet loss)')
    min=$(echo "$stats" | awk '{print $4}' | cut -d '/' -f 1)
    avg=$(echo "$stats" | awk '{print $4}' | cut -d '/' -f 2)
    max=$(echo "$stats" | awk '{print $4}' | cut -d '/' -f 3)
    mdev=$(echo "$stats" | awk '{print $4}' | cut -d '/' -f 4)
    
    # Store results in an array
    echo "$avg|$min|$max|$mdev|$loss|$ip"
done | sort -n | while IFS="|" read avg min max mdev loss ip; do
    echo -e "${GREEN}IP: $ip${NC}"
    echo "  Average: ${avg} ms"
    echo "  Min: ${min} ms"
    echo "  Max: ${max} ms"
    echo "  Jitter: ${mdev} ms"
    echo "  Packet Loss: ${loss}%"
    echo "------------------------"
done
