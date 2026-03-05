const express = require("express")
const { createClient } = require("redis")
const { v4: uuidv4 } = require("uuid")

const app = express()

// middleware
app.use(express.json())
app.use(express.static("public"))

// Redis connection
const redis = createClient({
  url: process.env.REDIS_URL || "redis://localhost:6379"
})

redis.on("error", (err) => {
  console.log("Redis Error:", err)
})

async function connectRedis() {
  await redis.connect()
  console.log("Redis Connected")
}

connectRedis()

// total seats
const TOTAL_SEATS = 100

// initialize seat count
async function initSeats() {

  const exists = await redis.exists("available_seats")

  if (!exists) {
    await redis.set("available_seats", TOTAL_SEATS)
  }

}

initSeats()

// ===========================
// BOOK SEAT API
// ===========================

app.post("/api/book", async (req, res) => {

  const lockKey = "seat_lock"
  const lockId = uuidv4()

  try {

    // acquire redis lock
    const lock = await redis.set(lockKey, lockId, {
      NX: true,
      PX: 3000
    })

    if (!lock) {

      return res.status(429).json({
        success: false,
        msg: "System Busy - Try Again"
      })

    }

    // get available seats
    let seats = await redis.get("available_seats")
    seats = parseInt(seats)

    // check if house full
    if (seats <= 0) {

      await redis.del(lockKey)

      return res.json({
        success: false,
        msg: "House Full"
      })

    }

    // book seat
    seats = seats - 1
    await redis.set("available_seats", seats)

    // release lock
    await redis.del(lockKey)

    res.json({
      success: true,
      bookingId: Date.now(),
      remaining: seats
    })

  } catch (err) {

    console.log(err)

    res.status(500).json({
      error: "Server Error"
    })

  }

})


// ===========================
// RESET SEATS API
// ===========================

app.post("/api/reset", async (req, res) => {

  try {

    await redis.set("available_seats", TOTAL_SEATS)

    res.json({
      success: true,
      msg: "Seats Reset Successfully",
      total: TOTAL_SEATS
    })

  } catch (err) {

    console.log(err)

    res.status(500).json({
      error: "Reset Failed"
    })

  }

})


// ===========================
// GET REMAINING SEATS
// ===========================

app.get("/api/seats", async (req, res) => {

  const seats = await redis.get("available_seats")

  res.json({
    remaining: parseInt(seats)
  })

})


// ===========================
// START SERVER
// ===========================

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {

  console.log(`Booking system running on port ${PORT}`)

})