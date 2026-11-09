import { useState, useMemo } from 'react';
import { Plus, Minus, X, ArrowRight, ShieldCheck, AlertTriangle } from 'lucide-react';


import conferenceImg from './assets/conferenceroom.jpg';
import auditoriumImg from './assets/Auditoriumhall.jpg';
import presentationImg from './assets/presentationroom.jpg';
import largeMeetingImg from './assets/largemeetingroom.jpg';
import smallMeetingImg from './assets/smallmeetingroom.jpg';

import projectorImg from './assets/projector.jpg';
import speakerImg from './assets/speaker.jpg';
import microphoneImg from './assets/microphones.jpg';
import whiteboardImg from './assets/whiteboards.jpg';
import signageImg from './assets/signage.jpg';

interface RoomItem {
  id: string;
  name: string;
  capacity: number;
  cost: number;
  image: string;
}

interface AddonItem {
  id: string;
  name: string;
  cost: number;
  image: string;
}

interface MealItem {
  id: string;
  name: string;
  cost: number;
}


const ROOM_OPTIONS: RoomItem[] = [
  { id: 'conf', name: 'Conference Room', capacity: 15, cost: 1500, image: conferenceImg },
  { id: 'aud', name: 'Auditorium Hall', capacity: 200, cost: 5500, image: auditoriumImg },
  { id: 'pres', name: 'Presentation Room', capacity: 50, cost: 3500, image: presentationImg },
  { id: 'large', name: 'Large Meeting Room', capacity: 10, cost: 1000, image: largeMeetingImg },
  { id: 'small', name: 'Small Meeting Room', capacity: 5, cost: 800, image: smallMeetingImg },
];


const ADDON_OPTIONS: AddonItem[] = [
  { id: 'proj', name: 'Projectors', cost: 200, image: projectorImg },
  { id: 'spk', name: 'Speakers', cost: 35, image: speakerImg },
  { id: 'mic', name: 'Microphones', cost: 45, image: microphoneImg },
  { id: 'wht', name: 'Whiteboards', cost: 80, image: whiteboardImg },
  { id: 'sgn', name: 'Signage', cost: 80, image: signageImg },
];


const MEAL_OPTIONS: MealItem[] = [
  { id: 'brk', name: 'Breakfast', cost: 50 },
  { id: 'lnc', name: 'Lunch', cost: 65 },
  { id: 'tea', name: 'High Tea', cost: 25 },
  { id: 'din', name: 'Dinner', cost: 70 },
];

export default function App() {

  const [currentPage, setCurrentPage] = useState<'landing' | 'planner'>('landing');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('venue'); // <-- ADD THIS

  
  const [rooms, setRooms] = useState<Record<string, number>>({ conf: 3, aud: 2, pres: 0, large: 0, small: 1 });
  const [addons, setAddons] = useState<Record<string, number>>({ proj: 4, spk: 4, mic: 2, wht: 1, sgn: 0 });
  const [mealCount, setMealCount] = useState<number>(50);
  const [selectedMeals, setSelectedMeals] = useState<Record<string, boolean>>({ brk: false, lnc: false, tea: true, din: true });

 
  const roomSubtotal = useMemo(() => ROOM_OPTIONS.reduce((acc, r) => acc + (rooms[r.id] || 0) * r.cost, 0), [rooms]);
  const addonSubtotal = useMemo(() => ADDON_OPTIONS.reduce((acc, a) => acc + (addons[a.id] || 0) * a.cost, 0), [addons]);
  

  const totalCapacity = useMemo(() => {
    return ROOM_OPTIONS.reduce((acc, r) => acc + (rooms[r.id] || 0) * r.capacity, 0);
  }, [rooms]);

  const mealSubtotal = useMemo(() => {
    const costPerPerson = MEAL_OPTIONS.reduce((acc, m) => acc + (selectedMeals[m.id] ? m.cost : 0), 0);
    return costPerPerson * mealCount;
  }, [selectedMeals, mealCount]);

  const grandTotal = roomSubtotal + addonSubtotal + mealSubtotal;
  const isCapacityExceeded = mealCount > totalCapacity; // <-- ADD THIS

  const handleQuantityChange = (type: 'rooms' | 'addons', id: string, delta: number) => {
    if (type === 'rooms') {
      setRooms(prev => ({ ...prev, [id]: Math.max(0, (prev[id] || 0) + delta) }));
    } else {
      setAddons(prev => ({ ...prev, [id]: Math.max(0, (prev[id] || 0) + delta) }));
    }
  };

  if (currentPage === 'landing') {
    return (
      <div 
        className="w-full min-h-screen bg-cover bg-center flex items-center justify-center relative px-6"
        style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.65)), url('https://unsplash.com')` }}
      >
        <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center text-white">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
              Conference Expense Planner
            </h1>
            <p className="text-lg md:text-xl text-gray-200">
              Plan your next major event with us! Accurately configure venue rooms, coordinate premium A/V packages, and tailor exceptional catering profiles.
            </p>
            <button 
              onClick={() => setCurrentPage('planner')}
              className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold px-8 py-3.5 rounded-md flex items-center gap-3 transition-colors shadow-lg text-lg"
            >
              Get Started
              <ArrowRight size={20} />
            </button>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-8 rounded-xl border border-white/20 space-y-6">
            <div className="flex items-center gap-3 border-b border-white/20 pb-4">
              <ShieldCheck className="text-amber-400" size={32} />
              <h2 className="text-xl font-bold">Welcome to BudgetEase Solutions</h2>
            </div>
            <p className="text-sm text-gray-200 leading-relaxed">
              Your trusted partner in simplifying budget management and financial solutions. At BudgetEase, we understand the importance of effective budget planning and strive to provide intuitive, user-friendly solutions to meet the diverse needs of our clients.
            </p>
            <p className="text-sm text-gray-200 leading-relaxed">
              With a commitment to efficiency and innovation, we empower individuals and businesses to take control of their finances and achieve their goals with ease.
            </p>
            <p className="text-sm text-gray-200 leading-relaxed">
              Our mission is to make budgeting effortless and accessible for everyone. Whether you're a small business owner, a busy professional, or an individual looking to manage your personal finances, we offer tailored solutions to streamline your budgeting process.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col font-sans">
      
      <header className="bg-[#0f2c59] text-white px-6 py-4 flex flex-wrap justify-between items-center sticky top-0 z-40 shadow-md">
        <h1 className="text-xl font-bold tracking-wide text-amber-500">
          Conference Expense Planner
        </h1>
        <nav className="flex items-center gap-6 md:gap-8 mt-2 sm:mt-0">
          {['venue', 'addons', 'meals'].map((sec) => (
            <button 
              key={sec}
              onClick={() => setActiveSection(sec)}
              className={`text-sm font-medium transition-all capitalize cursor-pointer ${
                activeSection === sec ? 'text-amber-400 border-b-2 border-amber-400 pb-0.5' : 'text-gray-300 hover:text-white'
              }`}
            >
              {sec === 'addons' ? 'Add-ons' : sec}
            </button>
          ))}
          <button 
            onClick={() => setShowModal(true)}
            className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold px-5 py-2 rounded shadow transition-all transform active:scale-95 cursor-pointer"
          >
            Show Details
          </button>
        </nav>
      </header>
     
            
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-8 space-y-12">
        
     
        {activeSection === 'venue' && (
          <section id="venue" className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 animate-fade-in">
            <div className="bg-[#1e3a8a] text-white py-3 px-6 text-center font-bold text-xl tracking-wide">
              Venue Room Selection
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {ROOM_OPTIONS.map((room) => (
                  <div key={room.id} className="bg-gray-50 rounded-xl p-4 border border-gray-200 flex flex-col items-center shadow-inner hover:shadow-md transition-shadow">
                    <img src={room.image} alt={room.name} className="w-full h-36 object-cover rounded-lg mb-3 shadow" />
                    <h3 className="font-bold text-gray-800 text-center text-sm">{room.name}</h3>
                    <span className="text-xs text-gray-500 mt-0.5">(Capacity: {room.capacity})</span>
                    <span className="text-sm font-semibold text-blue-800 mt-2">${room.cost}</span>
                    
                    <div className="flex items-center gap-3 mt-4 bg-white border border-gray-300 rounded-md p-1 shadow-sm">
                      <button 
                        onClick={() => handleQuantityChange('rooms', room.id, -1)}
                        className="p-1 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded transition-colors"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-8 text-center font-bold text-sm text-slate-800">{rooms[room.id] || 0}</span>
                      <button 
                        onClick={() => handleQuantityChange('rooms', room.id, 1)}
                        className="p-1 text-gray-600 hover:bg-green-50 hover:text-green-600 rounded transition-colors"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex flex-col items-center gap-2">
                <div className="bg-gray-100 border border-gray-300 px-8 py-3 rounded-md text-center shadow-sm">
                  <span className="text-gray-600 font-medium block text-xs tracking-wider uppercase mb-1">Total Venue Cost</span>
                  <span className="text-2xl font-black text-slate-800">${roomSubtotal.toLocaleString()}</span>
                </div>
                <span className="text-xs text-gray-500 font-medium">Aggregated Event Spaces Capacity: {totalCapacity} individuals</span>
              </div>
            </div>
          </section>
        )}

        
        {activeSection === 'addons' && (
          <section id="addons" className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 animate-fade-in">
            <div className="bg-[#1e3a8a] text-white py-3 px-6 text-center font-bold text-xl tracking-wide">
              Add-ons Selection
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {ADDON_OPTIONS.map((addon) => (
                  <div key={addon.id} className="bg-gray-50 rounded-xl p-4 border border-gray-200 flex flex-col items-center shadow-inner hover:shadow-md transition-shadow">
                    <img src={addon.image} alt={addon.name} className="w-full h-28 object-cover rounded-lg mb-3 shadow" />
                    <h3 className="font-bold text-gray-800 text-center text-xs tracking-wide">{addon.name}</h3>
                    <span className="text-sm font-semibold text-blue-800 mt-2">${addon.cost}</span>
                    
                    <div className="flex items-center gap-3 mt-4 bg-white border border-gray-300 rounded-md p-1 shadow-sm">
                      <button 
                        onClick={() => handleQuantityChange('addons', addon.id, -1)}
                        className="p-1 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded transition-colors"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-6 text-center font-bold text-xs text-slate-800">{addons[addon.id] || 0}</span>
                      <button 
                        onClick={() => handleQuantityChange('addons', addon.id, 1)}
                        className="p-1 text-gray-600 hover:bg-green-50 hover:text-green-600 rounded transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex justify-center">
                <div className="bg-gray-100 border border-gray-300 px-8 py-3 rounded-md text-center shadow-sm">
                  <span className="text-gray-600 font-medium block text-xs tracking-wider uppercase mb-1">Total Add-ons Cost</span>
                  <span className="text-2xl font-black text-slate-800">${addonSubtotal.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </section>
        )}

        
        {activeSection === 'meals' && (
          <section id="meals" className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 animate-fade-in">
            <div className="bg-[#1e3a8a] text-white py-3 px-6 text-center font-bold text-xl tracking-wide">
              Meals Selection
            </div>
            <div className="p-6 md:p-8 max-w-2xl mx-auto space-y-6">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 bg-gray-50 border border-gray-200 p-4 rounded-xl shadow-inner">
                <label htmlFor="headcount" className="font-bold text-gray-700 text-base md:text-lg">Number of People:</label>
                <input 
                  id="headcount"
                  type="number" 
                  min="0"
                  value={mealCount}
                  onChange={(e) => setMealCount(Math.max(0, parseInt(e.target.value) || 0))}
                  className={`w-28 text-center font-bold text-lg border-2 rounded px-2 py-1 focus:outline-none text-slate-800 ${
                    isCapacityExceeded ? 'border-amber-500 focus:border-amber-600 bg-amber-50' : 'border-gray-300 focus:border-blue-600'
                  }`}
                />
              </div>

              {isCapacityExceeded && (
                <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-md flex items-start gap-3 shadow-sm animate-fade-in">
                  <AlertTriangle className="text-amber-600 flex-shrink-0 mt-0.5" size={20} />
                  <div>
                    <h4 className="font-bold text-amber-800 text-sm">Catering Capacity Notice</h4>
                    <p className="text-xs text-amber-700 mt-0.5">
                      Your current catering headcount ({mealCount}) exceeds the combined capacity of your venue spaces ({totalCapacity}).
                    </p>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {MEAL_OPTIONS.map((meal) => (
                  <label 
                    key={meal.id} 
                    className={`flex items-start gap-4 p-4 border rounded-xl cursor-pointer select-none transition-all duration-200 ${
                      selectedMeals[meal.id] 
                        ? 'border-blue-600 bg-blue-50/50 shadow-sm scale-[1.01]' 
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <input 
                      type="checkbox"
                      checked={selectedMeals[meal.id] || false}
                      onChange={(e) => setSelectedMeals(prev => ({ ...prev, [meal.id]: e.target.checked }))}
                      className="w-5 h-5 rounded text-blue-600 border-gray-300 focus:ring-blue-500 mt-0.5"
                    />
                    <div>
                      <span className="font-bold text-gray-800 block text-base">{meal.name}</span>
                      <span className="text-sm font-semibold text-gray-500">${meal.cost} per person</span>
                    </div>
                  </label>
                ))}
              </div>

              <div className="pt-4 flex justify-center">
                <div className="bg-gray-100 border border-gray-300 px-8 py-3 rounded-md text-center shadow-sm">
                  <span className="text-gray-600 font-medium block text-xs tracking-wider uppercase mb-1">Total Meals Cost</span>
                  <span className="text-2xl font-black text-slate-800">${mealSubtotal.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>


      
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <X size={20} />
            </button>
            <h2 className="text-xl font-bold mb-4">Detailed Breakdown</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Venue Subtotal:</span>
                <span>${roomSubtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Add-ons Subtotal:</span>
                <span>${addonSubtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Meals Subtotal:</span>
                <span>${mealSubtotal.toLocaleString()}</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between font-bold text-lg">
                <span>Grand Total:</span>
                <span>${grandTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}      
