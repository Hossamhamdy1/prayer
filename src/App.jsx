import React, { useEffect, useState } from 'react'
import './App.css'
import Prayer from './component/prayer'
import axios from 'axios'

export default function App() {
  const [prayerList, setPrayerList] = useState({})
  const [city, setCity] = useState("Cairo")
  const [date, setDate] = useState("05-04-2025") 

const formattime = (time) => {
if(!time){
  return "00:00"
}
let[hours , minutes] = time.split(":").map(Number)
const perd = hours >= 12 ? "PM" : "AM";
hours = hours % 12 || 12;
return`${hours}:${minutes < 10 ? "0" + minutes : minutes} ${perd}`
}

  function getPrayer() {
    axios.get(`https://api.aladhan.com/v1/timingsByCity/${date}?city=Eg&country=${city}`)
      .then((req) => {
        setPrayerList(req.data.data.timings)
        setDate(req.data.data.date.gregorian.date	)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  useEffect(() => {
    getPrayer()
  }, [city])

  return (
    <section>
      <div className='container'>
        <div className='toplevel'>
          <div className="city">
            <h3>المدينة</h3>
            <select onChange={(e) => setCity(e.target.value)} value={city}>
              <option value="Cairo">القاهرة</option>
              <option value="Alexandria">الإسكندرية</option>
              <option value="Giza">الجيزة</option>
              <option value="Aswan">أسوان</option>
              <option value="Luxor">الأقصر</option>
              <option value="Mansoura">المنصورة</option>
            </select>
          </div>

          <div className="date">
            <h3>التاريخ</h3>
            <h4>{date}</h4> 
          </div>
        </div>


        <Prayer name="الفجر:" time={ formattime(prayerList.Fajr)}/>
        <Prayer name="الظهر:" time={ formattime(prayerList.Dhuhr)}/>
        <Prayer name="العصر:" time={ formattime(prayerList.Asr)}/>
        <Prayer name="المغرب:" time={ formattime(prayerList.Maghrib)}/>
        <Prayer name="العشاء:" time={ formattime(prayerList.Isha)}/>
      </div>
    </section>
  )
}


