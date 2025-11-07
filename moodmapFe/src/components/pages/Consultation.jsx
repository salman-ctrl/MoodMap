import { useState } from 'react';
import { Calendar, Clock, Video, MapPin, CheckCircle2 } from 'lucide-react';

const counselors = [
  {
    name: 'Dr. Emily Chen',
    specialization: 'Anxiety & Stress Management',
    experience: '8 years',
    rating: 4.9,
    available: true,
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&q=80'
  },
  {
    name: 'Dr. Michael Torres',
    specialization: 'Academic Pressure & Performance',
    experience: '12 years',
    rating: 4.8,
    available: true,
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop&q=80'
  },
  {
    name: 'Dr. Sarah Williams',
    specialization: 'Depression & Mood Disorders',
    experience: '10 years',
    rating: 5.0,
    available: false,
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=100&h=100&fit=crop&q=80'
  },
  {
    name: 'Dr. James Patterson',
    specialization: 'Relationship & Social Issues',
    experience: '6 years',
    rating: 4.7,
    available: true,
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=100&h=100&fit=crop&q=80'
  },
];

const upcomingSessions = [
  {
    counselor: 'Dr. Emily Chen',
    date: 'Oct 28, 2025',
    time: '2:00 PM',
    type: 'Video Call',
  },
  {
    counselor: 'Dr. Michael Torres',
    date: 'Nov 5, 2025',
    time: '10:30 AM',
    type: 'In-Person',
  },
];

export default function Consultation() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedCounselor, setSelectedCounselor] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [sessionType, setSessionType] = useState('');
  const [notes, setNotes] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);

  const formatDate = (date) => {
    if (!date) return 'Pick a date';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  const handleDateSelect = (day) => {
    const today = new Date();
    const selected = new Date(today.getFullYear(), today.getMonth(), day);
    setSelectedDate(selected);
    setShowCalendar(false);
  };

  const handleBooking = () => {
    if (!selectedCounselor || !selectedDate || !selectedTime || !sessionType) {
      alert('Please fill in all required fields');
      return;
    }
    alert(`Booking confirmed with ${selectedCounselor} on ${formatDate(selectedDate)} at ${selectedTime}`);
  };

  return (
    <div className="p-8 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-[#1C1E4A] mb-2">Consultation</h1>
          <p className="text-[#4B4E82]">Connect with campus psychologists for support</p>
        </div>

        {/* Upcoming Sessions */}
        {upcomingSessions.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-[#1C1E4A]">Upcoming Sessions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {upcomingSessions.map((session, index) => (
                <div
                  key={index}
                  className="p-5 rounded-2xl border border-[#8386B0]/20 shadow-sm"
                  style={{
                    background: 'linear-gradient(135deg, rgba(52, 84, 245, 0.05) 0%, rgba(203, 166, 247, 0.05) 100%)',
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-[#1C1E4A] mb-1">{session.counselor}</h3>
                      <div className="flex items-center gap-4 text-[#4B4E82] text-sm">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {session.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {session.time}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#3454F5]/10 text-[#3454F5] text-xs">
                      {session.type === 'Video Call' ? <Video className="w-3 h-3" /> : <MapPin className="w-3 h-3" />}
                      {session.type}
                    </div>
                  </div>
                  <button 
                    className="w-full py-2 bg-gradient-to-r from-[#3454F5] to-[#CBA6F7] text-white rounded-xl shadow-lg hover:shadow-xl transition-all font-medium"
                  >
                    Join Session
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Available Counselors */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-2xl font-semibold text-[#1C1E4A]">Available Counselors</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {counselors.map((counselor, index) => (
                <div
                  key={index}
                  className="p-5 rounded-2xl border border-[#8386B0]/20 shadow-sm hover:shadow-md transition-all"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(203, 166, 247, 0.05) 100%)',
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  <div className="flex gap-4">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#3454F5] to-[#CBA6F7] flex-shrink-0 overflow-hidden">
                      <img
                        src={counselor.image}
                        alt={counselor.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.parentElement.innerHTML = '<div class="w-full h-full flex items-center justify-center text-white text-xl font-bold">' + counselor.name.charAt(0) + '</div>';
                        }}
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-base font-semibold text-[#1C1E4A] mb-1">{counselor.name}</h3>
                      <p className="text-[#4B4E82] text-xs mb-2">{counselor.specialization}</p>
                      <div className="flex items-center gap-2 text-xs text-[#8386B0]">
                        <span>⭐ {counselor.rating}</span>
                        <span>•</span>
                        <span>{counselor.experience}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    className={`w-full mt-4 py-2 rounded-xl transition-all font-medium ${
                      counselor.available
                        ? 'bg-[#3454F5] text-white hover:bg-[#3454F5]/90'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                    disabled={!counselor.available}
                    onClick={() => counselor.available && setSelectedCounselor(counselor.name)}
                  >
                    {counselor.available ? 'Book Session' : 'Unavailable'}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Booking Form */}
          <div 
            className="p-6 rounded-2xl border border-[#8386B0]/20 shadow-sm h-fit"
            style={{
              background: 'linear-gradient(135deg, rgba(203, 166, 247, 0.1) 0%, rgba(255, 255, 255, 0.95) 100%)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <h3 className="text-xl font-semibold text-[#1C1E4A] mb-4">Schedule Consultation</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#4B4E82] mb-1">Select Counselor</label>
                <select 
                  value={selectedCounselor} 
                  onChange={(e) => setSelectedCounselor(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#8386B0]/30 focus:outline-none focus:ring-2 focus:ring-[#3454F5]/50"
                >
                  <option value="">Choose a counselor</option>
                  {counselors.filter(c => c.available).map((counselor, index) => (
                    <option key={index} value={counselor.name}>
                      {counselor.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#4B4E82] mb-1">Preferred Date</label>
                <button
                  onClick={() => setShowCalendar(!showCalendar)}
                  className="w-full px-3 py-2 rounded-xl border border-[#8386B0]/30 text-left flex items-center hover:bg-[#CBA6F7]/10 transition-all"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  {formatDate(selectedDate)}
                </button>
                {showCalendar && (
                  <div className="mt-2 p-4 rounded-xl border border-[#8386B0]/30 bg-white">
                    <div className="grid grid-cols-7 gap-2">
                      {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                        <div key={i} className="text-center text-xs font-semibold text-[#4B4E82]">{day}</div>
                      ))}
                      {[...Array(31)].map((_, i) => (
                        <button
                          key={i}
                          onClick={() => handleDateSelect(i + 1)}
                          className="aspect-square rounded-lg hover:bg-[#3454F5] hover:text-white transition-all text-sm"
                        >
                          {i + 1}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-[#4B4E82] mb-1">Preferred Time</label>
                <select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#8386B0]/30 focus:outline-none focus:ring-2 focus:ring-[#3454F5]/50"
                >
                  <option value="">Choose time</option>
                  <option value="9:00 AM">9:00 AM</option>
                  <option value="10:00 AM">10:00 AM</option>
                  <option value="11:00 AM">11:00 AM</option>
                  <option value="2:00 PM">2:00 PM</option>
                  <option value="3:00 PM">3:00 PM</option>
                  <option value="4:00 PM">4:00 PM</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#4B4E82] mb-1">Session Type</label>
                <select
                  value={sessionType}
                  onChange={(e) => setSessionType(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#8386B0]/30 focus:outline-none focus:ring-2 focus:ring-[#3454F5]/50"
                >
                  <option value="">Choose session type</option>
                  <option value="Video Call">Video Call</option>
                  <option value="In-Person">In-Person</option>
                  <option value="Phone Call">Phone Call</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#4B4E82] mb-1">Additional Notes</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Briefly describe what you'd like to discuss..."
                  className="w-full px-3 py-2 rounded-xl border border-[#8386B0]/30 resize-none focus:outline-none focus:ring-2 focus:ring-[#3454F5]/50"
                  rows={3}
                />
              </div>

              <button 
                onClick={handleBooking}
                className="w-full py-2 bg-gradient-to-r from-[#3454F5] to-[#CBA6F7] text-white rounded-xl shadow-lg hover:shadow-xl transition-all font-medium flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}