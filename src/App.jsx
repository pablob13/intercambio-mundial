import React, { useState, useEffect, useRef } from 'react';
import Tesseract from 'tesseract.js';
import { Camera, Search, Filter, X, Plus, Minus, Check, ChevronDown, ChevronUp, LogOut, BookOpen, Library, User, PlusCircle, Trash2, Users, ArrowRightLeft, UserPlus, UserMinus, MessageCircle, Clock, CheckCircle, RefreshCw, ArrowLeft, Crown, Star, Handshake, CheckSquare, Target, Globe, Package, Trophy, Send, Inbox } from 'lucide-react';
import { supabase } from './supabase';
import './index.css';
import { TEAM_THEMES } from './themes';

const TEAMS = [
  { code: 'FWC', name: 'Mundial', count: 20, group: 'Special', flag: '🏆' },
  // Group A
  { code: 'MEX', name: 'Mexico', count: 20, group: 'A', flag: '🇲🇽' },
  { code: 'RSA', name: 'South Africa', count: 20, group: 'A', flag: '🇿🇦' },
  { code: 'KOR', name: 'Korea Republic', count: 20, group: 'A', flag: '🇰🇷' },
  { code: 'CZE', name: 'Czechia', count: 20, group: 'A', flag: '🇨🇿' },
  // Group B
  { code: 'CAN', name: 'Canada', count: 20, group: 'B', flag: '🇨🇦' },
  { code: 'BIH', name: 'Bosnia-Herzegovina', count: 20, group: 'B', flag: '🇧🇦' },
  { code: 'QAT', name: 'Qatar', count: 20, group: 'B', flag: '🇶🇦' },
  { code: 'SUI', name: 'Switzerland', count: 20, group: 'B', flag: '🇨🇭' },
  // Group C
  { code: 'BRA', name: 'Brazil', count: 20, group: 'C', flag: '🇧🇷' },
  { code: 'MAR', name: 'Morocco', count: 20, group: 'C', flag: '🇲🇦' },
  { code: 'HAI', name: 'Haiti', count: 20, group: 'C', flag: '🇭🇹' },
  { code: 'SCO', name: 'Scotland', count: 20, group: 'C', flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿' },
  // Group D
  { code: 'USA', name: 'USA', count: 20, group: 'D', flag: '🇺🇸' },
  { code: 'PAR', name: 'Paraguay', count: 20, group: 'D', flag: '🇵🇾' },
  { code: 'AUS', name: 'Australia', count: 20, group: 'D', flag: '🇦🇺' },
  { code: 'TUR', name: 'Türkiye', count: 20, group: 'D', flag: '🇹🇷' },
  // Group E
  { code: 'GER', name: 'Germany', count: 20, group: 'E', flag: '🇩🇪' },
  { code: 'CUW', name: 'Curaçao', count: 20, group: 'E', flag: '🇨🇼' },
  { code: 'CIV', name: 'Côte d\'Ivoire', count: 20, group: 'E', flag: '🇨🇮' },
  { code: 'ECU', name: 'Ecuador', count: 20, group: 'E', flag: '🇪🇨' },
  // Group F
  { code: 'NED', name: 'Netherlands', count: 20, group: 'F', flag: '🇳🇱' },
  { code: 'JPN', name: 'Japan', count: 20, group: 'F', flag: '🇯🇵' },
  { code: 'SWE', name: 'Sweden', count: 20, group: 'F', flag: '🇸🇪' },
  { code: 'TUN', name: 'Tunisia', count: 20, group: 'F', flag: '🇹🇳' },
  // Group G
  { code: 'BEL', name: 'Belgium', count: 20, group: 'G', flag: '🇧🇪' },
  { code: 'EGY', name: 'Egypt', count: 20, group: 'G', flag: '🇪🇬' },
  { code: 'IRN', name: 'IR Iran', count: 20, group: 'G', flag: '🇮🇷' },
  { code: 'NZL', name: 'New Zealand', count: 20, group: 'G', flag: '🇳🇿' },
  // Group H
  { code: 'ESP', name: 'Spain', count: 20, group: 'H', flag: '🇪🇸' },
  { code: 'CPV', name: 'Cabo Verde', count: 20, group: 'H', flag: '🇨🇻' },
  { code: 'KSA', name: 'Saudi Arabia', count: 20, group: 'H', flag: '🇸🇦' },
  { code: 'URU', name: 'Uruguay', count: 20, group: 'H', flag: '🇺🇾' },
  // Group I
  { code: 'FRA', name: 'France', count: 20, group: 'I', flag: '🇫🇷' },
  { code: 'SEN', name: 'Senegal', count: 20, group: 'I', flag: '🇸🇳' },
  { code: 'IRQ', name: 'Iraq', count: 20, group: 'I', flag: '🇮🇶' },
  { code: 'NOR', name: 'Norway', count: 20, group: 'I', flag: '🇳🇴' },
  // Group J
  { code: 'ARG', name: 'Argentina', count: 20, group: 'J', flag: '🇦🇷' },
  { code: 'ALG', name: 'Algeria', count: 20, group: 'J', flag: '🇩🇿' },
  { code: 'AUT', name: 'Austria', count: 20, group: 'J', flag: '🇦🇹' },
  { code: 'JOR', name: 'Jordan', count: 20, group: 'J', flag: '🇯🇴' },
  // Group K
  { code: 'POR', name: 'Portugal', count: 20, group: 'K', flag: '🇵🇹' },
  { code: 'COD', name: 'Congo DR', count: 20, group: 'K', flag: '🇨🇩' },
  { code: 'UZB', name: 'Uzbekistan', count: 20, group: 'K', flag: '🇺🇿' },
  { code: 'COL', name: 'Colombia', count: 20, group: 'K', flag: '🇨🇴' },
  // Group L
  { code: 'ENG', name: 'England', count: 20, group: 'L', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
  { code: 'CRO', name: 'Croatia', count: 20, group: 'L', flag: '🇭🇷' },
  { code: 'GHA', name: 'Ghana', count: 20, group: 'L', flag: '🇬🇭' },
  { code: 'PAN', name: 'Panama', count: 20, group: 'L', flag: '🇵🇦' },
  { code: 'CC', name: 'Coca', count: 14, group: 'CocaCola', flag: '🥤' }
];

const TOTAL_STAMPS = TEAMS.reduce((acc, team) => acc + team.count, 0);

function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });
    if (error) {
      console.error(error);
      alert('Error al conectar con Google.');
    }
  };

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (isSignUp) {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: name } }
      });
      if (error) alert(error.message);
      else alert("¡Registro exitoso! Ya puedes iniciar sesión con tu cuenta.");
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) alert("Credenciales incorrectas o cuenta no existe.");
    }
    setLoading(false);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Mundial 2026</h1>
        <p>Inicia sesión para gestionar tu colección en la nube</p>
        
        <button 
          className="btn btn-secondary google-btn" 
          onClick={handleGoogleLogin}
          style={{ marginBottom: '20px' }}
        >
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google logo" style={{ width: '20px', height: '20px', marginRight: '10px' }} />
          Continuar con Google
        </button>

        <div className="divider">
          <span>o usa tu correo electrónico</span>
        </div>

        <form onSubmit={handleEmailAuth} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {isSignUp && (
            <input 
              type="text" 
              className="login-input" 
              placeholder="Tu nombre completo" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              required={isSignUp}
            />
          )}
          <input 
            type="email" 
            className="login-input" 
            placeholder="Correo electrónico" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input 
            type="password" 
            className="login-input" 
            placeholder="Contraseña (mínimo 6 caracteres)" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={loading}>
            {loading ? 'Cargando...' : (isSignUp ? 'Crear Cuenta' : 'Iniciar Sesión')}
          </button>
        </form>

        <p style={{ marginTop: '15px', fontSize: '0.85rem', cursor: 'pointer', color: 'var(--primary)', textAlign: 'center' }} onClick={() => setIsSignUp(!isSignUp)}>
          {isSignUp ? '¿Ya tienes cuenta? Inicia sesión aquí' : '¿No tienes cuenta? Regístrate aquí'}
        </p>

        <div style={{ marginTop: '20px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          Al continuar, aceptas nuestros <a href="/terminos.html" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)' }}>Términos y Condiciones</a> y nuestro <a href="/privacidad.html" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)' }}>Aviso de Privacidad</a>.
        </div>
      </div>
    </div>
  );
}

const generateInitialStamps = () => {
  const initial = [];
  TEAMS.forEach(team => {
    if (team.code === 'FWC') {
      initial.push({ id: 'FWC 00', teamCode: 'FWC', number: '00', count: 0, scanned: false });
      for (let i = 1; i <= 19; i++) {
        initial.push({ id: `FWC ${i}`, teamCode: 'FWC', number: i, count: 0, scanned: false });
      }
    } else {
      for (let i = 1; i <= team.count; i++) {
        initial.push({ id: `${team.code} ${i}`, teamCode: team.code, number: i, count: 0, scanned: false });
      }
    }
  });
  return initial;
};

const AdBanner = ({ isPro, format = 'horizontal' }) => {
  if (isPro) return null; // PRO users never see ads
  
  const ads = [
    { src: '/ad1.jpg', link: 'https://trezam.com.mx' },
    { src: '/ad2.jpg', link: 'https://trezam.com.mx' }
  ];

  return (
    <div style={{
      width: '100%',
      backgroundColor: 'rgba(255,255,255,0.02)',
      margin: '20px 0',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
      padding: '10px 0',
      borderRadius: '12px'
    }}>
      <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px', color: 'var(--text-muted)' }}>Anuncios Patrocinados (Desliza)</span>
      
      <div className="hide-scrollbar" style={{ 
        width: '100%', 
        display: 'flex', 
        overflowX: 'auto', 
        scrollSnapType: 'x mandatory', 
        WebkitOverflowScrolling: 'touch',
        gap: '15px',
        padding: '0 15px',
        scrollBehavior: 'smooth'
      }}>
        {ads.map((ad, idx) => (
          <div key={idx} style={{ 
            flex: '0 0 85%', 
            maxWidth: '400px', 
            scrollSnapAlign: 'center',
            display: 'flex',
            justifyContent: 'center'
          }}>
            <a href={ad.link} target="_blank" rel="noopener noreferrer" style={{ display: 'block', width: '100%' }}>
              <img 
                src={ad.src} 
                alt="Trezam Seguros" 
                style={{ width: '100%', height: 'auto', borderRadius: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.4)', border: '1px solid var(--border)' }} 
              />
            </a>
          </div>
        ))}
      </div>
      
      <span style={{ fontSize: '0.75rem', marginTop: '15px', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '5px' }}>
        <Crown size={14} color="#FFD700" /> Vuelve tu cuenta PRO para remover anuncios
      </span>
    </div>
  );
};

const ProPaywall = ({ featureName, description, onUpgrade }) => (
  <div className="tab-content fade-in" style={{ padding: '20px', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: '60vh' }}>
    <div style={{ backgroundColor: 'rgba(255, 215, 0, 0.1)', padding: '30px', borderRadius: '16px', border: '1px solid #FFD700', margin: '20px auto', maxWidth: '400px' }}>
      <Crown size={64} color="#FFD700" style={{ marginBottom: '20px', display: 'inline-block' }} />
      <h2 style={{ margin: '0 0 15px 0', color: '#FFD700' }}>Función Exclusiva PRO</h2>
      <h3 style={{ margin: '0 0 15px 0', color: 'var(--text-main)' }}>{featureName}</h3>
      <p style={{ color: 'var(--text-muted)', marginBottom: '30px', lineHeight: '1.6', fontSize: '0.95rem' }}>{description}</p>
      <button className="btn btn-primary" style={{ backgroundColor: '#FFD700', color: 'black', fontWeight: 'bold', width: '100%', padding: '15px', justifyContent: 'center' }} onClick={onUpgrade}>
        <Star size={18} style={{ marginRight: '8px' }} /> Ver Planes PRO
      </button>
    </div>
  </div>
);

function MainApp({ session, onLogout }) {
  const isCloud = true;
  const userName = session?.user?.user_metadata?.full_name || session?.user?.email;
  const storageKey = `paniniStamps2026_v4_${session?.user?.id}`;

  const [albumsState, setAlbumsState] = useState(null);

  useEffect(() => {
    const currentThemeCode = albumsState?.theme || 'MUNDIAL';
    const currentTheme = TEAM_THEMES[currentThemeCode] || TEAM_THEMES['MUNDIAL'];
    const root = document.documentElement;
    if (currentTheme) {
      root.style.setProperty('--bg-color', currentTheme.bg);
      root.style.setProperty('--panel-bg', currentTheme.panel);
      root.style.setProperty('--primary', currentTheme.primary);
      root.style.setProperty('--primary-hover', currentTheme.hover || currentTheme.primary);
      root.style.setProperty('--warning', currentTheme.warning);
      root.style.setProperty('--danger', currentTheme.danger);
      root.style.setProperty('--border', currentTheme.border);
    }
  }, [albumsState?.theme]);

  const [isLoadingStamps, setIsLoadingStamps] = useState(true);
  const [activeTab, setActiveTab] = useState('collection'); // 'collection', 'albums', 'profile', 'friends'
  const [friendsData, setFriendsData] = useState(null);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [friendSubTab, setFriendSubTab] = useState('match');
  const [messages, setMessages] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  
  const [tradeGiveSelection, setTradeGiveSelection] = useState([]);
  const [tradeReceiveSelection, setTradeReceiveSelection] = useState([]);
  
  const [isPro, setIsPro] = useState(false);
  const [paywallFeature, setPaywallFeature] = useState(null);
  const [groups, setGroups] = useState([]);
  const [communityTab, setCommunityTab] = useState('explorar');
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [groupSubTab, setGroupSubTab] = useState('match'); // 'match', 'chat'
  const [groupMessages, setGroupMessages] = useState([]);
  const [newGroupMessage, setNewGroupMessage] = useState('');
  const [isCreatingGroup, setIsCreatingGroup] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [lastReadChats, setLastReadChats] = useState(() => JSON.parse(localStorage.getItem('lastReadChats') || '{}'));
  const [unreadChatCount, setUnreadChatCount] = useState(0);
  const [unreadChats, setUnreadChats] = useState({ friends: {}, groups: {} });
  const groupChatScrollRef = useRef(null);
  const chatScrollRef = useRef(null);

  // Scanner States
  const [scannerMode, setScannerMode] = useState(null); // 'menu', 'page_setup', 'page_processing', 'page_review', 'duplicates_processing'
  const [scanTargetTeam, setScanTargetTeam] = useState('FWC');
  const [pageScannerResults, setPageScannerResults] = useState(null);
  const [scanImageFile, setScanImageFile] = useState(null); // Para recopilar datos de entrenamiento


  // Load Stamps
  useEffect(() => {
    const initStamps = async () => {
      setIsLoadingStamps(true);
      
      const createDefaultState = () => ({
        activeAlbumId: 'default',
        theme: 'dark',
        showCocaCola: true,
        friendIds: [],
        albums: [{ id: 'default', name: 'Mi Álbum Principal', stamps: generateInitialStamps() }]
      });

      const migrateAlbums = (state) => {
        if (!state) return state;
        const fullStampsList = generateInitialStamps();
        if (state.showCocaCola === undefined) state.showCocaCola = true;
        
        state.albums = state.albums.map(album => {
          const missingStamps = fullStampsList.filter(s => !album.stamps.find(as => as.id === s.id));
          if (missingStamps.length > 0) {
            return { ...album, stamps: [...album.stamps, ...missingStamps] };
          }
          return album;
        });
        return state;
      };

      if (isCloud && session?.user?.id) {
        const { data, error } = await supabase.from('user_stamps').select('stamps_data, is_pro').eq('id', session.user.id).single();
        if (data) {
          setIsPro(!!data.is_pro);
          const migrated = migrateAlbums(data.stamps_data || {});
          
          if (Array.isArray(migrated)) {
            setAlbumsState(migrateAlbums({
              activeAlbumId: 'default',
              theme: 'dark',
              showCocaCola: true,
              friendIds: [],
              albums: [{ id: 'default', name: 'Mi Álbum Principal', stamps: migrated }]
            }));
          } else {
            setAlbumsState(migrated);
          }
        } else {
          setAlbumsState(createDefaultState());
        }
      } else {
        const saved = localStorage.getItem(storageKey);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) {
            setAlbumsState(migrateAlbums({
              activeAlbumId: 'default',
              theme: 'dark',
              showCocaCola: true,
              friendIds: [],
              albums: [{ id: 'default', name: 'Mi Álbum Principal', stamps: parsed }]
            }));
          } else {
            setAlbumsState(migrateAlbums(parsed));
          }
        } else {
          setAlbumsState(createDefaultState());
        }
      }
      setIsLoadingStamps(false);
    };
    initStamps();
  }, [isCloud, session, storageKey]);

  // Save Stamps
  useEffect(() => {
    if (!albumsState) return; 
    
    const stateToSave = { ...albumsState, ownerName: userName };

    if (isCloud) {
      supabase.from('user_stamps').upsert({ id: session.user.id, stamps_data: stateToSave }).then(({error}) => {
        if (error) console.error("Error saving to cloud", error);
      });
    } else {
      localStorage.setItem(storageKey, JSON.stringify(stateToSave));
    }
  }, [albumsState, isCloud, session, storageKey, userName]);

  // Load Friends Data & Requests
  useEffect(() => {
    if (activeTab === 'friends' && isCloud) {
      supabase.from('user_stamps').select('id, stamps_data, is_pro').neq('id', session?.user?.id).then(({ data, error }) => {
        if (data && !error) setFriendsData(data);
      });
      
      supabase.from('friend_requests').select('*')
        .or(`sender_id.eq.${session?.user?.id},receiver_id.eq.${session?.user?.id}`)
        .then(({ data, error }) => {
          if (data && !error) setFriendRequests(data);
        });
        
      supabase.from('group_members').select('group_id').eq('user_id', session?.user?.id).then(({ data: memberData }) => {
        if (memberData && memberData.length > 0) {
          const groupIds = memberData.map(m => m.group_id);
          supabase.from('sticker_groups').select('id, name, created_by, created_at, group_members(user_id, joined_at, status)').in('id', groupIds).then(({ data, error }) => {
            if (data && !error) setGroups(data);
          });
        } else {
          setGroups([]);
        }
      });
    }
  }, [activeTab, isCloud, session]);

  // Load Messages
  useEffect(() => {
    if (selectedFriend && friendSubTab === 'chat' && isCloud) {
      const fetchMessages = async () => {
        const { data } = await supabase
          .from('messages')
          .select('*')
          .or(`and(sender_id.eq.${session.user.id},receiver_id.eq.${selectedFriend.id}),and(sender_id.eq.${selectedFriend.id},receiver_id.eq.${session.user.id})`)
          .order('created_at', { ascending: true });
        
        if (data) setMessages(data);
      };

      fetchMessages();

      // Subscribe to new messages
      const subscription = supabase
        .channel('messages_channel')
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, payload => {
          if (
            (payload.new.sender_id === session.user.id && payload.new.receiver_id === selectedFriend.id) ||
            (payload.new.sender_id === selectedFriend.id && payload.new.receiver_id === session.user.id)
          ) {
            setMessages(prev => [...prev, payload.new]);
          }
        })
        .subscribe();

      return () => {
        supabase.removeChannel(subscription);
      };
    }
  }, [selectedFriend, friendSubTab, isCloud, session]);

  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Load Group Messages
  useEffect(() => {
    if (selectedGroup && groupSubTab === 'chat' && isCloud) {
      const fetchGroupMessages = async () => {
        const { data } = await supabase
          .from('group_messages')
          .select('*')
          .eq('group_id', selectedGroup.id)
          .order('created_at', { ascending: true });
        if (data) setGroupMessages(data);
      };

      fetchGroupMessages();

      const subscription = supabase
        .channel('group_messages_channel')
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'group_messages', filter: `group_id=eq.${selectedGroup.id}` }, payload => {
          setGroupMessages(prev => [...prev, payload.new]);
        })
        .subscribe();

      return () => {
        supabase.removeChannel(subscription);
      };
    }
  }, [selectedGroup, groupSubTab, isCloud]);

  useEffect(() => {
    if (groupChatScrollRef.current) {
      groupChatScrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [groupMessages]);

  // Handle local storage for last read chats
  useEffect(() => {
    localStorage.setItem('lastReadChats', JSON.stringify(lastReadChats));
  }, [lastReadChats]);

  // Update last read when in chat tab
  useEffect(() => {
    if (selectedFriend && friendSubTab === 'chat') {
      setLastReadChats(prev => ({ ...prev, [selectedFriend.id]: new Date().getTime() }));
    }
  }, [selectedFriend, friendSubTab, messages]);

  useEffect(() => {
    if (selectedGroup && groupSubTab === 'chat') {
      setLastReadChats(prev => ({ ...prev, [selectedGroup.id]: new Date().getTime() }));
    }
  }, [selectedGroup, groupSubTab, groupMessages]);

  // Check for unread messages globally
  useEffect(() => {
    if (!isCloud || !session) return;
    const checkUnread = async () => {
      let unreadCount = 0;
      const newUnread = { friends: {}, groups: {} };
      
      const { data: msgs } = await supabase.from('messages').select('sender_id, created_at').eq('receiver_id', session.user.id);
      if (msgs) {
        const latestBySender = {};
        msgs.forEach(m => {
          const time = new Date(m.created_at).getTime();
          if (!latestBySender[m.sender_id] || time > latestBySender[m.sender_id]) {
            latestBySender[m.sender_id] = time;
          }
        });
        
        Object.entries(latestBySender).forEach(([senderId, time]) => {
          const lastRead = lastReadChats[senderId] || 0;
          if (time > lastRead) {
            unreadCount++;
            newUnread.friends[senderId] = true;
          }
        });
      }

      const myGroupIds = groups.filter(g => g.group_members?.some(m => m.user_id === session.user.id && m.status === 'accepted')).map(g => g.id);
      if (myGroupIds.length > 0) {
        const { data: gMsgs } = await supabase.from('group_messages').select('group_id, created_at').in('group_id', myGroupIds).neq('sender_id', session.user.id);
        if (gMsgs) {
          const latestByGroup = {};
          gMsgs.forEach(m => {
             const time = new Date(m.created_at).getTime();
             if (!latestByGroup[m.group_id] || time > latestByGroup[m.group_id]) {
                latestByGroup[m.group_id] = time;
             }
          });
          Object.entries(latestByGroup).forEach(([groupId, time]) => {
            const lastRead = lastReadChats[groupId] || 0;
            if (time > lastRead) {
              unreadCount++;
              newUnread.groups[groupId] = true;
            }
          });
        }
      }
      
      setUnreadChatCount(unreadCount);
      setUnreadChats(newUnread);
    };
    
    checkUnread();
    const interval = setInterval(checkUnread, 30000); // Check every 30s
    return () => clearInterval(interval);
  }, [isCloud, session, groups, lastReadChats]);

  const activeTeams = (albumsState?.showCocaCola !== false) ? TEAMS : TEAMS.filter(t => t.code !== 'CC');
  const activeTotalStamps = activeTeams.reduce((acc, team) => acc + team.count, 0);

  // Helpers for current album
  const stamps = albumsState?.albums.find(a => a.id === albumsState.activeAlbumId)?.stamps || [];
  const activeAlbumName = albumsState?.albums.find(a => a.id === albumsState.activeAlbumId)?.name || '';

  const setStamps = (newStamps) => {
    setAlbumsState(prev => ({
      ...prev,
      albums: prev.albums.map(a => a.id === prev.activeAlbumId ? { ...a, stamps: newStamps } : a)
    }));
  };

  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all'); 
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scannedNumbers, setScannedNumbers] = useState([]);
  const [selectedStampId, setSelectedStampId] = useState(null);
  const [expandedTeams, setExpandedTeams] = useState({});
  const [selectionMode, setSelectionMode] = useState(false);
  const [selectedStamps, setSelectedStamps] = useState([]);
  
  // Trade Modal State
  const [isTradeModalOpen, setIsTradeModalOpen] = useState(false);
  const [tradeGiven, setTradeGiven] = useState([]); 
  const [tradeReceived, setTradeReceived] = useState([]);
  const [tradeGivenTeam, setTradeGivenTeam] = useState('');
  const [tradeReceivedTeam, setTradeReceivedTeam] = useState('');

  // New Album Modal State
  const [isCreateAlbumModalOpen, setIsCreateAlbumModalOpen] = useState(false);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [newAlbumName, setNewAlbumName] = useState('');
  const [selectedAchievement, setSelectedAchievement] = useState(null);
  const [selectedMissingTeam, setSelectedMissingTeam] = useState(null);
  const [selectedDuplicateTeam, setSelectedDuplicateTeam] = useState(null);

  useEffect(() => {
    if (Object.keys(expandedTeams).length === 0) {
      setExpandedTeams({ FWC: true, MEX: true, ARG: true });
    }
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const addFriendId = params.get('addFriend');
    if (addFriendId && isCloud && session && session.user.id !== addFriendId) {
      supabase.from('friend_requests').insert([{ sender_id: session.user.id, receiver_id: addFriendId, status: 'pending' }]).then(({ error }) => {
        if (!error) {
          alert("¡Solicitud de amistad enviada a través de Código QR!");
          setActiveTab('friends');
        } else if (error.code === '23505') {
          // Ya existe la solicitud, no hacer nada o avisar
          alert("Ya tienes agregado a este amigo o hay una solicitud pendiente.");
          setActiveTab('friends');
        }
        window.history.replaceState({}, document.title, window.location.pathname);
      });
    }
  }, [isCloud, session]);

  if (isLoadingStamps || !albumsState) {
    return (
      <div className="app-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', flexDirection: 'column' }}>
        <div className="loading-spinner" style={{ marginBottom: '20px' }}></div>
        <p style={{ color: 'var(--text-muted)' }}>Cargando datos desde la nube...</p>
      </div>
    );
  }

  const vibrate = (pattern = 30) => {
    if (navigator.vibrate) {
      try { navigator.vibrate(pattern); } catch(e) {}
    }
  };

  const playPopSound = () => {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(400, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(600, audioCtx.currentTime + 0.1);
      gainNode.gain.setValueAtTime(0.2, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
      osc.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.1);
    } catch (e) {}
  };

  const handleStampClick = (stamp) => {
    vibrate(30);
    playPopSound();

    if (selectionMode) {
      if (selectedStamps.includes(stamp.id)) {
        setSelectedStamps(prev => prev.filter(id => id !== stamp.id));
      } else {
        setSelectedStamps(prev => [...prev, stamp.id]);
      }
      return;
    }

    if (stamp.count === 0) {
      updateStampCount(stamp.id, 1);
    } else {
      setSelectedStampId(stamp.id);
    }
  };

  const updateStampCount = (id, newCount) => {
    if (newCount < 0) return;
    setStamps(stamps.map(s => s.id === id ? { ...s, count: newCount, scanned: false } : s));
  };

  const copyDuplicatesToClipboard = () => {
    const duplicates = stamps.filter(s => s.count > 1);
    if (duplicates.length === 0) {
      alert("No tienes estampas repetidas para compartir.");
      return;
    }
    
    const grouped = {};
    duplicates.forEach(s => {
      if (!grouped[s.teamCode]) grouped[s.teamCode] = [];
      grouped[s.teamCode].push(`${s.id} (x${s.count - 1})`);
    });
    
    let text = `Mis estampas repetidas del Mundial 2026 (${userName}):\n\n`;
    Object.keys(grouped).forEach(teamCode => {
      text += `${teamCode}: ${grouped[teamCode].join(', ')}\n`;
    });
    
    text += `\n⚽ Para hacer intercambios y saber mis faltantes, únete a la comunidad en mundialestampas.com`;
    
    navigator.clipboard.writeText(text).then(() => {
      alert("¡Lista de repetidas copiada al portapapeles! Ya puedes pegarla en WhatsApp.");
    });
  };

  const copyMissingToClipboard = () => {
    if (!isPro) {
      setPaywallFeature({ name: "Exportar Faltantes", description: "Copia automáticamente la lista de todas las estampas que te faltan para enviarla rápidamente a tus amigos o grupos." });
      return;
    }
    
    const missing = stamps.filter(s => s.count === 0);
    if (missing.length === 0) {
      alert("¡Felicidades! Tienes todas las estampas del mundial.");
      return;
    }
    
    const grouped = {};
    missing.forEach(s => {
      if (!grouped[s.teamCode]) grouped[s.teamCode] = [];
      grouped[s.teamCode].push(`${s.id}`);
    });
    
    let text = `Mis estampas FALTANTES del Mundial 2026 (${userName}):\n\n`;
    Object.keys(grouped).forEach(teamCode => {
      text += `${teamCode}: ${grouped[teamCode].join(', ')}\n`;
    });
    
    text += `\n⚽ Para hacer intercambios y ver mis repetidas, únete a la comunidad en mundialestampas.com`;
    
    navigator.clipboard.writeText(text).then(() => {
      alert("¡Lista de faltantes copiada al portapapeles! Ya puedes pegarla en WhatsApp.");
    });
  };

  const toggleTeam = (teamCode) => {
    setExpandedTeams(prev => ({ ...prev, [teamCode]: !prev[teamCode] }));
  };

  const handleExecuteTrade = () => {
    if (tradeGiven.length === 0 && tradeReceived.length === 0) return;
    
    let newStamps = [...stamps];
    tradeGiven.forEach(givenStamp => {
      newStamps = newStamps.map(s => s.id === givenStamp.id ? { ...s, count: s.count - 1 } : s);
    });
    tradeReceived.forEach(recStamp => {
      newStamps = newStamps.map(s => s.id === recStamp.id ? { ...s, count: s.count + 1 } : s);
    });
    
    setStamps(newStamps);
    setIsTradeModalOpen(false);
    setTradeGiven([]);
    setTradeReceived([]);
    alert("¡Intercambio realizado con éxito! Tu álbum se ha actualizado.");
  };

  const addToTradeGiven = (stamp) => {
    const alreadyGivenCount = tradeGiven.filter(s => s.id === stamp.id).length;
    if (stamp.count - 1 > alreadyGivenCount) {
      setTradeGiven([...tradeGiven, stamp]);
    }
  };

  const addToTradeReceived = (stamp) => {
    if (!tradeReceived.find(s => s.id === stamp.id)) {
      setTradeReceived([...tradeReceived, stamp]);
    }
  };


  const processScanDuplicates = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setScannerMode('duplicates_processing');
    setScanProgress(0);
    setScannedNumbers([]);

    try {
      const result = await Tesseract.recognize(file, 'eng', {
        logger: m => {
          if (m.status === 'recognizing text') {
            setScanProgress(Math.round(m.progress * 100));
          }
        }
      });

      const text = result.data.text.toUpperCase();
      const regex = /([A-Z]{3})\s*(\d{1,2})/g;
      let matches;
      const validIds = [];

      while ((matches = regex.exec(text)) !== null) {
        const code = matches[1];
        const numStr = matches[2];
        const num = parseInt(numStr, 10);
        
        const teamExists = TEAMS.find(t => t.code === code);
        if (teamExists) {
          if (code === 'FWC' && (numStr === '00' || (num >= 1 && num <= 19))) {
            const formattedNum = numStr === '00' ? '00' : num;
            validIds.push(`${code} ${formattedNum}`);
          } else if (code !== 'FWC' && num >= 1 && num <= teamExists.count) {
            validIds.push(`${code} ${num}`);
          }
        }
      }

      const uniqueValidIds = [...new Set(validIds)];
      setScannedNumbers(uniqueValidIds);
      
      if (uniqueValidIds.length > 0) {
        setStamps(stamps.map(s => 
          uniqueValidIds.includes(s.id) && s.count === 0 ? { ...s, scanned: true } : s
        ));
        
        const newExpanded = { ...expandedTeams };
        uniqueValidIds.forEach(id => {
          const teamCode = id.split(' ')[0];
          newExpanded[teamCode] = true;
        });
        setExpandedTeams(newExpanded);
      }
      setScannerMode(null);
    } catch (error) {
      console.error("Scan error:", error);
      alert("Error al escanear la imagen.");
    } finally {
      setIsScanning(false);
    }
  };

  const processScanPage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setScanImageFile(file); // Guardamos la foto para entrenar el modelo
    setScannerMode('page_processing');
    setScanProgress(0);
    
    try {
      const result = await Tesseract.recognize(file, 'eng', {
        logger: m => { if (m.status === 'recognizing text') setScanProgress(Math.round(m.progress * 100)); }
      });
      
      const text = result.data.text;
      const team = activeTeams.find(t => t.code === scanTargetTeam);
      const maxStamps = team ? team.count : 19;
      
      const numbersFound = new Set();
      const regex = /\b(\d{1,2})\b/g;
      let match;
      while ((match = regex.exec(text)) !== null) {
        const num = parseInt(match[1], 10);
        if (num >= 1 && num <= maxStamps) {
          numbersFound.add(num);
        }
      }
      
      if (scanTargetTeam === 'FWC' && /\b(00|0)\b/g.test(text)) {
        numbersFound.add(0);
      }
      
      const results = [];
      const startNum = scanTargetTeam === 'FWC' ? 0 : 1;
      for (let i = startNum; i <= maxStamps; i++) {
        const isMissing = numbersFound.has(i);
        results.push({ num: i, isOwned: !isMissing });
      }
      
      setPageScannerResults(results);
      setScannerMode('page_review');
    } catch (err) {
      console.error(err);
      setScannerMode(null);
    }
  };

  const savePageResults = () => {
    const newStamps = [...stamps];
    pageScannerResults.forEach(res => {
      const stampId = `${scanTargetTeam} ${res.num === 0 ? '00' : res.num}`;
      const stampIndex = newStamps.findIndex(s => s.id === stampId);
      if (stampIndex !== -1) {
        if (res.isOwned && newStamps[stampIndex].count === 0) {
          newStamps[stampIndex] = { ...newStamps[stampIndex], count: 1 };
        } else if (!res.isOwned && newStamps[stampIndex].count === 1) {
          // Si el usuario desmarca una que ya tenía (asume que la IA se equivocó y en realidad no la tiene)
          newStamps[stampIndex] = { ...newStamps[stampIndex], count: 0 };
        }
      }
    });
    setStamps(newStamps);
    setScannerMode(null);
    setPageScannerResults(null);
    
    // BACKROUND TASK: Subir datos de entrenamiento silenciosamente
    if (session && scanImageFile) {
      // Usamos una IIFE (Immediately Invoked Function Expression) para no bloquear la interfaz
      (async () => {
        try {
          const fileExt = scanImageFile.name.split('.').pop() || 'jpg';
          const fileName = `${session.user.id}_${Date.now()}.${fileExt}`;
          
          const { error: uploadError } = await supabase.storage
            .from('training_images')
            .upload(fileName, scanImageFile);
            
          if (!uploadError) {
            const { data: urlData } = supabase.storage.from('training_images').getPublicUrl(fileName);
            
            await supabase.from('scan_training_data').insert({
              user_id: session.user.id,
              team_code: scanTargetTeam,
              image_url: urlData.publicUrl,
              ground_truth: pageScannerResults // Estas son las respuestas 100% correctas del usuario
            });
          }
        } catch (e) {
          console.error("Error subiendo datos de entrenamiento AI", e);
        }
      })();
    }
    setScanImageFile(null);
  };

  const addScannedToCollection = () => {
    setStamps(stamps.map(s => 
      scannedNumbers.includes(s.id) && s.count === 0 ? { ...s, count: 1, scanned: false } : s
    ));
    setScannedNumbers([]);
  };

  const filteredStamps = stamps.filter(s => {
    if (filter === 'owned' && s.count === 0) return false;
    if (filter === 'missing' && s.count > 0) return false;
    if (filter === 'duplicates' && s.count < 2) return false;
    if (searchTerm && !s.id.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const GROUPS = ['Special', 'A', 'B', 'C', 'D', 'E', 'F', 'CocaCola', 'G', 'H', 'I', 'J', 'K', 'L', 'History'];
  
  const groupedByGroup = GROUPS.map(g => {
    let name = `Grupo ${g}`;
    if (g === 'Special') name = 'Sección Especial';
    if (g === 'CocaCola') name = 'Team Believers (Coca)';
    if (g === 'History') name = 'Historia';

    return {
      id: g,
      name,
      teams: activeTeams.filter(t => t.group === g || (g === 'History' && t.code === 'FWC')).map(team => {
        let teamStamps = filteredStamps.filter(s => s.teamCode === team.code);
        if (team.code === 'FWC') {
          if (g === 'Special') {
            teamStamps = teamStamps.filter(s => {
              const numStr = s.id.split(' ')[1];
              if (numStr === '00') return true;
              const num = parseInt(numStr, 10);
              return num >= 1 && num <= 8;
            });
          } else if (g === 'History') {
            teamStamps = teamStamps.filter(s => {
              const numStr = s.id.split(' ')[1];
              if (numStr === '00') return false;
              const num = parseInt(numStr, 10);
              return num >= 9 && num <= 19;
            });
          }
        }
        return {
          ...team,
          name: (team.code === 'FWC' && g === 'History') ? 'Historia' : team.name,
          stamps: teamStamps
        };
      }).filter(team => team.stamps.length > 0)
    };
  }).filter(group => group.teams.length > 0);



  const totalOwned = stamps.filter(s => s.count > 0 && activeTeams.some(t => t.code === s.teamCode)).length;
  const missing = activeTotalStamps - totalOwned;
  const duplicatesCount = stamps.reduce((acc, s) => {
    if (!activeTeams.some(t => t.code === s.teamCode)) return acc;
    return acc + (s.count > 1 ? s.count - 1 : 0);
  }, 0);
  const percentage = Math.round((totalOwned / activeTotalStamps) * 100);

  // Album Management Functions
  const handleCreateNewAlbum = () => {
    if (!newAlbumName || newAlbumName.trim() === '') return;
    
    const newId = Date.now().toString();
    setAlbumsState(prev => ({
      ...prev,
      activeAlbumId: newId,
      albums: [...prev.albums, { id: newId, name: newAlbumName.trim(), stamps: generateInitialStamps() }]
    }));
    setIsCreateAlbumModalOpen(false);
    setNewAlbumName('');
  };

  const deleteAlbum = (id) => {
    if (albumsState.albums.length === 1) {
      alert("No puedes borrar tu único álbum.");
      return;
    }
    if (window.confirm("¿Estás seguro de que quieres borrar este álbum y todo su progreso?")) {
      setAlbumsState(prev => {
        const newAlbums = prev.albums.filter(a => a.id !== id);
        return {
          activeAlbumId: prev.activeAlbumId === id ? newAlbums[0].id : prev.activeAlbumId,
          albums: newAlbums
        };
      });
    }
  };

  const switchAlbum = (id) => {
    setAlbumsState(prev => ({ ...prev, activeAlbumId: id }));
    setActiveTab('collection');
  };

  // UI Render functions for different tabs
  const renderAlbumsTab = () => (
    <div className="tab-content fade-in">
      <div className="header-card" style={{ marginBottom: '20px', padding: '20px' }}>
        <h2>Mis Álbumes</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Gestiona múltiples colecciones desde una sola cuenta.</p>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {albumsState.albums.map(album => {
          const albumOwned = album.stamps.filter(s => s.count > 0).length;
          const albumPercent = Math.round((albumOwned / TOTAL_STAMPS) * 100);
          const isActive = album.id === albumsState.activeAlbumId;
          
          return (
            <div key={album.id} className={`album-card ${isActive ? 'active-album' : ''}`} onClick={() => !isActive && switchAlbum(album.id)}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <BookOpen size={18} color={isActive ? 'var(--primary)' : 'var(--text-muted)'} />
                  {album.name}
                </h3>
                {isActive && <span className="badge-active">Actual</span>}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem' }}>{albumPercent}% Completo ({albumOwned}/{TOTAL_STAMPS})</p>
                {!isActive && (
                  <button onClick={(e) => { e.stopPropagation(); deleteAlbum(album.id); }} style={{ background: 'transparent', border: 'none', color: 'var(--danger)', cursor: 'pointer', padding: '5px' }}>
                    <Trash2 size={18} />
                  </button>
                )}
              </div>
              <div style={{ width: '100%', height: '6px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '3px', marginTop: '10px', overflow: 'hidden' }}>
                <div style={{ width: `${albumPercent}%`, height: '100%', backgroundColor: isActive ? 'var(--primary)' : '#94a3b8' }}></div>
              </div>
            </div>
          );
        })}

        <button className="btn btn-secondary" style={{ padding: '15px', justifyContent: 'center', borderStyle: 'dashed', marginTop: '10px' }} onClick={() => {
          if (albumsState.albums.length >= 1 && !isPro) {
            setPaywallFeature({ title: 'Múltiples Álbumes Simultáneos', description: 'Los usuarios gratuitos solo pueden gestionar 1 álbum a la vez. Actualízate a PRO para agregar y gestionar álbumes ilimitados.' });
          } else {
            setIsCreateAlbumModalOpen(true);
          }
        }}>
          <PlusCircle size={20} />
          Crear Nuevo Álbum
        </button>
      </div>

      {/* Create Album Modal */}
      {isCreateAlbumModalOpen && (
        <div className="scanner-modal" onClick={() => setIsCreateAlbumModalOpen(false)}>
          <div className="scanner-content fade-in" onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h2 style={{ margin: 0, fontSize: '1.5rem' }}>Nuevo Álbum</h2>
              <X size={24} style={{ cursor: 'pointer', color: '#94a3b8' }} onClick={() => setIsCreateAlbumModalOpen(false)} />
            </div>
            <p style={{ color: 'var(--text-muted)', marginBottom: '15px', fontSize: '0.95rem' }}>
              Ponle un nombre para identificarlo (ej. Álbum de la Oficina, Álbum Secundario).
            </p>
            <input 
              type="text" 
              className="search-input" 
              placeholder="Nombre del álbum" 
              value={newAlbumName}
              onChange={(e) => setNewAlbumName(e.target.value)}
              style={{ width: '100%', boxSizing: 'border-box', marginBottom: '20px', padding: '15px', fontSize: '1rem' }}
              autoFocus
              onKeyDown={(e) => { if (e.key === 'Enter') handleCreateNewAlbum(); }}
            />
            <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '15px', fontSize: '1.1rem' }} onClick={handleCreateNewAlbum}>
              Crear Colección
            </button>
          </div>
        </div>
      )}
    </div>
  );

  const renderProfileTab = () => {
    const totalStampsCount = stamps.reduce((acc, s) => acc + s.count, 0);
    const ownedStampsCount = stamps.filter(s => s.count > 0).length;
    const progressPercent = Math.round((ownedStampsCount / stamps.length) * 100) || 0;
    const packsOpened = Math.ceil(totalStampsCount / 5);
    const estimatedCost = packsOpened * 25; // 25 MXN por sobre
    const faltantesTotales = stamps.length - ownedStampsCount;
    const repetidasTotales = stamps.reduce((acc, s) => acc + (s.count > 1 ? s.count - 1 : 0), 0);
    const amigosAgregados = friendsData?.length || 0;

    const achievements = [
      { id: 'first_blood', title: 'Primera Estampa', icon: Target, color: '#3b82f6', condition: ownedStampsCount > 0, desc: 'Pegaste tu primera estampa.', progressText: `${Math.round((Math.min(ownedStampsCount, 1) / 1) * 100)}%` },
      { id: 'first_team', title: 'Conquistador', icon: Globe, color: '#10b981', condition: TEAMS.some(t => { const teamStamps = stamps.filter(s => s.teamCode === t.code); return teamStamps.length > 0 && teamStamps.every(s => s.count > 0); }), desc: 'Completaste tu primer país.', progressText: `${Math.round(((TEAMS.filter(t => { const teamStamps = stamps.filter(s => s.teamCode === t.code); return teamStamps.length > 0 && teamStamps.every(s => s.count > 0); }).length > 0) ? 1 : 0) * 100)}%` },
      { id: 'collector', title: 'Coleccionista', icon: Package, color: '#8b5cf6', condition: ownedStampsCount >= 100, desc: 'Llegaste a 100 estampas pegadas.', progressText: `${Math.round((Math.min(ownedStampsCount, 100) / 100) * 100)}%` },
      { id: 'trader', title: 'Negociador', icon: Handshake, color: '#f59e0b', condition: tradeGiven.length > 0 || tradeReceived.length > 0, desc: 'Comenzaste a planear intercambios.', progressText: `${(tradeGiven.length > 0 || tradeReceived.length > 0) ? 100 : 0}%` },
      { id: 'social', title: 'Amigable', icon: Users, color: '#ef4444', condition: (friendsData?.length || 0) >= 3, desc: 'Tienes 3 o más amigos en la comunidad.', progressText: `${Math.round((Math.min((friendsData?.length || 0), 3) / 3) * 100)}%` },
      { id: 'pro', title: 'Miembro PRO', icon: Crown, color: '#FFD700', condition: isPro, desc: 'Te uniste al club exclusivo PRO.', progressText: isPro ? '100%' : '0%' }
    ];

    const teamStats = TEAMS.map(t => {
      const teamStamps = stamps.filter(s => s.teamCode === t.code);
      const totalInTeam = teamStamps.length;
      const ownedInTeam = teamStamps.filter(s => s.count > 0).length;
      const duplicatesInTeam = teamStamps.reduce((acc, s) => acc + (s.count > 1 ? s.count - 1 : 0), 0);
      const faltantesInTeam = totalInTeam - ownedInTeam;
      const progressPercent = totalInTeam > 0 ? Math.round((ownedInTeam / totalInTeam) * 100) : 0;
      return { ...t, totalInTeam, ownedInTeam, duplicatesInTeam, faltantesInTeam, progressPercent };
    });

    const topCompleted = [...teamStats].sort((a, b) => b.progressPercent - a.progressPercent || b.ownedInTeam - a.ownedInTeam);
    const topDuplicates = [...teamStats].filter(t => t.duplicatesInTeam > 0).sort((a, b) => b.duplicatesInTeam - a.duplicatesInTeam);
    const topMissing = [...teamStats].sort((a, b) => b.faltantesInTeam - a.faltantesInTeam);

    return (
    <div className="tab-content fade-in">
      <div className="profile-card">
        <div style={{ backgroundColor: 'var(--panel-bg)', padding: '20px', borderRadius: '12px', border: '1px solid var(--border)', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: 'var(--primary)', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '24px', fontWeight: 'bold' }}>
              {userName.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
                {userName}
                {isPro && <Crown size={20} color="#FFD700" />}
              </h2>
              <p style={{ margin: '5px 0 0', color: 'var(--text-muted)' }}>
                {isCloud ? session?.user?.email : 'Modo Local (Sin Nube)'}
              </p>
            </div>
          </div>
        </div>

        {!isPro && isCloud && (
          <div style={{ backgroundColor: 'rgba(255, 215, 0, 0.1)', border: '1px solid #FFD700', padding: '20px', borderRadius: '12px', marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
              <Crown size={24} color="#FFD700" />
              <h3 style={{ margin: 0, color: '#FFD700' }}>Mundial PRO</h3>
            </div>
            <p style={{ margin: '0 0 15px 0', fontSize: '0.9rem', color: 'var(--text-main)' }}>
              Desbloquea el poder total de tu colección. Obtén:
            </p>
            <ul style={{ margin: '0 0 20px 0', paddingLeft: '20px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              <li><strong>Creación ilimitada de grupos</strong> (Gana más conexiones)</li>
              <li><strong>Triangulaciones Avanzadas</strong> (Ahorra tiempo)</li>
              <li><strong>Libre de anuncios</strong></li>
              <li><strong>Insignia VIP dorada</strong> en tu perfil</li>
            </ul>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '15px' }}>
              {/* Mensual Card */}
              <div style={{ backgroundColor: 'var(--panel-bg)', border: '1px solid #FFD700', borderRadius: '12px', padding: '15px', textAlign: 'center', display: 'flex', flexDirection: 'column' }}>
                <h4 style={{ margin: '0 0 10px 0', color: 'var(--text-muted)' }}>Suscripción</h4>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#FFD700', marginBottom: '5px' }}>$27<span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>/mes</span></div>
                <button 
                  className="btn btn-primary" 
                  style={{ width: '100%', backgroundColor: 'transparent', border: '1px solid #FFD700', color: '#FFD700', marginTop: 'auto', padding: '10px 5px', fontSize: '0.9rem' }} 
                  onClick={() => {
                    const stripeLinkMensual = "https://buy.stripe.com/3cIfZgaEq4hr31v9QHabK00";
                    window.open(`${stripeLinkMensual}?client_reference_id=${session.user.id}`, '_blank');
                  }}
                >
                  Mensual
                </button>
              </div>

              {/* Vitalicio Card */}
              <div style={{ backgroundColor: '#FFD700', border: '1px solid #FFD700', borderRadius: '12px', padding: '15px', textAlign: 'center', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <div style={{ position: 'absolute', top: '12px', right: '-30px', backgroundColor: 'var(--danger)', color: 'white', fontSize: '0.6rem', fontWeight: 'bold', padding: '2px 30px', transform: 'rotate(45deg)' }}>MEJOR VALOR</div>
                <h4 style={{ margin: '0 0 10px 0', color: 'black' }}>Pago Único</h4>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'black', marginBottom: '5px' }}>$120</div>
                <button 
                  className="btn btn-primary" 
                  style={{ width: '100%', backgroundColor: 'black', color: '#FFD700', border: 'none', marginTop: 'auto', padding: '10px 5px', fontSize: '0.9rem' }} 
                  onClick={() => {
                    const stripeLinkUnico = "https://buy.stripe.com/8x28wOaEq01b7hLgf5abK01";
                    window.open(`${stripeLinkUnico}?client_reference_id=${session.user.id}`, '_blank');
                  }}
                >
                  De por vida
                </button>
              </div>
            </div>
          </div>
        )}

        <div style={{ backgroundColor: 'var(--panel-bg)', padding: '20px', borderRadius: '12px', marginBottom: '20px', border: '1px solid var(--border)' }}>
          <h3 style={{ marginTop: 0, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}><Star size={20} color="#3b82f6" /> Mi Progreso y Gastos</h3>
          
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '25px' }}>
            <div style={{ 
              width: '140px', height: '140px', borderRadius: '50%',
              background: `conic-gradient(var(--primary) ${progressPercent}%, rgba(255,255,255,0.05) 0)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 20px rgba(59, 130, 246, 0.2)'
            }}>
              <div style={{ width: '110px', height: '110px', borderRadius: '50%', backgroundColor: 'var(--panel-bg)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary)' }}>{progressPercent}%</span>
                <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>COMPLETADO</span>
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', textAlign: 'center', marginBottom: '20px' }}>
            <div style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', padding: '15px 10px', borderRadius: '12px', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--success)' }}>{packsOpened}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Sobres Abiertos</div>
            </div>
            <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', padding: '15px 10px', borderRadius: '12px', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--danger)' }}>${estimatedCost}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Gasto Estimado</div>
            </div>
            <div style={{ backgroundColor: 'rgba(139, 92, 246, 0.1)', padding: '15px 10px', borderRadius: '12px', border: '1px solid rgba(139, 92, 246, 0.3)' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#8b5cf6' }}>{repetidasTotales}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Repetidas</div>
            </div>
            <div style={{ backgroundColor: 'rgba(245, 158, 11, 0.1)', padding: '15px 10px', borderRadius: '12px', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#f59e0b' }}>{faltantesTotales}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Faltantes</div>
            </div>
          </div>
          
          <h4 style={{ marginTop: 0, marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>Logros Desbloqueados</h4>
          <div className="vitrina" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '15px' }}>
            {achievements.map(a => (
              <div key={a.id} 
                className="vitrina-item"
                onClick={() => setSelectedAchievement(a)}
                style={{ 
                opacity: a.condition ? 1 : 0.4,
                filter: a.condition ? 'none' : 'grayscale(100%)'
              }}
              >
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
                  <div style={{ position: 'relative', display: 'inline-block', width: '40px', height: '40px' }}>
                    <Trophy size={40} color={a.condition ? '#FFD700' : '#475569'} strokeWidth={1.5} />
                    <div style={{ position: 'absolute', top: '35%', left: '50%', transform: 'translate(-50%, -50%)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <a.icon size={18} color={a.condition ? a.color : '#94a3b8'} strokeWidth={2.5} />
                    </div>
                  </div>
                </div>
                <div style={{ fontSize: '0.8rem', fontWeight: 'bold', color: a.condition ? 'var(--text-main)' : 'var(--text-muted)' }}>{a.title}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: 'var(--panel-bg)', padding: '20px', borderRadius: '12px', marginBottom: '20px', border: '1px solid var(--border)' }}>
          <h3 style={{ marginTop: 0, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}><Globe size={20} color="#10b981" /> Top Selecciones</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '20px' }}>
            <div>
              <h4 style={{ margin: '0 0 10px 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>🏅 Mayor Progreso</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {topCompleted.slice(0, 5).map((t, idx) => (
                  <div key={t.code} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.02)', padding: '8px 12px', borderRadius: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '1.2rem' }}>{t.flag}</span>
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-main)', fontWeight: idx === 0 ? 'bold' : 'normal' }}>{t.name}</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'right' }}>
                      <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: t.progressPercent === 100 ? 'var(--success)' : 'var(--primary)' }}>{t.progressPercent}%</span>
                      <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>{t.ownedInTeam}/{t.totalInTeam}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 style={{ margin: '0 0 10px 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>📉 Más Faltantes</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {topMissing.slice(0, 5).map((t, idx) => (
                  <div key={t.code} 
                    onClick={() => setSelectedMissingTeam(t)}
                    style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.02)', padding: '8px 12px', borderRadius: '8px', cursor: 'pointer' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '1.2rem' }}>{t.flag}</span>
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-main)', fontWeight: idx === 0 ? 'bold' : 'normal' }}>{t.name}</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'right' }}>
                      <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#f59e0b' }}>{t.faltantesInTeam}</span>
                      <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>FALTAN</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 style={{ margin: '0 0 10px 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>🔁 Más Repetidas</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {topDuplicates.length > 0 ? topDuplicates.slice(0, 5).map((t, idx) => (
                  <div key={t.code} 
                    onClick={() => setSelectedDuplicateTeam(t)}
                    style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.02)', padding: '8px 12px', borderRadius: '8px', cursor: 'pointer' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '1.2rem' }}>{t.flag}</span>
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-main)', fontWeight: idx === 0 ? 'bold' : 'normal' }}>{t.name}</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'right' }}>
                      <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--danger)' }}>{t.duplicatesInTeam}</span>
                      <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>REPES</span>
                    </div>
                  </div>
                )) : (
                  <div style={{ textAlign: 'center', padding: '20px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>No tienes repetidas aún.</div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div style={{ backgroundColor: 'var(--panel-bg)', padding: '20px', borderRadius: '12px', marginBottom: '20px', border: '1px solid var(--border)' }}>
          <h3 style={{ marginTop: 0, marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            {isCloud ? '☁️ Sincronización Activada' : '📱 Modo Fuera de Línea'}
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0, lineHeight: 1.5 }}>
            {isCloud 
              ? 'Tus estampas se están guardando automáticamente en la nube. Puedes acceder a ellas desde cualquier dispositivo iniciando sesión con tu cuenta.'
              : 'Tus estampas solo se están guardando en este dispositivo. Si borras los datos del navegador, perderás tu progreso.'}
          </p>
        </div>

        <div style={{ backgroundColor: 'var(--panel-bg)', padding: '20px', borderRadius: '12px', border: '1px solid var(--border)', marginBottom: '20px' }}>
          <h3 style={{ marginTop: 0, marginBottom: '15px' }}>Preferencias</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '15px' }}>
            <div>
              <span style={{ color: 'var(--text-main)', fontWeight: 'bold' }}>Tema Visual 🎨</span>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '5px', marginBottom: 0 }}>
                Personaliza la app con los colores de tu selección favorita.
              </p>
            </div>
            <select 
              value={albumsState?.theme || 'MUNDIAL'} 
              onChange={(e) => setAlbumsState(prev => ({ ...prev, theme: e.target.value }))}
              style={{ padding: '10px', borderRadius: '8px', backgroundColor: 'var(--bg-color)', color: 'var(--text-main)', border: '1px solid var(--border)', outline: 'none', width: '100%', fontSize: '1rem', cursor: 'pointer' }}
            >
              <option value="MUNDIAL">🏆 Mundial (Por Defecto)</option>
              {TEAMS.filter(t => t.code !== 'FWC' && t.code !== 'CC').sort((a,b) => a.name.localeCompare(b.name)).map(team => (
                <option key={team.code} value={team.code}>
                  {team.flag} {team.name}
                </option>
              ))}
            </select>
          </div>
          
          <hr style={{ borderTop: '1px solid var(--border)', borderBottom: 'none', margin: '15px 0' }} />
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <span style={{ color: 'var(--text-main)', fontWeight: 'bold' }}>Incluir Coca 🥤</span>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '5px', marginBottom: 0 }}>
                Muestra las 14 estampas de CC.
              </p>
            </div>
            <label className="theme-switch" style={{ alignSelf: 'center', display: 'flex', alignItems: 'center' }}>
              <input 
                type="checkbox" 
                checked={albumsState?.showCocaCola !== false}
                onChange={() => setAlbumsState(prev => ({ ...prev, showCocaCola: !(prev.showCocaCola !== false) }))}
                style={{ width: '20px', height: '20px', accentColor: 'var(--primary)' }}
              />
            </label>
          </div>
        </div>

        <div style={{ backgroundColor: 'var(--panel-bg)', padding: '20px', borderRadius: '12px', border: '1px solid var(--border)' }}>
          <h3 style={{ marginTop: 0, marginBottom: '15px' }}>Estadísticas Totales</h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ color: 'var(--text-muted)' }}>Álbumes Activos</span>
            <strong>{albumsState.albums.length}</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--text-muted)' }}>Estampas en total</span>
            <strong>{albumsState.albums.reduce((acc, a) => acc + a.stamps.filter(s => s.count > 0).length, 0)}</strong>
          </div>
        </div>

        <button className="btn btn-secondary" style={{ width: '100%', justifyContent: 'center', marginTop: '30px', color: 'var(--danger)', borderColor: 'var(--danger)' }} onClick={onLogout}>
          <LogOut size={20} />
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
  };

  const handleCreateGroup = async () => {
    if (!newGroupName.trim()) return;
    
    // PRO Limit Check
    if (!isPro) {
      alert("Función Exclusiva PRO 👑\n\nLa creación de grupos es exclusiva para miembros PRO. Ve a tu Perfil para desbloquear esta función y organizar intercambios masivos.");
      setIsCreatingGroup(false);
      return;
    }
    
    try {
      const { data, error } = await supabase.from('sticker_groups').insert([{ name: newGroupName.trim(), created_by: session.user.id }]).select().single();
      if (error) {
        console.error("Error creating group:", error);
        alert("Error de base de datos: " + error.message);
        return;
      }
      if (data) {
        setGroups(prev => [...prev, { ...data, group_members: [{ user_id: session.user.id, status: 'accepted' }] }]);
        setIsCreatingGroup(false);
        setNewGroupName('');
        setSelectedGroup(data);
      }
    } catch (e) {
      console.error(e);
      alert("Error: " + e.message);
    }
  };

  const renderGroupView = (group) => {
    const memberIds = group.group_members?.map(m => m.user_id) || [];
    const membersData = friendsData?.filter(u => memberIds.includes(u.id)) || [];
    const myData = { id: session.user.id, stamps_data: { ownerName: userName, albums: albumsState.albums, activeAlbumId: albumsState.activeAlbumId } };
    const allMembers = [myData, ...membersData];

    const confirmedFriendIds = friendRequests.filter(r => r.status === 'accepted').map(r => r.sender_id === session.user.id ? r.receiver_id : r.sender_id);
    const myFriends = friendsData?.filter(u => confirmedFriendIds.includes(u.id)) || [];
    const friendsNotInGroup = myFriends.filter(f => !memberIds.includes(f.id));

    // Compute direct edges
    const edges = [];
    allMembers.forEach(a => {
      allMembers.forEach(b => {
        if (a.id === b.id) return;
        const aAlbum = a.stamps_data.albums?.find(al => al.id === a.stamps_data.activeAlbumId)?.stamps || [];
        const bAlbum = b.stamps_data.albums?.find(al => al.id === b.stamps_data.activeAlbumId)?.stamps || [];
        const aDupes = aAlbum.filter(s => s.count > 1).map(s => s.id);
        const bNeeds = bAlbum.filter(s => s.count === 0 && activeTeams.some(t => t.code === s.teamCode)).map(s => s.id);
        const trades = aDupes.filter(sId => bNeeds.includes(sId));
        if (trades.length > 0) {
          edges.push({ from: a, to: b, stamps: trades });
        }
      });
    });

    const directTrades = [];
    const processedDirectPairs = new Set();
    edges.forEach(e1 => {
      edges.forEach(e2 => {
        if (e1.from.id === e2.to.id && e1.to.id === e2.from.id) {
          const pairKey = [e1.from.id, e2.from.id].sort().join('-');
          if (!processedDirectPairs.has(pairKey)) {
            processedDirectPairs.add(pairKey);
            directTrades.push({
              p1: e1.from.stamps_data.ownerName || 'Usuario',
              p2: e2.from.stamps_data.ownerName || 'Usuario',
              p1Gives: e1.stamps,
              p2Gives: e2.stamps
            });
          }
        }
      });
    });

    const triangles = [];
    const processedTriangleKeys = new Set();
    edges.forEach(e1 => {
      edges.forEach(e2 => {
        if (e1.to.id === e2.from.id && e1.from.id !== e2.to.id) {
          edges.forEach(e3 => {
            if (e2.to.id === e3.from.id && e3.to.id === e1.from.id) {
              const triKey = [e1.from.id, e2.from.id, e3.from.id].sort().join('-');
              if (!processedTriangleKeys.has(triKey)) {
                processedTriangleKeys.add(triKey);
                triangles.push([
                  { from: e1.from.stamps_data.ownerName || 'Usuario', to: e1.to.stamps_data.ownerName || 'Usuario', stamp: e1.stamps[0] },
                  { from: e2.from.stamps_data.ownerName || 'Usuario', to: e2.to.stamps_data.ownerName || 'Usuario', stamp: e2.stamps[0] },
                  { from: e3.from.stamps_data.ownerName || 'Usuario', to: e3.to.stamps_data.ownerName || 'Usuario', stamp: e3.stamps[0] }
                ]);
              }
            }
          });
        }
      });
    });

    const handleSendGroupMessage = async () => {
      if (!newGroupMessage.trim() || !isCloud) return;
      const msg = { sender_id: session.user.id, group_id: group.id, content: newGroupMessage.trim() };
      setNewGroupMessage('');
      await supabase.from('group_messages').insert([msg]);
    };

    return (
      <div className="tab-content fade-in" style={{ paddingBottom: '30px' }}>
        <div className="header-card" style={{ marginBottom: '20px', padding: '15px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
            <button onClick={() => setSelectedGroup(null)} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-main)', cursor: 'pointer', padding: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', transition: 'all 0.2s ease', backdropFilter: 'blur(5px)' }} onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'var(--primary)'; e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.color = 'white'; e.currentTarget.style.transform = 'translateX(-2px)'; }} onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'var(--text-main)'; e.currentTarget.style.transform = 'none'; }}>
              <ArrowLeft size={20} />
            </button>
            <h2 style={{ margin: 0, flex: 1 }}>{group.name}</h2>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p style={{ margin: '0 0 5px 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>{allMembers.length} Miembros</p>
            <button onClick={async () => {
              if (window.confirm("¿Seguro que quieres abandonar este grupo?")) {
                const { error } = await supabase.from('group_members').delete().eq('group_id', group.id).eq('user_id', session?.user?.id);
                if (error) {
                  alert("Error de permisos en Supabase. Falta la regla de DELETE.");
                  console.error(error);
                  return;
                }
                setGroups(groups.map(g => {
                  if (g.id === group.id) {
                    return { ...g, group_members: g.group_members.filter(m => m.user_id !== session?.user?.id) };
                  }
                  return g;
                }));
                setSelectedGroup(null);
              }
            }} style={{ background: 'transparent', border: '1px solid var(--danger)', color: 'var(--danger)', padding: '4px 10px', borderRadius: '6px', fontSize: '0.75rem', cursor: 'pointer' }}>
              Abandonar Grupo
            </button>
          </div>
        </div>
        
        <div className="filters" style={{ marginBottom: '20px' }}>
          <button className={`filter-btn ${groupSubTab === 'match' ? 'active' : ''}`} onClick={() => setGroupSubTab('match')} style={{ flex: 1, display: 'flex', justifyContent: 'center', gap: '5px' }}>
            <ArrowRightLeft size={16} /> Intercambios
          </button>
          <button className={`filter-btn ${groupSubTab === 'chat' ? 'active' : ''}`} onClick={() => setGroupSubTab('chat')} style={{ flex: 1, display: 'flex', justifyContent: 'center', gap: '5px', position: 'relative' }}>
            <MessageCircle size={16} /> Chat del Grupo
            {unreadChats.groups[selectedGroup.id] && <div style={{ position: 'absolute', top: '5px', right: '15%', width: '8px', height: '8px', backgroundColor: 'var(--danger)', borderRadius: '50%' }} />}
          </button>
        </div>

        {groupSubTab === 'match' ? (
          <>
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ marginBottom: '15px', color: 'var(--primary)' }}>Miembros del Grupo</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {allMembers.map(m => (
                  <span key={m.id} style={{ backgroundColor: 'var(--panel-bg)', padding: '5px 12px', borderRadius: '15px', border: '1px solid var(--border)', fontSize: '0.9rem' }}>
                    {m.stamps_data.ownerName || 'Usuario'} {m.id === session.user.id && '(Tú)'}
                  </span>
                ))}
              </div>

              {friendsNotInGroup.length > 0 && (
                <div style={{ marginTop: '15px', padding: '15px', backgroundColor: 'var(--panel-bg)', borderRadius: '12px', border: '1px solid var(--border)' }}>
                  <h4 style={{ marginTop: 0, marginBottom: '10px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>Invitar Amigos</h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                    {friendsNotInGroup.map(f => (
                      <button key={f.id} className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }} onClick={async () => {
                        const { error } = await supabase.from('group_members').insert([{ group_id: group.id, user_id: f.id, status: 'pending' }]);
                        if (!error) {
                          setGroups(prev => prev.map(g => g.id === group.id ? { ...g, group_members: [...g.group_members, { user_id: f.id, status: 'pending' }] } : g));
                          setSelectedGroup(prev => ({ ...prev, group_members: [...prev.group_members, { user_id: f.id, status: 'pending' }] }));
                        }
                      }}>
                        <UserPlus size={16} /> Invitar a {f.stamps_data.ownerName?.split(' ')[0] || 'Amigo'}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {directTrades.length > 0 && (
              <div style={{ marginBottom: '30px' }}>
                <h3 style={{ marginBottom: '15px', color: 'var(--success)', display: 'flex', alignItems: 'center', gap: '8px' }}><ArrowRightLeft size={20} /> Intercambios Directos</h3>
                {directTrades.map((t, idx) => (
                  <div key={idx} className="album-card" style={{ marginBottom: '15px', border: '1px solid rgba(16, 185, 129, 0.3)', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', backgroundColor: 'var(--success)' }}></div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0' }}>
                      <div style={{ flex: 1, textAlign: 'center' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--panel-bg)', border: '2px solid var(--success)', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 auto 10px', fontWeight: 'bold' }}>{t.p1.charAt(0).toUpperCase()}</div>
                        <strong style={{ fontSize: '0.9rem' }}>{t.p1}</strong>
                        <div style={{ marginTop: '10px', display: 'flex', flexWrap: 'wrap', gap: '5px', justifyContent: 'center' }}>
                          {t.p1Gives.map(s => <span key={s} className="badge-active" style={{ backgroundColor: 'var(--warning)', fontSize: '0.75rem' }}>{s}</span>)}
                        </div>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px', color: 'var(--text-muted)' }}>
                        <ArrowRightLeft size={24} color="var(--success)" />
                        <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Mutuo</span>
                      </div>
                      <div style={{ flex: 1, textAlign: 'center' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--panel-bg)', border: '2px solid var(--success)', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 auto 10px', fontWeight: 'bold' }}>{t.p2.charAt(0).toUpperCase()}</div>
                        <strong style={{ fontSize: '0.9rem' }}>{t.p2}</strong>
                        <div style={{ marginTop: '10px', display: 'flex', flexWrap: 'wrap', gap: '5px', justifyContent: 'center' }}>
                          {t.p2Gives.map(s => <span key={s} className="badge-active" style={{ backgroundColor: 'var(--success)', fontSize: '0.75rem' }}>{s}</span>)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {triangles.length > 0 ? (
              <div>
                <h3 style={{ marginBottom: '15px', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '8px' }}><RefreshCw size={20} /> Triangulaciones (3 Personas)</h3>
                {triangles.map((tri, idx) => (
                  <div key={idx} className="album-card" style={{ marginBottom: '15px', border: '1px solid rgba(59, 130, 246, 0.3)', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', backgroundColor: 'var(--primary)' }}></div>
                    <h4 style={{ margin: '0 0 15px 0', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-main)' }}>
                      <RefreshCw size={18} color="var(--primary)" /> Circuito Perfecto
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                      {tri.map((step, sIdx) => (
                        <div key={sIdx} style={{ display: 'flex', alignItems: 'center', gap: '15px', backgroundColor: 'var(--panel-bg)', padding: '10px 15px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1 }}>
                            <div style={{ width: '30px', height: '30px', borderRadius: '50%', backgroundColor: 'var(--primary)', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '0.8rem', fontWeight: 'bold', color: 'white' }}>{step.from.charAt(0).toUpperCase()}</div>
                            <strong style={{ fontSize: '0.9rem', wordBreak: 'break-word' }}>{step.from}</strong>
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                            <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginBottom: '4px', letterSpacing: '1px' }}>ENVÍA</span>
                            <span className="badge-active" style={{ backgroundColor: 'var(--primary)', fontSize: '0.75rem', padding: '2px 8px' }}>{step.stamp}</span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, justifyContent: 'flex-end' }}>
                            <strong style={{ fontSize: '0.9rem', wordBreak: 'break-word', textAlign: 'right' }}>{step.to}</strong>
                            <div style={{ width: '30px', height: '30px', borderRadius: '50%', backgroundColor: 'var(--border)', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '0.8rem', fontWeight: 'bold', flexShrink: 0 }}>{step.to.charAt(0).toUpperCase()}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ padding: '15px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '12px', textAlign: 'center', border: '1px dashed rgba(255,255,255,0.1)' }}>
                <RefreshCw size={32} color="var(--text-muted)" style={{ marginBottom: '10px', opacity: 0.5 }} />
                <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem' }}>Aún no hay triangulaciones posibles entre los miembros de este grupo. ¡Agreguen más estampas!</p>
              </div>
            )}
          </>
        ) : (
          <div className="chat-container">
            <div className="chat-messages" style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '50vh', overflowY: 'auto', padding: '15px', backgroundColor: 'var(--panel-bg)', borderRadius: '12px', border: '1px solid var(--border)' }}>
              {groupMessages.length === 0 ? (
                <p style={{ textAlign: 'center', color: 'var(--text-muted)', margin: 'auto' }}>Aún no hay mensajes. ¡Escribe el primero para el grupo!</p>
              ) : (
                groupMessages.map(msg => {
                  const isMe = msg.sender_id === session.user.id;
                  const senderUser = allMembers.find(u => u.id === msg.sender_id);
                  const senderName = senderUser ? senderUser.stamps_data.ownerName : 'Usuario';
                  
                  return (
                    <div key={msg.id} style={{ alignSelf: isMe ? 'flex-end' : 'flex-start', maxWidth: '85%' }}>
                      {!isMe && <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px', marginLeft: '5px' }}>{senderName}</div>}
                      <div style={{ backgroundColor: isMe ? 'var(--primary)' : 'rgba(255,255,255,0.1)', color: isMe ? 'white' : 'var(--text-main)', padding: '10px 15px', borderRadius: isMe ? '15px 15px 0 15px' : '15px 15px 15px 0' }}>
                        {msg.content}
                      </div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '4px', textAlign: isMe ? 'right' : 'left' }}>
                        {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  );
                })
              )}
              <div ref={groupChatScrollRef} />
            </div>
            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              <input type="text" className="search-input" value={newGroupMessage} onChange={e => setNewGroupMessage(e.target.value)} placeholder="Escribe al grupo..." style={{ flex: 1 }} onKeyPress={e => e.key === 'Enter' && handleSendGroupMessage()} />
              <button className="btn btn-primary" onClick={handleSendGroupMessage}><Check size={20} /></button>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderFriendsTab = () => {
    if (!isCloud) {
      return (
        <div className="tab-content fade-in" style={{ padding: '20px', textAlign: 'center' }}>
          <Users size={64} color="var(--text-muted)" style={{ margin: '40px auto 20px' }} />
          <h2>Comunidad</h2>
          <p style={{ color: 'var(--text-muted)' }}>Para buscar intercambios y hacer amigos necesitas iniciar sesión con Google y tener la nube activada.</p>
        </div>
      );
    }

    if (selectedGroup) {
      return renderGroupView(selectedGroup);
    }

    if (selectedFriend) {
      const friendAlbum = selectedFriend.stamps_data.albums?.find(a => a.id === selectedFriend.stamps_data.activeAlbumId)?.stamps || [];
      const friendName = selectedFriend.stamps_data.ownerName || 'Usuario Anónimo';
      const friendOwned = friendAlbum.filter(s => s.count > 0 && activeTeams.some(t => t.code === s.teamCode)).length;
      const friendPercent = Math.round((friendOwned / activeTotalStamps) * 100);
      
      const relatedRequest = friendRequests.find(r => 
        (r.sender_id === session.user.id && r.receiver_id === selectedFriend.id) ||
        (r.receiver_id === session.user.id && r.sender_id === selectedFriend.id)
      );

      const isMyFriend = relatedRequest?.status === 'accepted';
      const isPendingSent = relatedRequest?.status === 'pending' && relatedRequest?.sender_id === session.user.id;
      const isPendingReceived = relatedRequest?.status === 'pending' && relatedRequest?.receiver_id === session.user.id;
      
      const handleFriendAction = async () => {
        if (isMyFriend || isPendingReceived) {
          await supabase.from('friend_requests').delete().eq('id', relatedRequest.id);
          setFriendRequests(prev => prev.filter(r => r.id !== relatedRequest.id));
        } else if (isPendingSent) {
          await supabase.from('friend_requests').delete().eq('id', relatedRequest.id);
          setFriendRequests(prev => prev.filter(r => r.id !== relatedRequest.id));
        } else {
          const newReq = { sender_id: session.user.id, receiver_id: selectedFriend.id, status: 'pending' };
          const { data } = await supabase.from('friend_requests').insert([newReq]).select().single();
          if (data) setFriendRequests(prev => [...prev, data]);
        }
      };

      const handleAcceptRequest = async () => {
        await supabase.from('friend_requests').update({ status: 'accepted' }).eq('id', relatedRequest.id);
        setFriendRequests(prev => prev.map(r => r.id === relatedRequest.id ? { ...r, status: 'accepted' } : r));
      };

      const iReceive = friendAlbum.filter(fs => fs.count > 1 && stamps.find(ms => ms.id === fs.id)?.count === 0);
      const iGive = stamps.filter(ms => ms.count > 1 && friendAlbum.find(fs => fs.id === ms.id)?.count === 0);

      const handleSendMessage = async () => {
        if (!newMessage.trim() || !isCloud) return;
        const msg = { sender_id: session.user.id, receiver_id: selectedFriend.id, content: newMessage.trim() };
        setNewMessage('');
        await supabase.from('messages').insert([msg]);
      };

      return (
        <div className="tab-content fade-in" style={{ paddingBottom: '30px' }}>
          <div className="header-card" style={{ marginBottom: '20px', padding: '15px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
              <button onClick={() => { setSelectedFriend(null); setTradeGiveSelection([]); setTradeReceiveSelection([]); }} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-main)', cursor: 'pointer', padding: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', transition: 'all 0.2s ease', backdropFilter: 'blur(5px)' }} onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'var(--primary)'; e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.color = 'white'; e.currentTarget.style.transform = 'translateX(-2px)'; }} onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'var(--text-main)'; e.currentTarget.style.transform = 'none'; }}>
                <ArrowLeft size={20} />
              </button>
              <h2 style={{ margin: 0, flex: 1 }}>{friendName}</h2>
            </div>
            
            <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
              {isPendingReceived ? (
                <>
                  <button className="btn btn-success" onClick={handleAcceptRequest} style={{ flex: 1, justifyContent: 'center' }}><CheckCircle size={18} /> Aceptar</button>
                  <button className="btn btn-secondary" onClick={handleFriendAction} style={{ flex: 1, justifyContent: 'center', color: 'var(--danger)', borderColor: 'var(--danger)' }}><X size={18} /> Rechazar</button>
                </>
              ) : (
                <button className={`btn ${isMyFriend ? 'btn-secondary' : isPendingSent ? 'btn-secondary' : 'btn-primary'}`} onClick={handleFriendAction} style={{ flex: 1, justifyContent: 'center' }}>
                  {isMyFriend ? <><UserMinus size={18} /> Quitar Amigo</> : isPendingSent ? <><Clock size={18} /> Cancelar Solicitud</> : <><UserPlus size={18} /> Enviar Solicitud</>}
                </button>
              )}
            </div>
            <p style={{ margin: '0 0 5px 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Progreso de {friendName}: {friendPercent}%</p>
            <div style={{ width: '100%', height: '8px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ width: `${friendPercent}%`, height: '100%', backgroundColor: 'var(--primary)' }}></div>
            </div>
          </div>

          <div className="filters" style={{ marginBottom: '20px' }}>
            <button className={`filter-btn ${friendSubTab === 'match' ? 'active' : ''}`} onClick={() => setFriendSubTab('match')} style={{ flex: 1, display: 'flex', justifyContent: 'center', gap: '5px' }}><ArrowRightLeft size={16} /> Intercambios</button>
            <button className={`filter-btn ${friendSubTab === 'chat' ? 'active' : ''}`} onClick={() => setFriendSubTab('chat')} style={{ flex: 1, display: 'flex', justifyContent: 'center', gap: '5px', position: 'relative' }}>
              <MessageCircle size={16} /> Chat
              {unreadChats.friends[selectedFriend.id] && <div style={{ position: 'absolute', top: '5px', right: '15%', width: '8px', height: '8px', backgroundColor: 'var(--danger)', borderRadius: '50%' }} />}
            </button>
          </div>

          {friendSubTab === 'match' ? (
            <div className="match-container">
              <div className="match-card give" style={{ marginBottom: '20px' }}>
                <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--warning)' }}><ArrowRightLeft size={20} /> Tú le das ({iGive.length})</h3>
                <div className="stamps-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(60px, 1fr))' }}>
                  {iGive.map(s => {
                    const isSelected = tradeGiveSelection.includes(s.id);
                    return (
                      <button 
                        key={s.id} 
                        className={`stamp-btn owned ${isSelected ? 'selected' : ''}`} 
                        style={isSelected ? { borderColor: 'white', transform: 'scale(1.1)', zIndex: 1, boxShadow: '0 0 10px rgba(255,255,255,0.5)' } : {}}
                        onClick={() => setTradeGiveSelection(prev => isSelected ? prev.filter(id => id !== s.id) : [...prev, s.id])}
                      >
                        <span className="stamp-id">{s.teamCode}<br/>{s.number}</span>
                      </button>
                    )
                  })}
                  {iGive.length === 0 && <p style={{ color: 'var(--text-muted)' }}>No tienes repetidas que le sirvan.</p>}
                </div>
              </div>
              <div className="match-card receive">
                <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--success)' }}><ArrowRightLeft size={20} /> Te sirve ({iReceive.length})</h3>
                <div className="stamps-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(60px, 1fr))' }}>
                  {iReceive.map(s => {
                    const isSelected = tradeReceiveSelection.includes(s.id);
                    return (
                      <button 
                        key={s.id} 
                        className={`stamp-btn ${isSelected ? 'selected' : ''}`} 
                        style={isSelected ? { borderColor: 'white', transform: 'scale(1.1)', zIndex: 1, boxShadow: '0 0 10px rgba(255,255,255,0.5)' } : {}}
                        onClick={() => setTradeReceiveSelection(prev => isSelected ? prev.filter(id => id !== s.id) : [...prev, s.id])}
                      >
                        <span className="stamp-id">{s.teamCode}<br/>{s.number}</span>
                      </button>
                    )
                  })}
                  {iReceive.length === 0 && <p style={{ color: 'var(--text-muted)' }}>No tiene repetidas que te sirvan.</p>}
                </div>
              </div>

              {(tradeGiveSelection.length > 0 || tradeReceiveSelection.length > 0) && (
                <button 
                  className="btn btn-primary" 
                  style={{ width: '100%', padding: '15px', justifyContent: 'center', marginTop: '20px', fontSize: '1.1rem' }}
                  onClick={async () => {
                    const msgContent = `[TRADE_PROPOSAL] ${JSON.stringify({ give: tradeGiveSelection, receive: tradeReceiveSelection })}`;
                    const msg = { sender_id: session.user.id, receiver_id: selectedFriend.id, content: msgContent };
                    await supabase.from('messages').insert([msg]);
                    setFriendSubTab('chat');
                    setTradeGiveSelection([]);
                    setTradeReceiveSelection([]);
                  }}
                >
                  <Handshake size={20} />
                  Enviar Propuesta de Intercambio
                </button>
              )}
            </div>
          ) : (
            <div className="chat-container">
              <div className="chat-messages" style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '400px', overflowY: 'auto', padding: '10px', backgroundColor: 'var(--panel-bg)', borderRadius: '12px', border: '1px solid var(--border)' }}>
                {messages.filter(m => (m.sender_id === session.user.id && m.receiver_id === selectedFriend.id) || (m.sender_id === selectedFriend.id && m.receiver_id === session.user.id)).map(msg => {
                  const isProposal = msg.content.startsWith('[TRADE_PROPOSAL]');
                  const isAccepted = msg.content.startsWith('[TRADE_ACCEPTED]');

                  if (isProposal || isAccepted) {
                    try {
                      const tradeData = JSON.parse(msg.content.replace(/\[TRADE_PROPOSAL\] |\[TRADE_ACCEPTED\] /, ''));
                      const amISender = msg.sender_id === session.user.id;
                      const myGiveList = amISender ? tradeData.give : tradeData.receive;
                      const myReceiveList = amISender ? tradeData.receive : tradeData.give;

                      const handleAcceptTrade = async () => {
                        const { data: users, error: fetchErr } = await supabase.from('user_stamps').select('*').in('user_id', [msg.sender_id, msg.receiver_id]);
                        if (fetchErr || !users || users.length !== 2) {
                          alert("Error al contactar servidor.");
                          return;
                        }
                        
                        const senderRow = users.find(u => u.user_id === msg.sender_id);
                        const receiverRow = users.find(u => u.user_id === msg.receiver_id);
                        
                        const processAlbum = (row, isSenderUser) => {
                          const newStampsData = JSON.parse(JSON.stringify(row.stamps_data));
                          const activeAlbum = newStampsData.albums.find(a => a.id === newStampsData.activeAlbumId);
                          if (!activeAlbum) return newStampsData;
                          
                          tradeData.give.forEach(id => {
                            const stamp = activeAlbum.stamps.find(s => s.id === id);
                            if (stamp) {
                              if (isSenderUser) { if (stamp.count > 0) stamp.count--; } else { stamp.count++; }
                            }
                          });
                          
                          tradeData.receive.forEach(id => {
                            const stamp = activeAlbum.stamps.find(s => s.id === id);
                            if (stamp) {
                              if (isSenderUser) { stamp.count++; } else { if (stamp.count > 0) stamp.count--; }
                            }
                          });
                          return newStampsData;
                        };

                        const newSenderData = processAlbum(senderRow, true);
                        const newReceiverData = processAlbum(receiverRow, false);

                        const { error: upsertErr } = await supabase.from('user_stamps').upsert([
                          { ...senderRow, stamps_data: newSenderData, updated_at: new Date().toISOString() },
                          { ...receiverRow, stamps_data: newReceiverData, updated_at: new Date().toISOString() }
                        ]);

                        if (upsertErr) {
                          alert("Error de seguridad: Ambos usuarios deben tener la sesión activa o necesitas un servidor.");
                          return;
                        }

                        const newContent = msg.content.replace('[TRADE_PROPOSAL]', '[TRADE_ACCEPTED]');
                        await supabase.from('messages').update({ content: newContent }).eq('id', msg.id);
                        setAlbumsState(newReceiverData);
                        setMessages(prev => prev.map(m => m.id === msg.id ? { ...m, content: newContent } : m));
                      };

                      return (
                        <div key={msg.id} style={{ alignSelf: 'center', backgroundColor: 'var(--panel-bg)', border: `1px solid ${isAccepted ? 'var(--success)' : 'var(--primary)'}`, borderRadius: '12px', padding: '15px', maxWidth: '90%', width: '100%', marginBottom: '10px' }}>
                          <h4 style={{ margin: '0 0 15px 0', textAlign: 'center', color: isAccepted ? 'var(--success)' : 'var(--primary)', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
                            <Handshake size={20} /> {isAccepted ? 'Intercambio Realizado' : 'Propuesta de Intercambio'}
                          </h4>
                          <div style={{ display: 'flex', gap: '15px', justifyContent: 'space-between', marginBottom: '15px' }}>
                            <div style={{ flex: 1, textAlign: 'center' }}>
                              <strong style={{ fontSize: '0.8rem', color: 'var(--warning)', display: 'block', marginBottom: '5px' }}>Tú Das</strong>
                              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', justifyContent: 'center' }}>
                                {myGiveList.map(id => <span key={id} className="badge-active" style={{ backgroundColor: 'var(--warning)', fontSize: '0.7rem' }}>{id}</span>)}
                                {myGiveList.length === 0 && <span style={{ color: 'var(--text-muted)' }}>Nada</span>}
                              </div>
                            </div>
                            <div style={{ flex: 1, textAlign: 'center' }}>
                              <strong style={{ fontSize: '0.8rem', color: 'var(--success)', display: 'block', marginBottom: '5px' }}>Tú Recibes</strong>
                              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', justifyContent: 'center' }}>
                                {myReceiveList.map(id => <span key={id} className="badge-active" style={{ backgroundColor: 'var(--success)', fontSize: '0.7rem' }}>{id}</span>)}
                                {myReceiveList.length === 0 && <span style={{ color: 'var(--text-muted)' }}>Nada</span>}
                              </div>
                            </div>
                          </div>
                          {!amISender && !isAccepted ? (
                            <button className="btn btn-success" style={{ width: '100%', justifyContent: 'center' }} onClick={handleAcceptTrade}>
                              Aceptar Intercambio
                            </button>
                          ) : isAccepted ? (
                            <div style={{ textAlign: 'center', color: 'var(--success)', fontWeight: 'bold' }}>✓ Estampas Actualizadas</div>
                          ) : (
                            <div style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>Esperando respuesta...</div>
                          )}
                        </div>
                      );
                    } catch (e) {
                      return <div key={msg.id} style={{ color: 'var(--danger)', textAlign: 'center' }}>Propuesta inválida</div>
                    }
                  }

                  return (
                    <div key={msg.id} style={{ alignSelf: msg.sender_id === session.user.id ? 'flex-end' : 'flex-start', backgroundColor: msg.sender_id === session.user.id ? 'var(--primary)' : 'var(--border)', color: msg.sender_id === session.user.id ? 'white' : 'var(--text-main)', padding: '10px 15px', borderRadius: '15px', maxWidth: '80%' }}>
                      {msg.content}
                    </div>
                  );
                })}
                <div ref={chatScrollRef} />
              </div>
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <input type="text" className="search-input" value={newMessage} onChange={e => setNewMessage(e.target.value)} placeholder="Escribe un mensaje..." style={{ flex: 1 }} onKeyPress={e => e.key === 'Enter' && handleSendMessage()} />
                <button className="btn btn-primary" onClick={handleSendMessage}><Check size={20} /></button>
              </div>
            </div>
          )}
        </div>
      );
    }

    const confirmedFriendIds = friendRequests.filter(r => r.status === 'accepted').map(r => r.sender_id === session.user.id ? r.receiver_id : r.sender_id);
    const pendingReceivedIds = friendRequests.filter(r => r.status === 'pending' && r.receiver_id === session.user.id).map(r => r.sender_id);
    
    const pendingRequestsUsers = friendsData?.filter(u => pendingReceivedIds.includes(u.id)) || [];
    const myFriends = friendsData?.filter(u => confirmedFriendIds.includes(u.id)) || [];
    const otherUsers = friendsData?.filter(u => !confirmedFriendIds.includes(u.id) && !pendingReceivedIds.includes(u.id)) || [];

    const renderUserList = (list) => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {list.map(user => {
          const fName = user.stamps_data.ownerName || 'Usuario Anónimo';
          const fAlbum = user.stamps_data.albums?.find(a => a.id === user.stamps_data.activeAlbumId)?.stamps || [];
          const fDuplicates = fAlbum.filter(s => s.count > 1).length;
          const iReceiveCount = fAlbum.filter(fs => fs.count > 1 && stamps.find(ms => ms.id === fs.id)?.count === 0).length;
          const iGiveCount = stamps.filter(ms => ms.count > 1 && fAlbum.find(fs => fs.id === ms.id)?.count === 0).length;

          return (
            <div key={user.id} className="album-card" onClick={() => setSelectedFriend(user)}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ position: 'relative', width: '30px', height: '30px', borderRadius: '50%', backgroundColor: 'var(--primary)', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '12px', fontWeight: 'bold' }}>
                    {fName.charAt(0).toUpperCase()}
                    {unreadChats.friends[user.id] && <div style={{ position: 'absolute', top: -2, right: -2, width: '12px', height: '12px', backgroundColor: 'var(--danger)', borderRadius: '50%', border: '2px solid var(--panel-bg)' }} />}
                  </div>
                  {fName}
                  {user.is_pro && <Crown size={16} color="#FFD700" />}
                </h3>
              </div>
              <div style={{ display: 'flex', gap: '15px', fontSize: '0.85rem' }}>
                <span style={{ color: 'var(--success)', fontWeight: 'bold' }}>{iReceiveCount} te sirven</span>
                <span style={{ color: 'var(--warning)', fontWeight: 'bold' }}>{iGiveCount} le sirven</span>
                <span style={{ color: 'var(--text-muted)', marginLeft: 'auto' }}>{fDuplicates} repetidas total</span>
              </div>
            </div>
          );
        })}
      </div>
    );

    return (
      <div className="tab-content fade-in">
        <div className="filters" style={{ marginBottom: '20px' }}>
          <button className={`filter-btn ${communityTab === 'explorar' ? 'active' : ''}`} onClick={() => setCommunityTab('explorar')} style={{ flex: 1 }}>Explorar</button>
          <button className={`filter-btn ${communityTab === 'grupos' ? 'active' : ''}`} onClick={() => setCommunityTab('grupos')} style={{ flex: 1 }}>Mis Grupos</button>
        </div>

        {communityTab === 'grupos' ? (() => {
          const myGroupList = groups.filter(g => g.group_members?.some(m => m.user_id === session.user.id && m.status !== 'pending'));
          const myInvites = groups.filter(g => g.group_members?.some(m => m.user_id === session.user.id && m.status === 'pending'));

          const handleAcceptInvite = async (groupId) => {
            const { error } = await supabase.from('group_members').update({ status: 'accepted' }).match({ group_id: groupId, user_id: session.user.id });
            if (error) {
              console.error(error);
              alert("Error al conectarse a la base de datos. Pídele al administrador que configure los permisos RLS.");
              return;
            }
            setGroups(prev => prev.map(g => g.id === groupId ? { ...g, group_members: g.group_members.map(m => m.user_id === session.user.id ? { ...m, status: 'accepted' } : m) } : g));
          };

          const handleRejectInvite = async (groupId) => {
            const { error } = await supabase.from('group_members').delete().match({ group_id: groupId, user_id: session.user.id });
            if (error) {
              console.error(error);
              alert("Error al intentar salir. Necesitamos agregar el permiso de DELETE en Supabase.");
              return;
            }
            setGroups(prev => prev.filter(g => g.id !== groupId));
          };

          return (
            <div>
              {myInvites.length > 0 && (
                <div style={{ marginBottom: '30px' }}>
                  <h3 style={{ marginBottom: '15px', color: 'var(--warning)', display: 'flex', alignItems: 'center', gap: '8px' }}><Clock size={20} /> Invitaciones a Grupos</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {myInvites.map(g => (
                      <div key={g.id} className="album-card" style={{ borderLeft: '4px solid var(--warning)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div>
                            <strong style={{ display: 'block', fontSize: '1rem' }}>{g.name}</strong>
                            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Te han invitado a unirte</span>
                          </div>
                          <div style={{ display: 'flex', gap: '10px' }}>
                            <button className="btn btn-success" style={{ padding: '6px 12px' }} onClick={() => handleAcceptInvite(g.id)}>Aceptar</button>
                            <button className="btn btn-secondary" style={{ padding: '6px 12px' }} onClick={() => handleRejectInvite(g.id)}>Rechazar</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 style={{ margin: 0 }}>Mis Grupos</h2>
                <button className="btn btn-primary" onClick={() => {
                  if (!isPro) {
                    alert("Función Exclusiva PRO 👑\n\nDesbloquea la versión PRO en tu Perfil para poder crear y administrar tus propios grupos.");
                    return;
                  }
                  setIsCreatingGroup(!isCreatingGroup);
                }} style={{ padding: '8px 15px', fontSize: '0.9rem' }}>
                  {isCreatingGroup ? 'Cancelar' : '+ Nuevo'}
                </button>
              </div>

              {isCreatingGroup && (
                <div className="album-card" style={{ marginBottom: '20px' }}>
                  <h3 style={{ marginTop: 0 }}>Crear Nuevo Grupo</h3>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <input type="text" className="search-input" value={newGroupName} onChange={e => setNewGroupName(e.target.value)} placeholder="Ej. Intercambios Oficina" style={{ flex: 1 }} />
                    <button className="btn btn-success" onClick={handleCreateGroup}>Crear</button>
                  </div>
                </div>
              )}

              {myGroupList.length === 0 && !isCreatingGroup ? (
                <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginTop: '40px' }}>No perteneces a ningún grupo todavía.</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  {myGroupList.map(g => (
                    <div key={g.id} className="album-card" onClick={() => setSelectedGroup(g)}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div style={{ position: 'relative', width: '30px', height: '30px', borderRadius: '50%', backgroundColor: 'var(--primary)', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '12px', fontWeight: 'bold' }}>
                            {g.name.charAt(0).toUpperCase()}
                            {unreadChats.groups[g.id] && <div style={{ position: 'absolute', top: -2, right: -2, width: '12px', height: '12px', backgroundColor: 'var(--danger)', borderRadius: '50%', border: '2px solid var(--panel-bg)' }} />}
                          </div>
                          {g.name}
                        </h3>
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{g.group_members?.filter(m => m.status !== 'pending').length || 1} miembros</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })()
        : (
          <>
            <div className="header-card" style={{ marginBottom: '20px', padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h2 style={{ margin: '0 0 10px 0' }}>Comunidad e Intercambios</h2>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>Agrega amigos, analiza qué estampas pueden intercambiar y escríbeles para pactarlo.</p>
                </div>
                <button className="btn btn-primary" onClick={() => setIsQRModalOpen(true)} style={{ padding: '10px', borderRadius: '12px', minWidth: '44px' }}>
                  <img src={`https://api.qrserver.com/v1/create-qr-code/?size=50x50&data=https://mundialestampas.com/?addFriend=${session?.user?.id}`} style={{ width: 24, height: 24, filter: 'invert(1)' }} alt="QR" />
                </button>
              </div>
            </div>

            {!friendsData ? (
              <div className="loading-spinner" style={{ margin: '40px auto' }}></div>
            ) : friendsData.length === 0 ? (
              <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginTop: '40px' }}>Todavía no hay otros usuarios en la plataforma.</p>
            ) : (
              <>
                {pendingRequestsUsers.length > 0 && (
                  <div style={{ marginBottom: '30px' }}>
                    <h3 style={{ marginBottom: '15px', color: 'var(--warning)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Clock size={20} /> Solicitudes Pendientes
                    </h3>
                    {renderUserList(pendingRequestsUsers)}
                  </div>
                )}

                {myFriends.length > 0 && (
                  <div style={{ marginBottom: '30px' }}>
                    <h3 style={{ marginBottom: '15px', color: 'var(--primary)' }}>Mis Amigos</h3>
                    {renderUserList(myFriends)}
                  </div>
                )}
                
                {otherUsers.length > 0 && (
                  <div>
                    {!isPro && (
                      <div style={{ backgroundColor: 'rgba(255, 215, 0, 0.1)', padding: '20px', borderRadius: '12px', border: '1px solid rgba(255, 215, 0, 0.3)', marginBottom: '30px', textAlign: 'center' }}>
                        <Crown size={32} color="#FFD700" style={{ marginBottom: '10px' }} />
                        <h3 style={{ color: '#FFD700', marginTop: 0, marginBottom: '10px' }}>¿Quieres hablar con todos?</h3>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-main)', marginBottom: '15px' }}>Hazte PRO para enviar mensajes ilimitados y crear grupos.</p>
                        <button className="btn btn-primary" onClick={() => setActiveTab('profile')} style={{ backgroundColor: '#FFD700', color: '#000', fontWeight: 'bold', border: 'none' }}>Ver Beneficios PRO</button>
                      </div>
                    )}
                    <AdBanner isPro={isPro} format="horizontal" />
                    <h3 style={{ marginBottom: '15px', color: 'var(--text-muted)' }}>Explorar Comunidad</h3>
                    {renderUserList(otherUsers)}
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    );
  };

  const renderCollectionTab = () => (
    <div className="tab-content fade-in">
      <header className="header" style={{ paddingTop: '10px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
          <div style={{ textAlign: 'left' }}>
            <p style={{ margin: 0, color: 'var(--primary)', fontSize: '0.9rem', fontWeight: 'bold' }}>
              {activeAlbumName} {isCloud && <span style={{ fontSize: '0.7rem', backgroundColor: 'var(--primary)', color: 'white', padding: '2px 6px', borderRadius: '4px', marginLeft: '5px' }}>☁️</span>}
            </p>
            <h1 style={{ margin: 0, fontSize: '2rem' }}>Mundial 2026</h1>
          </div>
        </div>
        
        <p style={{ textAlign: 'left', marginTop: '15px' }}>Progreso: {percentage}% Completo ({totalOwned} de {activeTotalStamps})</p>
        
        {/* Progress Bar */}
        <div style={{ width: '100%', height: '10px', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '5px', marginTop: '10px', overflow: 'hidden' }}>
          <div style={{ width: `${percentage}%`, height: '100%', backgroundColor: '#10b981', transition: 'width 0.5s ease-in-out' }}></div>
        </div>
      </header>

      <AdBanner isPro={isPro} format="horizontal" />

      <div className="stats-container">
        <div 
          className="stat-card" 
          style={{ cursor: 'pointer', border: filter === 'owned' ? '2px solid var(--primary)' : '1px solid var(--border)' }} 
          onClick={() => setFilter(filter === 'owned' ? 'all' : 'owned')}
        >
          <h3>Obtenidas</h3>
          <p>{totalOwned}</p>
        </div>
        <div 
          className="stat-card" 
          style={{ cursor: 'pointer', border: filter === 'missing' ? '2px solid var(--primary)' : '1px solid var(--border)' }} 
          onClick={() => setFilter(filter === 'missing' ? 'all' : 'missing')}
        >
          <h3>Faltantes</h3>
          <p>{missing}</p>
        </div>
        <div 
          className="stat-card" 
          style={{ cursor: 'pointer', border: filter === 'duplicates' ? '2px solid var(--primary)' : '1px solid var(--border)' }} 
          onClick={() => setFilter(filter === 'duplicates' ? 'all' : 'duplicates')}
        >
          <h3>Repetidas</h3>
          <p>{duplicatesCount}</p>
        </div>
      </div>

      <div className="actions-bar">
        <button className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }} onClick={() => {
          if (!isPro) {
            setPaywallFeature({ title: 'Escáner Inteligente', description: 'Detecta automáticamente tus estampas repetidas usando la cámara o galería. Ahorra horas de captura manual.' });
          } else {
            setScannerMode('menu');
          }
        }}>
          <Camera size={20} />
          Escanear IA
        </button>
        
        <button className="btn btn-secondary" style={{ flex: 1, justifyContent: 'center', borderColor: 'var(--warning)', color: 'var(--warning)' }} onClick={() => {
          if (!isPro) {
            setPaywallFeature({ title: 'Pactar Intercambio', description: 'Registra, organiza y visualiza todas tus negociaciones de estampas en un solo lugar.' });
          } else {
            setIsTradeModalOpen(true);
          }
        }}>
          <Handshake size={20} /> Pactar Intercambio
        </button>

        {scannedNumbers.length > 0 && (
          <button className="btn btn-success" onClick={addScannedToCollection} style={{ flex: 1, justifyContent: 'center' }}>
            <Check size={20} /> Agregar {scannedNumbers.length}
          </button>
        )}
      </div>

      <div className="controls" style={{ display: 'flex', gap: '10px' }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <Search size={18} style={{ position: 'absolute', left: 10, top: 12, color: '#94a3b8' }} />
          <input 
            type="text" 
            className="search-input" 
            placeholder="Buscar estampa (ej. ARG 10)..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ paddingLeft: 35, width: '100%', boxSizing: 'border-box' }}
          />
        </div>
        <button 
          className={`btn ${selectionMode ? 'btn-primary' : 'btn-secondary'}`} 
          style={{ padding: '0 15px', borderRadius: '12px' }}
          onClick={() => { setSelectionMode(!selectionMode); setSelectedStamps([]); }}
        >
          <CheckSquare size={20} />
        </button>
      </div>

      <div className="filters">
        <button className={`filter-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>Todas</button>
        <button className={`filter-btn ${filter === 'owned' ? 'active' : ''}`} onClick={() => setFilter('owned')}>Obtenidas</button>
        <button className={`filter-btn ${filter === 'missing' ? 'active' : ''}`} onClick={() => setFilter('missing')}>Faltantes</button>
        <button className={`filter-btn ${filter === 'duplicates' ? 'active' : ''}`} onClick={() => setFilter('duplicates')}>Repetidas</button>
      </div>

      {filter === 'all' && (
        <div style={{ marginBottom: '20px', padding: '10px 15px', backgroundColor: 'rgba(59, 130, 246, 0.1)', border: '1px solid var(--primary)', borderRadius: '8px', color: 'var(--text-main)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ backgroundColor: 'var(--primary)', color: 'white', borderRadius: '50%', minWidth: '20px', height: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold' }}>i</div>
          <span><strong>¿Te salió repetida?</strong> Toca cualquier estampa verde que ya tengas para sumarle repetidas (+1, +2, etc).</span>
        </div>
      )}
      
      {filter === 'duplicates' && duplicatesCount > 0 && (
        <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: 'rgba(245, 158, 11, 0.1)', border: '1px solid var(--warning)', borderRadius: '12px' }}>
          <h3 style={{ color: 'var(--warning)', marginBottom: '10px' }}>Compartir Repetidas</h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '15px' }}>Genera una lista de texto con todas tus repetidas lista para enviar por WhatsApp.</p>
          <button className="btn" style={{ backgroundColor: 'var(--warning)', color: '#000', width: '100%', justifyContent: 'center', fontWeight: 'bold' }} onClick={copyDuplicatesToClipboard}>
            Copiar Lista de Repetidas
          </button>
        </div>
      )}

      {filter === 'missing' && stamps.filter(s => s.count === 0).length > 0 && (
        <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid var(--danger)', borderRadius: '12px' }}>
          <h3 style={{ color: 'var(--danger)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            Compartir Faltantes {!isPro && <Crown size={16} color="#FFD700" />}
          </h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '15px' }}>Genera una lista de texto con todas las estampas que te faltan para intercambiar más rápido.</p>
          <button className="btn" style={{ backgroundColor: isPro ? 'var(--danger)' : '#FFD700', color: isPro ? 'white' : 'black', width: '100%', justifyContent: 'center', fontWeight: 'bold' }} onClick={copyMissingToClipboard}>
            {!isPro && <Crown size={18} style={{ marginRight: '8px' }} />}
            {isPro ? 'Copiar Lista de Faltantes' : 'Exportar Faltantes (PRO)'}
          </button>
        </div>
      )}

      <div className="teams-container">
        {groupedByGroup.map(group => (
          <div key={group.id} style={{ marginBottom: '30px' }}>
            <h2 style={{ color: 'var(--primary)', marginBottom: '15px', paddingLeft: '5px', borderLeft: '4px solid var(--primary)' }}>{group.name}</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {group.teams.map(team => {
                const isExpanded = expandedTeams[team.code] || searchTerm !== '';
                const teamOwned = team.stamps.filter(s => s.count > 0).length;
                const teamPercent = Math.round((teamOwned / team.stamps.length) * 100) || 0;
                return (
                  <div key={team.code} className="team-section">
                    <div className="team-header" onClick={() => toggleTeam(team.code)}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <h2 style={{ fontSize: '1.2rem', margin: 0 }}>{team.flag} {team.name} ({team.code})</h2>
                        <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{teamOwned}/{team.stamps.length} ({teamPercent}%)</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <button 
                          className="btn" 
                          style={{ padding: '5px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', color: 'var(--text-main)' }}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectionMode(true);
                            const ids = team.stamps.map(s => s.id);
                            setSelectedStamps(prev => Array.from(new Set([...prev, ...ids])));
                            if (!expandedTeams[team.code]) toggleTeam(team.code);
                          }}
                        >
                          <CheckSquare size={16} />
                        </button>
                        {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </div>
                    </div>
                    {isExpanded && (
                      <div className="stamps-grid team-grid" style={{ position: 'relative', overflow: 'hidden' }}>
                        {teamPercent === 100 && (
                          <div style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            fontSize: '15rem',
                            pointerEvents: 'none',
                            zIndex: 0,
                            userSelect: 'none',
                            animation: 'flag-pop 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '100%',
                            height: '100%',
                            filter: 'grayscale(0%)'
                          }}>
                            {team.flag}
                          </div>
                        )}
                        {team.stamps.map(stamp => {
                          const isSelected = selectedStamps.includes(stamp.id);
                          return (
                            <button 
                              key={stamp.id} 
                              className={`stamp-btn ${stamp.count > 0 ? 'owned' : ''} ${stamp.scanned ? 'scanned' : ''} ${isSelected ? 'selected' : ''}`} 
                              style={{ zIndex: 1, ...(isSelected ? { borderColor: 'white', transform: 'scale(1.1)', boxShadow: '0 0 10px rgba(255,255,255,0.5)' } : {}) }} 
                              onClick={() => handleStampClick(stamp)}
                            >
                              <span className="stamp-id">{stamp.teamCode}<br/>{stamp.number}</span>
                              {stamp.count > 1 && <div className="badge duplicate">+{stamp.count - 1}</div>}
                              {stamp.count === 1 && <div className="badge"><Check size={12} /></div>}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
        {groupedByGroup.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>No se encontraron estampas con esos filtros.</div>
        )}
      </div>

      {selectionMode && (
        <div style={{
          position: 'fixed',
          bottom: '80px',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: 'var(--panel-bg)',
          border: '1px solid var(--primary)',
          borderRadius: '24px',
          padding: '10px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: '15px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.8)',
          zIndex: 1000,
          whiteSpace: 'nowrap'
        }} className="fade-in">
          <span style={{ fontWeight: 'bold', color: 'white' }}>{selectedStamps.length} selecc.</span>
          <button className="btn btn-secondary" style={{ padding: '8px 12px', fontSize: '0.8rem', color: '#f87171', borderColor: '#f87171' }} onClick={() => {
            const newStamps = stamps.map(s => selectedStamps.includes(s.id) ? { ...s, count: 0, scanned: false } : s);
            setStamps(newStamps);
            setSelectionMode(false);
            setSelectedStamps([]);
          }}>Quitar</button>
          <button className="btn btn-primary" style={{ padding: '8px 12px', fontSize: '0.8rem' }} onClick={() => {
            const newStamps = stamps.map(s => selectedStamps.includes(s.id) ? { ...s, count: s.count === 0 ? 1 : s.count, scanned: false } : s);
            setStamps(newStamps);
            setSelectionMode(false);
            setSelectedStamps([]);
          }}>Obtener</button>
          <button className="btn" style={{ padding: '8px', background: 'transparent', color: 'var(--text-muted)' }} onClick={() => { setSelectionMode(false); setSelectedStamps([]); }}>
            <X size={18} />
          </button>
        </div>
      )}

      {selectedStampId && (() => {
        const selectedStamp = stamps.find(s => s.id === selectedStampId);
        if (!selectedStamp) return null;
        return (
        <div className="scanner-modal" onClick={() => setSelectedStampId(null)}>
          <div className="scanner-content" onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h2 style={{ margin: 0 }}>{selectedStamp.id}</h2>
              <X size={24} style={{ cursor: 'pointer', color: '#94a3b8' }} onClick={() => setSelectedStampId(null)} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 20, margin: '30px 0' }}>
              <button className="btn btn-secondary" style={{ padding: 15, borderRadius: '50%', borderColor: selectedStamp.count === 1 ? 'var(--danger)' : '' }} onClick={() => updateStampCount(selectedStamp.id, selectedStamp.count - 1)} disabled={selectedStamp.count === 0}>
                <Minus size={24} color={selectedStamp.count === 1 ? 'var(--danger)' : ''} />
              </button>
              <span style={{ fontSize: '3rem', fontWeight: 800 }}>{selectedStamp.count}</span>
              <button className="btn btn-primary" style={{ padding: 15, borderRadius: '50%' }} onClick={() => updateStampCount(selectedStamp.id, selectedStamp.count + 1)}>
                <Plus size={24} />
              </button>
            </div>
            <p style={{ color: '#94a3b8', marginBottom: 20 }}>
              {selectedStamp.count === 0 ? 'No tienes esta estampa' : selectedStamp.count === 1 ? 'Tienes 1 estampa (Si restas se quitará)' : `Tienes 1 y ${selectedStamp.count - 1} repetidas`}
            </p>
            <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => setSelectedStampId(null)}>Listo</button>
          </div>
        </div>
        );
      })()}

      {isTradeModalOpen && (
        <div className="scanner-modal" onClick={() => setIsTradeModalOpen(false)}>
          <div className="scanner-content" style={{ maxWidth: '600px' }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h2 style={{ margin: 0, color: 'var(--warning)', display: 'flex', alignItems: 'center', gap: '8px' }}><Handshake size={28} /> Pactar Intercambio</h2>
              <X size={24} style={{ cursor: 'pointer', color: '#94a3b8' }} onClick={() => setIsTradeModalOpen(false)} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left' }}>
              <div style={{ backgroundColor: 'rgba(245, 158, 11, 0.05)', padding: '15px', borderRadius: '12px', border: '1px solid var(--border)' }}>
                <h3 style={{ marginBottom: '10px', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Send size={18} color="var(--warning)" /> Estampas que entregas (Tus repetidas)
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '10px' }}>
                  {tradeGiven.map((s, idx) => (
                    <span key={idx} style={{ backgroundColor: 'var(--panel-bg)', padding: '5px 10px', borderRadius: '20px', fontSize: '0.8rem', border: '1px solid var(--warning)' }}>
                      {s.id} <X size={12} style={{ display: 'inline', verticalAlign: 'middle', cursor: 'pointer' }} onClick={() => setTradeGiven(tradeGiven.filter((_, i) => i !== idx))} />
                    </span>
                  ))}
                  {tradeGiven.length === 0 && <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Ninguna seleccionada</span>}
                </div>
                <select className="search-input" value={tradeGivenTeam} onChange={(e) => setTradeGivenTeam(e.target.value)} style={{ width: '100%', boxSizing: 'border-box', marginBottom: '10px', backgroundColor: 'var(--panel-bg)', color: 'var(--text-main)', border: '1px solid var(--border)', borderRadius: '8px', padding: '10px' }}>
                  <option value="">Selecciona un país...</option>
                  {TEAMS.map(t => (
                    <option key={t.code} value={t.code}>{t.flag} {t.name}</option>
                  ))}
                </select>
                
                {tradeGivenTeam && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', maxHeight: '150px', overflowY: 'auto', paddingRight: '5px' }}>
                    {stamps.filter(s => s.count > 1 && s.teamCode === tradeGivenTeam).map(s => {
                      const maxAvailable = s.count - 1;
                      const currentlySelected = tradeGiven.filter(tg => tg.id === s.id).length;
                      const canAdd = currentlySelected < maxAvailable;
                      
                      return (
                        <button key={s.id} onClick={() => { if (canAdd) addToTradeGiven(s); }} disabled={!canAdd} style={{ background: canAdd ? 'var(--primary)' : 'var(--panel-bg)', color: canAdd ? 'white' : 'var(--text-muted)', border: '1px solid var(--border)', padding: '6px 12px', borderRadius: '8px', cursor: canAdd ? 'pointer' : 'not-allowed', display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '50px' }}>
                          <span style={{ fontWeight: 'bold' }}>{s.number}</span>
                          <span style={{ fontSize: '0.7rem' }}>Disp: {maxAvailable - currentlySelected}</span>
                        </button>
                      );
                    })}
                    {stamps.filter(s => s.count > 1 && s.teamCode === tradeGivenTeam).length === 0 && (
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>No tienes repetidas de este país.</span>
                    )}
                  </div>
                )}
              </div>
              <div style={{ backgroundColor: 'rgba(16, 185, 129, 0.05)', padding: '15px', borderRadius: '12px', border: '1px solid var(--border)' }}>
                <h3 style={{ marginBottom: '10px', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Inbox size={18} color="var(--success)" /> Estampas que recibes (Tus faltantes)
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '10px' }}>
                  {tradeReceived.map((s, idx) => (
                    <span key={idx} style={{ backgroundColor: 'var(--panel-bg)', padding: '5px 10px', borderRadius: '20px', fontSize: '0.8rem', border: '1px solid var(--success)' }}>
                      {s.id} <X size={12} style={{ display: 'inline', verticalAlign: 'middle', cursor: 'pointer' }} onClick={() => setTradeReceived(tradeReceived.filter((_, i) => i !== idx))} />
                    </span>
                  ))}
                  {tradeReceived.length === 0 && <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Ninguna seleccionada</span>}
                </div>
                <select className="search-input" value={tradeReceivedTeam} onChange={(e) => setTradeReceivedTeam(e.target.value)} style={{ width: '100%', boxSizing: 'border-box', marginBottom: '10px', backgroundColor: 'var(--panel-bg)', color: 'var(--text-main)', border: '1px solid var(--border)', borderRadius: '8px', padding: '10px' }}>
                  <option value="">Selecciona un país...</option>
                  {TEAMS.map(t => (
                    <option key={t.code} value={t.code}>{t.flag} {t.name}</option>
                  ))}
                </select>

                {tradeReceivedTeam && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', maxHeight: '150px', overflowY: 'auto', paddingRight: '5px' }}>
                    {stamps.filter(s => s.count === 0 && s.teamCode === tradeReceivedTeam).map(s => {
                      const currentlySelected = tradeReceived.filter(tr => tr.id === s.id).length;
                      const canAdd = currentlySelected === 0;
                      
                      return (
                        <button key={s.id} onClick={() => { if (canAdd) addToTradeReceived(s); }} disabled={!canAdd} style={{ background: canAdd ? 'var(--success)' : 'var(--panel-bg)', color: canAdd ? 'white' : 'var(--text-muted)', border: '1px solid var(--border)', padding: '6px 12px', borderRadius: '8px', cursor: canAdd ? 'pointer' : 'not-allowed', display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '50px' }}>
                          <span style={{ fontWeight: 'bold' }}>{s.number}</span>
                        </button>
                      );
                    })}
                    {stamps.filter(s => s.count === 0 && s.teamCode === tradeReceivedTeam).length === 0 && (
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>No te faltan estampas de este país.</span>
                    )}
                  </div>
                )}
              </div>
            </div>
            <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '20px' }} onClick={handleExecuteTrade} disabled={tradeGiven.length === 0 && tradeReceived.length === 0}>
              Confirmar Intercambio
            </button>
          </div>
        </div>
      )}
      <div style={{ paddingBottom: '80px' }}></div> {/* Spacer for bottom nav */}
    </div>
  );

  const pendingReceivedCount = friendRequests.filter(r => r.status === 'pending' && r.receiver_id === session?.user?.id).length;
  const myInvitesCount = groups.filter(g => g.group_members?.some(m => m.user_id === session?.user?.id && m.status === 'pending')).length;
  const totalPending = pendingReceivedCount + myInvitesCount + unreadChatCount;

  return (
    <div className="app-container">
      <div className="main-content-scroll">
        {paywallFeature ? (
          <ProPaywall 
            featureName={paywallFeature.title} 
            description={paywallFeature.description} 
            onUpgrade={() => { setPaywallFeature(null); setActiveTab('profile'); }} 
          />
        ) : (
          <>
            {activeTab === 'collection' && renderCollectionTab()}
            {activeTab === 'albums' && renderAlbumsTab()}
            {activeTab === 'friends' && renderFriendsTab()}
            {activeTab === 'profile' && renderProfileTab()}
          </>
        )}
      </div>

      <nav className="bottom-nav">
        <button className={`nav-item ${activeTab === 'collection' && !paywallFeature ? 'active' : ''}`} onClick={() => { setActiveTab('collection'); setPaywallFeature(null); }}>
          <BookOpen size={24} />
          <span>Colección</span>
        </button>
        <button className={`nav-item ${activeTab === 'friends' && !paywallFeature ? 'active' : ''}`} onClick={() => { 
          if (!isPro) {
            setPaywallFeature({ title: 'Comunidad', description: 'Únete a grupos, chatea con coleccionistas, descubre quién tiene las estampas que te faltan y pacta intercambios automáticamente.' });
          } else {
            setActiveTab('friends'); 
            setSelectedFriend(null); 
            setPaywallFeature(null);
          }
        }} style={{ position: 'relative' }}>
          <Users size={24} />
          {totalPending > 0 && <span style={{ position: 'absolute', top: '5px', right: '50%', transform: 'translateX(15px)', backgroundColor: 'var(--danger)', color: 'white', borderRadius: '50%', width: '18px', height: '18px', fontSize: '0.7rem', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold' }}>{totalPending}</span>}
          <span>Comunidad</span>
        </button>
        <button className={`nav-item ${activeTab === 'albums' && !paywallFeature ? 'active' : ''}`} onClick={() => { setActiveTab('albums'); setPaywallFeature(null); }}>
          <Library size={24} />
          <span>Álbumes</span>
        </button>
        <button className={`nav-item ${activeTab === 'profile' && !paywallFeature ? 'active' : ''}`} onClick={() => { setActiveTab('profile'); setPaywallFeature(null); }}>
          <User size={24} />
          <span>Perfil</span>
        </button>
      </nav>

      {scannerMode === 'menu' && (
        <div className="scanner-modal" onClick={() => setScannerMode(null)}>
          <div className="scanner-content fade-in" onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h2 style={{ margin: 0 }}>Escáner Inteligente</h2>
              <X size={24} style={{ cursor: 'pointer', color: '#94a3b8' }} onClick={() => setScannerMode(null)} />
            </div>
            <p style={{ color: 'var(--text-muted)' }}>Elige cómo quieres escanear tus estampas.</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
              <button className="btn btn-primary" onClick={() => setScannerMode('page_setup')} style={{ padding: '15px' }}>
                📄 Escanear Página Completa
              </button>
              <div style={{ position: 'relative' }}>
                <input type="file" accept="image/*" onChange={processScanDuplicates} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, zIndex: 10, cursor: 'pointer' }} />
                <button className="btn btn-secondary" style={{ width: '100%', padding: '15px' }}>
                  🎴 Escanear Repetidas Sueltas
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {scannerMode === 'page_setup' && (
        <div className="scanner-modal" onClick={() => setScannerMode(null)}>
          <div className="scanner-content fade-in" onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h2 style={{ margin: 0 }}>Escanear Página</h2>
              <X size={24} style={{ cursor: 'pointer', color: '#94a3b8' }} onClick={() => setScannerMode(null)} />
            </div>
            <p style={{ color: 'var(--text-muted)', marginBottom: '15px' }}>Selecciona de qué equipo es la página y toma la foto.</p>
            
            <select 
              className="search-input" 
              value={scanTargetTeam} 
              onChange={e => setScanTargetTeam(e.target.value)}
              style={{ width: '100%', padding: '15px', marginBottom: '20px', fontSize: '1.1rem' }}
            >
              {activeTeams.map(t => <option key={t.code} value={t.code}>{t.name} ({t.code})</option>)}
            </select>
            
            <div style={{ position: 'relative' }}>
              <input type="file" accept="image/*" onChange={processScanPage} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, zIndex: 10, cursor: 'pointer' }} />
              <button className="btn btn-primary" style={{ width: '100%', padding: '15px', justifyContent: 'center' }}>
                <Camera size={20} /> Cámara o Galería
              </button>
            </div>
          </div>
        </div>
      )}

      {scannerMode === 'page_review' && pageScannerResults && (
        <div className="scanner-modal" onClick={() => setScannerMode(null)}>
          <div className="scanner-content fade-in" onClick={e => e.stopPropagation()} style={{ maxHeight: '90vh', overflowY: 'auto' }}>
            <h2 style={{ margin: 0, marginBottom: '5px' }}>Revisión de Página</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '20px' }}>
              Toca para corregir. Las que están en color <b style={{color: 'var(--primary)'}}>azul/verde</b> son las que ya están <b>pegadas</b>.
            </p>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px', marginBottom: '20px' }}>
              {pageScannerResults.map((res, index) => (
                <div 
                  key={index}
                  onClick={() => {
                    const newRes = [...pageScannerResults];
                    newRes[index].isOwned = !newRes[index].isOwned;
                    setPageScannerResults(newRes);
                  }}
                  style={{ 
                    aspectRatio: '3/4', 
                    backgroundColor: res.isOwned ? 'var(--primary)' : 'var(--panel-bg)',
                    border: `1px solid ${res.isOwned ? 'var(--primary)' : 'var(--border)'}`,
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    color: res.isOwned ? '#fff' : 'var(--text-muted)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {res.num === 0 ? '00' : res.num}
                </div>
              ))}
            </div>
            
            <button className="btn btn-success" style={{ width: '100%', justifyContent: 'center', padding: '15px', fontSize: '1.1rem' }} onClick={savePageResults}>
              <CheckCircle size={20} /> Guardar en Álbum
            </button>
          </div>
        </div>
      )}

      {(scannerMode === 'duplicates_processing' || scannerMode === 'page_processing') && (
        <div className="scanner-modal">
          <div className="scanner-content">
            <h2>Analizando Imagen...</h2>
            <div className="loading-spinner"></div>
            <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{scanProgress}%</p>
            <p style={{ color: '#94a3b8', marginTop: 10 }}>Leyendo texto con Inteligencia Artificial. Esto puede tardar unos segundos.</p>
          </div>
        </div>
      )}

      {isQRModalOpen && session && (
        <div className="scanner-modal" onClick={() => setIsQRModalOpen(false)}>
          <div className="scanner-content fade-in" onClick={e => e.stopPropagation()} style={{ textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h2 style={{ margin: 0 }}>Mi Código QR</h2>
              <X size={24} style={{ cursor: 'pointer', color: '#94a3b8' }} onClick={() => setIsQRModalOpen(false)} />
            </div>
            <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>
              Muestra este código a un amigo para que lo escanee con la cámara de su celular y te agregue al instante.
            </p>
            <div style={{ background: 'white', padding: '20px', borderRadius: '16px', display: 'inline-block', marginBottom: '20px' }}>
              <img src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=https://mundialestampas.com/?addFriend=${session.user.id}`} alt="Mi QR" style={{ width: '100%', maxWidth: '250px', height: 'auto' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
              <button className="btn btn-secondary" onClick={() => {
                navigator.clipboard.writeText(`https://mundialestampas.com/?addFriend=${session.user.id}`);
                alert("¡Link copiado al portapapeles!");
              }}>
                <Library size={18} /> Copiar Link Directo
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedAchievement && (
        <div className="scanner-modal" onClick={() => setSelectedAchievement(null)}>
          <div className="scanner-content fade-in" onClick={e => e.stopPropagation()} style={{ textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h2 style={{ margin: 0 }}>Detalle de Logro</h2>
              <X size={24} style={{ cursor: 'pointer', color: '#94a3b8' }} onClick={() => setSelectedAchievement(null)} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px', filter: selectedAchievement.condition ? 'none' : 'grayscale(100%)', opacity: selectedAchievement.condition ? 1 : 0.5 }}>
              <div style={{ position: 'relative', display: 'inline-block', width: '80px', height: '80px' }}>
                <Trophy size={80} color={selectedAchievement.condition ? '#FFD700' : '#475569'} strokeWidth={1.5} />
                <div style={{ position: 'absolute', top: '35%', left: '50%', transform: 'translate(-50%, -50%)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <selectedAchievement.icon size={36} color={selectedAchievement.condition ? selectedAchievement.color : '#94a3b8'} strokeWidth={2.5} />
                </div>
              </div>
            </div>
            <h3 style={{ margin: '0 0 10px 0', fontSize: '1.5rem', color: selectedAchievement.condition ? 'var(--primary)' : 'var(--text-main)' }}>
              {selectedAchievement.title}
            </h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '20px', fontSize: '1rem' }}>
              {selectedAchievement.desc}
            </p>
            <div style={{ backgroundColor: 'var(--bg-color)', padding: '15px', borderRadius: '12px', marginBottom: '20px', border: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span style={{ color: 'var(--text-muted)', fontWeight: 'bold' }}>Progreso:</span>
                <span style={{ color: 'var(--text-main)', fontWeight: 'bold' }}>{selectedAchievement.progressText}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)', fontWeight: 'bold' }}>Estado:</span>
                <span style={{ color: selectedAchievement.condition ? 'var(--success)' : 'var(--danger)', fontWeight: 'bold' }}>
                  {selectedAchievement.condition ? '✅ ¡Desbloqueado!' : '🔒 Bloqueado'}
                </span>
              </div>
            </div>
            <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => setSelectedAchievement(null)}>
              Continuar
            </button>
          </div>
        </div>
      )}

      {selectedMissingTeam && (
        <div className="scanner-modal" onClick={() => setSelectedMissingTeam(null)}>
          <div className="scanner-content fade-in" onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h2 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '2rem' }}>{selectedMissingTeam.flag}</span>
                {selectedMissingTeam.name}
              </h2>
              <X size={24} style={{ cursor: 'pointer', color: '#94a3b8' }} onClick={() => setSelectedMissingTeam(null)} />
            </div>
            
            <div style={{ backgroundColor: 'rgba(245, 158, 11, 0.1)', padding: '15px', borderRadius: '12px', border: '1px solid rgba(245, 158, 11, 0.3)', marginBottom: '20px', textAlign: 'center' }}>
              <span style={{ color: '#f59e0b', fontSize: '1.2rem', fontWeight: 'bold' }}>
                Faltan {selectedMissingTeam.faltantesInTeam} estampas
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(60px, 1fr))', gap: '10px', maxHeight: '40vh', overflowY: 'auto', paddingRight: '5px' }}>
              {stamps.filter(s => s.teamCode === selectedMissingTeam.code && s.count === 0).map(s => (
                <div key={s.id} style={{ 
                  backgroundColor: 'var(--panel-bg)', 
                  border: '1px dashed var(--border)', 
                  borderRadius: '8px', 
                  padding: '10px 5px', 
                  textAlign: 'center',
                  color: 'var(--text-muted)'
                }}>
                  <div style={{ fontSize: '0.75rem', marginBottom: '4px' }}>{s.teamCode}</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>{s.number}</div>
                </div>
              ))}
            </div>
            
            <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '20px' }} onClick={() => setSelectedMissingTeam(null)}>
              Cerrar
            </button>
          </div>
        </div>
      )}

      {selectedDuplicateTeam && (
        <div className="scanner-modal" onClick={() => setSelectedDuplicateTeam(null)}>
          <div className="scanner-content fade-in" onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h2 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '2rem' }}>{selectedDuplicateTeam.flag}</span>
                {selectedDuplicateTeam.name}
              </h2>
              <X size={24} style={{ cursor: 'pointer', color: '#94a3b8' }} onClick={() => setSelectedDuplicateTeam(null)} />
            </div>
            
            <div style={{ backgroundColor: 'rgba(220, 38, 38, 0.1)', padding: '15px', borderRadius: '12px', border: '1px solid rgba(220, 38, 38, 0.3)', marginBottom: '20px', textAlign: 'center' }}>
              <span style={{ color: 'var(--danger)', fontSize: '1.2rem', fontWeight: 'bold' }}>
                Tienes {selectedDuplicateTeam.duplicatesInTeam} repetidas
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(60px, 1fr))', gap: '10px', maxHeight: '40vh', overflowY: 'auto', paddingRight: '5px' }}>
              {stamps.filter(s => s.teamCode === selectedDuplicateTeam.code && s.count > 1).map(s => (
                <div key={s.id} style={{ 
                  backgroundColor: 'rgba(220, 38, 38, 0.1)', 
                  border: '1px solid rgba(220, 38, 38, 0.3)', 
                  borderRadius: '8px', 
                  padding: '10px 5px', 
                  textAlign: 'center',
                  color: 'var(--text-main)',
                  position: 'relative'
                }}>
                  <div style={{ position: 'absolute', top: -5, right: -5, backgroundColor: 'var(--danger)', color: 'white', borderRadius: '50%', width: 20, height: 20, fontSize: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                    +{s.count - 1}
                  </div>
                  <div style={{ fontSize: '0.75rem', marginBottom: '4px' }}>{s.teamCode}</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>{s.number}</div>
                </div>
              ))}
            </div>
            
            <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '20px', backgroundColor: 'var(--danger)', border: 'none' }} onClick={() => setSelectedDuplicateTeam(null)}>
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    if (session) {
      await supabase.auth.signOut();
    }
  };

  if (loading) {
    return (
      <div className="app-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (!session) {
    return <LoginScreen />;
  }

  return <MainApp session={session} onLogout={handleLogout} />;
}

