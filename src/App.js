import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import {Redirect, Route} from 'react-router-dom'
import './assets/style.css';
import AppTopbar from './AppTopbar';
import AppBreadcrumb from "./AppBreadcrumb";
import AppInlineMenu from './AppInlineMenu';
import AppFooter from './AppFooter';
import AppMenu from './AppMenu';
import AppConfig from './AppConfig';
import AppRightMenu from './AppRightMenu';
import { Toast } from 'primereact/toast';

import { Dashboard } from './components/Dashboard';
import { DashboardAnalytics } from './components/DashboardAnalytics';
import { ButtonDemo } from './components/ButtonDemo';
import { ChartDemo } from './components/ChartDemo';
import { MessagesDemo } from './components/MessagesDemo';
import { Documentation } from './components/Documentation';
import { FileDemo } from './components/FileDemo';
import { FormLayoutDemo } from './components/FormLayoutDemo';
import { InputDemo } from './components/InputDemo';
import { ListDemo } from './components/ListDemo';
import { MiscDemo } from './components/MiscDemo';
import { MenuDemo } from './components/MenuDemo';
import { OverlayDemo } from './components/OverlayDemo';
import { PanelDemo } from './components/PanelDemo';
import { TableDemo } from './components/TableDemo';
import { TreeDemo } from './components/TreeDemo';
import { FloatLabelDemo } from './components/FloatLabelDemo';
import { InvalidStateDemo } from './components/InvalidStateDemo';

import { DisplayDemo } from './utilities/DisplayDemo';
import { ElevationDemo } from './utilities/ElevationDemo';
import { FlexBoxDemo } from './utilities/FlexboxDemo';
import { GridDemo } from './utilities/GridDemo';
import { IconsDemo } from './utilities/IconsDemo';
import { SpacingDemo } from './utilities/SpacingDemo';
import { TextDemo } from './utilities/TextDemo';
import { TypographyDemo } from './utilities/TypographyDemo';
import { WidgetsDemo } from './utilities/WidgetsDemo';

import { Crud } from './pages/Crud';
import { Calendar } from './pages/Calendar';
import { EmptyPage } from './pages/EmptyPage';
import { Invoice } from './pages/Invoice';
import { Help } from './pages/Help';
import { TimelineDemo } from './pages/TimelineDemo';

import PrimeReact from 'primereact/api';

import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import './App.scss';
import {Session} from "./pages/Session";
import {ActiveSession} from "./pages/ActiveSession";
import {Activities} from "./pages/Activities";
import {Users} from "./pages/Users";
import {Groups} from "./pages/Groups";
import {Preferences} from "./pages/Preferences";
import {Connectionp} from "./pages/Connectionp";
import {createStore, useStore} from "react-hookstore";
import axios from "axios";

export const RTLContext = React.createContext();

createStore("connectionTree", []);

const App = () => {

    const [menuMode, setMenuMode] = useState('static');
    const [inlineMenuPosition, setInlineMenuPosition] = useState('bottom');
    const [desktopMenuActive, setDesktopMenuActive] = useState(true);
    const [mobileMenuActive, setMobileMenuActive] = useState(false);
    const [activeTopbarItem, setActiveTopbarItem] = useState(null);
    const [colorMode, setColorMode] = useState('light');
    const [rightMenuActive, setRightMenuActive] = useState(false);
    const [menuActive, setMenuActive] = useState(false);
    const [inputStyle, setInputStyle] = useState('filled');
    const [isRTL, setRTL] = useState(false);
    const [ripple, setRipple] = useState(true);
    const [mobileTopbarActive, setMobileTopbarActive] = useState(false);
    const [menuTheme, setMenuTheme] = useState('light');
    const [topbarTheme, setTopbarTheme] = useState('blue');
    const [theme, setTheme] = useState('indigo');
    const [isInputBackgroundChanged, setIsInputBackgroundChanged] = useState(false);
    const [inlineMenuActive, setInlineMenuActive] = useState({});
    const [newThemeLoaded, setNewThemeLoaded] = useState(false);
    const [searchActive, setSearchActive] = useState(false)
    const [connectionTree, setConnectionTree] = useStore("connectionTree");
    const [redirect, setRedirect] = useState(false);
    const [redirectToLogin, setRedirectToLogin] = useStore("redirectToLogin");



    let currentInlineMenuKey = useRef(null);

    PrimeReact.ripple = true;

    let searchClick;
    let topbarItemClick;
    let menuClick;
    let inlineMenuClick;

    const menu = [
        {
            label: 'Connections', icon: 'pi pi-fw pi-home',
            items: [
                { label: 'My Connections', icon: 'pi pi-fw pi-folder', to: '/Session' },
                { label: 'Current Connections', icon: 'pi pi-fw pi-folder-open', to: '/ActiveSession' },

            ]
        },
        {
            label: 'Utilities', icon: 'pi pi-fw pi-star',
            items: [
                { label: 'Activities', icon: 'pi pi-fw pi-list', to: '/Activities' },
                // { label: 'Users', icon: 'pi pi-fw pi-id-card', to: '/Users' },
                // { label: 'Groups', icon: 'pi pi-fw pi-check-square', to: '/Groups' },
                // { label: 'Connection', icon: 'pi pi-fw pi-bookmark', to: '/Connection' },
                // { label: 'Preferences', icon: 'pi pi-fw pi-bookmark', to: '/Preferences' },

            ]
        },
    ];

    const routes = [
        { parent: '', label: '' },
        { parent: 'Favorites', label: 'Dashboard Analytics' },
        { parent: 'UI Kit', label: 'Form Layout' },
        { parent: 'UI Kit', label: 'Input' },
        { parent: 'UI Kit', label: 'Float Label' },
        { parent: 'UI Kit', label: 'Invalid State' },
        { parent: 'UI Kit', label: 'Button' },
        { parent: 'UI Kit', label: 'Table' },
        { parent: 'UI Kit', label: 'List' },
        { parent: 'UI Kit', label: 'Panel' },
        { parent: 'UI Kit', label: 'Tree' },
        { parent: 'UI Kit', label: 'Overlay' },
        { parent: 'UI Kit', label: 'Menu' },
        { parent: 'UI Kit', label: 'Message' },
        { parent: 'UI Kit', label: 'File' },
        { parent: 'UI Kit', label: 'Chart' },
        { parent: 'UI Kit', label: 'Misc' },
        { parent: 'Utilities', label: 'Display' },
        { parent: 'Utilities', label: 'Elevation' },
        { parent: 'Utilities', label: 'Flexbox' },
        { parent: 'Utilities', label: 'Icons' },
        { parent: 'Utilities', label: 'Widgets' },
        { parent: 'Utilities', label: 'Grid' },
        { parent: 'Utilities', label: 'Spacing' },
        { parent: 'Utilities', label: 'Typography' },
        { parent: 'Utilities', label: 'Text' },
        { parent: 'Pages', label: 'Session' },
        { parent: 'Pages', label: 'Calendar' },
        { parent: 'Pages', label: 'Timeline' },
        { parent: 'Pages', label: 'Invoice' },
        { parent: 'Pages', label: 'Login' },
        { parent: 'Pages', label: 'Help' },
        { parent: 'Pages', label: 'Empty' },
        { parent: 'Pages', label: 'Access' },
        { parent: 'Start', label: 'Documentation' }
    ]

    useEffect(() => {
        setRedirect(redirectToLogin);
        // if(redirectToLogin)
        //     window.location.reload();
        return function cleanup() {
            setRedirectToLogin(false)
        }
    }, [redirectToLogin])

    useEffect(() => {
        if (menuMode === 'overlay') {
            hideOverlayMenu()
        }
        if(menuMode === 'static') {
            setDesktopMenuActive(true)
        }
    }, [menuMode])

    useEffect(() => {

        if(localStorage.getItem('token')) {

            let connectionAndGroupUrl = 'http://35.156.183.138:8080/guacamole/api/session/data/' + localStorage.getItem('dataSource') + '/connectionGroups/ROOT/tree';
            axios({
                method: 'get',
                url: connectionAndGroupUrl,
                params: {
                    'token': localStorage.getItem('token')
                }
            }).then(function (response) {
                if (response.status === 200 && response.data) {
                    treeList(response.data);
                }

            }).catch((error) => {
                console.log(error, 'ERRR');
            })
        }


    }, []);

    useEffect(() => {
        onColorModeChange(colorMode)
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        const appLogoLink = document.getElementById('app-logo');

        if(appLogoLink){
            if (topbarTheme === 'white' || topbarTheme === 'yellow' || topbarTheme === 'amber' || topbarTheme === 'orange' || topbarTheme === 'lime') {
                appLogoLink.src = 'assets/layout/images/logo-dark.svg';
            }
            else {
                appLogoLink.src = 'assets/layout/images/logo2.png';
            }
        }
        return function cleanup() {

        }
    },[topbarTheme])

    const onMenuThemeChange = (theme) => {
        setMenuTheme(theme)
    }

    const onTopbarThemeChange = (theme) => {
        setTopbarTheme(theme);
    }

    const onThemeChange = (theme) => {
        setTheme(theme);
        const themeLink = document.getElementById('theme-css');
        const themeHref = 'assets/theme/' + theme + '/theme-' + colorMode + '.css';
        replaceLink(themeLink, themeHref);
    }

    const onColorModeChange = (mode) => {
        setColorMode(mode);
        setIsInputBackgroundChanged(true);

        if (isInputBackgroundChanged) {
            if (mode === 'dark') {
                setInputStyle('filled');
            } else {
                setInputStyle('outlined')
            }
        }

        if (mode === 'dark') {
            setMenuTheme('dark');
            setTopbarTheme('dark');
        } else {
            setMenuTheme('light');
            setTopbarTheme('blue');

        }

        const layoutLink = document.getElementById('layout-css');
        const layoutHref = 'assets/layout/css/layout-' + mode + '.css';
        replaceLink(layoutLink, layoutHref);

        const themeLink = document.getElementById('theme-css');
        const urlTokens = themeLink.getAttribute('href').split('/');
        urlTokens[urlTokens.length - 1] = 'theme-' + mode + '.css';
        const newURL = urlTokens.join('/');

        replaceLink(themeLink, newURL, () => {
            setNewThemeLoaded(true);
        });

    }

    function treeList(oldTree){

        let treeNode = [];
        let totalGroupIndex = 0;
        if(oldTree.childConnectionGroups?.length>0){
            oldTree.childConnectionGroups?.forEach((el,index)=>{
                totalGroupIndex = totalGroupIndex+1;
                let obj = getTreeObj(el,'',index);
                if(obj.children?.length>0){
                    let children = buildGroupLeafs(obj,index);
                    obj.children = children;
                }

                treeNode.push(obj);


            });
        }

        if(oldTree.childConnections?.length>0){
            oldTree.childConnections?.forEach((el,index)=>{
                treeNode.push(getTreeObj(el,'',index+totalGroupIndex));
            });
        }
        setConnectionTree(treeNode);
    }

    function getTreeObj(data,parentKey,key){
        let list = [];
        if(data?.childConnectionGroups?.length>0){
            data?.childConnectionGroups?.forEach(function (el){
                list.push(el);
            })
        }
        if(data?.childConnections?.length>0){
            data?.childConnections?.forEach(function (el){
                list.push(el);
            })
        }

        let obj = {data:{}};

        obj.key = parentKey?.toString().length>0 ? parentKey.toString().concat('-').concat(key):key.toString();
        obj.identifier = data.identifier;
        obj.data = data;
        obj.children = list?.length>0 ? list : [];
        return obj;
    }

    function buildGroupLeafs(oldTree,level){
        let treeNode = [];
        if(oldTree.children?.length>0){
            oldTree.children?.forEach((el,index)=>{
                treeNode.push(getTreeObj(el,level.toString(),index));
            });
        }
        let leafTreeNode = [];
        if(treeNode?.length>0){
            treeNode?.forEach(function (el,index){
                if(el?.children?.length>0){
                    let elChildrenKey = level.toString()?.concat(('-').concat(index?.toString()));
                    el.children?.forEach((el,index)=>{
                        leafTreeNode.push(getTreeObj(el,elChildrenKey,index));
                    });
                    el.children = leafTreeNode;
                    let leafLeaf = [];
                    if(el.children?.length>0){
                        el.children?.forEach(function (el2,index){
                            if(el2?.children?.length>0){
                                el2.children?.forEach((el3,index)=>{
                                    let el3ChildrenKey = elChildrenKey?.concat(('-')?.concat(index?.toString()));
                                    leafLeaf.push(getTreeObj(el3,el3ChildrenKey,index));
                                });
                                el2.children = leafLeaf;
                                el2.children?.forEach((el3, index) => {
                                    if (el3?.children?.length > 0) {
                                        let leafLeafLeaf = [];
                                        el3.children?.forEach((el4, index) => {
                                            leafLeafLeaf.push(getTreeObj(el4, elChildrenKey?.concat(('-')?.concat(index?.toString()))?.concat(('-')?.concat(index?.toString())), index));
                                        })
                                        el3.children = leafLeafLeaf;
                                        leafLeafLeaf = Object.assign([], []);
                                    }
                                })
                                leafLeaf = Object.assign([],[]);
                            }
                        })
                    }
                    leafTreeNode = Object.assign([],[]);
                }
            })
        }



        return treeNode;
    }

    const replaceLink = (linkElement, href, callback) => {
        if (isIE()) {
            linkElement.setAttribute('href', href);

            if (callback) {
                callback();
            }
        }
        else {
            const id = linkElement.getAttribute('id');
            const cloneLinkElement = linkElement.cloneNode(true);

            cloneLinkElement.setAttribute('href', href);
            cloneLinkElement.setAttribute('id', id + '-clone');

            linkElement.parentNode.insertBefore(cloneLinkElement, linkElement.nextSibling);

            cloneLinkElement.addEventListener('load', () => {
                linkElement.remove();
                cloneLinkElement.setAttribute('id', id);

                if (callback) {
                    callback();
                }
            });
        }
    }

    const onInputStyleChange = (inputStyle) => {
        setInputStyle(inputStyle);
    }

    const onRipple = (e) => {
        PrimeReact.ripple = e.value;
        setRipple(e.value);
    }

    const onInlineMenuPositionChange = (mode) => {
        setInlineMenuPosition(mode)
    }

    const onMenuModeChange = (mode) => {
        setMenuMode(mode);
    }

    const onRTLChange = () => {
        setRTL(prevState => !prevState);
    }

    const onMenuClick = (event) => {
        menuClick = true;
    }

    const onMenuButtonClick = (event) => {
        menuClick = true;

        if (isDesktop())
            setDesktopMenuActive((prevState) => !prevState);
        else
            setMobileMenuActive((prevState) => !prevState)

        event.preventDefault();

    }

    const onTopbarItemClick = (event) => {
        topbarItemClick = true;
        if (activeTopbarItem === event.item)
            setActiveTopbarItem(null)
        else {
            setActiveTopbarItem(event.item)
        }

        event.originalEvent.preventDefault();
    }

    const onSearch = (event) => {
        searchClick = true;
        setSearchActive(event);
    }

    const onMenuItemClick = (event) => {
        if (!event.item.items && (menuMode === 'overlay' || !isDesktop())) {
            hideOverlayMenu();
        }

        if (!event.item.items && (isHorizontal() || isSlim())) {
            setMenuActive(false)
        }
    }

    const onRootMenuItemClick = (event) => {
        setMenuActive((prevState) => !prevState);
    }

    const onRightMenuButtonClick = () => {
        setRightMenuActive((prevState) => !prevState)
    }

    const onMobileTopbarButtonClick = (event) => {
        setMobileTopbarActive((prevState) => !prevState);
        event.preventDefault();
    }

    const onDocumentClick = (event) => {
        if (!searchClick && event.target.localName !== 'input') {
            setSearchActive(false);
        }

        if (!topbarItemClick) {
            setActiveTopbarItem(null);
        }

        if (!menuClick && (menuMode === 'overlay' || !isDesktop())) {
            if (isHorizontal() || isSlim()) {
                setMenuActive(false)
            }
            hideOverlayMenu();
        }

        if (inlineMenuActive[currentInlineMenuKey.current] && !inlineMenuClick) {
            let menuKeys = { ...inlineMenuActive };
            menuKeys[currentInlineMenuKey.current] = false;
            setInlineMenuActive(menuKeys);
        }

        if (!menuClick && (isSlim() || isHorizontal())) {
            setMenuActive(false);
        }

        searchClick = false;
        topbarItemClick = false;
        inlineMenuClick = false;
        menuClick = false;
    }

    const hideOverlayMenu = () => {
        setMobileMenuActive(false)
        setDesktopMenuActive(false)
    }

    const isDesktop = () => {
        return window.innerWidth > 1024;
    }

    const isHorizontal = () => {
        return menuMode === 'horizontal';
    }

    const isSlim = () => {
        return menuMode === 'slim';
    }

    const isIE = () => {
        return /(MSIE|Trident\/|Edge\/)/i.test(window.navigator.userAgent)
    }

    const onInlineMenuClick = (e, key) => {
        let menuKeys = { ...inlineMenuActive };
        if (key !== currentInlineMenuKey.current && currentInlineMenuKey.current) {
            menuKeys[currentInlineMenuKey.current] = false;
        }

        menuKeys[key] = !menuKeys[key];
        setInlineMenuActive(menuKeys);
        currentInlineMenuKey.current = key;
        inlineMenuClick = true;
    }

    const layoutContainerClassName = classNames('layout-wrapper ', 'layout-menu-' + menuTheme + ' layout-topbar-' + topbarTheme, {
        'layout-menu-static': menuMode === 'static',
        'layout-menu-overlay': menuMode === 'overlay',
        'layout-menu-slim': menuMode === 'slim',
        'layout-menu-horizontal': menuMode === 'horizontal',
        'layout-menu-active': desktopMenuActive,
        'layout-menu-mobile-active': mobileMenuActive,
        'layout-topbar-mobile-active': mobileTopbarActive,
        'layout-rightmenu-active': rightMenuActive,
        'p-input-filled': inputStyle === 'filled',
        'p-ripple-disabled': !ripple,
        'layout-rtl': isRTL
    });

    if (redirect)
        return <Redirect push to="/login"/>


    return (
        <RTLContext.Provider value={isRTL}>
            <div className={layoutContainerClassName} onClick={onDocumentClick}>
                <AppTopbar horizontal={isHorizontal()}
                    activeTopbarItem={activeTopbarItem}
                    onMenuButtonClick={onMenuButtonClick}
                    onTopbarItemClick={onTopbarItemClick}
                    onRightMenuButtonClick={onRightMenuButtonClick}
                    onMobileTopbarButtonClick={onMobileTopbarButtonClick} mobileTopbarActive={mobileTopbarActive}
                    searchActive={searchActive} onSearch={onSearch} />

                <div className="menu-wrapper" onClick={onMenuClick}>
                    <div className="layout-menu-container">
                        {(inlineMenuPosition === 'top' || inlineMenuPosition === 'both') && <AppInlineMenu menuKey="top" inlineMenuActive={inlineMenuActive} onInlineMenuClick={onInlineMenuClick} horizontal={isHorizontal()} menuMode={menuMode} />}
                        <AppMenu model={menu} onMenuItemClick={onMenuItemClick} onRootMenuItemClick={onRootMenuItemClick}
                            menuMode={menuMode} active={menuActive} />
                        {(inlineMenuPosition === 'bottom' || inlineMenuPosition === 'both') && <AppInlineMenu menuKey="bottom" inlineMenuActive={inlineMenuActive} onInlineMenuClick={onInlineMenuClick} horizontal={isHorizontal()} menuMode={menuMode} />}
                    </div>
                </div>

                <div className="layout-main">

                    <AppBreadcrumb routes={routes} />

                    <div className="layout-content">
                        {/*<Route path="/" exact render={() => <Dashboard colorMode={colorMode} isNewThemeLoaded={newThemeLoaded} onNewThemeChange={e => setNewThemeLoaded(e)} />} />*/}
                        <Route path="/Session" component={Session} />
                        <Route path="/ActiveSession" component={ActiveSession} />
                        <Route path="/Activities" component={Activities} />
                        <Route path="/Users" component={Users} />
                        <Route path="/Groups" component={Groups} />
                        <Route path="/Connection" component={Connectionp} />
                        <Route path="/Preferences" component={Preferences} />
                    </div>

                    {/*<AppFooter colorMode={colorMode} />*/}

                </div>

                <AppConfig inputStyle={inputStyle} onInputStyleChange={onInputStyleChange}
                    rippleEffect={ripple} onRippleEffect={onRipple}
                    menuMode={menuMode} onMenuModeChange={onMenuModeChange}
                    inlineMenuPosition={inlineMenuPosition} onInlineMenuPositionChange={onInlineMenuPositionChange}
                    colorMode={colorMode} onColorModeChange={onColorModeChange}
                    menuTheme={menuTheme} onMenuThemeChange={onMenuThemeChange}
                    topbarTheme={topbarTheme} onTopbarThemeChange={onTopbarThemeChange}
                    theme={theme} onThemeChange={onThemeChange}
                    isRTL={isRTL} onRTLChange={onRTLChange} />

                <AppRightMenu rightMenuActive={rightMenuActive} onRightMenuButtonClick={onRightMenuButtonClick} />

                {mobileMenuActive && <div className="layout-mask modal-in"></div>}
            </div>
        </RTLContext.Provider>
    );

}

export default App;
