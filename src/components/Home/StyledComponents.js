import styled from 'styled-components'

export const HomeContainer = styled.div`
  padding: 30px;
  background-color: ${props => props.bgColor};
  color: ${props => props.color} @media screen and (max-width: 767px) {
    margin-top: 24px;
    padding: 30px 0 30px 20px;
  }
`
export const SearchInputContainer = styled.div`
  border: 1px solid black;
  width: fit-content;
  border-radius: 4px;
  display: flex;
  background-color: #ffffff;
  align-items: center;
`
export const SearchInput = styled.input`
  width: 300px;
  outline: none;
  padding: 5px;
  border: none;
  @media screen and (max-width: 767px) {
    width: 100%;
  }
`
export const ButtonEl = styled.button`
  border: none;
  outline: none;
  padding: 10px;
  cursor: pointer;
  @media screen and (max-width: 767px) {
    padding: 3px;
  }
`
export const ListContainer = styled.ul`
  list-style-type: none;
  padding: 0px;
  margin-bottom: 25px;
  @media screen and (min-width: 768px) {
    width: 300px;
    height: 270px;
  }
`
export const ListItem = styled.li`
  margin-right: 20px;
  display: flex;
  cursor: pointer;
`
export const ImageTag = styled.img`
  width: ${props => props.width};
  object-fit: contain;
`
export const ContentDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
`
export const ParaTag = styled.p`
  font-size: ${props => props.fontSize};
  font-family: 'Roboto';
  font-weight: 500;
  color: ${props => props.color};
`
export const NoResults = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
  @media screen and (max-width: 767px) {
    justify-content: center;
  }
`
export const NoVideosImage = styled.img`
  width: 30%;
  object-fit: contain;
  @media screen and (max-width: 767px) {
    width: 100%;
  }
  @media screen and (min-width: 768px) {
    padding-top: 30px;
  }
`
export const NoResultsHeading = styled.h1`
  @media screen and (max-width: 76px) {
    font-size: large;
  }
`
export const NoResultsPara = styled.p`
  @media screen and (max-width: 767px) {
    font-size: medium;
  }
`
export const NoResultsButton = styled.button`
  background-color: #4f46e5;
  color: #ffffff;
  outline: none;
  border: none;
  cursor: pointer;
  padding: 10px;
  border-radius: 5px;
`
