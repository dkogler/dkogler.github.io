#!/bin/bash
read -p "Enter Your GitHub Username: "  username
read -s -p "Enter Your GitHub Password: "  password

cd ..
git clone https://${username}:${password}@github.com/operationspark/circularity
git clone https://github.com/operationspark/first-website
git clone https://github.com/operationspark/portfolio
git clone https://github.com/operationspark/platformer
git clone https://github.com/operationspark/bouncing-box
cd first-website
rm -rf .git* .master
cd ../portfolio
rm -rf .git* .master
cd ../platformer
rm -rf .git* .master
bower install
cd ../bouncing-box
rm -rf .git* .master
cd ../circularity
rm -rf .git* .master
bower install
cd ..
rm -rf .git* .master
clear
