# 🎲 Tenzies Game (React)

A simple yet fun implementation of the classic **Tenzies** dice game built with React.

## 🕹️ Game Objective

The goal is to **get all 9 dice to show the same value**. You can "hold" dice to prevent them from rolling while continuing to roll the rest.

---

## 📋 How to Play

- The game starts with **9 dice**, each showing a random number from 1 to 6.
- Click on a die to **hold** it.
- Click the **Roll** button to re-roll all **non-held** dice.
- When **all dice are held** and show the **same value**, you win — and **confetti** appears 🎉.
- The game tracks your **number of rolls** and **elapsed time**.
- You can click **Reset** at any time to unhold all dice and reset the roll count and timer.

---

## 🧩 Features

- ⏱️ Live timer
- 🔢 Roll counter
- 🎉 Confetti animation on win
- 📱 Mobile-friendly layout
- ⚙️ Clean state management with `useState`, `useCallback`, and a custom hook

---

## 🖼️ Screenshot

![Game Screenshot](./desktop.png)
