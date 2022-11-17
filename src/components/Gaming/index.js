import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link /* Redirect */} from 'react-router-dom'
import {SiYoutubegaming} from 'react-icons/si'
import LoaderComponent from '../Loader'

import AppTheme from '../../context/Theme'
import FailureView from '../FailureView'

import {
  HomeContainer,
  ListContainer,
  ListItem,
  ParaTag,
  HeadDiv,
  HeaderEle,
  ContentDiv,
  ImageTag,
} from './StyledComponents'

class Gaming extends Component {
  state = {dataArray: [], isLoading: true, status: ''}

  componentDidMount() {
    this.getVideos()
  }

  getVideos = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/videos/gaming'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    try {
      const response = await fetch(apiUrl, options)
      if (response.ok) {
        const data = await response.json()
        await this.setState({dataArray: data.videos, status: true})
      }
    } catch {
      await this.setState({status: false})
    }
    this.setState({isLoading: false})
  }

  render() {
    const {dataArray, isLoading, status} = this.state

    /* const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    } */

    return (
      <AppTheme.Consumer>
        {value => {
          const {activeTheme} = value
          const color = activeTheme === 'light' ? '#000000' : '#ffffff'
          const bgColor = activeTheme === 'light' ? '#f9f9f9' : '#000000'

          return (
            <HomeContainer
              data-testid="loader"
              bgColor={`${bgColor}`}
              color={`${color}`}
            >
              {isLoading ? (
                <LoaderComponent />
              ) : (
                <>
                  {status ? (
                    <>
                      <HeadDiv>
                        <HeaderEle
                          bgColor={
                            activeTheme === 'light' ? '#f1f1f1' : '#181818'
                          }
                          color={`${color}`}
                        >
                          <SiYoutubegaming
                            size={40}
                            className={`trend-icon ${activeTheme}-icon`}
                          />
                          Gaming
                        </HeaderEle>
                      </HeadDiv>
                      <ContentDiv>
                        {dataArray.map(item => (
                          <Link
                            to={`/videos/${item.id}`}
                            className={
                              activeTheme === 'light'
                                ? 'link-light'
                                : 'link-dark'
                            }
                            key={item.id}
                          >
                            <ListContainer key={item.id}>
                              <ListItem>
                                <ImageTag
                                  src={`${item.thumbnail_url}`}
                                  width="190px"
                                  alt="video thumbnail"
                                />
                              </ListItem>
                              <ListItem>
                                <ParaTag
                                  fontSize="17px"
                                  color={`${color}`}
                                  fontWeight="bold"
                                >
                                  {item.title}
                                </ParaTag>
                              </ListItem>
                              <ListItem>
                                <ParaTag
                                  fontSize="13px"
                                  color="#94a3b8"
                                  marginTop="0px"
                                >
                                  {item.view_count} Watching Worldwide
                                </ParaTag>
                              </ListItem>
                            </ListContainer>
                          </Link>
                        ))}
                      </ContentDiv>
                    </>
                  ) : (
                    <FailureView refresh={this.getVideos} />
                  )}
                </>
              )}
            </HomeContainer>
          )
        }}
      </AppTheme.Consumer>
    )
  }
}

export default Gaming
