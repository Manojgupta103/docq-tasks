// components/HeaderButtons.js
export default function HeaderButtons({ onOpenModal }) {
    return (
      <div className="flex space-x-3">
        <button onClick={onOpenModal} className="bg-blue-500 text-white p-2 rounded-lg">➕</button>
        <button className="bg-gray-200 p-2 rounded-lg">🔍</button>
        <button className="bg-gray-200 p-2 rounded-lg">❓</button>
      </div>
    );
  }
  