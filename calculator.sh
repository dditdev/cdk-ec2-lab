#!/bin/bash

# Standard Calculator Script

echo "================================="
echo "      Bash Calculator"
echo "================================="

while true
do
    echo ""
    echo "Select an operation:"
    echo "1) Addition (+)"
    echo "2) Subtraction (-)"
    echo "3) Multiplication (*)"
    echo "4) Division (/)"
    echo "5) Exit"

    read -p "Enter your choice (1-5): " choice

    if [ "$choice" -eq 5 ]; then
        echo "Exiting calculator..."
        break
    fi

    if [[ "$choice" -lt 1 || "$choice" -gt 5 ]]; then
        echo "Invalid option. Please try again."
        continue
    fi

    read -p "Enter first number: " num1
    read -p "Enter second number: " num2

    case $choice in
        1)
            result=$(echo "$num1 + $num2" | bc)
            echo "Result: $num1 + $num2 = $result"
            ;;
        2)
            result=$(echo "$num1 - $num2" | bc)
            echo "Result: $num1 - $num2 = $result"
            ;;
        3)
            result=$(echo "$num1 * $num2" | bc)
            echo "Result: $num1 * $num2 = $result"
            ;;
        4)
            if [ "$num2" = "0" ]; then
                echo "Error: Division by zero is not allowed."
            else
                result=$(echo "scale=2; $num1 / $num2" | bc)
                echo "Result: $num1 / $num2 = $result"
            fi
            ;;
    esac
done
