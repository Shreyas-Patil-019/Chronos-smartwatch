import React from 'react';

const SCENES = [
  { id: 0, label: '01 ARRIVAL' },
  { id: 1, label: '02 SILHOUETTE' },
  { id: 2, label: '03 DISPLAY' },
  { id: 3, label: '04 PRECISION' },
  { id: 4, label: '05 ENDURANCE' },
  { id: 5, label: '06 SHOWCASE' },
  { id: 6, label: '07 FINALE' },
];

export const ShowroomNavigation = ({ activeScene, onSelectScene }) => {
  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col items-end gap-3 pointer-events-auto">
      {SCENES.map((scene) => {
        const isActive = activeScene === scene.id;
        return (
          <button
            key={scene.id}
            onClick={() => onSelectScene(scene.id)}
            className="group flex items-center gap-3 py-1 cursor-pointer outline-none"
          >
            <span
              className={`text-[9px] font-mono tracking-widest uppercase transition-all duration-300 ${
                isActive
                  ? 'text-amber-400 font-bold opacity-100 translate-x-0'
                  : 'text-zinc-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-2'
              }`}
            >
              {scene.label}
            </span>
            <div
              className={`transition-all duration-300 rounded-full ${
                isActive
                  ? 'w-3 h-3 bg-amber-400 shadow-md shadow-amber-400/40'
                  : 'w-1.5 h-1.5 bg-zinc-700 group-hover:bg-zinc-400'
              }`}
            />
          </button>
        );
      })}
    </div>
  );
};

export default ShowroomNavigation;
