import React, { useState, useEffect, useMemo } from 'react';
import { 
  Trophy, Users, CreditCard, Plus, Search, 
  Save, Trash2, Activity, ChevronRight, ChevronLeft,
  Medal, Printer, LayoutDashboard, Pencil, X,
  Shield, Swords, CheckSquare, Square,
  CircleDot, Wind, Filter, Phone, MapPin,
  Archive, UserX, UserCheck, RefreshCw, Edit, UserPlus, LogOut
} from 'lucide-react';
import Login from './components/Login';

// Firebase Imports
import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithCustomToken, 
  signOut,
  onAuthStateChanged 
} from 'firebase/auth';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  onSnapshot, 
  serverTimestamp,
} from 'firebase/firestore';

// --- FIREBASE SETUP ---
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "AIzaSyDemoKey",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "demo.firebaseapp.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "theteam-demo",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "demo.appspot.com",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "1:123456789:web:abc123"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const appId = process.env.REACT_APP_FIREBASE_APP_ID || 'default-app-id';

// --- UTILS & CONFIGS ---

const generateCategories = () => {
  const cats = [];
  const colors = [
    'bg-purple-100 text-purple-800 border-purple-200',
    'bg-blue-100 text-blue-800 border-blue-200',
    'bg-cyan-100 text-cyan-800 border-cyan-200',
    'bg-teal-100 text-teal-800 border-teal-200',
    'bg-emerald-100 text-emerald-800 border-emerald-200',
    'bg-green-100 text-green-800 border-green-200',
    'bg-lime-100 text-lime-800 border-lime-200',
    'bg-yellow-100 text-yellow-800 border-yellow-200',
    'bg-amber-100 text-amber-800 border-amber-200',
    'bg-orange-100 text-orange-800 border-orange-200',
    'bg-red-100 text-red-800 border-red-200',
    'bg-rose-100 text-rose-800 border-rose-200',
    'bg-pink-100 text-pink-800 border-pink-200',
    'bg-fuchsia-100 text-fuchsia-800 border-fuchsia-200',
    'bg-indigo-100 text-indigo-800 border-indigo-200',
    'bg-violet-100 text-violet-800 border-violet-200',
  ];

  for (let age = 5; age <= 20; age++) {
    cats.push({
      name: `Sub-${age}`,
      maxAge: age,
      minAge: age,
      color: colors[(age - 5) % colors.length]
    });
  }
  
  cats.push({ 
    name: 'Sénior', 
    minAge: 21, 
    maxAge: 100, 
    color: 'bg-slate-800 text-white border-slate-600' 
  });

  return cats;
};

const CATEGORIES = generateCategories();

const SPORTS_CONFIG = {
  'Fútbol': {
    icon: Trophy,
    positions: ['Portero', 'Defensa', 'Lateral', 'Medio', 'Delantero'],
    scoreLabel: 'Goles',
    allowDraw: true,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50'
  },
  'Voleibol': {
    icon: CircleDot,
    positions: ['Líbero', 'Armador', 'Central', 'Punta', 'Opuesto'],
    scoreLabel: 'Sets',
    allowDraw: false,
    color: 'text-orange-600',
    bg: 'bg-orange-50'
  },
  'Patinaje': {
    icon: Wind,
    positions: ['Velocidad', 'Fondo', 'Semifondo', 'Relevo', 'Habilidad'],
    scoreLabel: 'Puntos',
    allowDraw: true,
    color: 'text-cyan-600',
    bg: 'bg-cyan-50'
  }
};

const TOURNAMENT_TYPES = [
  'Liga', 
  'Copa', 
  'Torneo Relámpago', 
  'Cuadrangular', 
  'Amistoso'
];

const calculateAge = (dobString: string) => {
  if (!dobString) return 0;
  const birthDate = new Date(dobString);
  const difference = Date.now() - birthDate.getTime();
  const ageDate = new Date(difference);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

const determineCategory = (age: number) => {
  const cat = CATEGORIES.find(c => age === c.maxAge) || CATEGORIES.find(c => age >= c.minAge && age <= c.maxAge);
  if (!cat && age < 5) return CATEGORIES[0];
  return cat ? cat : CATEGORIES[CATEGORIES.length - 1];
};

// --- COMPONENTS ---

interface Player {
  id?: string;
  name: string;
  dob: string;
  documentId: string;
  team: string;
  position: string;
  photoUrl: string;
  sport: string;
  eps: string;
  phone: string;
  address: string;
  status: 'Active' | 'Inactive';
}

interface Team {
  id?: string;
  name: string;
  logoUrl: string;
  coaches: Array<{ name: string; phone: string; category: string }>;
  address: string;
  sport: string;
  status: 'Active' | 'Inactive';
}

interface Tournament {
  id?: string;
  name: string;
  type: string;
  teamIds: string[];
  categories: string[];
  sport: string;
  status?: 'Active' | 'Inactive';
}

interface Match {
  id?: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  date: string;
  status: 'Scheduled' | 'Finished';
  tournamentId: string;
  category: string;
}

const PlayerCard: React.FC<{ player: Player; teamLogo?: string | null; tournamentName?: string | null }> = ({ player, teamLogo, tournamentName }) => {
  const SportIcon = SPORTS_CONFIG[player.sport as keyof typeof SPORTS_CONFIG]?.icon || Trophy;
  const age = calculateAge(player.dob);
  const category = determineCategory(age);
  
  return (
    <div className="w-80 h-48 bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl shadow-xl overflow-hidden relative text-white m-4 print:break-inside-avoid border border-slate-600 page-break-inside-avoid">
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <SportIcon size={120} />
      </div>
      
      {player.status === 'Inactive' && (
        <div className="absolute inset-0 bg-slate-900/80 z-20 flex items-center justify-center backdrop-blur-sm">
          <div className="bg-red-500 text-white px-4 py-2 rounded-lg font-bold uppercase transform -rotate-12 border-2 border-white shadow-2xl">
            DADO DE BAJA
          </div>
        </div>
      )}
      
      <div className="flex h-full relative z-10">
        <div className="w-1/3 bg-slate-950/50 flex items-center justify-center flex-col p-2 border-r border-slate-600/50 backdrop-blur-sm">
          <div className="w-20 h-20 bg-slate-200 rounded-full overflow-hidden border-2 border-white/20 mb-2 flex items-center justify-center text-slate-400 bg-white shadow-lg">
            {player.photoUrl ? (
              <img src={player.photoUrl} alt={player.name} className="w-full h-full object-cover" onError={(e) => (e.target as HTMLImageElement).style.display = 'none'} />
            ) : (
              <Users size={32} />
            )}
          </div>
          <span className="text-[9px] font-bold text-center uppercase tracking-wider text-slate-300 leading-tight">{player.position || 'JUGADOR'}</span>
          <span className="text-[8px] text-emerald-400 mt-1 uppercase">{player.sport}</span>
        </div>

        <div className="w-2/3 p-4 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div className="overflow-hidden">
              <h3 className="font-black text-lg leading-none truncate uppercase tracking-tight">{player.name}</h3>
              <p className="text-emerald-400 text-xs font-bold uppercase mt-1 truncate">{player.team || 'AGENTE LIBRE'}</p>
            </div>
            {teamLogo && (
              <div className="w-8 h-8 bg-white rounded-full p-0.5 flex-shrink-0 shadow-sm ml-2">
                <img src={teamLogo} className="w-full h-full object-contain rounded-full" alt="Team" />
              </div>
            )}
          </div>

          <div className="space-y-1 text-xs mt-2">
            <div className="flex justify-between items-center border-b border-white/10 pb-1">
              <span className="text-slate-400">Categoría</span>
              <span className={`font-bold px-1.5 rounded text-[10px] uppercase`}>{category.name}</span>
            </div>
            <div className="flex justify-between items-center border-b border-white/10 pb-1">
              <span className="text-slate-400">Edad</span>
              <span className="font-bold">{age} Años</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Documento</span>
              <span className="font-mono text-slate-300 tracking-widest font-bold">{player.documentId || '---'}</span>
            </div>
          </div>

          <div className="flex justify-between items-end mt-1">
             <div className="text-[9px] text-slate-500">TheTeam ID</div>
             <div className="bg-white text-slate-900 text-[9px] px-2 py-0.5 rounded font-bold uppercase tracking-wide">
               {tournamentName || '2025'}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const calculateStandings = (matches: Match[], teams: Team[], sportType: string = 'Fútbol') => {
  const standings: any = {};
  const config = SPORTS_CONFIG[sportType as keyof typeof SPORTS_CONFIG] || SPORTS_CONFIG['Fútbol'];

  teams.forEach(team => {
    standings[team.name] = {
      id: team.id,
      name: team.name,
      logo: team.logoUrl,
      played: 0, won: 0, drawn: 0, lost: 0,
      gf: 0, ga: 0, gd: 0, points: 0
    };
  });

  matches.forEach(match => {
    if (match.status !== 'Finished') return;
    
    const home = match.homeTeam;
    const away = match.awayTeam;
    const homeScore = parseInt(match.homeScore?.toString() || '0');
    const awayScore = parseInt(match.awayScore?.toString() || '0');

    if (!standings[home]) standings[home] = { name: home, played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, gd: 0, points: 0 };
    if (!standings[away]) standings[away] = { name: away, played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, gd: 0, points: 0 };

    standings[home].played += 1;
    standings[home].gf += homeScore;
    standings[home].ga += awayScore;
    standings[home].gd += (homeScore - awayScore);

    standings[away].played += 1;
    standings[away].gf += awayScore;
    standings[away].ga += homeScore;
    standings[away].gd += (awayScore - homeScore);

    if (homeScore > awayScore) {
      standings[home].won += 1;
      standings[home].points += 3;
      standings[away].lost += 1;
    } else if (awayScore > homeScore) {
      standings[away].won += 1;
      standings[away].points += 3;
      standings[home].lost += 1;
    } else {
      if (config.allowDraw) {
        standings[home].drawn += 1;
        standings[home].points += 1;
        standings[away].drawn += 1;
        standings[away].points += 1;
      }
    }
  });

  return Object.values(standings).sort((a: any, b: any) => {
    if (b.points !== a.points) return b.points - a.points;
    return b.gd - a.gd;
  });
};

// --- MAIN APP ---

export default function SportManager() {
  const [user, setUser] = useState<any>(null);
  const [view, setView] = useState('tournaments');
  const [players, setPlayers] = useState<Player[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [loading, setLoading] = useState(true);

  const [showInactive, setShowInactive] = useState(false);
  
  // Carnet Filter States
  const [selectedTeamForCards, setSelectedTeamForCards] = useState('');
  const [selectedTournamentForCards, setSelectedTournamentForCards] = useState('');
  const [searchPlayerForCards, setSearchPlayerForCards] = useState('');

  // States
  const [newPlayer, setNewPlayer] = useState<Player>({ 
    name: '', dob: '', team: '', position: '', photoUrl: '', sport: 'Fútbol', 
    documentId: '', eps: '', phone: '', address: '', status: 'Active'
  });
  
  const [newTeam, setNewTeam] = useState<Team>({ 
    name: '', logoUrl: '', coaches: [], address: '', sport: 'Fútbol', status: 'Active'
  });
  const [tempCoach, setTempCoach] = useState({ name: '', phone: '', category: 'Todas' });

  const [newMatch, setNewMatch] = useState<Match>({ 
    homeTeam: '', awayTeam: '', date: '', homeScore: 0, awayScore: 0, 
    status: 'Scheduled', tournamentId: '', category: '' 
  });
  
  const [newTournament, setNewTournament] = useState<Tournament>({ name: '', type: 'Liga', teamIds: [], categories: [], sport: 'Fútbol' });
  
  const [editingId, setEditingId] = useState<string | null>(null); 
  const [editingTeamId, setEditingTeamId] = useState<string | null>(null); 
  const [editingTournamentId, setEditingTournamentId] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTournamentId, setSelectedTournamentId] = useState('');
  
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);

  // --- AUTH & DATA ---
  useEffect(() => {
    // Escuchar cambios en el estado de autenticación
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!user) return;
    
    try {
      const playersRef = collection(db, 'artifacts', appId, 'public', 'data', 'players');
      const teamsRef = collection(db, 'artifacts', appId, 'public', 'data', 'teams');
      const matchesRef = collection(db, 'artifacts', appId, 'public', 'data', 'matches');
      const tournamentsRef = collection(db, 'artifacts', appId, 'public', 'data', 'tournaments');

      const unsubPlayers = onSnapshot(playersRef, (s) => setPlayers(s.docs.map(d => ({ id: d.id, ...d.data() } as Player))), () => {});
      const unsubTeams = onSnapshot(teamsRef, (s) => setTeams(s.docs.map(d => ({ id: d.id, ...d.data() } as Team))), () => {});
      const unsubMatches = onSnapshot(matchesRef, (s) => setMatches(s.docs.map(d => ({ id: d.id, ...d.data() } as Match))), () => {});
      const unsubTournaments = onSnapshot(tournamentsRef, (s) => {
        const data = s.docs.map(d => ({ id: d.id, ...d.data() } as Tournament));
        setTournaments(data);
        setLoading(false);
      }, () => {
        console.error("Firebase connection failed, continuing in demo mode");
        setLoading(false);
      });

      return () => { unsubPlayers(); unsubTeams(); unsubMatches(); unsubTournaments(); };
    } catch (error) {
      console.error("Data sync error:", error);
      setLoading(false);
    }
  }, [user]);

  // --- ACTIONS ---
  
  const addCoachToTeam = () => {
    if (!tempCoach.name) return;
    setNewTeam(prev => ({
      ...prev,
      coaches: [...(prev.coaches || []), tempCoach]
    }));
    setTempCoach({ name: '', phone: '', category: 'Todas' });
  };

  const removeCoachFromTeam = (index: number) => {
    setNewTeam(prev => ({
      ...prev,
      coaches: prev.coaches.filter((_, i) => i !== index)
    }));
  };

  const toggleCategoryInTournament = (catName: string) => {
    setNewTournament(prev => {
      const exists = prev.categories?.includes(catName);
      return {
        ...prev,
        categories: exists 
          ? prev.categories.filter(c => c !== catName)
          : [...(prev.categories || []), catName]
      };
    });
  };

  const handleSaveTeam = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTeam.name) return;
    const collectionRef = collection(db, 'artifacts', appId, 'public', 'data', 'teams');
    
    if (editingTeamId) {
      await updateDoc(doc(collectionRef, editingTeamId), { ...newTeam, updatedAt: serverTimestamp() });
      setEditingTeamId(null);
      alert('Equipo actualizado correctamente');
    } else {
      await addDoc(collectionRef, { ...newTeam, createdAt: serverTimestamp() });
      alert('Equipo creado exitosamente');
    }
    
    setNewTeam({ name: '', logoUrl: '', coaches: [], address: '', sport: 'Fútbol', status: 'Active' }); 
  };

  const startEditTeam = (team: Team) => {
    setNewTeam({ ...team, coaches: team.coaches || [] });
    setEditingTeamId(team.id || null);
    const form = document.getElementById('teamForm');
    if (form) form.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSaveTournament = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTournament.name) return;
    
    if (!newTournament.categories || newTournament.categories.length === 0) {
      alert("Debes seleccionar al menos una categoría para el torneo.");
      return;
    }

    const collectionRef = collection(db, 'artifacts', appId, 'public', 'data', 'tournaments');

    if (editingTournamentId) {
      await updateDoc(doc(collectionRef, editingTournamentId), {
        ...newTournament,
        updatedAt: serverTimestamp()
      });
      setEditingTournamentId(null);
      alert('Torneo actualizado exitosamente.');
    } else {
      await addDoc(collectionRef, {
        ...newTournament,
        status: 'Active',
        createdAt: serverTimestamp()
      });
      alert('Torneo creado exitosamente.');
    }
    
    setNewTournament({ name: '', type: 'Liga', teamIds: [], categories: [], sport: newTournament.sport });
  };

  const startEditTournament = (tourney: Tournament) => {
    setNewTournament({
      name: tourney.name,
      type: tourney.type || 'Liga',
      teamIds: tourney.teamIds || [],
      categories: tourney.categories || [],
      sport: tourney.sport || 'Fútbol'
    });
    setEditingTournamentId(tourney.id || null);
    const form = document.getElementById('tournamentForm');
    if (form) form.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleTeamInTournament = (teamId: string) => {
    setNewTournament(prev => {
      const exists = prev.teamIds.includes(teamId);
      return {
        ...prev,
        teamIds: exists 
          ? prev.teamIds.filter(id => id !== teamId)
          : [...prev.teamIds, teamId]
      };
    });
  };

  const handleSavePlayer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPlayer.name || !newPlayer.documentId) {
      alert("Nombre y Documento son obligatorios");
      return;
    }

    const duplicate = players.find(p => 
      p.documentId === newPlayer.documentId && 
      p.id !== editingId 
    );

    if (duplicate) {
      alert(`¡ERROR DE SEGURIDAD!\n\nEl documento ${newPlayer.documentId} ya está registrado a nombre de "${duplicate.name}".\n\nNo se permiten documentos duplicados para evitar fraudes.`);
      return;
    }

    const collectionRef = collection(db, 'artifacts', appId, 'public', 'data', 'players');
    
    if (editingId) {
      await updateDoc(doc(collectionRef, editingId), { ...newPlayer, updatedAt: serverTimestamp() });
      setEditingId(null);
      alert("Jugador actualizado.");
    } else {
      await addDoc(collectionRef, { ...newPlayer, stats: { goals: 0, cards: 0 }, createdAt: serverTimestamp(), status: 'Active' });
      alert("Jugador registrado exitosamente.");
    }
    setNewPlayer({ 
      name: '', dob: '', team: '', position: '', photoUrl: '', 
      sport: newPlayer.sport, documentId: '', eps: '', phone: '', address: '', status: 'Active' 
    });
  };

  const toggleStatus = async (collectionName: string, item: any) => {
    const newStatus = item.status === 'Inactive' ? 'Active' : 'Inactive';
    const actionName = newStatus === 'Inactive' ? 'DAR DE BAJA' : 'REACTIVAR';
    
    if(confirm(`¿Estás seguro de ${actionName} a "${item.name}"?`)) {
      await updateDoc(doc(db, 'artifacts', appId, 'public', 'data', collectionName, item.id), {
        status: newStatus
      });
    }
  };

  const deleteItem = async (collectionName: string, id: string) => {
    if(confirm("¿Eliminar DEFINITIVAMENTE este registro?")) {
      await deleteDoc(doc(db, 'artifacts', appId, 'public', 'data', collectionName, id));
    }
  };

  // --- DERIVED DATA ---
  const currentTournamentObj = tournaments.find(t => t.id === selectedTournamentId);
  const currentSport = currentTournamentObj?.sport || 'Fútbol';
  const currentSportConfig = SPORTS_CONFIG[currentSport as keyof typeof SPORTS_CONFIG];

  const participatingTeams = currentTournamentObj?.teamIds 
    ? teams.filter(t => currentTournamentObj.teamIds.includes(t.id || ''))
    : teams.filter(t => t.sport === currentSport);

  const currentTournamentMatches = matches.filter(m => m.tournamentId === selectedTournamentId);
  
  const filteredPlayers = players.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (p.team && p.team.toLowerCase().includes(searchTerm.toLowerCase())) ||
                          (p.documentId && p.documentId.includes(searchTerm));
    const matchesStatus = showInactive ? true : p.status !== 'Inactive'; 
    return matchesSearch && matchesStatus;
  });

  const filteredTeams = teams.filter(t => {
    return showInactive ? true : t.status !== 'Inactive';
  });

  const filteredPlayersForCards = players.filter(p => {
    const matchesTeam = selectedTeamForCards ? p.team === selectedTeamForCards : true;
    const matchesName = searchPlayerForCards ? p.name.toLowerCase().includes(searchPlayerForCards.toLowerCase()) : true;
    return matchesTeam && matchesName && p.status !== 'Inactive';
  });

  const getTeamLogo = (teamName: string) => teams.find(t => t.name === teamName)?.logoUrl || null;

  const standings = calculateStandings(currentTournamentMatches, participatingTeams, currentSport);

  // --- UI HELPERS ---
  const inputClass = "w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all";
  const labelClass = "block text-xs font-bold text-slate-500 mb-1 uppercase tracking-wide";
  const btnPrimaryClass = "bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-lg text-sm font-bold shadow-sm shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer";

  // Si no hay usuario autenticado, mostrar Login
  if (!user) return <Login auth={auth} onLoginSuccess={() => {}} />;

  if (loading) return <div className="h-screen flex items-center justify-center text-emerald-600 font-bold animate-pulse">Cargando TheTeam...</div>;

  if (!user) {
    return <Login auth={auth} onLoginSuccess={() => {}} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col md:flex-row">
      
      {/* SIDEBAR */}
      <aside className="w-full md:w-64 bg-slate-900 text-white flex-shrink-0 flex flex-col">
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center gap-2 text-emerald-400 mb-1">
            <Shield size={28} fill="currentColor" className="text-emerald-900 stroke-emerald-400" />
            <span className="font-black text-2xl tracking-tighter italic">TheTeam</span>
          </div>
          <p className="text-[10px] text-slate-500 uppercase tracking-widest">Gestión Polideportiva</p>
        </div>
        
        <nav className="p-4 space-y-1 flex-1">
          <MenuBtn icon={LayoutDashboard} label="Dashboard" active={view === 'dashboard'} onClick={() => { setView('dashboard'); setSelectedTeam(null); }} />
          <MenuBtn icon={Medal} label="Torneos" active={view === 'tournaments'} onClick={() => { setView('tournaments'); setSelectedTeam(null); setSelectedTournamentId(''); }} />
          <MenuBtn icon={Shield} label="Equipos" active={view === 'teams'} onClick={() => { setView('teams'); setSelectedTeam(null); }} />
          <MenuBtn icon={Users} label="Jugadores" active={view === 'players'} onClick={() => { setView('players'); setSelectedTeam(null); }} />
          <MenuBtn icon={Swords} label="Partidos" active={view === 'matches'} onClick={() => { setView('matches'); setSelectedTeam(null); }} />
          <MenuBtn icon={CreditCard} label="Carnets" active={view === 'cards'} onClick={() => { setView('cards'); setSelectedTeam(null); }} />
        </nav>

        <div className="p-6 border-t border-slate-800 space-y-3">
          <div className="text-xs text-slate-400 border-b border-slate-700 pb-3">
            <p className="font-semibold text-white mb-1">Bienvenido</p>
            <p className="truncate text-slate-400">{user?.email || 'Usuario'}</p>
          </div>
          <button
            onClick={async () => {
              try {
                await signOut(auth);
                setUser(null);
              } catch (error) {
                console.error('Error al cerrar sesión:', error);
              }
            }}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-lg text-sm font-semibold transition-all"
          >
            <LogOut size={16} />
            Cerrar Sesión
          </button>
          <p className="text-xs text-slate-600 text-center">Produced by</p>
          <p className="text-xs font-bold text-emerald-400 text-center">PortoSoft</p>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-y-auto h-screen p-4 md:p-8 bg-slate-100">
        
        {/* TOURNAMENTS VIEW */}
        {view === 'tournaments' && (
          <div className="space-y-6">
            <h1 className="text-2xl font-black text-slate-800">Torneos & Competencias</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Create/Edit Form */}
              <div id="tournamentForm" className={`p-6 rounded-xl shadow-sm border h-fit ${editingTournamentId ? 'bg-amber-50 border-amber-200' : 'bg-white border-slate-200'}`}>
                <h3 className={`font-bold mb-4 flex items-center gap-2 ${editingTournamentId ? 'text-amber-700' : 'text-slate-700'}`}>
                  {editingTournamentId ? <Pencil size={18}/> : <Plus size={18}/>}
                  {editingTournamentId ? 'Editar Torneo' : 'Crear Nuevo Torneo'}
                </h3>
                <form onSubmit={handleSaveTournament} className="space-y-4">
                  <div>
                    <label className={labelClass}>Deporte</label>
                    <select className={inputClass} value={newTournament.sport} onChange={e => setNewTournament({...newTournament, sport: e.target.value})}>
                      {Object.keys(SPORTS_CONFIG).map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className={labelClass}>Nombre del Torneo</label>
                    <input type="text" className={inputClass} placeholder={`Ej. Copa ${newTournament.sport} 2025`} value={newTournament.name} onChange={e => setNewTournament({...newTournament, name: e.target.value})} required />
                  </div>
                  
                  <div>
                    <label className={labelClass}>Tipo de Torneo</label>
                    <select className={inputClass} value={newTournament.type} onChange={e => setNewTournament({...newTournament, type: e.target.value})}>
                      {TOURNAMENT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className={labelClass}>Categorías Habilitadas</label>
                    <div className="max-h-40 overflow-y-auto border rounded-lg p-2 bg-slate-50 grid grid-cols-2 gap-2">
                      {CATEGORIES.map(cat => (
                        <div key={cat.name} onClick={() => toggleCategoryInTournament(cat.name)} className={`flex items-center gap-2 text-xs p-1 rounded cursor-pointer ${newTournament.categories?.includes(cat.name) ? 'bg-emerald-100 text-emerald-800 font-bold' : 'hover:bg-slate-200'}`}>
                          {newTournament.categories?.includes(cat.name) ? <CheckSquare size={14}/> : <Square size={14}/>}
                          {cat.name}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>Equipos Participantes</label>
                    <div className="max-h-40 overflow-y-auto border rounded-lg p-2 space-y-1 bg-slate-50">
                      {teams.filter(t => t.sport === newTournament.sport && t.status !== 'Inactive').map(team => (
                        <div key={team.id} onClick={() => toggleTeamInTournament(team.id || '')} className={`flex items-center gap-3 p-2 rounded cursor-pointer ${newTournament.teamIds.includes(team.id || '') ? 'bg-emerald-50' : 'hover:bg-slate-100'}`}>
                          {newTournament.teamIds.includes(team.id || '') ? <CheckSquare size={18} /> : <Square size={18} />}
                          {team.logoUrl && <img src={team.logoUrl} className="w-6 h-6 object-contain" />}
                          <span className="text-sm font-medium">{team.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button className={`${btnPrimaryClass} w-full ${editingTournamentId ? 'bg-amber-600 hover:bg-amber-700' : ''}`}>
                      {editingTournamentId ? 'Actualizar' : 'Crear'}
                    </button>
                    {editingTournamentId && (
                      <button type="button" onClick={() => { setEditingTournamentId(null); setNewTournament({ name: '', type: 'Liga', teamIds: [], categories: [], sport: 'Fútbol' }); }} className="bg-slate-200 px-4 rounded-lg">
                        <X size={18}/>
                      </button>
                    )}
                  </div>
                </form>
              </div>

              {/* List */}
              <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {tournaments.map(tourney => {
                  const SportIcon = SPORTS_CONFIG[tourney.sport as keyof typeof SPORTS_CONFIG]?.icon || Trophy;
                  return (
                    <div key={tourney.id} className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-black text-lg text-slate-800">{tourney.name}</h3>
                          <span className={`text-[10px] font-bold flex items-center gap-1 ${SPORTS_CONFIG[tourney.sport as keyof typeof SPORTS_CONFIG]?.color}`}>
                            <SportIcon size={12} /> {tourney.sport}
                          </span>
                        </div>
                        <p className="text-xs font-bold text-slate-500 mb-3">{tourney.type}</p>
                        
                        <div className="flex -space-x-2 overflow-hidden mb-4">
                          {tourney.teamIds.slice(0, 5).map(tid => {
                            const t = teams.find(team => team.id === tid);
                            if (!t) return null;
                            return (
                              <div key={tid} className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-slate-100 flex items-center justify-center overflow-hidden">
                                {t.logoUrl ? <img src={t.logoUrl} className="w-full h-full object-contain" /> : <span className="text-[8px] font-bold">{t.name.slice(0,2)}</span>}
                              </div>
                            )
                          })}
                        </div>
                      </div>

                      <div className="flex gap-2 pt-4 border-t">
                        <button onClick={() => startEditTournament(tourney)} className="text-slate-400 hover:text-blue-500 p-1.5">
                          <Edit size={16}/>
                        </button>
                        <button onClick={() => deleteItem('tournaments', tourney.id || '')} className="text-slate-400 hover:text-red-500 p-1.5">
                          <Trash2 size={16}/>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TEAMS VIEW */}
        {view === 'teams' && (
          <div className="space-y-6">
            <h1 className="text-2xl font-black text-slate-800">Gestión de Equipos</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Form */}
              <div id="teamForm" className={`p-6 rounded-xl shadow-sm border ${editingTeamId ? 'bg-amber-50 border-amber-200' : 'bg-white border-slate-200'}`}>
                <h3 className={`font-bold mb-4 flex items-center gap-2 ${editingTeamId ? 'text-amber-700' : 'text-slate-700'}`}>
                  {editingTeamId ? <Pencil size={18}/> : <Plus size={18}/>} 
                  {editingTeamId ? 'Editar Equipo' : 'Nuevo Equipo'}
                </h3>
                <form onSubmit={handleSaveTeam} className="space-y-4">
                  <div>
                    <label className={labelClass}>Deporte</label>
                    <select className={inputClass} value={newTeam.sport} onChange={e => setNewTeam({...newTeam, sport: e.target.value})}>
                      {Object.keys(SPORTS_CONFIG).map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Nombre del Equipo</label>
                    <input type="text" className={inputClass} placeholder="Ej. Real Cóndores" value={newTeam.name} onChange={e => setNewTeam({...newTeam, name: e.target.value})} required />
                  </div>
                  <div>
                    <label className={labelClass}>URL del Escudo</label>
                    <input type="text" className={inputClass} placeholder="https://..." value={newTeam.logoUrl} onChange={e => setNewTeam({...newTeam, logoUrl: e.target.value})} />
                  </div>
                  
                  <div className="pt-2 border-t">
                    <span className="text-xs font-bold text-emerald-600 block mb-2">Cuerpo Técnico</span>
                    
                    <div className="space-y-2 mb-3">
                      {newTeam.coaches?.map((c, idx) => (
                        <div key={idx} className="flex justify-between items-center bg-white border p-2 rounded text-sm">
                          <div>
                            <div className="font-bold">{c.name}</div>
                            <div className="text-[10px] text-slate-500">{c.category} • {c.phone}</div>
                          </div>
                          <button type="button" onClick={() => removeCoachFromTeam(idx)} className="text-red-400"><X size={14}/></button>
                        </div>
                      ))}
                    </div>

                    <div className="bg-slate-50 p-2 rounded border space-y-2">
                      <input type="text" className="w-full p-1.5 text-xs border rounded" placeholder="Nombre Entrenador" value={tempCoach.name} onChange={e => setTempCoach({...tempCoach, name: e.target.value})} />
                      <div className="flex gap-2">
                        <input type="tel" className="w-1/2 p-1.5 text-xs border rounded" placeholder="Teléfono" value={tempCoach.phone} onChange={e => setTempCoach({...tempCoach, phone: e.target.value})} />
                        <select className="w-1/2 p-1.5 text-xs border rounded" value={tempCoach.category} onChange={e => setTempCoach({...tempCoach, category: e.target.value})}>
                          <option>Todas</option>
                          {CATEGORIES.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
                        </select>
                      </div>
                      <button type="button" onClick={addCoachToTeam} className="w-full bg-slate-200 text-slate-700 text-xs font-bold py-1.5 rounded">
                        <Plus size={12}/> Agregar
                      </button>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button className={`${btnPrimaryClass} w-full ${editingTeamId ? 'bg-amber-600 hover:bg-amber-700' : ''}`}>
                      {editingTeamId ? 'Actualizar' : 'Guardar'}
                    </button>
                  </div>
                </form>
              </div>

              {/* List */}
              <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredTeams.map(team => {
                  const SportIcon = SPORTS_CONFIG[team.sport as keyof typeof SPORTS_CONFIG]?.icon || Trophy;
                  return (
                    <div key={team.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-slate-50 rounded-lg flex items-center justify-center border p-2">
                          {team.logoUrl ? <img src={team.logoUrl} className="max-w-full max-h-full object-contain" /> : <SportIcon className="text-slate-300"/>}
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-800">{team.name}</h3>
                          <p className="text-xs text-slate-500">{team.coaches?.length || 0} DTs</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => startEditTeam(team)} className="text-slate-400 hover:text-blue-500 p-2">
                          <Edit size={18}/>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* PLAYERS VIEW */}
        {view === 'players' && (
          <div className="space-y-6">
            <h1 className="text-2xl font-black text-slate-800">Jugadores</h1>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <form onSubmit={handleSavePlayer} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                <div>
                  <label className={labelClass}>Nombre</label>
                  <input required type="text" className={inputClass} placeholder="Nombre Completo" value={newPlayer.name} onChange={e => setNewPlayer({...newPlayer, name: e.target.value})} />
                </div>
                <div>
                  <label className={labelClass}>Documento</label>
                  <input required type="text" className={inputClass} placeholder="ID" value={newPlayer.documentId} onChange={e => setNewPlayer({...newPlayer, documentId: e.target.value})} />
                </div>
                <div>
                  <label className={labelClass}>Nacimiento</label>
                  <input required type="date" className={inputClass} value={newPlayer.dob} onChange={e => setNewPlayer({...newPlayer, dob: e.target.value})} />
                </div>
                <div>
                  <button className={btnPrimaryClass}>Guardar Jugador</button>
                </div>
              </form>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 border-b text-xs uppercase text-slate-500">
                  <tr>
                    <th className="p-4 text-left">Jugador</th>
                    <th className="p-4 text-left">Edad</th>
                    <th className="p-4 text-left">Equipo</th>
                    <th className="p-4 text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {filteredPlayers.map(p => (
                    <tr key={p.id} className="hover:bg-slate-50">
                      <td className="p-4 font-bold text-slate-800">{p.name}</td>
                      <td className="p-4">{calculateAge(p.dob)} años</td>
                      <td className="p-4">{p.team || '-'}</td>
                      <td className="p-4 text-right flex justify-end gap-2">
                        <button onClick={() => setEditingId(p.id || null)} className="text-slate-400 hover:text-blue-500">
                          <Edit size={16}/>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* DASHBOARD VIEW */}
        {view === 'dashboard' && (
          <div className="space-y-6">
            <h1 className="text-2xl font-black text-slate-800">Dashboard</h1>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <h2 className="text-lg font-bold mb-4">Tabla de Posiciones</h2>
              {standings.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-50 border-b">
                      <tr>
                        <th className="p-3 text-left">Pos</th>
                        <th className="p-3 text-left">Equipo</th>
                        <th className="p-3 text-center">PJ</th>
                        <th className="p-3 text-center">G</th>
                        <th className="p-3 text-center">E</th>
                        <th className="p-3 text-center">P</th>
                        <th className="p-3 text-center">PTS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {standings.map((team: any, idx: number) => (
                        <tr key={idx}>
                          <td className="p-3 font-bold">{idx + 1}</td>
                          <td className="p-3 font-bold">{team.name}</td>
                          <td className="p-3 text-center">{team.played}</td>
                          <td className="p-3 text-center text-green-600">{team.won}</td>
                          <td className="p-3 text-center text-blue-600">{team.drawn}</td>
                          <td className="p-3 text-center text-red-600">{team.lost}</td>
                          <td className="p-3 text-center font-bold">{team.points}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-slate-400 text-center py-8">No hay datos disponibles</p>
              )}
            </div>
          </div>
        )}

        {/* CARDS VIEW */}
        {view === 'cards' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-black text-slate-800">Carnets</h1>
              <button onClick={() => window.print()} className="bg-slate-800 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                <Printer size={18}/> Imprimir
              </button>
            </div>

            <div className="flex gap-4">
              <select value={selectedTeamForCards} onChange={e => setSelectedTeamForCards(e.target.value)} className={inputClass + ' flex-1'}>
                <option value="">-- Todos los Equipos --</option>
                {teams.map(t => <option key={t.id} value={t.name}>{t.name}</option>)}
              </select>
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 text-slate-400" size={14}/>
                <input type="text" placeholder="Buscar..." className={inputClass + ' pl-8'} value={searchPlayerForCards} onChange={e => setSearchPlayerForCards(e.target.value)} />
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              {filteredPlayersForCards.map(p => (
                <PlayerCard key={p.id} player={p} teamLogo={getTeamLogo(p.team)} tournamentName={selectedTournamentForCards || '2025'} />
              ))}
            </div>
          </div>
        )}

        {/* MATCHES VIEW */}
        {view === 'matches' && (
          <div className="space-y-6">
            <h1 className="text-2xl font-black text-slate-800">Partidos</h1>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <p className="text-slate-500">Gestión de partidos - En desarrollo</p>
            </div>
          </div>
        )}
        
      </main>
    </div>
  );
}

const MenuBtn = ({ icon: Icon, label, active, onClick }: { icon: any; label: string; active: boolean; onClick: () => void }) => (
  <button onClick={onClick} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${active ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
    <Icon size={20} /> <span className="font-medium">{label}</span>
  </button>
);
