import React, { useState, useEffect, useRef } from 'react';
import { IoChatbubblesOutline, IoCloseOutline, IoSendOutline } from 'react-icons/io5';

const SpiritualChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Namaste! 🙏 I am your DarshanEase Spiritual Guide. How can I help you plan your pilgrimage today?", sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  // Advanced NLP Mock Brain
  const generateBotResponse = (input) => {
    const text = input.toLowerCase();

    // -- Greeting & Gratitude Intents --
    if (text.match(/\b(hi|hello|hey|namaste|pranam|hare krishna|om namah shivay)\b/)) {
      return "Namaste! 🙏 Welcome to DarshanEase. I am your advanced Spiritual AI Guide. You can ask me about Darshan timings, strict temple dress codes, historical significance, or booking procedures for any of our 12 featured sacred sites.";
    }
    if (text.match(/\b(thank you|thanks|dhanyawad|gratitude)\b/)) {
      return "You are very welcome! 🙏 May the divine bless your journey. Let me know if you need help finding travel routes or booking a VIP Darshan ticket.";
    }

    // -- Booking & General FAQ Intents --
    if (text.match(/\b(book|ticket|register|vip|fast|cost|price)\b/)) {
      return "✨ **Booking Guide:** To secure an Advance Darshan or VIP ticket, simply log into your DarshanEase User Dashboard. Select your desired temple, choose an available time slot, and confirm your booking. VIP passes (where applicable, like Tirupati or Kashi) offer dedicated queued entry to skip the standard lines.";
    }
    if (text.match(/\b(hotel|stay|flight|train|travel|reach|airport)\b/)) {
      return "🚆 **Travel & Stay:** DarshanEase offers integrated itinerary planning. Once you book a Darshan ticket, the platform will suggest the nearest airports and railway stations, along with verified Dharamshalas and premium hotel accommodations exactly tied to your temple's location.";
    }
    if (text.match(/\b(who are you|what are you|ai)\b/)) {
      return "I am the DarshanEase AI Spiritual Guide, engineered to help pilgrims navigate their sacred journeys. I hold detailed records on temple histories, rituals, dress codes, and logistics seamlessly integrated into this platform.";
    }

    // -- Exhaustive Temple Database (12 Temples) --
    
    // 1. Banke Bihari, Vrindavan
    if (text.match(/\b(banke|bihari|vrindavan|mathura|krishna)\b/)) {
      if (text.includes('time') || text.includes('open')) return "🕒 **Shri Banke Bihari Temple (Vrindavan):** Summer timings are 7:45 AM to 12:00 PM, and 5:30 PM to 9:30 PM. Winter timings are 8:45 AM to 1:00 PM, and 4:30 PM to 8:30 PM. The deity is shielded by a curtain drawn every few minutes to protect devotees from His intense gaze.";
      if (text.includes('dress') || text.includes('wear')) return "👕 **Dress Code:** There is no strict dress code, but modest traditional Indian attire (Kurta-Pajama for men, Salwar-Kameez/Saree for women) is deeply respected.";
      return "🌺 **Shri Thakur Banke Bihari Ji Mandir:** Located in the holy city of Vrindavan, it is one of the most revered shrines dedicated to Lord Krishna. The idol here is in the 'Tribhanga' posture. Did you want to know the Darshan timings or how to travel there?";
    }

    // 2. Shiv Khori
    if (text.match(/\b(shiv khori|khori|jammu|reasi)\b/)) {
      if (text.includes('travel') || text.includes('reach')) return "🚆 **Reaching Shiv Khori:** The nearest airport is Jammu (110km away), and the closest railway station is Udhampur. A 3km trek from Ransoo base camp is required to reach the actual cave.";
      if (text.includes('time') || text.includes('open')) return "🕒 **Timings:** The cave is open from 5:00 AM to 7:00 PM in summer, and 6:00 AM to 6:00 PM in winter.";
      return "🕉️ **Shiv Khori:** This famous cave shrine in Jammu features a natural, swayambhu (self-manifested) Shiva Lingam. The cave itself is over 150 meters long. Would you like to know the trekking distance or timings?";
    }

    // 3. Tirupati Balaji
    if (text.match(/\b(tirupati|tirumala|balaji|venkateswara)\b/)) {
      if (text.includes('time') || text.includes('open')) return "🕒 **Tirumala Timings:** Darshan generally begins with Suprabhatam at 3:00 AM and ends at 1:30 AM (the next day). Free Darshan lines can take 10-14 hours. Advance Special Entry Darshan booking is heavily advised.";
      if (text.includes('dress') || text.includes('wear')) return "👘 **STRICT Dress Code:** Tirumala enforces a mandatory dress code. Men must wear a Dhoti with a Kurta or bare chest. Women must strictly wear a Saree, Half-Saree, or a Churidar with a Dupatta. Western wear is barred.";
      return "💰 **Tirupati Balaji Temple:** The wealthiest and most visited temple globally, dedicated to Lord Venkateswara. It is located on the Seshachalam Hills. Ask me about the strict dress code or Special Entry Darshan bookings.";
    }

    // 4. Padmanabhaswamy
    if (text.match(/\b(padmanabha|padmanabhaswamy|kerala|thiruvananthapuram)\b/)) {
      if (text.includes('dress') || text.includes('wear')) return "👘 **STRICT Dress Code:** You *cannot* enter without following this: Men must wear a Mundu (Dhoti) bare-chested (or with an Angavastram). Women must wear a Saree or a long skirt and blouse. No pants/churidars are allowed for anyone.";
      if (text.includes('time') || text.includes('open')) return "🕒 **Timings:** Morning Darshan slots are 3:15 AM - 4:15 AM, 5:15 AM - 6:15 AM, and 8:30 AM - 10:00 AM. Evening Darshan is from 5:00 PM - 6:15 PM and 6:45 PM - 7:20 PM.";
      return "✨ **Sree Padmanabhaswamy Temple:** An architectural marvel blending Kerala and Dravidian styles, known for its massive secret vaults of treasure. Lord Vishnu reclines on the serpent Anantha here. Ask me about the strict dress code—it is mandatory!";
    }

    // 5. Shirdi Sai Baba
    if (text.match(/\b(shirdi|sai baba|sai)\b/)) {
      if (text.includes('time') || text.includes('arti') || text.includes('aarti')) return "🕒 **Shirdi Aarti Timings:** Kakad Aarti (Morning) is at 4:30 AM, Madhyan Aarti (Noon) at 12:00 PM, Dhoop Aarti (Sunset) at sunset, and Shej Aarti (Night) at 10:30 PM. The temple closes at 11:15 PM.";
      if (text.includes('travel') || text.includes('airport')) return "🚆 **Reaching Shirdi:** Shirdi has its own airport (SAG) and railway station (Sainagar Shirdi). Pune and Mumbai are the major international gateways.";
      return "🕊️ **Shirdi Sai Baba Samadhi Mandir:** Over 25,000 pilgrims visit daily to seek the blessings of the revered saint Sai Baba. Would you like to know the specific timings for the four main daily Aartis?";
    }

    // 6. Golden Temple
    if (text.match(/\b(golden|amritsar|harmandir|sahib)\b/)) {
      if (text.includes('time') || text.includes('open')) return "🕒 **Timings:** The Golden Temple complex is open 24 hours a day, 365 days a year. The holy scriptures are carried in a Palki Sahib at 4:30 AM and returned at 10:30 PM daily.";
      if (text.includes('dress') || text.includes('wear') || text.includes('head')) return "👕 **Dress Code:** Modest clothing is required. **Covering your head is mandatory** for all genders (scarves/rumals are provided free outside). Shoes must be deposited at the entrance, and you must wash your feet before entering.";
      return "✨ **Sri Harmandir Sahib (Golden Temple):** The preeminent spiritual site of Sikhism, covered in real gold foliage. Its community kitchen (Langar) feeds over 100,000 people daily for free. Ask about the head-covering rules or Langar timings.";
    }

    // 7. Meenakshi Amman
    if (text.match(/\b(meenakshi|madurai|amman)\b/)) {
      if (text.includes('time') || text.includes('open')) return "🕒 **Timings:** The temple is open from 5:00 AM to 12:30 PM, and from 4:00 PM to 10:00 PM. It remains closed during the afternoon.";
      return "🏛️ **Meenakshi Amman Temple:** Located in Madurai, it boasts 14 magnificent Gopurams (gateway towers) covered in thousands of colorful mythological statues. It is dedicated to Goddess Parvati (Meenakshi) and Lord Shiva. Need the exact Darshan hours?";
    }

    // 8. Kashi Vishwanath
    if (text.match(/\b(kashi|vishwanath|varanasi|banaras)\b/)) {
      if (text.includes('time') || text.includes('arti') || text.includes('aarti')) return "🕒 **Kashi Aarti Timings:** Mangala Aarti takes place at 3:00 AM - 4:00 AM (Booking heavily required). Bhog Aarti is at 11:15 AM, Sapta Rishi Aarti at 7:00 PM, and Shringar Aarti at 9:00 PM.";
      if (text.includes('corridor')) return "🏛️ **The Kashi Vishwanath Corridor:** The newly developed corridor connects the ancient temple directly to the sacred Ganges river at Lalita Ghat, making the pilgrimage incredibly seamless and beautiful.";
      return "🔱 **Kashi Vishwanath Temple:** One of the 12 Jyotirlingas, located in Varanasi—the oldest living city in the world. The temple spire is plated with 800kg of gold. Ask me about booking the sacred 3:00 AM Mangala Aarti or the new Corridor.";
    }

    // 9. Badrinath
    if (text.match(/\b(badrinath|char dham|himalaya)\b/)) {
      if (text.includes('time') || text.includes('open') || text.includes('close')) return "❄️ **Seasonal Timings:** Due to heavy Himalayan snowfall, Badrinath is ONLY open for 6 months (typically late April/Early May until early November). Daily timings are 4:30 AM to 1:00 PM, and 4:00 PM to 9:00 PM.";
      return "🏔️ **Badrinath Temple:** A crucial part of both the Char Dham and Chota Char Dham pilgrimages. Situated at 3,133 meters in the Himalayas, it is dedicated to Lord Vishnu. Remember, it is closed for half the year due to snow! Want to know the open months?";
    }

    // 10. Somnath
    if (text.match(/\b(somnath|gujarat|jyotirlinga)\b/)) {
      if (text.includes('history') || text.includes('destroy')) return "📜 **History:** Somnath is the first of the 12 Jyotirlingas. It is known as the 'Shrine Eternal' because it was destroyed by foreign invaders at least 6 times, and rebuilt 6 times. The current stunning structure was completed in 1951.";
      return "🌊 **Somnath Temple:** Located on the western coast of Gujarat right on the Arabian Sea. It is the very first Jyotirlinga. The temple holds a daily Sound and Light Show called 'Jay Somnath' from 8:00 PM to 9:00 PM. Would you like to hear its history?";
    }

    // 11. Jagannath Puri
    if (text.match(/\b(jagannath|puri|odisha|rath yatra)\b/)) {
      if (text.includes('bhog') || text.includes('prasad') || text.includes('food')) return "🍛 **Mahaprasad:** The temple kitchen is arguably the largest in the world, cooking for up to 100,000 devotees daily using exclusively earthen pots over wood fires. The food offered is called 'Mahaprasad'.";
      if (text.includes('rath') || text.includes('yatra')) return "🏮 **Rath Yatra:** The annual Chariot Festival involves pulling massive wooden chariots carrying the deities. It is the only festival in the world where deities are taken out of the temple to meet the masses.";
      return "👁️ **Jagannath Temple (Puri):** Famous for the grand Rath Yatra and its massive divine kitchen. Interestingly, no planes or birds ever fly directly above the temple dome. Ask me about the famous Mahaprasad or the Chariot festival!";
    }

    // 12. Ramanathaswamy
    if (text.match(/\b(ramanathaswamy|rameswaram|rameshwaram)\b/)) {
      if (text.includes('water') || text.includes('kund') || text.includes('bath')) return "💧 **The 22 Teerthams:** Pilgrims must ritually bathe in the 22 holy water wells (Teerthams) located inside the temple complex before receiving Darshan of the main Jyotirlinga.";
      if (text.includes('corridor') || text.includes('pillar')) return "🏛️ **Architecture:** The temple boasts the longest corridor in the world across any Hindu temple, featuring thousands of intricately carved pillars.";
      return "🌉 **Ramanathaswamy Temple (Rameswaram):** A Jyotirlinga closely associated with the Ramayana epic. Lord Rama worshipped Lord Shiva here. It features the longest temple corridor in the world. Are you interested in the 22 holy water wells ritual?";
    }

    // -- Catch-All Fallback --
    return "Hm, my knowledge scrolls are still expanding! 📜 Could you please rephrase asking about **Timings**, **Dress Codes**, **Histories**, or **Booking Logistics** for specific temples like Kashi, Tirupati, Padmanabhaswamy, or the Golden Temple?";
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userText = inputValue;
    setMessages(prev => [...prev, { text: userText, sender: 'user' }]);
    setInputValue('');

    // Simulate network delay for natural feel
    setTimeout(() => {
      const botResponse = generateBotResponse(userText);
      setMessages(prev => [...prev, { text: botResponse, sender: 'bot' }]);
    }, 600);
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #FF7E40, #FF4500)',
          color: 'white',
          border: 'none',
          boxShadow: '0 10px 25px rgba(255, 126, 64, 0.4)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        }}
        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        {isOpen ? <IoCloseOutline size={30} /> : <IoChatbubblesOutline size={30} />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div style={{
          position: 'fixed',
          bottom: '100px',
          right: '30px',
          width: '350px',
          height: '500px',
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          borderRadius: '20px',
          boxShadow: '0 15px 35px rgba(0, 0, 0, 0.2)',
          zIndex: 9998,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          border: '1px solid rgba(255, 126, 64, 0.2)',
          animation: 'slideUp 0.3s ease-out forwards'
        }}>
          
          {/* Header */}
          <div style={{
            background: 'linear-gradient(90deg, #FF7E40, #e06c35)',
            padding: '15px 20px',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem'}}>
              🪷
            </div>
            <div>
              <h5 style={{ margin: 0, fontSize: '1.1rem', fontFamily: 'Cinzel, serif', fontWeight: 'bold' }}>Darshan Guide AI</h5>
              <span style={{ fontSize: '0.8rem', opacity: 0.9 }}>Online. Ask anything.</span>
            </div>
          </div>

          {/* Messages Area */}
          <div style={{
            flex: 1,
            padding: '20px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
            background: '#fafafa'
          }}>
            {messages.map((msg, index) => (
              <div key={index} style={{
                alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '80%',
                background: msg.sender === 'user' ? '#FF7E40' : 'white',
                color: msg.sender === 'user' ? 'white' : '#333',
                padding: '12px 16px',
                borderRadius: msg.sender === 'user' ? '20px 20px 0 20px' : '20px 20px 20px 0',
                boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
                fontSize: '0.95rem',
                lineHeight: '1.5',
                border: msg.sender === 'bot' ? '1px solid #eee' : 'none'
              }}>
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSend} style={{
            padding: '15px',
            background: 'white',
            borderTop: '1px solid #eee',
            display: 'flex',
            gap: '10px'
          }}>
            <input 
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about Darshan timings..."
              style={{
                flex: 1,
                padding: '10px 15px',
                borderRadius: '25px',
                border: '1px solid #ddd',
                outline: 'none',
                fontSize: '0.95rem'
              }}
            />
            <button 
              type="submit"
              disabled={!inputValue.trim()}
              style={{
                background: inputValue.trim() ? '#FF7E40' : '#ddd',
                color: 'white',
                border: 'none',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: inputValue.trim() ? 'pointer' : 'not-allowed',
                transition: 'background 0.3s ease'
              }}
            >
              <IoSendOutline size={18} />
            </button>
          </form>

        </div>
      )}

      <style>
        {`
          @keyframes slideUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </>
  );
};

export default SpiritualChatbot;
