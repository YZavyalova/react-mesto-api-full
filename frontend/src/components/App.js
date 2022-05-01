import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import api from '../utils/Api';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import AddPlacePopup from './AddPlacePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import ImagePopup from './ImagePopup';
import CurrentUserContext from '../context/CurrentUserContext';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import ProtectedRoute from './HOC/ProtectedRoute';
import { authorize, register, logout } from '../utils/Auth';

function App() {

  const initState  = { 
    loggedIn: false, 
    userData: { 
      email: '', 
    },
  }

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  const [state, setState] = useState(initState);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  const history = useHistory();

  useEffect(() => {
    api.getUserInfo()
    .then((user) => {
      if (user._id) {
        setState(old => ({
          ...old,
          loggedIn: true,
        }))
        history.push('/')
      }
    })
    .catch(() => {
      setState(old => ({
        ...old,
        loggedIn: false,
      }))
    });
}, [history]);

  useEffect(() => {
    if (state.loggedIn) {
      Promise.all([api.getInitialCards(), api.getUserInfo()])
      .then(([cards, profileInfo]) => {
          setCurrentUser(profileInfo);
          setCards(cards);
      })
      .catch((err) => {
          console.log(err);
      })
    }
}, [state.loggedIn]);

  useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === 'Escape') {
        closeAllPopups();
      }
    }
    document.addEventListener('keydown', closeByEscape)
    
    return () => document.removeEventListener('keydown', closeByEscape)
  }, [])



  const handleUpdateUser = userData => {
    api.setUserInfo(userData)
    .then((userData) => {
      setCurrentUser(userData);
      closeAllPopups();
    })
    .catch(err => console.log(err))
  }

  const handleUpdateAvatar = ({avatar}) => {
    api.setUserAvatar(avatar)
    .then((avatar) => {
      setCurrentUser(avatar);
      closeAllPopups();
    })
    .catch(err => console.log(err))
  }

  const handleAddPlaceSubmit = newCard => {
    api.postCard(newCard)
    .then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    })
    .catch(err => console.log(err))
  }

  const handleCardLike = (card) => {
    const isLiked = card.likes.some(owner => owner === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
    .then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch(err => console.log(err))
  }



  function handleCardDelete (card) {
    // //используя методы массива, создаем новый массив карточек newCards, где не будет карточки
    // //которую мы только что удалили
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id))
    })
    .catch(err => console.log(err))
  }


  function handleCardClick(card) {
    setSelectedCard(card);
  }


  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
    setIsTooltipOpen(false);
  }

  const handleLogin = (userData) => {
    authorize(userData)
    // .then((res) => {
    //   localStorage.setItem('jwt', res.token);
    //   setState(old => ({
    //     ...old,
    //     loggedIn: true,
    //     userData: {
    //       email,
    //     }
        .then(() => {
          setState(old => ({
              ...old,
              loggedIn: true,
              userData: {
              email: userData.email
            }
        }))
      history.push('/')
    })
    .catch((err) => console.log(err))
  }

  const handleRegister = (userData) => {
    register(userData)
    .then((res) => {
      if(res) {
        setState(old => ({
          ...old,
          loggedIn: true,
        }))
        history.push('/sign-in');
      }
    })
    .finally(() => {
      setIsTooltipOpen(true);
    })
    .catch((err) => console.log(err))
  }

  const handleLogOut = () => {
    logout();
    setState(initState);
    history.push('/sign-up');
  }

  // const tokenCheck = () => {
  //   if(!localStorage.getItem('jwt')) return;
  //   const jwt = localStorage.getItem('jwt');
  //   getContent(jwt)
  //     .then((res) => {
  //       if (!res) return
  //       setState({
  //         loggedIn: true,
  //         userData: {
  //           email: res.data.email
  //         }
  //       });
  //       history.push('/');
  //     })
  //     .catch(err => console.log(err))
  // }
  

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Switch>
        <ProtectedRoute path="/" exact loggedIn={state.loggedIn}>
          <Header url='/sign-in' link='Выйти' email={state.userData.email} onLogOut={handleLogOut}/>
          <Main 
            onEditProfile={() => setIsEditProfilePopupOpen(true)} 
            onAddPlace={() => setIsAddPlacePopupOpen(true)} 
            onEditAvatar={() => setIsEditAvatarPopupOpen(true)} 
            onCardClick={handleCardClick}
            cards={cards}
            onCardDelete={handleCardDelete}
            onCardLike={handleCardLike}
          />
          <Footer/>
        </ProtectedRoute>
        <Route path="/sign-up">
          <Header url='/sign-in' link='Войти' />
          <Register handleRegister={handleRegister}/>
        </Route>
        <Route path="/sign-in">
          <Header url='/sign-up' link='Регистрация' />
          <Login handleLogin={handleLogin} />
        </Route>
        <Route>
          {state.loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
        </Route> 
      </Switch>
      <EditProfilePopup 
        isOpen={isEditProfilePopupOpen} 
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}/>
      <EditAvatarPopup 
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      /> 
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
      />
      <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
      <InfoTooltip
        isAuthDone={state.loggedIn}
        isOpen={isTooltipOpen}
        onClose={closeAllPopups}
      />
    </CurrentUserContext.Provider>
  );
}
export default App;
