
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// icons
import SearchIcon from '@mui/icons-material/Search';
import InboxIcon from '@mui/icons-material/Inbox';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';

// components
import Popup from '../helpers/Popup';
import Search from '../helpers/Search';
import NavList from '../helpers/NavList';

// style
import './header.css';

// icons
import MenuIcon from '@mui/icons-material/Menu';
import { setIsOpen, setType } from '../../features/popupSlice';

const list = localStorage.getItem('TOKEN') != null ? (
    ["My cart", "check out", "logout"].map((link) => (
        <li key={link}>
            <Link to={`/${link}`}>{link}</Link>
        </li>
    ))
) : (
    ["login", "register"].map((link) => (
        <li key={link}>
            <Link to={`/${link}`}>{link}</Link>
        </li>
    ))
)

const Header = () => {
    const dispatch = useDispatch();
    const categoryList = useSelector(state => state.categorySlice.categories);

    // popup states
    const isOpen = useSelector(state => state.popupSlice.isOpen)
    const popupType = useSelector(state => state.popupSlice.type)

    const openPopup = (type) => {
        dispatch(setIsOpen(!isOpen));
        dispatch(setType(type));
    }

    return (
        <header>
            <div className='container'>
                <div className='navigation-top hidden-in-small box'>
                    <div className='box'>
                        <button className='icon'>$USD</button>
                        <select className='button icon'>
                            <option value="english">english</option>
                            <option value="arabic">arabic</option>
                        </select>
                    </div>
                    <ul>
                        {list}
                    </ul>
                </div>
                <div className='navigation-center box'>
                    <div>
                        <h2 className='box'>
                            <button onClick={() => openPopup('list-nav')} className='hidden-from-medium icon'><MenuIcon /></button>
                            <Link to='/'>AStore</Link>
                        </h2>
                    </div>
                    <button onClick={() => openPopup('window-search')} className='icon simple hidden-in-small'>
                        <Search categoryList={categoryList} />
                    </button>
                    <div className='box'>
                        <button onClick={() => openPopup('window-search')} className='search-btn icon hidden-from-medium'><SearchIcon /></button>
                        <button onClick={() => openPopup('window-inbox')} className='icon'><InboxIcon /></button>
                        <button onClick={() => openPopup('window-help')} className='button icon'><HeadsetMicIcon /></button>
                    </div>
                </div>
                <NavList className={'hidden-in-small box'} />
                <Popup isOpen={isOpen} requestClose={openPopup} type={popupType} />
            </div>
        </header>
    )
}

export default Header;
