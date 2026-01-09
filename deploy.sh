#!/bin/bash
cd /Users/invinciblelude/bianchi-tillett
rm -rf .git
git init
git add -A
git commit -m "Portfolio redesign - Vista Lake style"
git remote add origin https://github.com/Invinciblelude/bianchi-tillett.git
git branch -M main
git push -u origin main --force
echo "Done!"
