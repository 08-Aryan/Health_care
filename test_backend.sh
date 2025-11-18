#!/bin/bash
echo "Testing Backend API..."
echo ""
echo "1. Testing Public Articles:"
curl -s http://localhost:5000/api/public/articles
echo ""
echo ""
echo "2. Testing Auth Endpoints:"
echo "Register test user:"
curl -s -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Patient","email":"test@test.com","password":"test123","role":"patient","consentGiven":true}'
echo ""
