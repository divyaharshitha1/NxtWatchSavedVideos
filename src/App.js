import {Component} from 'react'
import {Switch, Route} from 'react-router-dom'

import AppTheme from './context/Theme'
import Login from './components/Login'
import Header from './components/Header'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Trending from './components/Trending'
import Gaming from './components/Gaming'
import SavedVideos from './components/SavedVideos'
import VideoItemDetails from './components/VideoItemDetails'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'

// Replace your code here
class App extends Component {
  state = {
    activeTheme: 'light',
    savedVideos: [],
  }

  changeTheme = activeTheme => {
    this.setState({activeTheme})
  }

  addSavedVideos = async data => {
    const {savedVideos} = this.state
    if (savedVideos.length > 0) {
      const checkSavedVideos = savedVideos.filter(item => item.id === data.id)
      if (checkSavedVideos.length === 0) {
        await this.setState({
          savedVideos: [...savedVideos, data],
        })
      }
    } else {
      await this.setState({savedVideos: [...savedVideos, data]})
    }
  }

  render() {
    const {activeTheme, savedVideos} = this.state
    const bgColor = activeTheme === 'light' ? 'light' : 'dark'

    return (
      <AppTheme.Provider
        value={{
          activeTheme,
          savedVideos,
          changeTheme: this.changeTheme,
          addSavedVideos: this.addSavedVideos,
        }}
      >
        <>
          <div className="app-container">
            <Switch>
              <Route exact path="/login" component={Login} />
              <>
                <Header />
                <div className={`${bgColor} main-frame-container`}>
                  <Navbar />
                  <div className="content">
                    <Switch>
                      <ProtectedRoute exact path="/" component={Home} />
                      <ProtectedRoute
                        exact
                        path="/trending"
                        component={Trending}
                      />
                      <ProtectedRoute exact path="/gaming" component={Gaming} />
                      <ProtectedRoute
                        exact
                        path="/saved-videos"
                        component={SavedVideos}
                      />
                      <Route
                        exact
                        path="/videos/:id"
                        component={VideoItemDetails}
                      />
                      <Route component={NotFound} />
                    </Switch>
                  </div>
                </div>
              </>
            </Switch>
          </div>
        </>
      </AppTheme.Provider>
    )
  }
}
export default App
