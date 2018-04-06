import styled from 'styled-components';

export const MainContainer = styled.View`
    background: #efeff4;
    width: 100%;
    height: 100%
`

export const DetailViewContainer = styled.View`
    min-height: 80;
    borderRadius: 10;
    backgroundColor: #fff;
    borderWidth: 1;
    borderColor: #007aff;
    marginLeft: 35;
    marginRight: 35;
    marginTop: 20px;
    boxShadow: 2px 2px;
    shadow-color: #000;
    shadowOpacity: .5;
    shadowRadius: 2;
    overflow: scroll;
`
export const AccountDetailsView = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
`