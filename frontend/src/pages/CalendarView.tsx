import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./CalendarView.css"

function CalendarView() {
  const [selectedDate, setSelectedDate] = useState<any>(new Date());
  const [shoots, setShoots] = useState<any[]>([]);

  useEffect(() => {
    async function fetchShoots() {
      try {
        const response = await fetch("http://localhost:8000/shoots");
        const data = await response.json();
        setShoots(data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    }

    fetchShoots();
  }, []);

  function formatDate(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  const datesWithShoots = new Set(shoots.map((shoot) => shoot.shoot_date));

  const selectedDateString = formatDate(selectedDate);

  const shootsForSelectedDate = shoots.filter(
    (shoot) => shoot.shoot_date === selectedDateString
  );

  return (
    <div>
      
      <Calendar
        onChange={setSelectedDate}
        value={selectedDate}
        showNeighboringMonth={false}
        tileContent={({ date, view }) => {
          if (view !== "month") return null;

          const formattedDate = formatDate(date);

          if (datesWithShoots.has(formattedDate)) {
            return <div className="calendar-dot" />;
          }

          return null;
        }}
      />

      <div style={{ marginTop: "2rem" }}>
        <h3>Shoots for {selectedDateString}</h3>

        {shootsForSelectedDate.length === 0 ? (
          <p>No shoots on this date.</p>
        ) : (
          <div className="shoots-container">
            {shootsForSelectedDate.map((shoot) => (
              <div key={shoot.id} className="shoot-card">
                <img
                  src={`http://localhost:8000${shoot.image_path}`}
                  alt={shoot.title}
                  className="shoot-image"
                />

                <div className="shoot-content">
                  <h2>{shoot.title}</h2>

                  <p className="meta">
                    {shoot.location} · {shoot.shoot_date}
                  </p>

                  <p className="description">{shoot.description}</p>
                  <p className="meta">
                    Status:{" "}
                    {shoot.status.charAt(0).toUpperCase() +
                      shoot.status.slice(1)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default CalendarView;